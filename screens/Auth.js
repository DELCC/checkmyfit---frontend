import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { addUserToStore } from "../reducers/users";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";

export default function Auth({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const ipAdress = "192.168.100.144:3000";

  const handleSignin = () => {
    fetch(`http://${ipAdress}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          dispatch(addUserToStore(data.token));
          navigation.navigate("Home");
          setPassword("");
          setUsername("");
        } else {
          console.log("incorrect password or username");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.logoSection}>
          <Text style={styles.title}>Check My Fit AI</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            placeholder="Username"
            style={[styles.input, styles.inputRounded]}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={[styles.input, styles.inputRounded]}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          activeOpacity={0.8}
          onPress={() => handleSignin()}
        >
          <Sparkles size={18} color="#fff" style={styles.iconLeft} />
          <Text style={[styles.buttonText, styles.textLight]}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.forgotText}>
              Créez votre compte Check My Fit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    padding: 40,
    gap: 10,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: { fontSize: 30, fontWeight: "700", color: "#00A896" },

  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
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
  inputRounded: {
    borderRadius: 12,
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
  primaryButton: {
    backgroundColor: "#00A6A6",
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
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  forgotText: {
    fontSize: 14,
    color: "#00A6A6",
    textDecorationLine: "underline",
  },
});
