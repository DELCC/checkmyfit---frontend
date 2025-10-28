import { useEffect, useState, useRef } from "react";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera as CameraIcon, Sparkles, X } from "lucide-react-native";

export default function CameraViewStyleItem({ onClose, showPreviewPicture }) {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);

  const cameraRef = useRef(null);

  const IP_ADDRESS = "192.168.100.144:3000";

  // Take a picture and get image without background from Cloudinary

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    photo && console.log(photo);
    if (photo) {
      formData.append("photoFromFront", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const formData = new FormData();
      console.log(photo);

      fetch(`http://${IP_ADDRESS}/items/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(`success : ${data}`);
          } else {
            console.log(`error`);
          }
        });
      //   showPreviewPicture(photo);
    }
  };

  // Camera permission
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <CameraView style={{ flex: 1 }} ref={(ref) => (cameraRef.current = ref)}>
        <TouchableOpacity
          title="Prendre une photo !"
          onPress={() => takePicture()}
        />
      </CameraView>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <X size={28} color="#fff" />
      </TouchableOpacity>

      {/* Capture Button */}
      {hasPermission && (
        <View style={styles.captureContainer}>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.captureButton}
          >
            <CameraIcon size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 24,
    padding: 8,
  },
  captureContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
