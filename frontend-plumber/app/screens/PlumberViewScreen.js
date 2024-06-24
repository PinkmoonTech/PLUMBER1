// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Linking,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   PixelRatio,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// // import { Linking } from "react-native";

// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import axios from "axios"; // Import axios for making HTTP requests
// import Footer from "./Footer";
// import Header from "./Header";

// const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// // Helper functions to scale and normalize dimensions
// const scale = (size) => (windowWidth / 320) * size;
// const normalize = (size) => {
//   const newSize = scale(size);
//   if (Platform.OS === "android") {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
//   }
// };

// const PlumberViewScreen = ({ navigation }) => {
//   const [registrationData, setRegistrationData] = useState([]); // State to store registration data
//   const [searchQuery, setSearchQuery] = useState(""); // State to store search query
//   const [sortOption, setSortOption] = useState("none"); // State to store sorting option


//   useEffect(() => {
//     // Fetch registration data when component mounts
//     fetchRegistrationData();
//   }, []);

//   // Function to fetch registration data from backend
//   const fetchRegistrationData = async () => {
//     try {
//       const response = await axios.get(
//         "http://192.168.0.113:3000/registerasservice"
//       );
//       console.log(response.data); // Debug: Log fetched data
//       setRegistrationData(response.data); // Set registration data in state
//     } catch (error) {
//       console.error("Error fetching registration data:", error);
//     }
//   };

//   // Function to handle search query change
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };
//     // Function to handle sorting option change
//     const handleSortChange = (option) => {
//       setSortOption(option);
//     };

//   // Function to render each registration as a card
//   const renderRegistrationCards = () => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const isPlumberSearch = ["plumber", "plumbers"].includes(lowerCaseQuery);

//     // Filter registration data based on search query
//     let filteredData = registrationData.filter(
//       (registration) =>
//         isPlumberSearch ||
//         registration.name.toLowerCase().includes(lowerCaseQuery) ||
//         registration.city.toLowerCase().includes(lowerCaseQuery) ||
//         registration.charges.toString().toLowerCase().includes(lowerCaseQuery)
//     );

//     // Sort filtered data based on sort option
//     if (sortOption === "charge") {
//       filteredData.sort((a, b) => a.charges - b.charges);
//     } else if (sortOption === "location") {
//       filteredData.sort((a, b) => a.city.localeCompare(b.city));
//     }




//     if (filteredData.length === 0) {
//       return <Text>No plumbers found.</Text>;
//     }

//     return filteredData.map((registration, index) => (
//       <View key={index} style={styles.card}>
//     {/* Icons for name, phone number, charge, and location */}
//     <View style={styles.iconContainer}>
//       <MaterialIcons name="person" size={15} color="black" style={styles.icon} />
//       <Text style={styles.cardText}>{registration.name}</Text>
//     </View>
//     <View style={styles.iconContainer}>
//       <MaterialIcons name="phone" size={15} color="black" style={styles.icon} />
//       <Text style={styles.cardText}>{registration.phoneNumber}</Text>
//     </View>
//      <View style={styles.iconContainer}>
//       <MaterialCommunityIcons name="cash" size={15} color="black" style={styles.icon} />
//       <Text style={styles.cardText}>{registration.charges}</Text>
//     </View>
//     <View style={styles.iconContainer}>
//       <MaterialCommunityIcons name="map-marker" size={15} color="black" style={styles.icon} />
//       <Text style={styles.cardText}>{registration.city}</Text>
//     </View> 


//         <View style={styles.buttonContainer}>
//           <MaterialCommunityIcons
//             name="send-circle"
//             size={25}
//             color="black"
//             onPress={() => handleSend(registration.phoneNumber)}
//           />
//         </View>
//       </View>
//     ));
//   };

//   const handleSend = (phoneNumber) => {
//     const defaultMessage = encodeURIComponent("Hello, I am customer I need service regarding repair please contact me or message me...");
//     const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${defaultMessage}`;

//     Linking.canOpenURL(whatsappLink)
//       .then((supported) => {
//         if (!supported) {
//           console.log("WhatsApp is not installed on this device");
//         } else {
//           return Linking.openURL(whatsappLink);
//         }
//       })
//       .then(() => {
//         console.log("WhatsApp opened successfully");
//       })
//       .catch((error) => {
//         console.error("Error opening WhatsApp:", error);
//       });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header />
      
//       <ScrollView contentContainerStyle={styles.container}>
//          <Text style={styles.header}></Text> 
//          <TouchableOpacity
//           style={styles.searchBoxContainer}
//           onPress={() => this.textInput.focus()}
//         >
//           <TextInput
//             ref={(input) => {
//               this.textInput = input;
//             }}
//             style={styles.searchBox}
//             placeholder="Search Plumbers"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <MaterialIcons
//             name="search"
//             size={24}
//             color="black"
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity> 
//         {registrationData.length === 0 ? (
//           <Text>Loading plumber details...</Text>
//         ) : (
//           renderRegistrationCards()
//         )}
//       </ScrollView>
    
//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // justifyContent: "center",
//     alignItems: "center",
//     padding: normalize(10),
//     flexDirection: "row", // Add this to make the cards display in a row
//     flexWrap: "wrap", // Add this if you want the cards to wrap to the next line when they reach the edge of the screen
//     // textAlign: "left",
//     paddingBottom: 100,
    
//   },
//   header: {
//     fontWeight: "bold",
//     fontSize: normalize(18),
//     marginBottom: normalize(20),
//     textAlign: "center", // Center the header text
//     width: "10%", // Take up full width to avoid alignment issues
//   },
//   searchBoxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginBottom: normalize(20),
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     textAlign: "left",
//   },
//   searchIcon: {
//     padding: normalize(10),
//   },
//   searchBox: {
//     flex: 1,
//     paddingVertical: normalize(10),
//     paddingHorizontal: normalize(5),
//   },
//   card: {
//     width: windowWidth * 0.4,
//     marginBottom: normalize(20),
//     marginLeft: normalize(18),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: normalize(1),
//     padding: normalize(6),
//     alignItems: "flex-start",
//     backgroundColor:"#d3d3d3",
//     shadowOpacity: 20.25, // Shadow opacity
//     shadowRadius: 30.84, // Shadow blur radius
//     elevation: 15, // Elevation for Android
//     shadowColor: "green", // Shadow color
//     shadowOffset: {
//       width: 50,
//       height: 2,
//     },
//   },
//   cardImage: {
//     width: normalize(100),
//     height: normalize(100),
//     marginBottom: normalize(10),
//     borderRadius: normalize(1),
//   },
//   cardText: {
//     marginBottom: normalize(1),
//     textAlign: "right",
  
//   },
//   buttonContainer: {
//     alignItems: "flex-end",
//     width: "100%",
//     marginTop: normalize(10),
  
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: normalize(2),
//   },
//   icon: {
//     marginRight: normalize(5),
//   },

// });

// export default PlumberViewScreen;



// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import axios from "axios";
// import Footer from "./Footer";
// import Header from "./Header";

// const { width: windowWidth } = Dimensions.get("window");

// const normalize = (size) => (windowWidth / 320) * size;

// const PlumberViewScreen = () => {
//   const [registrationData, setRegistrationData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("none");
//   const [chargeRange, setChargeRange] = useState("");
//   const [showSortingModal, setShowSortingModal] = useState(false);

//   useEffect(() => {
//     fetchRegistrationData();
//   }, []);

//   const fetchRegistrationData = async () => {
//     try {
//       const response = await axios.get(
//         "http://192.168.0.113:3000/registerasservice"
//       );
//       setRegistrationData(response.data);
//     } catch (error) {
//       console.error("Error fetching registration data:", error);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const toggleSortingModal = () => {
//     setShowSortingModal(!showSortingModal);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     setShowSortingModal(false); // Hide sorting modal after selecting
//   };

//   const handleChargeRangeChange = (range) => {
//     setChargeRange(range);
//   };

//   const renderRegistrationCards = () => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const isPlumberSearch = ["plumber", "plumbers"].includes(lowerCaseQuery);

//     let filteredData = registrationData.filter(
//       (registration) =>
//         isPlumberSearch ||
//         registration.name.toLowerCase().includes(lowerCaseQuery) ||
//         registration.city.toLowerCase().includes(lowerCaseQuery) ||
//         registration.charges.toString().toLowerCase().includes(lowerCaseQuery)
//     );

//     if (chargeRange === "0-100") {
//       filteredData = filteredData.filter(
//         (registration) => registration.charges >= 0 && registration.charges <= 100
//       );
//     } else if (chargeRange === "100-200") {
//       filteredData = filteredData.filter(
//         (registration) => registration.charges >= 100 && registration.charges <= 200
//       );
//     }

//     if (sortOption === "charge") {
//       filteredData.sort((a, b) => a.charges - b.charges);
//     } else if (sortOption === "location") {
//       filteredData.sort((a, b) => a.city.localeCompare(b.city));
//     }

//     if (filteredData.length === 0) {
//       return <Text>No plumbers found.</Text>;
//     }

//     return filteredData.map((registration, index) => (
//       <View key={index} style={styles.card}>
//         <View style={styles.iconContainer}>
//           <MaterialIcons
//             name="person"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.name}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialIcons
//             name="phone"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.phoneNumber}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialCommunityIcons
//             name="cash"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.charges}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialCommunityIcons
//             name="map-marker"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.city}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <MaterialCommunityIcons
//             name="send-circle"
//             size={25}
//             color="black"
//             onPress={() => handleSend(registration.phoneNumber)}
//           />
//         </View>
//       </View>
//     ));
//   };

//   const handleSend = (phoneNumber) => {
//     const defaultMessage = encodeURIComponent(
//       "Hello, I am customer I need service regarding repair please contact me or message me..."
//     );
//     const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${defaultMessage}`;

//     Linking.canOpenURL(whatsappLink)
//       .then((supported) => {
//         if (!supported) {
//           console.log("WhatsApp is not installed on this device");
//         } else {
//           return Linking.openURL(whatsappLink);
//         }
//       })
//       .then(() => {
//         console.log("WhatsApp opened successfully");
//       })
//       .catch((error) => {
//         console.error("Error opening WhatsApp:", error);
//       });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header />
//       <View style={styles.mainContainer}>
//         {/* Left Sidebar Filters */}
//         <View style={styles.leftSidebar}>
//           <Text style={styles.sidebarHeading}>Filters</Text>
//           <View style={styles.filterItem}>
//             <Text>City</Text>
//             {/* Implement checkboxes for cities if needed */}
//           </View>
//           <View style={styles.filterItem}>
//             <Text>Charge Range</Text>
//             <TouchableOpacity
//               style={[
//                 styles.chargeRangeButton,
//                 chargeRange === "0-100" && styles.activeRange,
//               ]}
//               onPress={() => handleChargeRangeChange("0-100")}
//             >
//               <Text>$0 - $100</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.chargeRangeButton,
//                 chargeRange === "100-200" && styles.activeRange,
//               ]}
//               onPress={() => handleChargeRangeChange("100-200")}
//             >
//               <Text>$100 - $200</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Right Side Sorting Options */}
//         <ScrollView contentContainerStyle={styles.container}>
//           <TouchableOpacity
//             style={styles.sortButton}
//             onPress={toggleSortingModal}
//           >
//             <Text style={styles.sortButtonText}>Sort</Text>
//           </TouchableOpacity>
//           <Modal
//             animationType="slide"
//             transparent={false}
//             visible={showSortingModal}
//             onRequestClose={toggleSortingModal}
//           >
//             <View style={styles.modalContainer}>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={toggleSortingModal}
//               >
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.sortOption, sortOption === "none" && styles.activeSort]}
//                 onPress={() => handleSortChange("none")}
//               >
//                 <Text>None</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.sortOption, sortOption === "charge" && styles.activeSort]}
//                 onPress={() => handleSortChange("charge")}
//               >
//                 <Text>Charge</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.sortOption, sortOption === "location" && styles.activeSort]}
//                 onPress={() => handleSortChange("location")}
//               >
//                 <Text>Location</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>
//           <TouchableOpacity
//             style={styles.searchBoxContainer}
//             onPress={() => this.textInput.focus()}
//           >
//             <TextInput
//               ref={(input) => {
//                 this.textInput = input;
//               }}
//               style={styles.searchBox}
//               placeholder="Search Plumbers"
//               value={searchQuery}
//               onChangeText={handleSearch}
//             />
//             <MaterialIcons
//               name="search"
//               size={24}
//               color="black"
//               style={styles.searchIcon}
//             />
//           </TouchableOpacity>
//           {registrationData.length === 0 ? (
//             <Text>Loading plumber details...</Text>
//           ) : (
//             renderRegistrationCards()
//           )}
//         </ScrollView>
//       </View>
//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   leftSidebar: {
//     width: "20%",
//     backgroundColor: "#f2f2f2",
//     padding: normalize(10),
//   },
//   sidebarHeading: {
//     fontSize: normalize(18),
//     fontWeight: "bold",
//     marginBottom: normalize(10),
//   },
//   filterItem: {
//     marginBottom: normalize(20),
//   },
//   chargeRangeButton: {
//     padding: normalize(10),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: normalize(5),
//     marginBottom: normalize(10),
//     alignItems: "center",
//   },
//   activeRange: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//     color: "#fff",
//   },
//   container: {
//     alignItems: "center",
//     padding: normalize(10),
//   },
//   card: {
//     width: windowWidth * 0.4,
//     marginBottom: normalize(20),
//     marginLeft: normalize(18),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: normalize(10),
//     padding: normalize(10),
//     alignItems: "flex-start",
//     backgroundColor: "#d3d3d3",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: normalize(5),
//   },
//   icon: {
//     marginRight: normalize(5),
//   },
//   cardText: {
//     fontSize: normalize(14),
//   },
//   buttonContainer: {
//     alignItems: "flex-end",
//     marginTop: normalize(10),
//   },
//   sortButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: normalize(10),
//     paddingHorizontal: normalize(20),
//     borderRadius: normalize(5),
//     marginBottom: normalize(10),
//   },
//   sortButtonText: {
//     color: "#fff",
//     fontSize: normalize(16),
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     padding: normalize(20),
//   },
//   closeButton: {
//     position: "absolute",
//     top: 20,
//     right: 20,
//     padding: normalize(10),
//   },
//   closeButtonText: {
//     fontSize: normalize(16),
//     color: "#007bff",
//   },
//   sortOption: {
//     paddingVertical: normalize(15),
//     paddingHorizontal: normalize(30),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: normalize(5),
//     marginBottom: normalize(10),
//   },
//   activeSort: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//     color: "#fff",
//   },
//   searchBoxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f2f2f2",
//     padding: normalize(10),
//     marginBottom: normalize(10),
//   },
//   searchBox: {
//     flex: 1,
//     paddingHorizontal: normalize(10),
//     fontSize: normalize(16),
//   },
//   searchIcon: {
//     marginLeft: normalize(10),
//   },
//   footer: {
//     backgroundColor: "#007bff",
//     padding: normalize(10),
//     alignItems: "center",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   footerText: {
//     color: "#fff",
//     fontSize: normalize(16),
//   },
// });

// export default PlumberViewScreen;





// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import axios from "axios";
// import Footer from "./Footer";
// import Header from "./Header";

// const { width: windowWidth } = Dimensions.get("window");

// const normalize = (size) => (windowWidth / 320) * size;

// const PlumberViewScreen = () => {
//   const [registrationData, setRegistrationData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("none");
//   const [chargeRange, setChargeRange] = useState("");
//   const [showSortingModal, setShowSortingModal] = useState(false);

//   useEffect(() => {
//     fetchRegistrationData();
//   }, []);

//   const fetchRegistrationData = async () => {
//     try {
//       const response = await axios.get(
//         "http://192.168.0.113:3000/registerasservice"
//       );
//       setRegistrationData(response.data);
//     } catch (error) {
//       console.error("Error fetching registration data:", error);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const toggleSortingModal = () => {
//     setShowSortingModal(!showSortingModal);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     setShowSortingModal(false); // Hide sorting modal after selecting
//   };

//   const handleChargeRangeChange = (range) => {
//     setChargeRange(range);
//   };

//   const renderRegistrationCards = () => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const isPlumberSearch = ["plumber", "plumbers"].includes(lowerCaseQuery);

//     let filteredData = registrationData;

//     if (sortOption === "charge") {
//       filteredData.sort((a, b) => a.charges - b.charges);
//     } else if (sortOption === "location") {
//       filteredData.sort((a, b) => a.city.localeCompare(b.city));
//     }

//     if (filteredData.length === 0) {
//       return <Text>No plumbers found.</Text>;
//     }

//     return filteredData.map((registration, index) => (
//       <View key={index} style={styles.card}>
//         <View style={styles.iconContainer}>
//           <MaterialIcons
//             name="person"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.name}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialIcons
//             name="phone"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.phoneNumber}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialCommunityIcons
//             name="cash"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.charges}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialCommunityIcons
//             name="map-marker"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.city}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <MaterialCommunityIcons
//             name="send-circle"
//             size={25}
//             color="black"
//             onPress={() => handleSend(registration.phoneNumber)}
//           />
//         </View>
//       </View>
//     ));
//   };

//   const handleSend = (phoneNumber) => {
//     const defaultMessage = encodeURIComponent(
//       "Hello, I am customer I need service regarding repair please contact me or message me..."
//     );
//     const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${defaultMessage}`;

//     Linking.canOpenURL(whatsappLink)
//       .then((supported) => {
//         if (!supported) {
//           console.log("WhatsApp is not installed on this device");
//         } else {
//           return Linking.openURL(whatsappLink);
//         }
//       })
//       .then(() => {
//         console.log("WhatsApp opened successfully");
//       })
//       .catch((error) => {
//         console.error("Error opening WhatsApp:", error);
//       });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header />
//       <ScrollView contentContainerStyle={styles.container}>
//         <TouchableOpacity
//           style={styles.sortButton}
//           onPress={toggleSortingModal}
//         >
//           <Text style={styles.sortButtonText}>Sort</Text>
//         </TouchableOpacity>
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={showSortingModal}
//           onRequestClose={toggleSortingModal}
//         >
//           <View style={styles.modalContainer}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={toggleSortingModal}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.sortOption,
//                 sortOption === "none" && styles.activeSort,
//               ]}
//               onPress={() => handleSortChange("none")}
//             >
//               <Text>None</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.sortOption,
//                 sortOption === "charge" && styles.activeSort,
//               ]}
//               onPress={() => handleSortChange("charge")}
//             >
//               <Text>Charge</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.sortOption,
//                 sortOption === "location" && styles.activeSort,
//               ]}
//               onPress={() => handleSortChange("location")}
//             >
//               <Text>Location</Text>
//             </TouchableOpacity>
//             {/* Charge Range Selection */}
//             <View style={styles.chargeRangeContainer}>
//               <Text>Charge Range:</Text>
//               <TouchableOpacity
//                 style={[
//                   styles.chargeRangeButton,
//                   chargeRange === "0-100" && styles.activeRange,
//                 ]}
//                 onPress={() => handleChargeRangeChange("0-100")}
//               >
//                 <Text>$0 - $100</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.chargeRangeButton,
//                   chargeRange === "100-200" && styles.activeRange,
//                 ]}
//                 onPress={() => handleChargeRangeChange("100-200")}
//               >
//                 <Text>$100 - $200</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//         <TouchableOpacity
//           style={styles.searchBoxContainer}
//           onPress={() => this.textInput.focus()}
//         >
//           <TextInput
//             ref={(input) => {
//               this.textInput = input;
//             }}
//             style={styles.searchBox}
//             placeholder="Search Plumbers"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <MaterialIcons
//             name="search"
//             size={24}
//             color="black"
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity>
//         {registrationData.length === 0 ? (
//           <Text>Loading plumber details...</Text>
//         ) : (
//           renderRegistrationCards()
//         )}
//       </ScrollView>
//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: normalize(10),
//   },
//   card: {
//     width: windowWidth * 0.4,
//     marginBottom: normalize(20),
//     marginLeft: normalize(18),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: normalize(10),
//     padding: normalize(10),
//     alignItems: "flex-start",
//     backgroundColor: "#d3d3d3",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardText: {
//     marginBottom: normalize(5),
//     textAlign: "left",
//   },
//   buttonContainer: {
//     alignItems: "flex-end",
//     marginTop: normalize(10),
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: normalize(5),
//   },
//   icon: {
//     marginRight: normalize(5),
//   },
//   searchBoxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginBottom: normalize(20),
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: normalize(10),
//     textAlign: "left",
//   },
//   searchIcon: {
//     padding: normalize(10),
//   },
//   searchBox: {
//     flex: 1,
//     paddingVertical: normalize(10),
//     paddingHorizontal: normalize(5),
//   },
//   sortButton: {
//     padding: normalize(10),
//     backgroundColor: "#007bff",
//     borderRadius: 5,
//     alignSelf: "flex-start",
//     marginBottom: normalize(10),
//   },
//   sortButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: normalize(20),
//   },
//   closeButton: {
//     position: "absolute",
//     top: normalize(10),
//     right: normalize(10),
//     padding: normalize(10),
//   },
//   closeButtonText: {
//     color: "#007bff",
//     fontWeight: "bold",
//   },
//   sortOption: {
//     padding: normalize(10),
//     marginBottom: normalize(10),
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "#ccc",
//     width: "100%",
//     alignItems: "center",
//   },
//   activeSort: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//     color: "#fff",
//   },
//   chargeRangeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: normalize(20),
//   },
//   chargeRangeButton: {
//     padding: normalize(10),
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "#ccc",
//   },
//   activeRange: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//     color: "#fff",
//   },
// });

// export default PlumberViewScreen;


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import axios from "axios";
// import Footer from "./Footer";
// import Header from "./Header";

// const { width: windowWidth } = Dimensions.get("window");

// const normalize = (size) => (windowWidth / 320) * size;

// const PlumberViewScreen = () => {
//   const [registrationData, setRegistrationData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("none");
//   const [chargeRange, setChargeRange] = useState(""); // State to store selected charge range
//   const [showSortingModal, setShowSortingModal] = useState(false);

//   useEffect(() => {
//     fetchRegistrationData();
//   }, []);

//   const fetchRegistrationData = async () => {
//     try {
//       const response = await axios.get(
//         "http://192.168.0.113:3000/registerasservice"
//       );
//       setRegistrationData(response.data);
//     } catch (error) {
//       console.error("Error fetching registration data:", error);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const toggleSortingModal = () => {
//     setShowSortingModal(!showSortingModal);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     setShowSortingModal(false); // Hide sorting modal after selecting
//   };

//   const handleChargeRangeChange = (range) => {
//     setChargeRange(range);
//     setShowSortingModal(false); // Hide sorting modal after selecting
//   };

//   const renderRegistrationCards = () => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const isPlumberSearch = ["plumber", "plumbers"].includes(lowerCaseQuery);

//     let filteredData = registrationData;

//     // Filter based on search query
//     filteredData = filteredData.filter(
//       (registration) =>
//         isPlumberSearch ||
//         registration.name.toLowerCase().includes(lowerCaseQuery) ||
//         registration.city.toLowerCase().includes(lowerCaseQuery)
//     );

//     // Sort based on sort option
//     if (sortOption === "charge") {
//       filteredData.sort((a, b) => a.charges - b.charges);
//     } else if (sortOption === "location") {
//       filteredData.sort((a, b) => a.city.localeCompare(b.city));
//     }

//     // Filter based on charge range
//     if (chargeRange === "0-100") {
//       filteredData = filteredData.filter(
//         (registration) => registration.charges >= 0 && registration.charges <= 100
//       );
//     } else if (chargeRange === "100-200") {
//       filteredData = filteredData.filter(
//         (registration) => registration.charges > 100 && registration.charges <= 200
//       );
//     }

//     if (filteredData.length === 0) {
//       return <Text>No plumbers found.</Text>;
//     }

//     return filteredData.map((registration, index) => (
//       <View key={index} style={styles.card}>
//         <View style={styles.iconContainer}>
//           <MaterialIcons
//             name="person"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.name}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialIcons
//             name="phone"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.phoneNumber}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialCommunityIcons
//             name="cash"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.charges}</Text>
//         </View>
//         <View style={styles.iconContainer}>
//           <MaterialCommunityIcons
//             name="map-marker"
//             size={15}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.cardText}>{registration.city}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <MaterialCommunityIcons
//             name="send-circle"
//             size={25}
//             color="black"
//             onPress={() => handleSend(registration.phoneNumber)}
//           />
//         </View>
//       </View>
//     ));
//   };

//   const handleSend = (phoneNumber) => {
//     const defaultMessage = encodeURIComponent(
//       "Hello, I am customer I need service regarding repair please contact me or message me..."
//     );
//     const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${defaultMessage}`;

//     Linking.canOpenURL(whatsappLink)
//       .then((supported) => {
//         if (!supported) {
//           console.log("WhatsApp is not installed on this device");
//         } else {
//           return Linking.openURL(whatsappLink);
//         }
//       })
//       .then(() => {
//         console.log("WhatsApp opened successfully");
//       })
//       .catch((error) => {
//         console.error("Error opening WhatsApp:", error);
//       });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header />
//       <ScrollView contentContainerStyle={styles.container}>
//         <TouchableOpacity
//           style={styles.sortButton}
//           onPress={toggleSortingModal}
//         >
//           <Text style={styles.sortButtonText}>Sort</Text>
//         </TouchableOpacity>
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={showSortingModal}
//           onRequestClose={toggleSortingModal}
//         >
//           <View style={styles.modalContainer}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={toggleSortingModal}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.sortOption,
//                 sortOption === "none" && styles.activeSort,
//               ]}
//               onPress={() => handleSortChange("none")}
//             >
//               <Text>None</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.sortOption,
//                 sortOption === "charge" && styles.activeSort,
//               ]}
//               onPress={() => handleSortChange("charge")}
//             >
//               <Text>Charge</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.sortOption,
//                 sortOption === "location" && styles.activeSort,
//               ]}
//               onPress={() => handleSortChange("location")}
//             >
//               <Text>Location</Text>
//             </TouchableOpacity>
//             <View style={styles.chargeRangeContainer}>
//               <Text>Charge Range:</Text>
//               <TouchableOpacity
//                 style={[
//                   styles.chargeRangeButton,
//                   chargeRange === "0-100" && styles.activeRange,
//                 ]}
//                 onPress={() => handleChargeRangeChange("0-100")}
//               >
//                 <Text>$0 - $100</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.chargeRangeButton,
//                   chargeRange === "100-200" && styles.activeRange,
//                 ]}
//                 onPress={() => handleChargeRangeChange("100-200")}
//               >
//                 <Text>$100 - $200</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//         <TouchableOpacity
//           style={styles.searchBoxContainer}
//           onPress={() => this.textInput.focus()}
//         >
//           <TextInput
//             ref={(input) => {
//               this.textInput = input;
//             }}
//             style={styles.searchBox}
//             placeholder="Search Plumbers"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <MaterialIcons
//             name="search"
//             size={24}
//             color="black"
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity>
//         {registrationData.length === 0 ? (
//           <Text>Loading plumber details...</Text>
//         ) : (
//           renderRegistrationCards()
//         )}
//       </ScrollView>
//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: normalize(10),
//   },
//   card: {
//     width: windowWidth * 0.4,
//     marginBottom: normalize(20),
//     marginLeft: normalize(18),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: normalize(10),
//     padding: normalize(10),
//     alignItems: "flex-start",
//     backgroundColor: "#d3d3d3",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardText: {
//     marginBottom: normalize(5),
//     textAlign: "left",
//   },
//   buttonContainer: {
//     alignItems: "flex-end",
//     marginTop: normalize(10),
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: normalize(5),
//   },
//   icon: {
//     marginRight: normalize(5),
//   },
//   sortButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: normalize(10),
//     paddingHorizontal: normalize(20),
//     borderRadius: 5,
//     marginBottom: normalize(10),
//   },
//   sortButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: normalize(20),
//   },
//   closeButton: {
//     position: "absolute",
//     top: normalize(10),
//     right: normalize(10),
//     padding: normalize(10),
//   },
//   closeButtonText: {
//     color: "#007bff",
//     fontWeight: "bold",
//   },
//   sortOption: {
//     padding: normalize(10),
//     marginBottom: normalize(10),
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "#ccc",
//     width: "100%",
//     alignItems: "center",
//   },
//   activeSort: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//     color: "#fff",
//   },
//   chargeRangeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: normalize(20),
//   },
//   chargeRangeButton: {
//     padding: normalize(10),
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "#ccc",
//   },
//   activeRange: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//     color: "#fff",
//   },
// });

// export default PlumberViewScreen;

