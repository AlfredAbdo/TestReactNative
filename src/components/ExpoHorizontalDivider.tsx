import { RNHostView } from "@expo/ui";
import { ColorValue, Platform, View } from "react-native";

type Props = {
  color?: ColorValue | undefined;
};

export default function ExpoHorizontalDivider({ color }: Props) {
  return Platform.select({
    android: () => {
      const { HorizontalDivider } = require("@expo/ui/jetpack-compose");
      return <HorizontalDivider color={color} thickness={1} />;
    },
    ios: () => {
      const { Divider } = require("@expo/ui/swift-ui");
      const { background } = require("@expo/ui/swift-ui/modifiers");
      return <Divider modifiers={[background(color)]} />;
    },
    default: () => {
      return (
        <RNHostView style={{ width: "100%", height: 1 }}>
          {/* fixme: Not working to stretch fully in web */}
          <View style={{ flex: 1, alignContent: "stretch", alignSelf: "stretch" }}>
            <View
              style={{
                width: "100%",
                alignSelf: "stretch",
                height: 1,
                backgroundColor: color,
              }}
            />
          </View>
        </RNHostView>
      );
    },
  })();
}
