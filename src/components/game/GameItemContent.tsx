import NumberFormat from "@/utils/number/NumberFormat";
import { Button, Column, Row, Spacer, Text } from "@expo/ui";
import { GameItem } from "../../domain/entities/GameItem";
import { GameItemState } from "../../domain/entities/GameItemState";
import ProgressIndicator from "../progress/ProgressIndicator";

export default function GameItemContent({
  item,
  state,
  onUnlock,
  onUpgrade,
}: {
  item: GameItem;
  state: GameItemState;
  onUnlock: () => void;
  onUpgrade: () => void;
}) {
  return (
    <Column
      style={{
        borderColor: "#ffd33d",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#25292e",
        padding: 8,
      }}
    >
      <Text textStyle={{ fontSize: 16, fontWeight: "500", color: "#ffd33d" }}>{item.title}</Text>
      <Text textStyle={{ fontSize: 12, color: "#fff" }}>{item.description}</Text>
      <Spacer size={8} />
      <Row alignment="center">
        <Text textStyle={{ fontSize: 14, color: "#fff" }}>Gain:</Text>
        <Spacer size={8} />
        <Text textStyle={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>
          {NumberFormat.formatAmount(state.gain) + " coins each " + NumberFormat.formatDuration(state.fillRateMs)}
        </Text>
      </Row>
      <Spacer size={2} />
      {state.unlocked ? (
        <>
          <ProgressIndicator value={state.progress} color={"#ffd33d"} isQuickVersion={state.fillRateMs <= 200} />
          <Row>
            {/* Cannot set colors properly without relying on platform specific code, so left the defaults for now (which looks ugly) */}
            <Button onPress={onUpgrade} variant="outlined">
              <Text textStyle={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>
                {"Upgrade for " + (state.upgradeCost ? NumberFormat.formatAmount(state.upgradeCost) : "0")}
              </Text>
            </Button>
            <Spacer flexible />
          </Row>
        </>
      ) : (
        <Row>
          {/* Cannot set colors properly without relying on platform specific code, so left the defaults for now (which looks ugly) */}
          <Button onPress={onUnlock}>
            <Text textStyle={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>
              {"Unlock for " + (item.unlockAmount ? NumberFormat.formatAmount(item.unlockAmount) : "0")}
            </Text>
          </Button>
          <Spacer flexible />
        </Row>
      )}
      {/* <Spacer size={2} />
              <ExpoHorizontalDivider color={"#fff"} /> */}
    </Column>
  );
}
