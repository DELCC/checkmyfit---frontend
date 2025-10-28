import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { launchImageLibrary } from "react-native-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { ArrowLeft, Camera } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../reducers/users";

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

export default function EditProfile({ onSave, onBack, isFirstTimeSetup }) {
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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const infoUser = user.infoUser;

  // Image picker
  //   const handleImagePick = () => {
  //     launchImageLibrary(
  //       { mediaType: "photo", quality: 0.8 },
  //       (response) => {
  //         if (!response.didCancel && response.assets?.length > 0) {
  //           setProfileImage(response.assets[0].uri);
  //         }
  //       }
  //     );
  //   };

  const handleEdit = () => {
    if (!user.token) return;

    fetch(`http://192.168.100.171:3000/users/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio,
        taille: height,
        poids: weight,
        skintone: skinTone,
        bodytype: bodyType,
        stylepreferences: stylePreferences,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          dispatch(updateUser(data.user));
          console.log("hello");
        }
      })
      .catch(() => console.log("error"));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          {!isFirstTimeSetup && onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ArrowLeft size={24} color="#4B5563" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.headerTitle}>
              {isFirstTimeSetup ? "Complete Your Profile" : "Edit Profile"}
            </Text>
            {isFirstTimeSetup && (
              <Text style={styles.headerSubtitle}>
                Help us personalize your experience
              </Text>
            )}
          </View>
        </View>

        {/* Profile Pic */}
        <View style={styles.section}>
          <Text style={styles.label}>Profile Picture</Text>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.uploadButton} /*onPress={handleImagePick}*/
              >
                <Camera size={18} color="white" style={{ marginRight: 6 }} />
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
              </TouchableOpacity>
              <Text style={styles.helperText}>JPG, PNG up to 5MB</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.textarea}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about your style..."
          multiline
          numberOfLines={3}
        />

        {/* Height */}
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="180"
        />

        {/* Weight */}
        <Text style={styles.label}>Weight (lbs)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="80"
          keyboardType="numeric"
        />

        {/* Skintone */}
        <Text style={styles.label}>Skin Tone</Text>
        <DropDownPicker
          open={skinOpen}
          value={skinTone}
          items={skinTones.map((tone) => ({ label: tone, value: tone }))}
          setOpen={setSkinOpen}
          setValue={setSkinTone}
          containerStyle={{ marginBottom: 16 }}
          dropDownContainerStyle={{ maxHeight: 150 }}
          zIndex={3000}
        />

        {/* Bodytype */}
        <Text style={styles.label}>Body Type</Text>
        <DropDownPicker
          open={bodyOpen}
          value={bodyType}
          items={bodyTypes.map((type) => ({ label: type, value: type }))}
          setOpen={setBodyOpen}
          setValue={setBodyType}
          containerStyle={{ marginBottom: 16 }}
          dropDownContainerStyle={{ maxHeight: 150 }}
          zIndex={2000}
        />

        {/* Style pref */}
        <Text style={styles.label}>Style Preferences</Text>
        <DropDownPicker
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
        />

        {/* Save Btn */}
        <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
          <Text style={styles.saveButtonText}>
            {isFirstTimeSetup ? "Complete Setup" : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    color: "#6B7280",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    marginBottom: 16,
  },
  textarea: {
    backgroundColor: "white",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    marginBottom: 16,
    textAlignVertical: "top",
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
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#34D399",
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
    backgroundColor: "#34D399",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: "#34D399",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
