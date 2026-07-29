import { LinearProgressIndicator } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import { ColorValue } from "react-native";

type ProgressIndicatorProps = {
  value: number;
  color?: ColorValue | undefined;
  isQuickVersion?: boolean;
};

export default function ProgressIndicator({ value, color, isQuickVersion }: ProgressIndicatorProps) {
  if (!isQuickVersion) {
    return (
      <LinearProgressIndicator
        gapSize={0}
        drawStopIndicator={{ stopSize: 0 }}
        color={color}
        progress={value}
        modifiers={[fillMaxWidth()]}
      />
    );
  } else {
    return (
      <LinearProgressIndicator
        gapSize={0}
        drawStopIndicator={{ stopSize: 0 }}
        color={color}
        modifiers={[fillMaxWidth()]}
      />
    );
  }
}
