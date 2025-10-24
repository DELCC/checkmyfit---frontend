import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Badge({ children, color = "#A8E6CF" }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999, // arrondi complet
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
});
