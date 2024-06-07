import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Footer from "./Footer";

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
            style={styles.signupButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
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
  },
  signupButton: {
    backgroundColor: "#4169e1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
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
