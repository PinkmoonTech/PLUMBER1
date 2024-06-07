// UserListScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PlumberViewScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
   
  }, []);

  const fetchUsers = () => {
    // Fetch users data from backend
    fetch("http://192.168.0.115:3000/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  // console.log(users);
  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        {users.map((user, index) => (
          <View key={index} style={styles.item}>
            <Text>Name: {user.name}</Text>
            <Text>Phone: {user.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default PlumberViewScreen;
