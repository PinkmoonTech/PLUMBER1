import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, PixelRatio, Platform } from "react-native";
import axios from 'axios'; // Import axios for making HTTP requests
import Footer from "./Footer";
import Header from "./Header";

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// Helper functions to scale and normalize dimensions
const scale = (size) => (windowWidth / 320) * size;
const normalize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const PlumberViewScreen = ({ navigation }) => {
  const [registrationData, setRegistrationData] = useState([]); // State to store registration data

  useEffect(() => {
    // Fetch registration data when component mounts
    fetchRegistrationData();
  }, []);

  // Function to fetch registration data from backend
  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get('http://192.168.0.115:3000/registrations');
      setRegistrationData(response.data); // Set registration data in state
    } catch (error) {
      console.error('Error fetching registration data:', error);
    }
  };

  // Function to render each registration as a card
  const renderRegistrationCards = () => {
    return registrationData.map((registration, index) => (
      <View key={index} style={styles.card}>
        <Image source={{ uri: registration.photo }} style={styles.cardImage} />
        <Text style={styles.cardText}>{registration.name}</Text>
        <Text style={styles.cardText}>{registration.phoneNumber}</Text>
        <Button title="Send" onPress={() => handleSend(registration)} />
      </View>
    ));
  };

  // Function to handle sending data
  const handleSend = (registration) => {
    // Implement sending functionality
    console.log('Sending data:', registration);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Registered Users</Text>
        {registrationData.length === 0 ? (
          <Text>service i details</Text>
        ) : (
          renderRegistrationCards()
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
  header: {
    fontWeight: "bold",
    fontSize: normalize(18),
    marginBottom: normalize(20),
  },
  card: {
    width: windowWidth * 0.9,
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: normalize(10),
    padding: normalize(10),
    alignItems: "center",
  },
  cardImage: {
    width: normalize(100),
    height: normalize(100),
    marginBottom: normalize(10),
    borderRadius: normalize(50),
  },
  cardText: {
    marginBottom: normalize(5),
  },
});

export default PlumberViewScreen;
