import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Settings } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function HomeScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  //hello qsd qsd qsd sdqsdqsdqsd qsqsd
  useEffect(() => {
    if (route.params?.isNewUser) {
      setModalVisible(true);
      console.log(`les params: ${route.params}`);
    }
  }, [route.params]);

  const handleCloseModal = () => {
    navigation.setParams({ isNewUser: false });
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleCloseModal()}
              >
                <Bell size={20} color="#333" />
              </TouchableOpacity>

              <Text style={styles.modalText}>
                Bienvenue sur Check My Fit AI 👋
              </Text>

              <Text style={styles.modalText}>
                Renseigne ton profil pour que l'IA apprenne à connaître ton
                style. C'est rapide, promis ! ⚡
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Text style={styles.modalButtonText}>Compléter mon profil</Text>
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
