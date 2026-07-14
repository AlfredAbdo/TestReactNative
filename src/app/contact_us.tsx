import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function ContactUsScreen() {
  const email = "email@email.com";

  const onEmailPress = async (email: string) => {
    try {
      await Linking.openURL("mailto:" + email);
    } catch (_) {
      alert("Cannot send to email: " + email + " on your device.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: 700 }]}>Contact Us Here:</Text>
      <Pressable
        onPress={() => {
          onEmailPress(email);
        }}
      >
        <Text style={[styles.text, { textDecorationLine: "underline" }]}>{email}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
