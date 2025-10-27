import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Settings } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function HomeScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);

  console.log(`les params: ${route.params}`);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Hello 👋 Bienvenue sur Check My Fit AI !
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Check My Fit AI</Text>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  modalButton: {
    backgroundColor: "#00A896",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontWeight: "600" },
});
