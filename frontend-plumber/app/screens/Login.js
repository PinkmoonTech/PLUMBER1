import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
import Header from "./Header";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [userType, setUserType] = useState("");
  const navigation = useNavigation();

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Phone number must be 10 digits long");
      return;
    }
    if (pin.length !== 6) {
      Alert.alert("Error", "PIN must be 6 digits long");
      return;
    }
    fetch("http://192.168.0.115:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, pin }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful", data.user.userType);
        if (data.user.userType === "service") {
          navigation.navigate("Registration");
        } else if (data.user.userType === "customer") {
          navigation.navigate("Service i");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleSignup = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Phone number must be 10 digits long");
      return;
    }
    if (pin.length !== 6 || confirmPin.length !== 6) {
      Alert.alert("Error", "PIN must be 6 digits long");
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert("Error", "PINs do not match");
      return;
    }
    fetch("http://192.168.0.115:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, pin, confirmPin, userType }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Signup successful", data.user);
        if (data.userType === "service") {
          navigation.navigate("Registration");
        } else if (data.userType === "customer") {
          navigation.navigate("Service i");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  console.log("Logging in with", phoneNumber, pin);

  return (
    
    <View style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Header/>
      </View> */}
     
      <Text style={styles.title}>{isLogin ? "Login " : "Signup "}</Text>
      <View style={styles.formContainer}>
        <View style={styles.slideControls}>
          <TouchableOpacity
            onPress={handleToggleForm}
            style={[styles.slide, isLogin ? styles.login : null]}
          >
            <Text style={[styles.slideText, isLogin && styles.slideTextActive]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleForm}
            style={[styles.slide, !isLogin ? styles.login : null]}
          >
            <Text
              style={[styles.slideText, !isLogin && styles.slideTextActive]}
            >
              Signup
            </Text>
          </TouchableOpacity>
          <View
            style={[styles.sliderTab, isLogin ? { left: 0 } : { left: "50%" }]}
          ></View>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <TextInput
              placeholder="Phone Number"
              keyboardType="number-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              placeholder="PIN"
              keyboardType="number-pad"
              secureTextEntry
              maxLength={6}
              value={pin}
              onChangeText={setPin}
              style={styles.input}
            />
          </View>
          {!isLogin && (
            <>
              <View style={styles.field}>
                <TextInput
                  placeholder="Confirm PIN"
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={6}
                  value={confirmPin}
                  onChangeText={setConfirmPin}
                  style={styles.input}
                />
              </View>

              <View style={styles.field}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={userType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setUserType(itemValue)}
                  >
                    <Picker.Item label="Service Person" value="service" />
                    <Picker.Item label="Customer" value="customer" />
                  </Picker>
                </View>
              </View>
            </>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={isLogin ? handleLogin : handleSignup}
          >
            <View style={styles.btnLayer}></View>
            <Text style={styles.btnText}>{isLogin ? "Login" : "Signup"}</Text>
          </TouchableOpacity>
          {isLogin && (
            <View style={styles.passLink}>
              <TouchableOpacity>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.signupLink}>
            <Text>{isLogin ? "Not a member?" : "Already a member?"}</Text>
            <TouchableOpacity onPress={handleToggleForm}>
              <Text style={styles.link}>
                {isLogin ? "Signup now" : "Login now"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 25,
    fontWeight: "30",
    // color: '#003366',
    marginBottom: 30,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    // borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slideControls: {
    flexDirection: "row",
    height: 50,
    borderRadius: 1,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slideText: {
    fontSize: 16,
    fontWeight: "50",
    // color: '#003366',
  },
  slideTextActive: {
    color: "#fff",
  },
  login: {
    backgroundColor: "#dda0dd",
  },
  signup: {
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  field: {
    width: "100%",
    height: 50,
    marginBottom: 20,

    // position: 'relative',
  },
  input: {
    flex: 1,
    // // marginBottom:10,
    // paddingBottom:0,
    paddingLeft: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "lightgrey",
    fontSize: 13,
    // marginTop:8,
    // top: 0,
    // bottom: 0,
  },
  // picker: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  //   opacity: 0,
  // },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 1,
    // position: 'relative',
    overflow: "hidden",
    marginTop: 10,
  },
  btnLayer: {
    position: "absolute",
    height: "80%",
    width: "300%",
    left: "-100%",
    backgroundColor: "#4169e1",
    borderRadius: 15,
  },
  btnText: {
    position: "relative",
    zIndex: 1,
    color: "#fff",
    textAlign: "center",
    lineHeight: 35,
    fontSize: 18,
    fontWeight: "50",
  },
  passLink: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  link: {
    color: "#0059b3",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  pickerContainer: {
    // paddingTop:0,
    // paddingLeft:0,
    // paddingRight:0,

    borderRadius: 2,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  // headerContainer:{
  //   flex:1,
  //   marginBottom: 50

  // }
});

export default Login;
