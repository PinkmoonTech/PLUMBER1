// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image
// } from "react-native";

// const Home = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           resizeMode="contain"
//           source={{
//             uri: "https://i.ibb.co/L9NqxNk/Pi7-Tool-r3logo-removebg-preview.png"
//           }}
//           style={styles.logo} // Use the logo style from styles
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   header: {
//     width: "100%",
//     backgroundColor: "#b0c4de",
//     height:60,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     flexDirection: "row",
//     // justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop:"80"
//   },
//   logo: {
//     width: 80, // Increased width
//     height: 40, // Increased height
//     paddingHorizontal: 15,
//     marginTop:8,
//   },
// });

// export default Home;



import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import Footer from "./Footer";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        source={{
          uri: "https://i.ibb.co/L9NqxNk/Pi7-Tool-r3logo-removebg-preview.png"
        }}
        style={styles.logo} // Use the logo style from styles
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#b0c4de",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start
    zIndex: 1, // Ensure the header is above other content
    
  },
  logo: {
    width: 80, // Increased width
    height: 40, // Increased height
    // marginRight: 'auto',
    paddingHorizontal: 1,
    marginLeft:-25,
    // paddingRight:2
    marginTop:1
    
  },
});

export default Header;
