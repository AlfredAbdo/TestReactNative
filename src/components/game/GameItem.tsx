import NumberFormat from "@/utils/number/NumberFormat";
import { Column, Row, Spacer, Text } from "@expo/ui";
import ExpoHorizontalDivider from "../ExpoHorizontalDivider";
import ProgressIndicator from "../progress/ProgressIndicator";

export type GameItem = {
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

export default function GameItemContent({ item, progress }: { item: GameItem; progress: number }) {
  return (
    <Column>
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
      <Spacer size={2} />
      <ProgressIndicator value={progress} color={"#ffd33d"} />
      <Spacer size={2} />
      <ExpoHorizontalDivider color={"#fff"} />
    </Column>
  );
}
