import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Settings } from "lucide-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/users";

const Stack = createNativeStackNavigator();

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.value.token);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Auth");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Check My Fit AI</Text>
            <Text style={styles.subtitle}>UI Kit Showcase</Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Auth")}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={[styles.buttonText, styles.textDark]}>
            Go to Auth Page
          </Text>
        </TouchableOpacity>

        {/*
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        hana work
        */}
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={[styles.buttonText, styles.textDark]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
        {/* BUTTON TO REACH EDIT PROFILE PAGE BELOW */}
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text>Edit your profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#00A896" },
  subtitle: { fontSize: 14, color: "#6b7280" },
  icons: { flexDirection: "row", gap: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#A8E6CF",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "50%",
  },
  textDark: {
    color: "#111827",
  },
});
