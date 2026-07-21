import { LinearProgressIndicator } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import { ColorValue } from "react-native";

type ProgressIndicatorProps = {
  value: number;
  color?: ColorValue | undefined;
};

export default function ProgressIndicator({ value, color }: ProgressIndicatorProps) {
  return (
    <LinearProgressIndicator
      gapSize={0}
      drawStopIndicator={{ stopSize: 0 }}
      color={color}
      progress={value}
      modifiers={[fillMaxWidth()]}
    />
  );
}
