
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Heart, Star } from "lucide-react-native";
import { Badge } from "./Badge"; // badge simple qu'on a défini avant

export function ClothingCard({
  image,
  name,
  category,
  color,
  brand,
  isFavorite = false,
  rating,
  onFavoriteClick
}) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoriteClick}
        >
          <Heart
            size={20}
            color={isFavorite ? "#EF4444" : "#6b7280"}
            fill={isFavorite ? "#EF4444" : "none"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.name}>{name}</Text>
            {brand && <Text style={styles.brand}>{brand}</Text>}
          </View>
          {rating && (
            <View style={styles.rating}>
              <Star size={16} color="#FACC15" fill="#FACC15" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          )}
        </View>

        <View style={styles.badgesRow}>
          <Badge color="#A8E6CF">{category}</Badge>
          {color && <Badge color="transparent" borderColor="#00A6A6">{color}</Badge>}
        </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 16,
    width : '48%',
  },
  imageWrapper: {
    aspectRatio: 1,
    backgroundColor: "#A8E6CF",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  brand: {
    fontSize: 12,
    color: "#6b7280",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 2,
    color: "#374151",
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});