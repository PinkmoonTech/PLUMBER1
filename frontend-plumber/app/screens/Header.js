import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://i.ibb.co/L9NqxNk/Pi7-Tool-r3logo-removebg-preview.png"
          }}
          style={styles.logo} // Use the logo style from styles
        />
      </View>
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
    height:60,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingTop:"80"
  },
  logo: {
    width: 80, // Increased width
    height: 40, // Increased height
    paddingHorizontal: 15,
    marginTop:8,
  },
});

export default Home;
