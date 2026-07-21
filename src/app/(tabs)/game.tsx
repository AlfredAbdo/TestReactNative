import GameItemContent, { GameItem } from "@/components/game/GameItem";
import NumberFormat from "@/utils/number/NumberFormat";
import { Column, Host, Row, ScrollView, Spacer, Text } from "@expo/ui";
import { useEffect, useRef, useState } from "react";

export default function GameScreen() {
  const [uiCoins, setUiCoins] = useState(0);
  const coinsRef = useRef(0);
  const [progressUIList, setProgressUIList] = useState(Array(items.length).fill(0));
  const progressList = useRef(Array(items.length).fill(0));
  const lastUpdate = useRef(performance.now());
  const lastUIUpdate = useRef(performance.now());

  useEffect(() => {
    let frameId: number;

    const loop = (now: number) => {
      const diff = now - lastUpdate.current;
      items.forEach((item, index) => {
        var progress = progressList.current[index] + diff / item.baseFillRateMs;
        if (progress >= 1.0) {
          progress = 0;
          coinsRef.current += item.baseGain;
        }
        progressList.current[index] = progress;
      });
      lastUpdate.current = now;

      // As per Gemini, the UI should be throttled in the Expo UI Host because it cannot calculate every frame, instead of using something like Compose's withFrameNanos.
      if (now - lastUIUpdate.current > 100 /*each 100 ms*/) {
        setProgressUIList([...progressList.current]);
        setUiCoins(Math.floor(coinsRef.current));
        lastUIUpdate.current = now;
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  });

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
        {CoinsContent(uiCoins)}
        <ScrollView
          direction="vertical"
          style={{
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
        >
          <Column spacing={16}>
            {items.map((item, index) => (
              <GameItemContent key={item.id} item={item} progress={progressUIList[index]} />
            ))}
          </Column>
        </ScrollView>
      </Column>
    </Host>
  );
}

function CoinsContent(coins: number) {
  return (
    <Row
      alignment="center"
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Text
        textStyle={{
          fontSize: 24,
          color: "#fff",
        }}
      >
        Coins:
      </Text>
      <Spacer size={8} />
      <Text
        textStyle={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {NumberFormat.formatAmount(coins)}
      </Text>
    </Row>
  );
}

const items: GameItem[] = [
  {
    id: "1",
    title: "Item 1",
    description: "Item 1 description",
    baseFillRateMs: 2 * 1_000,
    baseGain: 10.0,
  },
  {
    id: "2",
    title: "Item 2",
    description: "Item 2 description",
    baseFillRateMs: 5 * 1_000,
    baseGain: 90.0,
  },
  {
    id: "3",
    title: "Item 3",
    description: "Item 3 description",
    baseFillRateMs: 30 * 1_000,
    baseGain: 500.0,
  },
  {
    id: "4",
    title: "Item 4",
    description: "Item 4 description",
    baseFillRateMs: 2 * 60 * 1_000,
    baseGain: 2_000.0,
  },
];
