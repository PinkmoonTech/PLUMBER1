import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ServiceCustomerCard = ({ onPress,onPressCustomer }) => {
  return (
    <View style={styles.container}>
      {/* Service Card */}
      <TouchableOpacity style={styles.iconCard} onPress={onPress}>
        <MaterialIcons name="build" size={15} color="black" style={styles.icon} />
      </TouchableOpacity>

      {/* Customer Card */}
      <TouchableOpacity style={styles.iconCard} onPress={onPressCustomer}>
        <MaterialIcons name="person-add" size={15} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  iconCard: {
    width: 50,
    height: 50,
    backgroundColor: "#8fbc8f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 20,
    marginRight:20
  },
});

export default ServiceCustomerCard;
