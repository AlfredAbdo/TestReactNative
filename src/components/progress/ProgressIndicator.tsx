import { ColorValue, View } from "react-native";

type ProgressIndicatorProps = {
  value: number;
  color?: ColorValue | undefined;
};

export default function ProgressIndicator({ value, color }: ProgressIndicatorProps) {
  return (
    <View
      style={{
        width: "100%",
        height: 4,
        backgroundColor: "#333333", // fixme track color
        borderRadius: 4,
      }}
    >
      <View
        style={{
          width: `${value * 100}%`,
          height: "100%",
          backgroundColor: color ? color : "aqua",
          borderRadius: 4,
        }}
      />
    </View>
  );
}
