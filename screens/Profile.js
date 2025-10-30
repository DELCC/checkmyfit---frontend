// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import { Bell, Settings } from "lucide-react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();
// //gghqsv qqsdqs qsd
// export default function Profile({ navigation }) {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.users.value.token);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigation.navigate("Auth");
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Check My Fit AI</Text>
//             <Text style={styles.subtitle}>UI Kit Showcase</Text>
//           </View>
//           <View style={styles.icons}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Bell size={20} color="#333" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Settings size={20} color="#333" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={() => navigation.navigate("Auth")}
//           style={[styles.button, styles.secondaryButton]}
//         >
//           <Text style={[styles.buttonText, styles.textDark]}>
//             Go to Auth Page
//           </Text>
//         </TouchableOpacity>

//         {/*
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         hana work
//         */}
//         <TouchableOpacity
//           onPress={() => handleLogout()}
//           style={[styles.button, styles.secondaryButton]}
//         >
//           <Text style={[styles.buttonText, styles.textDark]}>
//             Se déconnecter
//           </Text>
//         </TouchableOpacity>
//         {/* BUTTON TO REACH EDIT PROFILE PAGE BELOW */}
//         <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
//           <Text>Edit your profile</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     gap: 10,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   title: { fontSize: 20, fontWeight: "700", color: "#00A896" },
//   subtitle: { fontSize: 14, color: "#6b7280" },
//   icons: { flexDirection: "row", gap: 8 },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#f3f4f6",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   secondaryButton: {
//     backgroundColor: "#A8E6CF",
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     width: "50%",
//   },
//   textDark: {
//     color: "#111827",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Edit2, Sparkles, Bell, Settings } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/users";

const API_IP = process.env.EXPO_PUBLIC_API_IP;
const API_PORT = process.env.EXPO_PUBLIC_API_PORT;

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const userData = user.infoUser;
  // mockdata -------- !!!!!!!
  // const [userData, setUserData] = useState({
  //   username: "Hana",
  //   bio: "Fashion enthusiast | Minimal style lover",
  //   profilePic: null, // replace with URL if available
  //   height: 170,
  //   skinTone: "Medium",
  //   bodyType: "Athletic",
  //   stylePreferences: ["Minimal", "Modern", "Casual"],
  //   aiAssistant: {
  //     aiassistantName: "Yoann",
  //     aiassistantStyle: ["Creative", "Friendly"],
  //   },
  // });

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Auth");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Check My Fit AI</Text>
            <Text style={styles.subtitle}>Profile</Text>
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

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={["#007F8C", "#00C896"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              {userData.profilePic ? (
                <Image
                  source={{ uri: userData.profilePic }}
                  style={styles.avatar}
                />
              ) : (
                <Text style={styles.avatarFallback}>
                  {userData.username?.[0]?.toUpperCase() || "?"}
                </Text>
              )}
            </LinearGradient>

            <Text style={styles.name}>{userData?.username || "Anonymous"}</Text>
            <Text style={styles.bio}>{userData.bio || "No bio yet"}</Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Edit2 size={16} color="white" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* STYLE PARAMETERS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Style Parameters</Text>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Height</Text>
              <Text style={styles.paramValue}>{userData.height}</Text>
            </View>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Skin Tone</Text>
              <Text style={styles.paramValue}>{userData.skinTone}</Text>
            </View>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Body Type</Text>
              <Text style={styles.paramValue}>{userData.bodyType}</Text>
            </View>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Style Preferences</Text>
              <Text style={styles.paramValue}>
                {userData.stylePreferences.join(", ")}
              </Text>
            </View>
          </View>

          {/* AI STYLIST */}
          <View style={styles.card}>
            <View style={styles.aiHeader}>
              <Sparkles width={20} height={20} color="#38BDF8" />
              <Text style={styles.sectionTitle}>My AI Stylist</Text>
            </View>

            <LinearGradient
              colors={["#F9FAFB", "#E5E7EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.aiCard}
            >
              <LinearGradient
                colors={["#3399FF", "#00C896"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiAvatar}
              >
                <Text style={styles.aiInitials}>
                  {userData.aiAssistant.aiassistantName[0]?.toUpperCase()}
                </Text>
              </LinearGradient>
              <View>
                <Text style={styles.aiName}>
                  {userData.aiAssistant.aiassistantName}
                </Text>
                <Text style={styles.aiTagline}>
                  {userData.aiAssistant.aiassistantStyle.join(" • ")}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.logoutButton, { marginBottom: 40 }]}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FAFAF9" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: { fontSize: 20, fontWeight: "700", color: "#111827" },
//   subtitle: { fontSize: 14, color: "#6B7280" },
//   icons: { flexDirection: "row", gap: 12 },
//   iconButton: { padding: 8 },

//   profileCard: {
//     alignItems: "center",
//     backgroundColor: "white",
//     margin: 16,
//     padding: 24,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   avatarGradient: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   avatar: { width: "100%", height: "100%", borderRadius: 50 },
//   avatarFallback: { fontSize: 28, color: "white", fontWeight: "700" },
//   name: { fontSize: 20, fontWeight: "600", color: "#111827" },
//   bio: { color: "#6B7280", textAlign: "center", marginTop: 6 },
//   editButton: {
//     marginTop: 16,
//     flexDirection: "row",
//     backgroundColor: "#00C896",
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     alignItems: "center",
//     gap: 8,
//   },
//   editButtonText: { color: "white", fontWeight: "600" },

//   card: {
//     backgroundColor: "white",
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
//   paramRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   paramLabel: { color: "#6B7280" },
//   paramValue: { color: "#111827", fontWeight: "500" },

//   aiHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 12,
//   },
//   aiCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderRadius: 12,
//     gap: 12,
//   },
//   aiAvatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   aiInitials: { color: "white", fontWeight: "700", fontSize: 18 },
//   aiName: { color: "#111827", fontWeight: "600" },
//   aiTagline: { color: "#6B7280" },

//   logoutButton: {
//     alignSelf: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     backgroundColor: "#F3F4F6",
//   },
//   logoutText: { color: "#111827", fontWeight: "500" },
// });

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF9" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: "600" },
  subtitle: { fontSize: 14, color: "#6B7280" },
  icons: { flexDirection: "row", gap: 12 },
  iconButton: { padding: 6 },
  profileCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarFallback: { color: "white", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "600" },
  bio: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    textAlign: "center",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#34D399",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    gap: 6,
  },
  editButtonText: { color: "white", fontWeight: "600" },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  paramRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  paramLabel: { color: "#6B7280" },
  paramValue: { color: "#111827", fontWeight: "600" },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  aiCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  aiInitials: { color: "white", fontWeight: "600" },
  aiName: { fontWeight: "600" },
  aiTagline: { color: "#6B7280" },
  logoutButton: {
    backgroundColor: "#027f8c",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "white", fontWeight: "600" },
});
