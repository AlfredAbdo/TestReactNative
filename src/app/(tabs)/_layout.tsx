import { MainTabsOptions } from "@/theme/theme";
import MaterialIcon from "@react-native-vector-icons/material-design-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={MainTabsOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcon name={focused ? "home" : "home-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcon name={focused ? "information" : "information-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcon name={focused ? "timelapse" : "timelapse"} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
