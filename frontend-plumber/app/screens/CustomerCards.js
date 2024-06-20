// import React from "react";
// import { TouchableOpacity, View, StyleSheet } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// const ServiceCustomerCard = ({
//   onPress,
//   onPressCustomer,
//   serviceCardEnabled = true,
//   customerCardEnabled = true,
// }) => {
//   const handlePress = () => {
//     if (typeof onPress === "function" && serviceCardEnabled) {
//       onPress();
//     }
//   };

//   const handlePressCustomer = () => {
//     if (typeof onPressCustomer === "function" && customerCardEnabled) {
//       onPressCustomer();
//     }
//   };

//   return (
//     <View style={styles.container}>
    
//       <TouchableOpacity
//         style={[styles.iconCard, !serviceCardEnabled && { opacity: 0.5 }]}
//         onPress={handlePress}
//         disabled={!serviceCardEnabled}
//       >
//         <MaterialIcons
//           name="build"
//           size={15}
//           color="black"
//           style={styles.icon}
//         />
//       </TouchableOpacity>

      
//       <TouchableOpacity
//         style={[styles.iconCard, !customerCardEnabled && { opacity: 0.5 }]}
//         onPress={handlePressCustomer}
//         disabled={!customerCardEnabled}
//       >
//         <MaterialIcons
//           name="person-add"
//           size={15}
//           color="black"
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   iconCard: {
//     width: 50,
//     height: 50,
//     backgroundColor: "#007bff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     borderRadius: 10,
//     marginLeft: 20,
//     marginRight: 20,
//   },
//   icon: {

//   },
// });

// export default ServiceCustomerCard;




// import React from 'react';
// import { TouchableOpacity, View, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const ServiceCustomerCard = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Service Card */}
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => navigation.navigate('Service i')}
//       >
//         <MaterialIcons name="build" size={24} color="white" />
//       </TouchableOpacity>

//       {/* Customer Card */}
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <MaterialIcons name="person-add" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   card: {
//     width: 70,
//     height: 70,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginHorizontal: 10,
//   },
// });

// export default ServiceCustomerCard;




import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomerCards = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Plumber Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Service i')}
      >
        <Text style={styles.cardText}>Plumber</Text>
      </TouchableOpacity>

      {/* Electrician Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.cardText}>Electrician</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomerCards;


