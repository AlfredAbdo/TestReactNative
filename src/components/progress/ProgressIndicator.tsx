import { useEffect, useRef } from "react";
import { Animated, ColorValue, Easing, View } from "react-native";

type ProgressIndicatorProps = {
  value: number;
  color?: ColorValue | undefined;
  isQuickVersion?: boolean;
};

export default function ProgressIndicator({ value, color, isQuickVersion }: ProgressIndicatorProps) {
  const animatedLeft = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    if (!isQuickVersion) {
      animatedLeft.setValue(-1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedLeft, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animatedLeft, {
          toValue: -1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [animatedLeft, isQuickVersion]);

  const barColor = color ?? "aqua";

  if (!isQuickVersion) {
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
            backgroundColor: barColor,
            borderRadius: 4,
          }}
        />
      </View>
    );
  } else {
    const animatedPosition = animatedLeft.interpolate({
      inputRange: [-1, 1],
      outputRange: ["-40%", "100%"],
    });

    return (
      <View
        style={{
          width: "100%",
          height: 4,
          backgroundColor: "#333333", // fixme track color
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: color ? color : "aqua",
            borderRadius: 4,
            position: "absolute",
            left: animatedPosition,
          }}
        />
      </View>
    );
  }
}
