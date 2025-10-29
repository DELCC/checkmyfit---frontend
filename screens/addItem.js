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
import { useState, useEffect } from "react";
import AIResponse from "../components/AIResponse";
import CameraViewStyleItem from "../components/CameraViewStyleItem";
import DropDownPicker from "react-native-dropdown-picker";

const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

export default function addItem({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);
  const [modalResultVisible, setModalResultVisible] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const closetCategories = [
    "All",
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Shoes",
    "Accessories",
  ];

  const selectedStylist = {
    initials: "CD",
    name: "Clément Delcourt",
    tagline: "Fashion Enthousiasm",
  };

  // elems for colors dropdown picker
  const colors = ["White", "Blue", "Dark", "Red", "Green", "Other"];
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorOpen, setColorOpen] = useState(false);
  console.log(selectedColor);

  // elems for seasons dropdown picker
  const seasons = ["Summer", "Autumn", "Winter", "Spring"];
  const [selectedSeason, setSelectedSeason] = useState(null);
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventOpen, setEventOpen] = useState(false);
  console.log(selectedEvent);

  // Inverse Data Flow - get Cloudinary URL from CameraViewStyleItem.js
  const getCloudinaryData = (url, publicId) => {
    setCloudinaryUrl(url);
    setCloudinaryPublicId(publicId);
  };
  console.log(`Id dispo dans addItem ${cloudinaryPublicId}`);

  const handleRemoveBackground = () => {
    if (cloudinaryUrl && cloudinaryPublicId) {
      fetch(`${API_IP}:${API_PORT}/items/removeBackground`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cloudinaryPublicId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCloudinaryUrl(data.transformedUrl);
          console.log(data.transformedUrl);
        });
    } else {
      console.log("error : issue with image transformation");
    }
  };

  // Show Modal for picture
  const handleTakePhoto = () => {
    setModalPhotoVisible(true);
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
            <Text style={styles.title}>Add item to your virtual dressing</Text>
          </View>

          {/* Camera Preview */}
          <View style={styles.previewContainer}>
            {cloudinaryUrl ? (
              <View style={styles.previewBox}>
                <Image
                  source={{
                    uri: cloudinaryUrl,
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

          {/* Take Picture Button */}
          <TouchableOpacity
            style={[styles.button, styles.cameraButton]}
            onPress={() => handleTakePhoto()}
          >
            <CameraIcon size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>

          {/* Remove Background with AI Button */}
          <TouchableOpacity
            onPress={() => handleRemoveBackground()}
            style={[styles.button, styles.submitButton]}
          >
            <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Remove background with AI</Text>
          </TouchableOpacity>

          {/* Category Pills */}
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

          {/* Navigate to Home */}

          <TouchableOpacity
            // onPress={() => navigation.navigate("Home")}
            style={[styles.button, styles.submitButton]}
          >
            <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Add item to dressing</Text>
          </TouchableOpacity>

          {/* Navigate to Home */}

          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={[styles.button, styles.submitButton]}
          >
            <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Go back Home</Text>
          </TouchableOpacity>

          {/* Modal*/}

          <Modal
            visible={modalPhotoVisible}
            animationType="slide"
            transparent={false}
          >
            <CameraViewStyleItem
              onClose={() => setModalPhotoVisible(false)}
              getCloudinaryData={getCloudinaryData}
            />
          </Modal>
          <Modal
            visible={modalResultVisible}
            animationType="slide"
            transparent={false}
          >
            <AIResponse
              onClose={() => setModalResultVisible(false)}
              selectedStylist={selectedStylist}
              isLoading={isLoading}
            />
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA", // équiv. var(--off-white)
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
  cameraButton: {
    backgroundColor: "#4A90E2", // équiv. var(--gradient-primary)
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
});
