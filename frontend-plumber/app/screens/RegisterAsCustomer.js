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
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import Footer from "./Footer";
import Header from "./Header";
import ServiceCustomerCard from "./CustomerCards";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const scale = (size) => (windowWidth / 320) * size;
const normalize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === "android") {
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
  // const [showRegistrationCustomerDetails, setShowRegistrationCustomerDetails] = useState(false);

  // const toggleRegistrationCustomerDetails = () => {
  //   setShowRegistrationCustomerDetails(!showRegistrationCustomerDetails);
  //   console.log("Toggling registration details...");
  // };

  


  // Function to handle registration submission
  const handleRegistrations = async () => {
    setError(''); // Clear previous errors

    // Validate required fields
    if (!name || !phoneNumber || !pin || !confirmPin || !address || !idNumber) {
      setError('Please fill out all required fields.');
      return;
    }

    // Check if PIN and Confirm PIN match
    if (pin !== confirmPin) {
      setError('PIN and Confirm PIN must match.');
      return;
    }
    if (phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits long");
      return;
    }
    if (pin.length !== 6 || confirmPin.length !== 6) {
      setError("PIN must be 6 digits long");
      return;
    }
   

    const requestBody = {
      name,
      phoneNumber,
      pin,
      confirmPin,
      altPhoneNumber,
      address,
      idNumber,
    };

    try {
      const response = await fetch('http://192.168.0.113:3000/registerascustomers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        alert('customer Registration successful');
      } else {
        setError(result.error || 'Customer registration failed');
      }
    } catch (err) {
      console.error('Error occurred:', err); // Log the actual error
      setError('An error occurred. Please try again later.');
    }
  };

  // Example: Update state variables from form inputs
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // More handleChange functions for other inputs...


  return (
    <View style={{ flex: 1 }}>
      <Header/>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Conditionally render error message */}
      {handleRegistrations && (
          <>
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
