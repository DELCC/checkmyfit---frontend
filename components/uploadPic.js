import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function ImagePickerField({
  label = "Profile Picture",
  value,
  onChange,
  gradientColors = ["#3399FF", "#00C896"],
  placeholderInitials = "PP",
  helperText = "JPG, PNG up to 5MB",
  styles,
}) {
  const handleImagePick = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          alert("Permission to access gallery is required!");
          return;
        }
        return ImagePicker.launchImageLibraryAsync({
          mediaTypes: "Images",
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      })
      .then((result) => {
        if (!result) return;
        if (!result.canceled) {
          const selectedAsset = result.assets[0];
          onChange(selectedAsset.uri);
        }
      })
      .catch((error) => console.error("Error picking image:", error));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.profileRow}>
        <View style={styles.avatarWrapper}>
          {value ? (
            <Image source={{ uri: value }} style={styles.avatar} />
          ) : (
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarPlaceholder}
            >
              <Text style={styles.avatarText}>{placeholderInitials}</Text>
            </LinearGradient>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePick}
          >
            <Camera size={18} color="#00C896" style={{ marginRight: 6 }} />
            <Text style={styles.uploadButtonText}>Upload Photo</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>{helperText}</Text>
        </View>
      </View>
    </View>
  );
}
