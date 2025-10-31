import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { Filter, Plus, X } from "lucide-react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

const closetCategories = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Shoes",
  "Accessories",
];

export default function Wardrobe({ onAddItem, navigation, route }) {
  const [itemsdata, setItemsData] = useState([]);
  const token = useSelector((state) => state.users.value.token);
  console.log(`Token dispo dans addItem ${token}`);
  const isFocused = useIsFocused();
  const { initialCategory } = route.params;

  // State for category clothes selection
  const [selectedCategory, setSelectedCategory] = useState(
    // initialCategory || "All"
    initialCategory || "All"+
  );

  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch items from backend API on component mount and when itemsdata changes
  useFocusEffect(
    React.useCallback(() => {
      if (!token) return;
      fetch(`${API_IP}:${API_PORT}/items/${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setItemsData(data.items);
          } else {
            console.log("Error fetching items:", data.error);
          }
        })
        .catch((error) => {
          console.log("Network error fetching items:", error);
        });
    }, [])
  );
  console.log("Fetched items data:", itemsdata);

  // Function to handle item deletion

  const handleDeleteItem = (itemId) => {
    fetch(`${API_IP}:${API_PORT}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Item deleted successfully");
          setItemsData((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
          setSelectedItem(null);
        } else {
          console.log("Error deleting item:", data.error);
        }
      })
      .catch((error) => {
        console.log("Network error deleting item:", error);
      });
  };

  // Function to handle item editing
  const handleEditItem = (item) => {
    setSelectedItem(null);
    navigation.navigate("editItem", { item });
    setSelectedItem(null);
    console.log(`selectedItem ${item._id} for editing`);
  };

  // Use real items from backend state
  const filteredItems =
    selectedCategory === "All"
      ? itemsdata
      : (itemsdata || []).filter((item) => {
          if (!item) return false;
          // match by type (case-insensitive)
          return (
            (item.type && item.type.toLowerCase()) ===
            selectedCategory.toLowerCase()
          );
        });

  // Display each item card with image and type
  const renderItem = ({ item }) => {
    console.log(`item: ${item._id}`);
    const imageUri = item.itemPic || null;
    const typeLabel = item.type || "Unknown";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelectedItem(item)}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.itemImage} />
        ) : (
          <View style={[styles.itemSquare, styles.placeholderSquare]} />
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.typeText}>{typeLabel}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (isFocused && initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [isFocused, initialCategory]);

  console.log(selectedCategory);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Virtual Closet</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("addItem")}
            >
              <Plus width={16} height={16} />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          {/* Category Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
          >
            {closetCategories.map((category) => {
              const isSelected = category === selectedCategory;
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryBadge,
                    isSelected
                      ? { backgroundColor: "#00A6A6" }
                      : {
                          backgroundColor: "#fff",
                          borderColor: "#D2B48C",
                          borderWidth: 1,
                        },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={{ color: isSelected ? "#fff" : "#D2B48C" }}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Items Grid */}
        {!itemsdata || itemsdata.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Your virtual dressing is empty. Add your first item!
            </Text>
            <TouchableOpacity
              style={styles.addItemButton}
              onPress={() => navigation.navigate("addItem")}
            >
              <Text style={styles.addItemButtonText}>Add item</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => (item._id ? item._id : String(item.id))}
            numColumns={3}
            contentContainerStyle={styles.itemsGrid}
          />
        )}

        {/* Closet Item Modal */}
        <Modal
          visible={selectedItem !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedItem(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setSelectedItem(null)}
              >
                <X width={20} height={20} />
              </TouchableOpacity>

              {/* Image */}
              {selectedItem && selectedItem.itemPic ? (
                <Image
                  source={{ uri: selectedItem.itemPic }}
                  style={styles.modalImage}
                />
              ) : (
                <View style={[styles.modalImage, styles.placeholderSquare]} />
              )}

              {/* Info rows */}
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>
                    {(selectedItem && selectedItem.type) == null
                      ? "undefined"
                      : selectedItem.type}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Color:</Text>
                  <Text style={styles.infoValue}>
                    {(selectedItem && selectedItem.color) == null
                      ? "undefined"
                      : selectedItem.color}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Season:</Text>
                  <Text style={styles.infoValue}>
                    {(selectedItem && selectedItem.season) == null
                      ? "undefined"
                      : selectedItem.season}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Occasion:</Text>
                  <Text style={styles.infoValue}>
                    {(selectedItem && selectedItem.occasion) == null
                      ? "undefined"
                      : selectedItem.occasion}
                  </Text>
                </View>
              </View>

              {/* Modal Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={() => {
                    handleDeleteItem(selectedItem._id);
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.editButton]}
                  onPress={() => {
                    handleEditItem(selectedItem);
                  }}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  headerButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#00A6A6",
    borderRadius: 6,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "600",
  },
  categories: {
    marginTop: 12,
  },
  categoryBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  itemsGrid: {
    padding: 16,
  },
  card: {
    flex: 1 / 3,
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  itemSquare: {
    aspectRatio: 1,
    backgroundColor: "#E0D7F9",
  },
  badgeContainer: {
    padding: 4,
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  itemImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  placeholderSquare: {
    backgroundColor: "#E0D7F9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardFooter: {
    padding: 8,
    alignItems: "center",
  },
  typeText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  addItemButton: {
    backgroundColor: "#00A6A6",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addItemButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalBox: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    position: "relative",
  },
  modalClose: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 6,
  },
  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  infoLabel: {
    color: "#6b7280",
    fontWeight: "600",
  },
  infoValue: {
    color: "#111827",
    fontWeight: "700",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#de6c63ff",
  },
  editButton: {
    backgroundColor: "#00A6A6",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
