import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ServiceCustomerCard = ({
  onPress,
  onPressCustomer,
  serviceCardEnabled = true,
  customerCardEnabled = true,
}) => {
  const handlePress = () => {
    if (typeof onPress === "function" && serviceCardEnabled) {
      onPress();
    }
  };

  const handlePressCustomer = () => {
    if (typeof onPressCustomer === "function" && customerCardEnabled) {
      onPressCustomer();
    }
  };

  return (
    <View style={styles.container}>
      {/* Service Card */}
      <TouchableOpacity
        style={[styles.iconCard, !serviceCardEnabled && { opacity: 0.5 }]}
        onPress={handlePress}
        disabled={!serviceCardEnabled}
      >
        <MaterialIcons
          name="build"
          size={15}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Customer Card */}
      <TouchableOpacity
        style={[styles.iconCard, !customerCardEnabled && { opacity: 0.5 }]}
        onPress={handlePressCustomer}
        disabled={!customerCardEnabled}
      >
        <MaterialIcons
          name="person-add"
          size={15}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconCard: {
    width: 50,
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {

  },
});

export default ServiceCustomerCard;
