import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Settings, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addOutfit, updateUser, deleteOutfit } from "../reducers/users";
import * as Location from "expo-location";
import OutfitDisplay from "../components/OutfitDisplay";

const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

export default function HomeScreen({ navigation, route, onNavigateToCloset }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState("null");
  const [lon, setLon] = useState("null");
  const [starRate, setStarRate] = useState("");
  const [styleComments, setStyleComments] = useState("");
  const [improvementSuggestions, setImprovementSuggestions] = useState([]);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (route.params?.isNewUser) {
      setModalVisible(true);
      console.log(`les params: ${route.params}`);
    } else {
      setModalVisible(false);
    }
  }, [route.params]);
  const handleCloseModal = () => {
    navigation.setParams({ isNewUser: false });
    setModalVisible(false);
  };
  const handleProfileScreenNavigation = () => {
    navigation.navigate("EditProfile");
    setModalVisible(false);
  };

  //  const recentStyles = [
  //   { id: 1, rating: 4.5 },
  //   { id: 2, rating: 4.8 },
  //   { id: 3, rating: 4.2 },
  //   { id: 4, rating: 4.6 },
  // ];

  const closetItems = [
    { id: 1, category: "Tops", image: require("../assets/tops.png") },
    { id: 2, category: "Bottoms", image: require("../assets/bottoms.png") },
    { id: 3, category: "Shoes", image: require("../assets/shoes.png") },
    {
      id: 4,
      category: "Accessories",
      image: require("../assets/accessories.png"),
    },
    // { id: 5, category: "Outerwear", image: require("../assets/outerwear.png") },
    // { id: 6, category: "Dresses", image: require("../assets/dresses.png") },
  ];

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  useEffect(() => {
    fetch(`${API_IP}:${API_PORT}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(
          updateUser({
            username: data.user.username,
            bio: data.user.bio,
            skinTone: data.user.skinTone,
            bodyType: data.user.bodyType,
            height: data.user.height,
            weight: data.user.weight,
            stylePreferences: data.user.stylePreferences,
            aiAssistant: data.user.aiAssistant,
            profilePic: data.user.profilePic,
          })
        );
      })
      .catch((error) => console.log(error));
    fetch(`${API_IP}:${API_PORT}/outfits/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.outfits.length);
        // data.outfits.map((outfit) => {
        //   return dispatch(
        //     addOutfit({
        //       outfitPic: outfit.outfitPic,
        //       rating: outfit.rating,
        //       comment: outfit.comment,
        //       suggestion: outfit.suggestion,
        //     })
        for (let i = 0; i < data["outfits"].length; i++) {
          dispatch(
            addOutfit({
              id: data["outfits"][i]["_id"],
              outfitPic: data["outfits"][i]["outfitPic"],
              rating: data["outfits"][i]["rating"],
              comment: data["outfits"][i]["comment"],
              suggestion: data["outfits"][i]["suggestion"],
            })
          );
        }
      })
      .catch((error) => console.log(error));
    // fetch(`http:${IP_ADDRESS}:3000/items/${user.token}`)
    //   .then(response => response.json())
    //   .then( data => console.log(data));
  }, []);
  console.log(user);
  console.log(selectedOutfit);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission refusée pour accéder à la localisation.");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLat(latitude);
      setLon(longitude);
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        setCity(address.city || address.region || "Ville inconnue");
      }

      setLoading(false);
    })();
  }, []);

  const handleDisplayOutfit = async (id) => {
    setSelectedOutfit(id);
    const selectedOutfitInfos = await user.outfits.find((e) => e.id === id);
    console.log(selectedOutfitInfos);
    setStarRate(selectedOutfitInfos.rating);
    setStyleComments(selectedOutfitInfos.comment);
    setImprovementSuggestions(selectedOutfitInfos.suggestion);
    setPicture(selectedOutfitInfos.outfitPic);
  };

  const handleCloseDisplayOutfit = () => {
    setStarRate("");
    setStyleComments("");
    setImprovementSuggestions([]);
    setPicture("");
    setSelectedOutfit(null);
  };

  const handleDeleteOutfit = (id) => {
    fetch(`${API_IP}:${API_PORT}/outfits/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => dispatch(deleteOutfit(id)))
      .then(() => handleCloseDisplayOutfit(id))
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.deleteIcon}>
                <TouchableOpacity onPress={() => handleCloseModal()}>
                  <X size={30} color="#000000ff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>
                Bienvenue sur Check My Fit AI 👋
              </Text>
              <Text style={styles.modalText}>
                Renseigne ton profil pour que l'IA apprenne à connaître ton
                style. C'est rapide, promis ! ⚡
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleProfileScreenNavigation()}
              >
                <Text style={styles.modalButtonText}>Compléter mon profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <View>
                <Ionicons name="notifications-outline" size={24} color="#666" />
                <View style={styles.notificationDot} />
              </View>
            </View>
            <Text style={styles.greeting}>
              Good morning, {user?.infoUser?.username || "Guest"}!
            </Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="cloud-outline" size={18} color="#7BAACF" />
                <Text style={styles.infoText}>72°F</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.infoText}>Mon, Oct 20</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={16} color="#4DB6AC" />
                <Text style={styles.infoText}>
                  {loading ? "Chargement..." : city || "Ville inconnue"}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Recent Styles</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {user.outfits.map((style) => (
                <View key={style.id}>
                  {style.outfitPic ? (
                    <TouchableOpacity
                      style={styles.outfitCard}
                      onPress={() => handleDisplayOutfit(style.id)}
                    >
                      <Image
                        source={{
                          uri: style.outfitPic,
                        }}
                        style={styles.outfitImage}
                        resizeMode="cover"
                      />
                      <View style={styles.badge}>
                        <Ionicons name="star" size={12} color="#fff" />
                        <Text style={styles.badgeText}>{style.rating}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.outfitCard}
                      onPress={() => handleDisplayOutfit(style.id)}
                    >
                      <View style={styles.badge}>
                        <Ionicons name="star" size={12} color="#fff" />
                        <Text style={styles.badgeText}>{style.rating}</Text>
                        <Text style={styles.outfitLabel}>Outfit</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* My Virtual Closet */}
            <Text style={styles.sectionTitle}>My Virtual Closet</Text>
            <View style={styles.closetGrid}>
              {closetItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.closetItem}
                  onPress={() => onNavigateToCloset(item.category)}
                >
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  {/* <View style={styles.closetPreview} /> */}
                  <Text style={styles.closetLabel}>{item.category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Calendar View */}
            <Text style={styles.sectionTitle}>Calendar View</Text>
            <View style={styles.calendarCard}>
              <Text style={styles.calendarTitle}>October 2025</Text>
              <View style={styles.calendarDaysRow}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <Text key={day} style={styles.calendarDayLabel}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.calendarGrid}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.calendarCell,
                      day === 20 && styles.calendarActiveCell,
                      day <= 20 && day !== 20 && styles.calendarPastCell,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarCellText,
                        day === 20 && styles.calendarActiveText,
                        day <= 20 && day !== 20 && styles.calendarPastText,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          {/* Outfit Feedback Modal */}
          <Modal
            visible={selectedOutfit !== null}
            animationType="slide"
            transparent
          >
            {/* <View style={styles.modalContainer}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Outfit Feedback</Text>
                <Text style={styles.modalText}>
                  Feedback for outfit #{selectedOutfit}
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setSelectedOutfit(null)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <OutfitDisplay
              selectedOutfit={selectedOutfit}
              onClose={() => handleCloseDisplayOutfit()}
              picture={picture}
              starRate={starRate}
              styleComments={styleComments}
              improvementSuggestions={improvementSuggestions}
              deleteOutfit={() => handleDeleteOutfit(selectedOutfit)}
            />
          </Modal>
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
  deleteIcon: {
    flexDirection: "row", // ✅ Disposition horizontale
    justifyContent: "flex-end", // ✅ Aligner à droite
    width: "100%",
    marginBottom: 8,
    paddingRight: 5,
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
  modalTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  modalButton: {
    backgroundColor: "#00A896",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontWeight: "600" },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    backgroundColor: "#fff",
    padding: 24,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#80CBC4",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DB6AC",
    position: "absolute",
    top: 0,
    right: 0,
  },
  greeting: { fontSize: 18, color: "#222", marginVertical: 12 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 8,
  },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText: { color: "#777" },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginVertical: 12,
  },
  outfitCard: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: "#E9F5F2",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outfitLabel: { color: "#555" },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    backgroundColor: "#4DB6AC",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 12, marginLeft: 3 },
  closetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  closetItem: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  closetPreview: {
    width: "80%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#E9F5F2",
    marginBottom: 8,
  },
  closetLabel: { fontSize: 12, color: "#A1887F" },
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarTitle: { textAlign: "center", fontWeight: "600", marginBottom: 8 },
  calendarDaysRow: { flexDirection: "row", justifyContent: "space-between" },
  calendarDayLabel: { color: "#888", width: 28, textAlign: "center" },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  calendarCell: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  calendarActiveCell: { backgroundColor: "#4DB6AC" },
  calendarPastCell: { backgroundColor: "#EEE" },
  calendarCellText: { fontSize: 12, color: "#999" },
  calendarActiveText: { color: "#fff" },
  calendarPastText: { color: "#333" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  modalText: { color: "#555", marginBottom: 20 },
  modalButton: {
    backgroundColor: "#4DB6AC",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  outfitImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  itemImage: {
    width: "75%",
    height: "65%",
    borderRadius: 10,
    marginBottom: 6,
  },
});
