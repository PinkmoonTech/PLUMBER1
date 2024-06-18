import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import Footer from "./Footer";
import Header from "./Header";
import ServiceCustomerCard from "./ServiceCustomerCard";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const scale = (size) => (windowWidth / 320) * size;
const normalize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const RegisterAsCustomer = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");
  const [showRegistrationCustomerDetails, setShowRegistrationCustomerDetails] = useState(false);

  const toggleRegistrationCustomerDetails = () => {
    setShowRegistrationCustomerDetails(!showRegistrationCustomerDetails);
    console.log("Toggling registration details...");
  };

  // Function to handle ID proof image upload
  const handleIdProofUpload = async () => {
    // Code for handling image upload
  };

  // Function to handle registration submission
  const handleRegistrations = async () => {
    setError(""); // Clear previous errors

    // Validation logic if needed

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("phoneNumber", phoneNumber);
    // formData.append("pin", pin);
    // formData.append("confirmPin", confirmPin);
    // formData.append("altPhoneNumber", altPhoneNumber);
    // formData.append("address", address);
    // formData.append("idNumber", idNumber);

    // try {
    //   const response = await fetch("http://192.168.0.115:3000/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     body: formData,
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     alert("Registration successful");
    //   } else {
    //     setError(result.error || "Registration failed");
    //   }
    // } catch (err) {
    //   setError("An error occurred. Please try again later.");
    // }
  };

  return (
    <View style={{ flex: 1 }}>
    {/* Header and other components */}
    <ScrollView contentContainerStyle={styles.container}>
      {/* Render ServiceCustomerCard */}
      <ServiceCustomerCard onPressCustomer={toggleRegistrationCustomerDetails} />
      
      {/* Conditional rendering of registration details */}
      {showRegistrationCustomerDetails && (
        <>
            {/* <Text style={styles.header}>Registration</Text> */}
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Pin"
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Pin"
              value={confirmPin}
              onChangeText={setConfirmPin}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Alternative Phone Number"
              value={altPhoneNumber}
              onChangeText={setAltPhoneNumber}
              keyboardType="phone-pad"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              multiline={true}
              numberOfLines={4}
            />

            <TextInput
              style={styles.input}
              placeholder="ID Number"
              value={idNumber}
              onChangeText={setIdNumber}
            />

            {/* Add your submit button or other UI components here */}
            <View style={styles.submitContainer}>
              <Button title="Submit" onPress={handleRegistrations} />
            </View>
          </>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(20),
  },
  input: {
    height: normalize(40),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: normalize(8),
    marginBottom: normalize(12),
    width: windowWidth * 0.9,
  },
  textArea: {
    height: normalize(60),
  },
  submitContainer: {
    marginBottom: normalize(50),
    width: windowWidth * 0.9,
  },
});

export default RegisterAsCustomer;
