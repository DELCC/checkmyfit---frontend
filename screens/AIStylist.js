import { View, Text, TouchableOpacity, StyleSheet ,TextInput, ScrollView, Modal, Image} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Settings,Camera as CameraIcon, Sparkles } from "lucide-react-native";
import { useState } from "react";
import CameraViewStyle from "../components/CameraViewStyle";

export default function AIStylist() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ previewPicture, setPreviewPicture] = useState('');
  const [ promptInput, setPromptInput] = useState('');

  const formData = new FormData();

  const IP_ADDRESS='192.168.100.31';
  // const CLOUDINARY_CLOUD_NAME = 'drhn4tr0d';
  // const KEY = '755575821876645';
  // const SECRET = '_IiGv_UflvAoB3Nlekk0Dy4DfhY';
  // const credentials = btoa(`${KEY}:${SECRET}`);
  const showPreviewPicture = (photo) => {
    setPreviewPicture(photo.uri);
    console.log(photo.uri);
  };
  // Faire une route + obligé de stocker la photo pour pouvoir recevoir une recommendation de l'API
  const onSubmit = () => {
          formData.append('photoFromFront', {
          uri: previewPicture,
          name: 'photo.jpg',
          type: 'image/jpeg',
          });

//           fetch(`http://${IP_ADDRESS}:3000/pictures/aianalysis/${previewPicture}`, {
//           method: 'POST',
//           body: formData,
//           }).then((response) => response.json())
//           .then((data) => {
//             console.log(data);
// });
 fetch(`http://${IP_ADDRESS}:3000/pictures/upload`, {
          method: 'POST',
          body: formData,
          }).then((response) => response.json())
          .then((data) =>{
            if (data.result) {
              fetch(`http://${IP_ADDRESS}:3000/pictures/aianalysis`,{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
              picture: data.url,
               prompts: "Describe the picture"})
              }).then(response => response.json())
              .then(data => console.log(data.analysis.data.analysis));
            }
});

};


  const handleTakePhoto = () => {
    setModalVisible(true);
  };
console.log(previewPicture);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
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
        </View> */}

    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
        {previewPicture? (<View style={styles.previewBox}>
              <Image source={{
          uri: previewPicture,
        }} 
        style={styles.previewImage}
        resizeMode="cover" />
        </View>) : (<View style={styles.previewBox}>
          <View style={styles.previewIconContainer}>
            <CameraIcon size={48} color="#999" />
          </View>
          <Text style={styles.previewText}>Camera Preview</Text>
        </View>)}
      </View>

      {/* Take Picture Button */}
      <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={() => handleTakePhoto()}>
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
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={() => onSubmit()} style={[styles.button, styles.submitButton]}>
        <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Submit for AI Review</Text>
      </TouchableOpacity>
       <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <CameraViewStyle onClose={() => setModalVisible(false)} showPreviewPicture={showPreviewPicture} />
      </Modal>
    </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>);

  }

  const styles = StyleSheet.create({
    // container: { flex: 1, backgroundColor: "#fff" },
    // header: {
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   alignItems: "center",
    //   padding: 16,
    //   borderBottomWidth: 1,
    //   borderBottomColor: "#e5e7eb",
    // },
    // title: { fontSize: 20, fontWeight: "700", color: "#00A896" },
    // subtitle: { fontSize: 14, color: "#6b7280" },
    // icons: { flexDirection: "row", gap: 8 },
    // iconButton: {
    //   width: 40,
    //   height: 40,
    //   borderRadius: 20,
    //   backgroundColor: "#f3f4f6",
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
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