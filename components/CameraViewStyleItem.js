import { useEffect, useState, useRef } from "react";
// import { CameraView, Camera, CameraType, FlashMode } from "expo-camera";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import {
  Camera as CameraIcon,
  Sparkles,
  X,
  Zap,
  RotateCw,
} from "lucide-react-native";

export default function CameraViewStyleItem({ onClose, getCloudinaryData }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);

  const [facing, setFacing] = useState("back"); // "back" or "front"
  const [flashStatus, setFlashStatus] = useState("off"); // "off" or "on"

  // const screenWidth = Dimensions.get("window").width;

  const cameraRef = useRef(null);

  const API_IP = process.env.EXPO_PUBLIC_API_IP;
  const API_PORT = process.env.EXPO_PUBLIC_API_PORT;
  // const IP_ADDRESS = "192.168.100.144:3000";

  // Take a picture and get image without background from Cloudinary

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    photo && console.log(photo.uri);
    const formData = new FormData();
    if (photo) {
      formData.append("photoFromFront", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      fetch(`${API_IP}:${API_PORT}/items/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(`success : ${data.public_id}`);
            getCloudinaryData(data.original_url, data.public_id);
          } else {
            console.log(`error`);
          }
        });
      onClose();
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

  // Cam reverse & flash
  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleFlashStatus = () => {
    setFlashStatus((prev) => (prev === "off" ? "on" : "off"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={{ flex: 1 }}
        ref={(ref) => (cameraRef.current = ref)}
        ratio="4:3"
        facing={facing}
        flash={flashStatus}
      >
        <TouchableOpacity
          title="Prendre une photo !"
          onPress={() => takePicture()}
        />
      </CameraView>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <X size={28} color="#00A6A6" />
      </TouchableOpacity>

      {/*Flash button--------------*/}
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlashStatus}>
        <Zap size={24} color={flashStatus === "on" ? "#FFD700" : "#00A6A6"} />
      </TouchableOpacity>

      {/* Flip camera button top right ---------------*/}
      <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
        <RotateCw size={28} color="#ffffffff" />
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
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00A6A6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  flashButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 24,
    padding: 8,
  },
  flipButton: {
    position: "absolute",
    bottom: 40, // nicely aligned above the capture button
    right: 40, // near bottom-right corner
    backgroundColor: "#00A6A6", // white box
    borderRadius: 40, // rounded square
    padding: 10, // inner spacing for the icon
    elevation: 5, // subtle Android shadow
    shadowColor: "#000", // subtle iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
