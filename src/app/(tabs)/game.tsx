import CoinsContent from "@/components/game/CoinsContent";
import GameItemContent from "@/components/game/GameItem";
import { createGameItemState, GameItemState } from "@/components/game/GameItemState";
import { Column, Host, ScrollView } from "@expo/ui";
import { useEffect, useRef, useState } from "react";

export default function GameScreen() {
  const [uiCoins, setUiCoins] = useState(0);
  const coinsRef = useRef(0);
  const stateList = useRef(states);
  const [stateUIList, setStateUIList] = useState(states.map((state) => ({ ...state })));
  const lastUpdate = useRef(performance.now());
  const lastUIUpdate = useRef(performance.now());

  useEffect(() => {
    let frameId: number;

    const loop = (now: number) => {
      const diff = now - lastUpdate.current;
      stateList.current.forEach((state, index) => {
        if (!state.unlocked) {
          return;
        }
        var progress = stateList.current[index].progress + diff / state.item.baseFillRateMs;
        if (progress >= 1.0) {
          progress = 0;
          coinsRef.current += state.item.baseGain;
        }
        stateList.current[index].progress = progress;
      });
      lastUpdate.current = now;

      // As per Gemini, the UI should be throttled in the Expo UI Host because it cannot calculate every frame, instead of using something like Compose's withFrameNanos.
      if (now - lastUIUpdate.current > 100 /*each 100 ms*/) {
        setStateUIList([...stateList.current]);
        setUiCoins(Math.floor(coinsRef.current));
        lastUIUpdate.current = now;
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  });

  const onUnlock: (state: GameItemState) => void = (state) => {
    state.unlocked = true;
  };

  return (
    <Host
      style={{
        flex: 1,
        alignSelf: "stretch",
        width: "100%",
        backgroundColor: "#25292e",
      }}
    >
      <Column>
        <CoinsContent coins={uiCoins} />
        <ScrollView
          direction="vertical"
          style={{
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
        >
          <Column spacing={16}>
            {stateList.current.map((state, index) => (
              <GameItemContent
                key={state.item.id}
                item={state.item}
                state={stateUIList[index]}
                onUnlock={() => {
                  onUnlock(state);
                }}
              />
            ))}
          </Column>
        </ScrollView>
      </Column>
    </Host>
  );
}

const states: GameItemState[] = [
  createGameItemState({
    id: "1",
    title: "Item 1",
    description: "Item 1 description",
    baseFillRateMs: 2 * 1_000,
    baseGain: 10.0,
  }),
  createGameItemState({
    id: "2",
    title: "Item 2",
    description: "Testing very short interval",
    baseFillRateMs: 100,
    baseGain: 1.0,
  }),
  createGameItemState({
    id: "3",
    title: "Item 3",
    description: "Item 3 description",
    baseFillRateMs: 5 * 1_000,
    baseGain: 90.0,
    unlockAmount: 100.0,
  }),
  createGameItemState({
    id: "4",
    title: "Item 4",
    description: "Item 4 description",
    baseFillRateMs: 30 * 1_000,
    baseGain: 500.0,
    unlockAmount: 500.0,
  }),
];
