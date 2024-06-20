import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Linking,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
} from "react-native";
// import { Linking } from "react-native";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios"; // Import axios for making HTTP requests
import Footer from "./Footer";
import Header from "./Header";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// Helper functions to scale and normalize dimensions
const scale = (size) => (windowWidth / 320) * size;
const normalize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const PlumberViewScreen = ({ navigation }) => {
  const [registrationData, setRegistrationData] = useState([]); // State to store registration data
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [sortOption, setSortOption] = useState("none"); // State to store sorting option


  useEffect(() => {
    // Fetch registration data when component mounts
    fetchRegistrationData();
  }, []);

  // Function to fetch registration data from backend
  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.108:3000/registerascustomers"
      );
      console.log(response.data); // Debug: Log fetched data
      setRegistrationData(response.data); // Set registration data in state
    } catch (error) {
      console.error("Error fetching registration data:", error);
    }
  };

  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
    // Function to handle sorting option change
    const handleSortChange = (option) => {
      setSortOption(option);
    };

  // Function to render each registration as a card
  const renderRegistrationCards = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const isPlumberSearch = ["plumber", "plumbers"].includes(lowerCaseQuery);

    // Filter registration data based on search query
    let filteredData = registrationData.filter(
      (registration) =>
        isPlumberSearch ||
        registration.name.toLowerCase().includes(lowerCaseQuery) 
        // registration.city.toLowerCase().includes(lowerCaseQuery) ||
        // registration.charges.toString().toLowerCase().includes(lowerCaseQuery)
    );

    // Sort filtered data based on sort option
    // if (sortOption === "charge") {
    //   filteredData.sort((a, b) => a.charges - b.charges);
    // } else if (sortOption === "location") {
    //   filteredData.sort((a, b) => a.city.localeCompare(b.city));
    // }




    if (filteredData.length === 0) {
      return <Text>No plumbers found.</Text>;
    }

    return filteredData.map((registration, index) => (
      <View key={index} style={styles.card}>
    {/* Icons for name, phone number, charge, and location */}
    <View style={styles.iconContainer}>
      <MaterialIcons name="person" size={15} color="black" style={styles.icon} />
      <Text style={styles.cardText}>{registration.name}</Text>
    </View>
    <View style={styles.iconContainer}>
      <MaterialIcons name="phone" size={15} color="black" style={styles.icon} />
      <Text style={styles.cardText}>{registration.phoneNumber}</Text>
    </View>
    {/* <View style={styles.iconContainer}>
      <MaterialCommunityIcons name="cash" size={15} color="black" style={styles.icon} />
      <Text style={styles.cardText}>{registration.charges}</Text>
    </View>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name="map-marker" size={15} color="black" style={styles.icon} />
      <Text style={styles.cardText}>{registration.city}</Text>
    </View> */}


        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons
            name="send-circle"
            size={25}
            color="black"
            onPress={() => handleSend(registration.phoneNumber)}
          />
        </View>
      </View>
    ));
  };

  const handleSend = (phoneNumber) => {
    const defaultMessage = encodeURIComponent("Hello, I am customer I need service regarding repair please contact me or message me...");
    const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${defaultMessage}`;

    Linking.canOpenURL(whatsappLink)
      .then((supported) => {
        if (!supported) {
          console.log("WhatsApp is not installed on this device");
        } else {
          return Linking.openURL(whatsappLink);
        }
      })
      .then(() => {
        console.log("WhatsApp opened successfully");
      })
      .catch((error) => {
        console.error("Error opening WhatsApp:", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.header}></Text> */}
        <TouchableOpacity
          style={styles.searchBoxContainer}
          onPress={() => this.textInput.focus()}
        >
          <TextInput
            ref={(input) => {
              this.textInput = input;
            }}
            style={styles.searchBox}
            placeholder="Search Plumbers"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <MaterialIcons
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        {registrationData.length === 0 ? (
          <Text>Loading plumber details...</Text>
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
    // justifyContent: "center",
    alignItems: "center",
    padding: normalize(10),
    flexDirection: "row", // Add this to make the cards display in a row
    flexWrap: "wrap", // Add this if you want the cards to wrap to the next line when they reach the edge of the screen
    // textAlign: "left",
    paddingBottom: 100,
    
  },
  header: {
    fontWeight: "bold",
    fontSize: normalize(18),
    marginBottom: normalize(20),
    textAlign: "center", // Center the header text
    width: "10%", // Take up full width to avoid alignment issues
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: normalize(20),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    textAlign: "left",
  },
  searchIcon: {
    padding: normalize(10),
  },
  searchBox: {
    flex: 1,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
  },
  card: {
    width: windowWidth * 0.4,
    marginBottom: normalize(20),
    marginLeft: normalize(18),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: normalize(1),
    padding: normalize(6),
    alignItems: "flex-start",
    backgroundColor:"#d3d3d3",
    
  },
  cardImage: {
    width: normalize(100),
    height: normalize(100),
    marginBottom: normalize(10),
    borderRadius: normalize(1),
  },
  cardText: {
    marginBottom: normalize(1),
    textAlign: "right",
  
  },
  buttonContainer: {
    alignItems: "flex-end",
    width: "100%",
    marginTop: normalize(10),
  
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize(2),
  },
  icon: {
    marginRight: normalize(5),
  },

});

export default PlumberViewScreen;
