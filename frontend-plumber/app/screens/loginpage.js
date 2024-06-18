import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";

import Footer from "./Footer";
import Header from "./Header";

const LoginPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
   
    <View style={styles.container}>
      {/* <Text> <Icon name="home" size={50} /> </Text> */}

      <Text style={styles.title}>Log in to your account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pin"
            maxLength={6}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleSecureTextEntry}
          >
            <Ionicons
              name={secureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>

        
      
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={styles.registerText}>
            Not a member? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
   
    <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  eyeIcon: {
    marginLeft: -30,
    paddingVertical: 20,
    paddingBottom: 30,
  },

  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#007bff",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#6A1B9A",
    marginBottom: 20,
    marginTop:10,
    textDecorationLine: "underline",
    alignSelf: 'flex-start', // Align text to the start of the container
    marginLeft: 170, // Add margin to ensure it's not right at the edge
  },
  registerText: {
    color: "#6A1B9A",
    marginBottom: 20,
    textAlign: "center", // Center text horizontally
  },
  registerLink: {
    textDecorationLine: "underline",
    color: "red",
  },
});

export default LoginPage;
