import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Filter, Plus } from "lucide-react-native";
import { ClosetItemModal } from "../components/ClosetItemModal";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Settings } from "lucide-react-native";

const closetCategories = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Shoes",
  "Accessories",
];

export default function Wardrobe({ onAddItem, initialCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "All"
  );
  const [selectedItem, setSelectedItem] = useState(null);

  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    category: closetCategories[(i % 6) + 1],
  }));

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedItem(item)}>
      <View style={styles.itemSquare} />
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { borderColor: "#D2B48C" }]}>
          <Text style={{ color: "#D2B48C", fontSize: 12 }}>
            {item.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Virtual Closet</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.filterButton}>
              <Filter width={16} height={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={onAddItem}>
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
                      ? { backgroundColor: "#6C5DD3" }
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
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.itemsGrid}
        />

        {/* Closet Item Modal */}
        {/* <ClosetItemModal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onModify={() => setSelectedItem(null)}
        onDelete={() => setSelectedItem(null)}
        item={selectedItem || undefined}
      /> */}
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
    backgroundColor: "#6C5DD3",
    borderRadius: 6,
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
});
