import { ProgressView } from "@expo/ui/swift-ui";
import { frame, tint, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ColorValue } from "react-native";

type ProgressIndicatorProps = {
  value: number;
  color?: ColorValue | undefined;
  isQuickVersion?: boolean;
};

export default function ProgressIndicator({ value, color, isQuickVersion }: ProgressIndicatorProps) {
  const modifiers: ViewModifier[] = [];
  if (color !== undefined) {
    modifiers.push(tint(color));
  }
  modifiers.push(frame({ maxWidth: Infinity }));

  if (!isQuickVersion) {
    return <ProgressView value={value} modifiers={modifiers} />;
  } else {
    return <ProgressView modifiers={modifiers} />;
  }
}
