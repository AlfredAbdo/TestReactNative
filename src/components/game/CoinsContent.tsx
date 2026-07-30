import NumberFormat from "@/utils/number/NumberFormat";
import { Row, Spacer, Text } from "@expo/ui";

export default function CoinsContent({ coins }: { coins: number }) {
  return (
    <Row
      alignment="center"
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Text
        textStyle={{
          fontSize: 24,
          color: "#fff",
        }}
      >
        Coins:
      </Text>
      <Spacer size={8} />
      <Text
        textStyle={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {NumberFormat.formatAmount(coins)}
      </Text>
    </Row>
  );
}
