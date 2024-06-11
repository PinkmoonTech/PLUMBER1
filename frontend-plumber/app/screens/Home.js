import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar
} from "react-native";
import Footer from "./Footer";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useImageDimensions } from "@react-native-community/hooks";
import { Dimensions } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://i.ibb.co/L9NqxNk/Pi7-Tool-r3logo-removebg-preview.png",
          }}
          style={styles.logo} // Use the logo style from styles
        />
        <Text style={styles.serviceText}>
          Service <Text style={styles.italic}>i</Text>
        </Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
      style={styles.iconButton}
      onPress={() => navigation.navigate("LoginPage")}
    >
      <MaterialIcons name="login" size={24} color="white" />
    </TouchableOpacity>
        </View>
      </View>

       <View style={styles.middleContent}>
        <ImageBackground
          source={{
            uri: "https://i.ibb.co/XL83qt8/plumberimg.jpg",
          }}
          style={styles.middleImage}
        >
          <Text style={styles.overlayText}>A Platform for Customer to enable right service</Text>
        </ImageBackground>
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    // paddingTop:Platform.OS ==="android"? StatusBar.currentHeight:0
  },
  header: {
    width: "100%",
    backgroundColor: "#b0c4de",
    paddingVertical: 10,
    paddingHorizontal: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 80, // Increased width
    height: 40, // Increased height
    // marginRight: 'auto',
    paddingHorizontal: 15,
    marginLeft:0,
    paddingRight:2
  },
  iconButton: {
    backgroundColor: "#007bff", // Example color
    borderRadius: 5,
    padding: 10,
    paddingLeft:20,
    paddingRight:20
  },

 
  middleContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "300%",
    paddingHorizontal: 80,
    paddingVertical:1,
    marginLeft:250,
    marginTop:0,
    marginBottom:"10"
  },
 
  middleImage: {
    width: "50%", // Adjusted width to center horizontally
    aspectRatio: 10 / 4, //height will be "30%" // Adjusted height to center vertically
   alignItems:"center",
  
  },
  overlayText: {
    color: "#800080",
    fontSize: 15,
    // textAlign: "center",
    // paddingHorizontal: 20,
    // marginBottom:60,
    // paddingBottom:50
    paddingTop:0,
    paddingRight:290,
   
  },
  italic: {
    fontStyle: "italic",
    fontSize: 20,
    alignItems: "center",
  },
  serviceText: {
    fontSize: 25,
    marginRight: 5,
    color:"green"
  },
  // footersContainer: {
  //   width: "100%",
  // },
});

export default Home;
