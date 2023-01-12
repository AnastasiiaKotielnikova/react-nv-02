import { Text, Button } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <Button title="go to map" onPress={() => navigation.navigate("Map")} />
  );
}
