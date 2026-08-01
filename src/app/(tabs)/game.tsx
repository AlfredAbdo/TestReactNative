import CoinsContent from "@/components/game/CoinsContent";
import GameItemContent from "@/components/game/GameItemContent";
import { getGameStateUseCase } from "@/di/container";
import { Result } from "@/domain/common/Result";
import { GameItemState } from "@/domain/entities/GameItemState";
import { useGetGameState } from "@/presentation/hooks/useGetGameState";
import { Column, Host, ScrollView } from "@expo/ui";
import { useEffect, useRef, useState } from "react";

export default function GameScreen() {
  const [uiCoins, setUiCoins] = useState(0);
  const coinsRef = useRef(0);
  const stateList = useRef<GameItemState[]>([]);
  const [stateUIList, setStateUIList] = useState<GameItemState[]>([]);
  const lastUpdate = useRef(performance.now());
  const lastUIUpdate = useRef(performance.now());
  const lastElementToShow = useRef(-1);

  const { getGameItems, loading } = useGetGameState(getGameStateUseCase);

  useEffect(() => {
    // TODO pass AbortSignal through the use case and to the repository
    const fetch = async () => {
      // TODO: use loading
      const result = await getGameItems();
      Result.fold(result, {
        onSuccess: (items) => {
          // TODO: stop loading
          stateList.current = items;
          setStateUIList(items.map((state) => ({ ...state })));
          lastElementToShow.current = items.findIndex((state) => !state.unlocked);
        },
        onFailure: (error) => {
          // TODO: stop loading
          // TODO: show error
        },
      });
    };

    fetch();
  }, [getGameItems]);

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
    if (state.unlocked || (state.item.unlockAmount !== undefined && coinsRef.current < state.item.unlockAmount)) {
      return;
    }

    state.unlocked = true;
    const lastIndexToShow = stateList.current.findIndex((state) => !state.unlocked);
    lastElementToShow.current = lastIndexToShow != -1 ? lastIndexToShow : Infinity;
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
            {stateList.current.map((state, index) =>
              index <= lastElementToShow.current ? (
                <GameItemContent
                  key={state.item.id}
                  item={state.item}
                  state={stateUIList[index]}
                  onUnlock={() => {
                    onUnlock(state);
                  }}
                />
              ) : null,
            )}
          </Column>
        </ScrollView>
      </Column>
    </Host>
  );
}
