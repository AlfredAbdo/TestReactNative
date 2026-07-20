import NumberFormat from "@/utils/number/NumberFormat";
import { Column, Host, Row, ScrollView, Spacer, Text } from "@expo/ui";

export default function GameScreen() {
  return (
    <Host
      style={{
        flex: 1,
        alignItems: "baseline",
        backgroundColor: "#25292e",
      }}
    >
      <Column>
        {CoinsContent(12345)}
        <ScrollView
          direction="vertical"
          style={{
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
        >
          <Column spacing={16}>{items.map((item, _) => GameItemContent(item))}</Column>
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

function GameItemContent(item: GameItem) {
  return (
    <Column key={item.id}>
      <Text textStyle={{ fontSize: 16, fontWeight: "500", color: "#ffd33d" }}>{item.title}</Text>
      <Text textStyle={{ fontSize: 12, color: "#fff" }}>{item.description}</Text>
      <Spacer size={8} />
      <Row alignment="center">
        <Text textStyle={{ fontSize: 14, color: "#fff" }}>Gain:</Text>
        <Spacer size={8} />
        <Text textStyle={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>
          {NumberFormat.formatAmount(item.baseGain) + " coins each " + NumberFormat.formatDuration(item.baseFillRateMs)}
        </Text>
      </Row>
    </Column>
  );
}

type GameItem = {
  id: string;
  title: string;
  description: string;
  baseFillRateMs: number;
  baseGain: number;

  /* val upgradeMultipliers: UpgradeMultipliers,
    val unlockAmount: Double?,
    val baseUpgradeCost: Double, */

  // UpgradeMultipliers:
  /* val costMultiplier: Double,
        val fillRateMultiplier: Double,
        val gainMultiplier: Double, */
};

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
