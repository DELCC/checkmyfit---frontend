import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { ArrowLeft, Sparkles, Star } from "lucide-react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function AIResponse({
  onClose,
  selectedStylist,
  isLoading,
  picture,
  starRate,
  styleComments,
  improvementSuggestions,
  saveOutfit,
}) {
  // const suggestions = [
  //   'Consider a more structured blazer for a professional appearance',
  //   'The color palette works well together',
  //   'Add a statement accessory to elevate the look',
  //   'Shoes could be more formal for the occasion',
  // ];

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text>Waiting for AI Assitant Review...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                  <ArrowLeft color="#7A7A7A" size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                  <Sparkles color="#4CC9F0" size={24} />
                  <Text style={styles.headerText}>AI Stylist Feedback</Text>
                </View>
              </View>

              {/* Stylist Info */}
              <View style={styles.stylistCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {selectedStylist.aiassistantName[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.stylistName}>
                    {selectedStylist.aiassistantName}
                  </Text>
                  <Text style={styles.stylistTagline}>
                    {selectedStylist.aiassistantStyle.join(" • ")}
                  </Text>
                </View>
              </View>
            </View>

            {/* Outfit Preview */}
            <View style={[styles.card, styles.outfitPreview]}>
              {picture ? (
                <Image
                  source={{
                    uri: picture,
                  }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.mutedText}>Your Outfit</Text>
              )}
            </View>

            {/* General Rating */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>General Rating</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    color={star <= starRate ? "#00C9A7" : "#CCCCCC"}
                    fill={star <= starRate ? "#00C9A7" : "transparent"}
                  />
                ))}
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}> {starRate} / 5</Text>
              </View>
            </View>

            {/* Style Comments */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Style Comments</Text>
              <Text style={styles.commentText}>
                {/* Your overall look demonstrates a good understanding of professional attire. The fit is appropriate and the pieces coordinate well together. However, there are a few areas where we could elevate the outfit to make it more interview-ready and confidence-boosting. */}
                {styleComments}
              </Text>
            </View>

            {/* Improvement Suggestions */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Improvement Suggestions</Text>
              {improvementSuggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <View style={styles.suggestionNumber}>
                    <Text style={styles.suggestionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={saveOutfit}
              >
                <Text style={styles.buttonText}>Save This Look</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.outlineButton]}
                onPress={onClose}
              >
                <Text style={styles.outlineButtonText}>Try Another Outfit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  stylistCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F0F8FF",
    elevation: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#00C9A7",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  stylistName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  stylistTagline: {
    color: "#7A7A7A",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    elevation: 1,
  },
  outfitPreview: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    backgroundColor: "#F5F7FA",
  },
  mutedText: {
    color: "#7A7A7A",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 12,
    backgroundColor: "#00C9A7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "white",
    fontWeight: "600",
  },
  commentText: {
    color: "#555555",
    lineHeight: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 12,
  },
  suggestionNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#00C9A7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  suggestionNumberText: {
    color: "white",
    fontWeight: "700",
  },
  suggestionText: {
    flex: 1,
    color: "#555555",
  },
  actions: {
    marginTop: 30,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#00C9A7",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "white",
  },
  outlineButtonText: {
    color: "#333333",
    fontWeight: "600",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
});
