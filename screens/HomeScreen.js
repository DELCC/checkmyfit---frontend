import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  Bell,
  Settings,
  Sparkles,
  Camera,
  Heart,
  Upload,
  Search,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "../components/Badge";
import { ClothingCard } from "../components/ClothingCard";
import { CategoryIcon } from "../components/CategoryIcons";
import { OutfitCard } from "../components/OutfitCard";

export default function HomeScreen({ navigation }) {
  const colors = [
    { name: "Teal", value: "#00A6A6" },
    { name: "Mint", value: "#A8E6CF" },
    { name: "Sky Blue", value: "#87CEEB" },
    { name: "Beige", value: "#F5F5DC" },
    { name: "Off White", value: "#FFFFFF", border: true },
    { name: "Gradient", gradient: ["#00A6A6", "#A8E6CF"] },
  ];

  const clothingItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1589270216117-7972b3082c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MDg3NjM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Classic White Tee",
      category: "Tops",
      color: "White",
      brand: "Essentials",
      isFavorite: true,
      rating: 4.8,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1596484552993-aec4311d3381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3YXJkcm9iZXxlbnwxfHx8fDE3NjA5NDYxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Relaxed Denim",
      category: "Bottoms",
      color: "Blue",
      brand: "Urban",
      rating: 4.5,
    },
  ];

  const categories = [
    { name: "Tops", icon: "tops", count: 24 },
    { name: "Bottoms", icon: "bottoms", count: 18 },
    { name: "Shoes", icon: "shoes", count: 12 },
    { name: "Accessories", icon: "accessories", count: 8 },
  ];

  const outfitSuggestions = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1757782630148-78c633bb732c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwb3V0Zml0fGVufDF8fHx8MTc2MDg0Njc3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Casual Friday Look",
      description: "Perfect for a relaxed office day",
      tags: ["Casual", "Work", "Spring"],
      aiGenerated: true,
      matchScore: 95,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
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
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={styles.section}>
            <Text style={styles.titleDesign}>Design System</Text>

            <View style={styles.paletteSection}>
              <Text style={styles.subtitleSection}>Color Palette</Text>
              <View style={styles.grid}>
                {colors.map((color, i) => (
                  <View key={i} style={styles.colorItem}>
                    {color.gradient ? (
                      <LinearGradient
                        colors={color.gradient}
                        style={styles.colorBox}
                      />
                    ) : (
                      <View
                        style={[
                          styles.colorBox,
                          { backgroundColor: color.value },
                          color.border && styles.colorBoxBorder,
                        ]}
                      />
                    )}
                    <Text style={styles.colorLabel}>{color.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleDesign}>Typography</Text>
            <View style={styles.typographyContainer}>
              <Text style={styles.h1}>Heading 1</Text>
              <Text style={styles.h2}>Heading 2</Text>
              <Text style={styles.h3}>Heading 3</Text>
              <Text style={styles.h4}>Heading 4</Text>
              <Text style={styles.body}>
                Body text – The quick brown fox jumps over the lazy dog
              </Text>
              <Text style={styles.caption}>
                Caption text – Additional information
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleDesign}>Buttons</Text>
            <View style={styles.buttonsContainer}>
              {/* Primary Button */}
              {/* <LinearGradient colors={colors[5].gradient} style={styles.gradientButtonWrapper}start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}> */}
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                activeOpacity={0.8}
              >
                <Sparkles size={18} color="#fff" style={styles.iconLeft} />
                <Text style={[styles.buttonText, styles.textLight]}>
                  Primary Button
                </Text>
              </TouchableOpacity>
              {/* </LinearGradient> */}

              {/* Secondary Button */}
              <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                <Camera size={18} color="#111827" style={styles.iconLeft} />
                <Text style={[styles.buttonText, styles.textDark]}>
                  Secondary Button
                </Text>
              </TouchableOpacity>

              {/* Outline Button */}
              <TouchableOpacity style={[styles.button, styles.outlineButton]}>
                <Heart size={18} color="#00A6A6" style={styles.iconLeft} />
                <Text style={[styles.buttonText, { color: "#00A6A6" }]}>
                  Outline Button
                </Text>
              </TouchableOpacity>

              {/* Ghost Button */}
              <TouchableOpacity style={[styles.button, styles.ghostButton]}>
                <Upload size={18} color="#111827" style={styles.iconLeft} />
                <Text style={[styles.buttonText, styles.textDark]}>
                  Ghost Button
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleDesign}>Button Sizes</Text>
            <View style={styles.buttonSizesContainer}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, styles.smButton]}
              >
                <Text style={[styles.buttonText, styles.textLight]}>Small</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton, styles.mdButton]}
              >
                <Text style={[styles.buttonText, styles.textLight]}>
                  Medium
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton, styles.lgButton]}
              >
                <Text style={[styles.buttonText, styles.textLight]}>Large</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleDesign}>Input Fields</Text>

            {/* Search Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Search</Text>
              <View style={styles.inputWrapper}>
                <Search size={18} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="Search your wardrobe..."
                  style={[styles.input, styles.inputRoundedFull]}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="your@email.com"
                style={[styles.input, styles.inputRounded]}
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <Badge color="#A8E6CF">Casual</Badge>
            <Badge color="#00A6A6">Formal</Badge>
            <Badge color="#F5F5DC">Summer</Badge>
            <Badge color="transparent" borderColor="#00A6A6">
              + Add Tag
            </Badge>
          </View>
          <View>
            <View style={styles.grid}>
              {categories.map((category) => (
                <View key={category.name} style={styles.categoryItem}>
                  <View style={styles.iconWrapper}>
                    <CategoryIcon
                      category={category.name}
                      size={28}
                      color="#00A6A6"
                    />
                  </View>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>{category.count}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.grid}>
            {clothingItems.map((item) => (
              <ClothingCard key={item.id} {...item} />
            ))}
          </View>
          <View>
            <Text style={styles.heading}>Outfit Suggestions</Text>
            <View style={styles.cardsContainer}>
              {outfitSuggestions.map((outfit) => (
                <OutfitCard key={outfit.id} {...outfit} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#00A896" },
  subtitle: { fontSize: 14, color: "#6b7280" },
  icons: { flexDirection: "row", gap: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  section: { marginBottom: 32 },
  titleDesign: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  subtitleSection: { fontSize: 18, fontWeight: "500", marginBottom: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  colorItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 16,
  },
  colorBox: {
    height: 64,
    width: "100%",
    borderRadius: 12,
  },
  colorBoxBorder: { borderWidth: 1, borderColor: "#DDD" },
  colorLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
  },
  typographyContainer: {
    backgroundColor: "#f3f4f6", // similar to Tailwind's bg-secondary
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },

  h1: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
  h4: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4b5563",
  },
  body: {
    fontSize: 16,
    color: "#374151",
  },
  caption: {
    fontSize: 12,
    color: "#6b7280",
  },
  buttonsContainer: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "100%",
  },

  iconLeft: {
    marginRight: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  textLight: {
    color: "#fff",
  },

  textDark: {
    color: "#111827",
  },

  // Variantes
  primaryButton: {
    backgroundColor: "#00A6A6",
  },

  secondaryButton: {
    backgroundColor: "#A8E6CF",
  },

  outlineButton: {
    borderWidth: 1.5,
    borderColor: "#00A6A6",
    backgroundColor: "transparent",
  },

  ghostButton: {
    backgroundColor: "transparent",
  },
  buttonSizesContainer: {
    flexDirection: "row",
    gap: 12, // espace entre les boutons
    marginTop: 8,
    flexWrap: "wrap",
  },

  // Tailles des boutons
  smButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mdButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  lgButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  gradientButtonWrapper: {
    borderRadius: 12,
    overflow: "hidden", // indispensable pour que le gradient respecte les coins arrondis
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },

  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  inputIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },

  input: {
    height: 44,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 12,
    color: "#111827",
    fontSize: 16,
  },

  inputRoundedFull: {
    borderRadius: 999, // arrondi complet
    paddingLeft: 40, // espace pour l'icône
  },

  inputRounded: {
    borderRadius: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  categoryItem: {
    width: "23%", // approximativement 4 colonnes avec gap
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#A8E6CF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  labelWrapper: {
    alignItems: "center",
  },
  categoryName: {
    fontSize: 12,
    color: "#111827",
  },
  categoryCount: {
    fontSize: 12,
    color: "#6b7280",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 16, // espacement vertical entre les cartes
  },
});
