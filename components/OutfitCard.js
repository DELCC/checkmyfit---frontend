import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Sparkles, Heart, Share2 } from "lucide-react-native";
import { Badge } from "./Badge";

export function OutfitCard({
  image,
  title,
  description,
  tags = [],
  aiGenerated = false,
  matchScore,
  onLike,
  onShare
}) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />

        {aiGenerated && (
          <View style={styles.aiLabel}>
            <View style={styles.aiBadge}>
              <Sparkles size={16} color="#fff" style={{ marginRight: 4 }} />
              <Text style={styles.aiText}>AI Styled</Text>
            </View>
          </View>
        )}

        {matchScore != null && (
          <View style={styles.matchScore}>
            <Text style={styles.matchScoreText}>{matchScore}% Match</Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <Heart size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Share2 size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>

        {tags.length > 0 && (
          <View style={styles.tagsRow}>
            {tags.map((tag, index) => (
              <Badge key={index} color="#A8E6CF">{tag}</Badge>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageWrapper: {
    aspectRatio: 3 / 4,
    backgroundColor: "#A8E6CF",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  aiLabel: {
    position: "absolute",
    top: 12,
    left: 12,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#00A6A6",
  },
  aiText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  matchScore: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  matchScoreText: {
    fontSize: 12,
    color: "#111827",
  },
  actionButtons: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#6b7280",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
});