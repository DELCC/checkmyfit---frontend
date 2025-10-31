import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Camera as CameraIcon, Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";

const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

export default function addItem({ navigation, route }) {
  const [modalResultVisible, setModalResultVisible] = useState(false);
  const [addSuccess, setAddSuccess] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tops");

  // Get item data from Wardrobe screen if editing an existing item
  const { item } = route.params || {};
  console.log(`la photo de mon item ${item.itemPic}`);

  const token = useSelector((state) => state.users.value.token);
  console.log(`Token dispo dans addItem ${token}`);

  const closetCategories = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Shoes",
    "Accessories",
    "Others",
  ];

  const selectedStylist = {
    initials: "CD",
    name: "Clément Delcourt",
    tagline: "Fashion Enthousiasm",
  };

  // elems for colors dropdown picker
  const colors = ["White", "Blue", "Dark", "Red", "Green", "Other"];
  const [selectedColor, setSelectedColor] = useState(item.color || null);
  const [colorOpen, setColorOpen] = useState(false);
  console.log(selectedColor);

  // elems for seasons dropdown picker
  const seasons = ["Summer", "Autumn", "Winter", "Spring"];
  const [selectedSeason, setSelectedSeason] = useState(item.season || null);
  const [seasonOpen, setSeasonOpen] = useState(false);
  console.log(selectedSeason);

  // elems for event dropdown picker
  const events = [
    "Casual",
    "Professionnel",
    "Special Event",
    "Outdoor",
    "Vacation",
  ];
  const [selectedEvent, setSelectedEvent] = useState(item.occasion || null);
  const [eventOpen, setEventOpen] = useState(false);
  console.log(selectedEvent);

  // edit an item in wardrobe

  const handleEditItem = () => {
    fetch(`${API_IP}:${API_PORT}/items/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        itemPic: item.itemPic,
        type: selectedCategory,
        color: selectedColor,
        season: selectedSeason,
        occasion: selectedEvent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // success case
          console.log("Item updated:", data);
          navigation.navigate("Wardrobe");
        } else {
          setAddSuccess(false);
          setModalResultVisible(true);
          setTimeout(() => {
            setModalResultVisible(false);
            setAddSuccess(null);
          }, 2000);
        }
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Sparkles size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Edit your item below 😎👇</Text>
          </View>

          {/* Camera Preview */}
          <View style={styles.previewContainer}>
            {item.itemPic ? (
              <View style={styles.previewBox}>
                <Image
                  source={{
                    uri: item.itemPic,
                  }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.previewBox}>
                <View style={styles.previewIconContainer}>
                  <CameraIcon size={48} color="#999" />
                </View>
                <Text style={styles.previewText}>Camera Preview</Text>
              </View>
            )}
          </View>

          {/* Category Pills */}
          <Text style={styles.label}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
          >
            {closetCategories.map((category, index) => {
              const isSelected = category === selectedCategory;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryBadge,
                    isSelected
                      ? { backgroundColor: "#6C5DD3" }
                      : {
                          backgroundColor: "#fff",
                          borderColor: "#D2B48C",
                          borderWidth: 1,
                        },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={{ color: isSelected ? "#fff" : "#D2B48C" }}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/*choose a color */}
          <Text style={styles.label}>Color</Text>
          <DropDownPicker
            style={styles.input}
            open={colorOpen}
            value={selectedColor}
            items={colors.map((color) => ({ label: color, value: color }))}
            setOpen={setColorOpen}
            setValue={setSelectedColor}
            containerStyle={{ marginBottom: 16 }}
            dropDownContainerStyle={{ maxHeight: 150 }}
            zIndex={3000}
            zIndexInverse={1000}
            dropDownDirection="BOTTOM"
            listMode="SCROLLVIEW"
          />

          {/*choose a season */}
          <Text style={styles.label}>Season</Text>
          <DropDownPicker
            style={styles.input}
            open={seasonOpen}
            value={selectedSeason}
            items={seasons.map((season) => ({ label: season, value: season }))}
            setOpen={setSeasonOpen}
            setValue={setSelectedSeason}
            containerStyle={{ marginBottom: 16 }}
            dropDownContainerStyle={{ maxHeight: 150 }}
            zIndex={2000}
            zIndexInverse={2000}
            dropDownDirection="BOTTOM"
            listMode="SCROLLVIEW"
          />

          {/*choose an appropriate event */}
          <Text style={styles.label}>For what kind of event?</Text>
          <DropDownPicker
            style={styles.input}
            open={eventOpen}
            value={selectedEvent}
            items={events.map((event) => ({ label: event, value: event }))}
            setOpen={setEventOpen}
            setValue={setSelectedEvent}
            containerStyle={{ marginBottom: 16 }}
            dropDownContainerStyle={{ maxHeight: 150 }}
            zIndex={1000}
            zIndexInverse={3000}
            dropDownDirection="BOTTOM"
            listMode="SCROLLVIEW"
          />

          {/* update item to dressing */}

          <TouchableOpacity
            onPress={() => handleEditItem()}
            style={[styles.button, styles.submitButton]}
          >
            <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Update my item </Text>
          </TouchableOpacity>

          {/* Modal Result is error when editing*/}
          <Modal
            visible={modalResultVisible}
            animationType="fade"
            transparent={true}
          >
            <View style={styles.resultModalOverlay}>
              {addSuccess === true && (
                <LinearGradient
                  colors={["#00A6A6", "#A8E6CF"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.resultModalBox}
                >
                  <Text style={styles.resultIcon}>✅</Text>
                  <Text style={styles.resultTitle}>Item added</Text>
                  <Text style={styles.resultSubtitle}>
                    Your item was saved to your wardrobe
                  </Text>
                </LinearGradient>
              )}

              {addSuccess === false && (
                <LinearGradient
                  colors={["#FF6B6B", "#F97373"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.resultModalBox}
                >
                  <Text style={styles.resultIcon}>❌</Text>
                  <Text style={styles.resultTitle}>Failed</Text>
                  <Text style={styles.resultSubtitle}>
                    Could not add the item. Try again.
                  </Text>
                </LinearGradient>
              )}
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA", // équiv. var(--lightest-gray)
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 96,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#6C63FF", // équiv. var(--gradient-ai)
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222", // équiv. var(--soft-black)
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666", // équiv. var(--cool-gray)
  },
  previewContainer: {
    marginBottom: 32,
  },
  previewBox: {
    aspectRatio: 3 / 4,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CCC", // équiv. var(--border-gray)
    backgroundColor: "#EEE", // équiv. var(--light-gray)
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  previewIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: "#F6F6F6", // équiv. var(--gradient-soft)
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 2,
  },
  previewText: {
    color: "#888",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: "#6C63FF", // équiv. var(--gradient-ai)
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  textarea: {
    minHeight: 120,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 12,
    textAlignVertical: "top",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  categories: {
    marginTop: 12,
  },
  categoryBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  input: {
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111827",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  resultModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  resultModalBox: {
    minWidth: 280,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  resultSuccessText: {
    color: "#16A34A",
    fontSize: 18,
    fontWeight: "700",
  },
  resultErrorText: {
    color: "#DC2626",
    fontSize: 18,
    fontWeight: "700",
  },
  resultInfoText: {
    color: "#374151",
    fontSize: 16,
  },
  resultIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  resultSubtitle: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 13,
    textAlign: "center",
  },
  resultProcessingBox: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
});
