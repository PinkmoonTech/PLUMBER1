import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Footer from "./Footer";
import Header from "./Header";

const { width: windowWidth } = Dimensions.get("window");

const scale = (size) => (windowWidth / 320) * size;
const normalize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const LoginPage = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");


  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };


  const handleLogin = async () => {
    setError('');

    if (!phoneNumber || !pin) {
      setError('Please enter both phone number and pin');
      return;
    }
    if (phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits long");
      return;
    }
    if (pin.length !== 6) {
      setError("PIN must be 6 digits long");
      return;
    }

    const requestBody = { phoneNumber, pin };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.role === "customer") {
          navigation.navigate('CustomerCards');
        } else if (result.role === "service") {
          navigation.navigate('Home');
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred. Please try again later.');
    }
  };


  return (

    <View style={styles.container}>
      {/* <Text> <Icon name="home" size={50} /> </Text> */}
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Text style={styles.title}>Log in to your account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          {/* <TextInput
            style={styles.input}
            placeholder="Pin"
            maxLength={6}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          /> */}

          <TextInput
            style={styles.input}
            placeholder="Pin"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>



        {/* Navigate to RegisterAsCustomer screen */}
        <TouchableOpacity onPress={() => navigation.navigate("RegisterAsCustomer")}>
          <Text style={styles.registerText}>
            Register as Customer
          </Text>
        </TouchableOpacity>

        {/* Navigate to RegisterAsService screen */}
        <TouchableOpacity onPress={() => navigation.navigate("RegisterAsService")}>
          <Text style={styles.registerText}>
            Register as Service Provider
          </Text>
        </TouchableOpacity>
      </View>

      <Footer />
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
    marginTop: 10,
    textDecorationLine: "underline",
    alignSelf: 'flex-start', // Align text to the start of the container
    marginLeft: 170, // Add margin to ensure it's not right at the edge
  },
  registerText: {
    color: "#6A1B9A",
    marginBottom: 20,
    textAlign: "center", // Center text horizontally

    textDecorationLine: "underline",
  },
  registerLink: {
    textDecorationLine: "underline",
    color: "red",
  },
});

export default LoginPage;
