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
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { addUserToStore } from "../reducers/users";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const ipAdress = "192.168.100.144:3000";

  const handleSignup = () => {
    fetch(`http://${ipAdress}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          dispatch(addUserToStore(data.token));
          navigation.navigate("Home");
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
            placeholder="your@email.com"
            style={[styles.input, styles.inputRounded]}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="your@email.com"
            style={[styles.input, styles.inputRounded]}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={[styles.input, styles.inputRounded]}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          activeOpacity={0.8}
          onPress={() => handleSignup()}
        >
          <Sparkles size={18} color="#fff" style={styles.iconLeft} />
          <Text style={[styles.buttonText, styles.textLight]}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
            <Text style={styles.forgotText}>Connectez-vous à votre compte</Text>
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
