import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { launchImageLibrary } from "react-native-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { ArrowLeft, Camera, Sparkles } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../reducers/users";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import ImagePickerField from "../components/uploadPic";

// const ipAdress = "192.168.100.171:3000";

const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

const bodyTypes = ["Athletic", "Slim", "Average", "Curvy", "Plus Size"];
const stylePreferencesOptions = [
  "Minimal",
  "Modern",
  "Casual",
  "Formal",
  "Streetwear",
  "Vintage",
  "Bohemian",
  "Sporty",
  "Elegant",
  "Edgy",
];
const skinTones = ["Fair", "Light", "Medium", "Tan", "Deep", "Dark"];

export default function EditProfile({
  onSave,
  onBack,
  isFirstTimeSetup,
  navigation,
  route,
}) {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("Fashion enthusiast");
  const [height, setHeight] = useState("180");
  const [weight, setWeight] = useState("80");
  const [bodyType, setBodyType] = useState("Athletic");
  const [skinTone, setSkinTone] = useState("Medium");
  const [stylePreferences, setStylePreferences] = useState([
    "Minimal",
    "Modern",
    "Casual",
  ]);

  const [bodyOpen, setBodyOpen] = useState(false);
  const [skinOpen, setSkinOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);

  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  // -------- EDIT PROFILE IN DB
  const handleEdit = () => {
    if (!user.token) return;

    fetch(`${API_IP}:${API_PORT}/users/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aiAssistant: selectedAssistant,
        profilePic: profileImage,
        bio,
        height,
        weight,
        skinTone,
        bodyType,
        stylePreferences,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(
            updateUser({
              aiAssistant: data.user.selectedAssistant,
              profilePic: data.user.profileImage,
              bio: data.user.bio,
              bodyType: data.user.bodyType,
              weight: data.user.weight,
              skinTone: data.user.skinTone,
              stylePreferences: data.user.stylePreferences,
              height: data.user.height,
              profilePic: data.user.profilePic,
            })
          );
          console.log(data);
        }
      })
      .catch(() => console.log("error"));
    handleSave();
    navigation.navigate("Home");
  };

  // ADD UPLOADED PROFILE PIC ON DB
  const handleSave = () => {
    if (profileImage && !profileImage.startsWith("http")) {
      const data = new FormData();
      data.append("photoFromFront", {
        uri: profileImage,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      fetch(`${API_IP}:${API_PORT}/users/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            const cloudUrl = data.url;

            // Now save this Cloudinary URL to your user profile
            return fetch(`${API_IP}:${API_PORT}/users/${user.token}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ profilePic: cloudUrl }),
            });
          }
        })
        .catch((err) => console.error("Upload error:", err));
    }
  };

  // GET ----- All AI Assistants
  useEffect(() => {
    fetch(`${API_IP}:${API_PORT}/aiassistants`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAssistants(data.allAssistants);
      })
      .catch((error) => {
        console.error("Failed to fetch assistants:", error);
      });
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            {!route.params?.isNewUser && onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ArrowLeft size={24} color="#4B5563" />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.headerTitle}>
                {route.params?.isNewUser
                  ? "Complete Your Profile"
                  : "Edit Profile"}
              </Text>
              {route.params?.isNewUser && (
                <Text style={styles.headerSubtitle}>
                  Help us personalize your experience
                </Text>
              )}
            </View>
          </View>

          {/* AI ASSISTANT --------------- */}
          <View style={styles.aiSection}>
            <View style={styles.aiHeader}>
              <Sparkles width={20} height={20} color="#027f8c" />
              <Text style={styles.aiTitle}>Choose Your AI Assistant</Text>
            </View>

            <Text style={styles.aiSubtitle}>
              Pick a virtual assistant to match your vibe
            </Text>

            {assistants.map((assistant) => (
              <TouchableOpacity
                key={assistant._id}
                style={[
                  styles.aiCard,
                  selectedAssistant === assistant._id && styles.aiCardSelected,
                ]}
                onPress={() => setSelectedAssistant(assistant._id)}
                activeOpacity={0.9}
              >
                <View style={styles.aiCardContent}>
                  <View
                    style={[
                      styles.aiAvatarWrapper,
                      { borderColor: "#027f8c" }, // ACCENT COLOR
                    ]}
                  >
                    <LinearGradient
                      colors={["#3399FF", "#00C896"]} //COLOR GRADIENT
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.aiAvatarWrapper}
                    >
                      {assistant.aiassistantPic ? (
                        <Image
                          source={require("../assets/aiAssistant.jpg")}
                          style={styles.aiAvatar}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={[styles.aiAvatarFallback]}>
                          <Text style={styles.aiAvatarText}>
                            {assistant.aiassistantName
                              ? assistant.aiassistantName[0].toUpperCase()
                              : "A"}
                          </Text>
                        </View>
                      )}
                    </LinearGradient>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.aiName}>
                      {assistant.aiassistantName}
                    </Text>
                    <View style={styles.styleTagsContainer}>
                      {assistant.aiassistantStyle.map((tag, i) => (
                        <View key={i} style={styles.styleTag}>
                          <Text style={styles.styleTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.aiDescription}>
                      {assistant.aiassistantDescription}
                    </Text>
                  </View>

                  {selectedAssistant === assistant._id && (
                    <View style={styles.aiCheckmark}>
                      <Text style={styles.aiCheckmarkText}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* UPLOAD ---------- IMAGE ----- component uploadPic */}
          <ImagePickerField
            label="Profile Picture"
            value={profileImage}
            onChange={setProfileImage}
            styles={styles}
          />
          <View style={styles.editSection}>
            {/* Bio ---------------------- */}
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about your style..."
              multiline
              numberOfLines={3}
            />

            {/* Height ---------------------- */}
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="180"
            />

            {/* Weight ---------------------- */}
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="80"
              keyboardType="numeric"
            />

            {/* Skintone ---------------------- */}
            <Text style={styles.label}>Skin Tone</Text>
            <DropDownPicker
              style={styles.input}
              open={skinOpen}
              value={skinTone}
              items={skinTones.map((tone) => ({ label: tone, value: tone }))}
              setOpen={setSkinOpen}
              setValue={setSkinTone}
              containerStyle={{ marginBottom: 16 }}
              dropDownContainerStyle={{ maxHeight: 150 }}
              zIndex={3000}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
            />

            {/* Bodytype ---------------------- */}
            <Text style={styles.label}>Body Type</Text>
            <DropDownPicker
              style={styles.input}
              open={bodyOpen}
              value={bodyType}
              items={bodyTypes.map((type) => ({ label: type, value: type }))}
              setOpen={setBodyOpen}
              setValue={setBodyType}
              containerStyle={{ marginBottom: 16 }}
              dropDownContainerStyle={{ maxHeight: 150 }}
              zIndex={2000}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
            />

            {/* Style pref ---------------------- */}
            <Text style={styles.label}>Style Preferences</Text>
            <DropDownPicker
              style={styles.input}
              multiple={true}
              min={0}
              max={stylePreferencesOptions.length}
              open={styleOpen}
              value={stylePreferences}
              items={stylePreferencesOptions.map((style) => ({
                label: style,
                value: style,
              }))}
              setOpen={setStyleOpen}
              setValue={setStylePreferences}
              containerStyle={{ marginBottom: 16 }}
              dropDownContainerStyle={{ maxHeight: 150 }}
              zIndex={1000}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
            />

            {/* Save Btn ---------------------- */}
            <LinearGradient
              colors={["#007F8C", "#00C896"]} // your gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButton} // same style as before
            >
              <TouchableOpacity
                onPress={handleEdit}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.saveButtonText}>
                  {route.params?.isNewUser ? "Complete Setup" : "Save Changes"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  body: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 180,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 2,
  },
  editSection: {
    // flex: 1,
    padding: 15,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
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
  textarea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 16,
    height: 90,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: "#A7F3D0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 48,
    backgroundColor: "#34D399",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadButtonText: {
    color: "#00C896",
    fontWeight: "600",
    fontSize: 14,
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // CSS for Assistant
  // assistantSection: {
  //   backgroundColor: "#FAFAF9",
  //   marginTop: 30,
  //   marginBottom: 40,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   color: "#111827",
  //   marginBottom: 16,
  // },
  // assistantCard: {
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 16,
  //   padding: 16,
  //   marginBottom: 16,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.08,
  //   shadowRadius: 6,
  //   elevation: 3,
  // },
  // assistantInfo: {
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   marginBottom: 12,
  // },
  // assistantAvatar: {
  //   width: 64,
  //   height: 64,
  //   borderRadius: 32,
  //   marginRight: 16,
  //   backgroundColor: "#E5E7EB",
  // },
  // assistantName: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#111827",
  // },
  // assistantDescription: {
  //   fontSize: 14,
  //   color: "#6B7280",
  //   marginTop: 4,
  // },
  styleTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  styleTag: {
    backgroundColor: "#ECFDF5",
    borderColor: "#027f8c",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  styleTagText: {
    fontSize: 12,
    color: "#027f8c",
  },
  // selectButton: {
  //   alignSelf: "flex-end",
  //   borderWidth: 1,
  //   borderColor: "#10B981",
  //   borderRadius: 8,
  //   paddingVertical: 6,
  //   paddingHorizontal: 16,
  // },
  // selectButtonText: {
  //   color: "#10B981",
  //   fontWeight: "600",
  // },
  // selectButtonActive: {
  //   backgroundColor: "#10B981",
  // },
  // selectButtonTextActive: {
  //   color: "#FFFFFF",
  // },

  // new ai assist
  aiSection: {
    padding: 20,
    backgroundColor: "#FAFAF9",
    marginTop: 24,
    marginBottom: 24,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  aiSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 16,
  },
  aiCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  aiCardSelected: {
    borderColor: "#027f8c",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  aiCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  aiAvatarWrapper: {
    // width: 64,
    // height: 64,
    // borderRadius: 32,
    // overflow: "hidden",
    // borderWidth: 2,
    // justifyContent: "center",
    // alignItems: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  aiAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
  },
  aiAvatarFallback: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  aiAvatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  aiName: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  aiTagline: {
    color: "#6B7280",
    fontSize: 14,
  },
  aiCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#027f8c",
    justifyContent: "center",
    alignItems: "center",
  },

  aiCheckmarkText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  aiDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
