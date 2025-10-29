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
import { useState } from "react";
import CameraViewStyle from "../components/CameraViewStyle";
import AIResponse from "../components/AIResponse";
import { useSelector, useDispatch } from "react-redux";
import { addOutfit } from "../reducers/users";

const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

export default function AIStylist() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);
  // const [modalResultVisible, setModalResultVisible] = useState(false);
  const [previewPicture, setPreviewPicture] = useState("");
  const [picture, setPicture] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [starRate, setStarRate] = useState("");
  const [styleComments, setStyleComments] = useState("");

  const [improvementSuggestions, setImprovementSuggestions] = useState("");
  const formData = new FormData();

  // const IP_ADDRESS = "192.168.100.144";

  const selectedStylist = {
    initials: "CD",
    name: "Clément Delcourt",
    tagline: "Fashion Enthousiasm",
  };

  const showPreviewPicture = (photo) => {
    setPreviewPicture(photo.uri);
    console.log(photo.uri);
  };

  const onSubmit = () => {
    setIsLoading(true);
    formData.append("photoFromFront", {
      uri: previewPicture,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    fetch(`${API_IP}:${API_PORT}/pictures/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.url);
          setPicture(data.url);
          fetch(`${API_IP}:${API_PORT}/pictures/aianalysis`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              picture: data.url,
              //  prompts: ["Rate my Style","I’m dressed for work. Rate my outfit on 5. Give <100 char comment. Give <100 char suggestion."]
              prompts: [
                // 'You are an AI stylist named Ruddy. Personality: encouraging, motivational. Description: Ruddy is here to motivate and encourage, offering positive and practical advice. The user says: \'Is my outfit appropriate for a job interview in finance?\'. Analyze the outfit in the image. Reply ONLY as JSON with this structure: {"rating": (1-5), "comment": "<260 chars>", "suggestions": ["tip1 <40 chars>", "tip2 <40 chars>", "tip3 <40 chars>", "tip4 <40 chars>"]}. Stay positive and motivational.',
                `You are an AI stylist named Ruddy. Your personality is encouraging, motivational. Description: Ruddy is here to motivate and encourage, offering positive and practical advice. The user says: ${promptInput}. Analyze the outfit in the image and the context of the user's prompt. Respond ONLY as a raw JSON object with this exact structure: {rating: number from 1 to 5, comment: string max 260 chars, suggestions: array of 4 strings max 40 chars each}. Stay in character and provide helpful, motivational, and positive advice in line with Ruddy’s style.`,
              ],
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // setAnalysis(data.analysis.data.responses);
              const rawResponse = data.data.data.analysis.responses;
              console.log(rawResponse);
              const stringValue = rawResponse[0].value;
              console.log(stringValue);
              const AIResultObject = JSON.parse(stringValue);
              // const AIResultObject = JSON.parse(stringValue);
              console.log(AIResultObject);
              console.log(AIResultObject.suggestions);
              setIsLoading(false);
              setStarRate(AIResultObject.rating);
              setStyleComments(AIResultObject.comment);
              setImprovementSuggestions(AIResultObject.suggestions);
            })
            .catch((error) => console.log(error));
          // .catch((error) => console.log(error));
        }
        setModalResultVisible(true);
      });
  };

  const handleTakePhoto = () => {
    setModalPhotoVisible(true);
  };
  // console.log(previewPicture);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const saveOutfit = () => {
    fetch(`${API_IP}:${API_PORT}/outfits/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        outfitPic: picture,
        rating: starRate,
        comment: styleComments,
        suggestion: improvementSuggestions,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    dispatch(
      addOutfit({
        outfitPic: picture,
        rating: starRate,
        comment: styleComments,
        suggestion: improvementSuggestions,
      })
    );
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
            <Text style={styles.title}>Upload or Capture Your Look</Text>
            <Text style={styles.subtitle}>Get AI feedback on your style</Text>
          </View>

          {/* Camera Preview */}
          <View style={styles.previewContainer}>
            {previewPicture ? (
              <View style={styles.previewBox}>
                <Image
                  source={{
                    uri: previewPicture,
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

          {/* Message Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add a message (optional)</Text>
            <TextInput
              style={styles.textarea}
              placeholder="e.g., 'Here's my look for a job interview — is it OK?'"
              placeholderTextColor="#999"
              multiline
              onChangeText={(value) => setPromptInput(value)}
              value={promptInput}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={[styles.button, styles.submitButton]}
          >
            <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Submit for AI Review</Text>
          </TouchableOpacity>
          <Modal
            visible={modalPhotoVisible}
            animationType="slide"
            transparent={false}
          >
            <CameraViewStyle
              onClose={() => setModalPhotoVisible(false)}
              showPreviewPicture={showPreviewPicture}
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
              picture={picture}
              starRate={starRate}
              styleComments={styleComments}
              improvementSuggestions={improvementSuggestions}
              saveOutfit={saveOutfit}
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
});
