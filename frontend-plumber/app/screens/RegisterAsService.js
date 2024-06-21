import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImageManipulator from "expo-image-manipulator";
import Footer from "./Footer";
import Header from "./Header";
import * as FileSystem from "expo-file-system";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const scale = (size) => (windowWidth / 320) * size;
const normalize = (size) => {
  const newSize = scale(size);
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const RegisterAsService = ({ navigation }) => {
  const [registrationType, setRegistrationType] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [identityCard, setIdentityCard] = useState(""); // Default value
  const [idNumber, setIdNumber] = useState("");
  const [idProofImage, setIdProofImage] = useState(""); // Image URI
  const [charges, setCharges] = useState("");
  const [photo, setPhoto] = useState(""); // Image URI
  const [error, setError] = useState(""); // To display errors

  // const [showRegistrationDetails, setShowRegistrationDetails] = useState(false);

  // const toggleRegistrationDetails = () => {
  //   setShowRegistrationDetails(!showRegistrationDetails);
  // };

  useEffect(() => {
    const updateDimensions = () => {
      const { width, height } = Dimensions.get("window");
      setWindowWidth(width);
      setWindowHeight(height);
    };

    // Dimensions.addEventListener('change', updateDimensions);
    return () => {
      // Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const onFocusDate = () => {
    setShowDatePicker(true);
  };

  // Function to handle ID proof image upload
  // const handleIdProofUpload = async () => {
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   const results = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log("Base64 data:", results.assets[0].uri);
  //   if (!results.cancelled && results.assets[0].uri) {
  //     console.log(results.uri);
  //     // Check if URI is valid
  //     setIdProofImage("Base64 data:", results); // Add this line
  //     try {
  //       const base64 = await FileSystem.readAsStringAsync(
  //         results.assets[0].uri,
  //         {
  //           encoding: FileSystem.EncodingType.Base64,
  //         }
  //       );
  //       console.log(base64); // Add this line
  //       // Other code
  //     } catch (error) {
  //       console.error("Error reading file:", error);
  //     }
  //   }
  // };

  const handleIdProofUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("Base64 data:", results.assets[0].uri);
    if (!results.cancelled && results.assets[0].uri) {
      try {
        const base64 = await FileSystem.readAsStringAsync(results.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        // Set the base64 data to the state variable
        setIdProofImage(base64);
  
        console.log(base64); // Logging the base64 string
  
        // Other code you might have for handling the uploaded image
  
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };
  


  // const handlePhotoUpload = async () => {
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }
  //   const results = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   console.log("Base64 data:", results.assets[0].uri);
  //   if (!results.cancelled && results.assets[0].uri) {
  //     console.log(results.uri);
    
  //     setPhoto("Base64 data:", results); 
  //     try {
  //       const base64 = await FileSystem.readAsStringAsync(
  //         results.assets[0].uri,
  //         {
  //           encoding: FileSystem.EncodingType.Base64,
  //         }
  //       );
  //       console.log(base64); 
      
  //     } catch (error) {
  //       console.error("Error reading file:", error);
  //     }
  //   }
  // };

  const handlePhotoUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    console.log("Base64 data:", results.assets[0].uri);
    if (!results.cancelled && results.assets[0].uri) {
      try {
        const base64 = await FileSystem.readAsStringAsync(results.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        // Set the base64 data to the state variable
        setPhoto(base64);
  
        console.log(base64); // Logging the base64 string
  
        // Other code you might have for handling the uploaded image
  
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };
  


  const handleRegistration = async () => {
    setError(''); // Clear previous errors

    const requestBody = {
      registrationType,
      name,
      dob: dob.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      phoneNumber,
      pin,
      confirmPin,
      altPhoneNumber,
      email,
      country,
      state,
      city,
      address,
      identityCard,
      idNumber,
      charges,
    };

    if (idProofImage) {
      const idProofFileName = idProofImage.split('/').pop();
      const idProofFileType = idProofFileName.split('.').pop();
      requestBody.idProofImage = {
        uri: idProofImage,
        name: idProofFileName,
        type: `image/${idProofFileType}`,
      };
    }

    if (photo) {
      const photoFileName = photo.split('/').pop();
      const photoFileType = photoFileName.split('.').pop();
      requestBody.photo = {
        uri: photo,
        name: photoFileName,
        type: `image/${photoFileType}`,
      };
    }

    try {
      const response = await fetch('http://192.168.0.112:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });


      const result = await response.json();
      if (response.ok) {
        alert('Registration successful');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // setError('An error occurred. Please try again later.');
      // if (err instanceof SyntaxError && err.message.includes('JSON')) {
      //   console.error('Invalid JSON response from server:', err);
      //   setError('Server returned invalid data. Please try again later.');
      // } else {
      //   setError('Network error. Please check your internet connection.');
      // }
    }
  };

  // Example: Update state variables from form inputs
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // More handleChange functions for other inputs...


  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>

        {/* <ServiceCustomerCard onPress={toggleRegistrationDetails} /> */}

        {handleRegistration && (
          <>
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}


            {/* Dropdown for selecting registration type */}
            < View style={styles.inputContainerplumber}>
              <Picker
                selectedValue={registrationType}
                style={styles.picker}
                onValueChange={(itemValue) => setRegistrationType(itemValue)}
              >
                <Picker.Item label="Plumber" value="plumber" />
                <Picker.Item label="Electrician" value="electrician" />
              </Picker>
            </View>


            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />


            <TouchableOpacity // Use TouchableOpacity for date selection
              style={styles.dateOfBirthContainer}
              onPress={onFocusDate} // Open date picker on press
            >
              <TextInput
                placeholder="DD/MM/YYYY"
                value={dob ? dob.toLocaleDateString() : ""}
                editable={false} // Make it not editable
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="pin"
              value={pin}
              onChangeText={setPin}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="confirmPin"
              value={confirmPin}
              onChangeText={setConfirmPin}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Alternative Phone Number"
              value={altPhoneNumber}
              onChangeText={setAltPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={country}
                style={styles.picker}
                onValueChange={(itemValue) => setCountry(itemValue)}
              >
                <Picker.Item label="India" value="India" />
                <Picker.Item label="USA" value="USA" />
                <Picker.Item label="Dubai" value="Dubai" />
              </Picker>
            </View>

            <View style={styles.inputContainer}>
              <Picker
                selectedValue={state}
                style={styles.picker} // Keeping the style consistent with other inputs
                onValueChange={(itemValue) => setState(itemValue)}
              >
                
                <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                <Picker.Item label="Assam" value="Assam" />
                <Picker.Item label="Bihar" value="Bihar" />
                <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                <Picker.Item label="Goa" value="Goa" />
                <Picker.Item label="Gujarat" value="Gujarat" />
                <Picker.Item label="Haryana" value="Haryana" />
                <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                <Picker.Item label="Jharkhand" value="Jharkhand" />
                <Picker.Item label="Karnataka" value="Karnataka" />
                <Picker.Item label="Kerala" value="Kerala" />
                <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                <Picker.Item label="Maharashtra" value="Maharashtra" />
                <Picker.Item label="Manipur" value="Manipur" />
                <Picker.Item label="Meghalaya" value="Meghalaya" />
                <Picker.Item label="Mizoram" value="Mizoram" />
                <Picker.Item label="Nagaland" value="Nagaland" />
                <Picker.Item label="Odisha" value="Odisha" />
                <Picker.Item label="Punjab" value="Punjab" />
                <Picker.Item label="Rajasthan" value="Rajasthan" />
                <Picker.Item label="Sikkim" value="Sikkim" />
                <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                <Picker.Item label="Telangana" value="Telangana" />
                <Picker.Item label="Tripura" value="Tripura" />
                <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                <Picker.Item label="West Bengal" value="West Bengal" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              multiline={true}
              numberOfLines={4}
            />

            <View style={styles.inputContainer}>
              <Picker
                selectedValue={identityCard}
                style={styles.picker}
                onValueChange={(itemValue) => setIdentityCard(itemValue)}
              >
                <Picker.Item label="Aadhaar" value="adhaar" />
                <Picker.Item label="Voter ID" value="voter_id" />
                <Picker.Item label="PAN Card" value="pan_card" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="ID Number"
              value={idNumber}
              onChangeText={setIdNumber}
            />
            <View style={styles.uploadContainer}>
              <Button title="Upload ID Proof" onPress={handleIdProofUpload} />
            </View>

            {idProofImage && (
              <Image source={{ uri: idProofImage }} style={styles.image} />
            )}


            <TextInput
              style={styles.input}
              placeholder="Charges per day"
              value={charges}
              onChangeText={setCharges}
              keyboardType="numeric"
            />
            <View style={styles.uploadContainer}>
              <Button
                title="Upload Passport-size Photo"
                onPress={handlePhotoUpload}
              />
            </View>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <View style={styles.submitContainer}>
              <Button title="Submit" onPress={handleRegistration} />
            </View>
          </>
        )}

      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(20),
  },
  header: {
    fontWeight: "bold",
    fontSize: normalize(18),
    marginBottom: normalize(20),
  },
  input: {
    height: normalize(40),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: normalize(8),
    marginBottom: normalize(12),
    width: windowWidth * 0.9,
  },
  image: {
    width: normalize(100),
    height: normalize(100),
    marginVertical: normalize(10),
  },
  uploadContainer: {
    marginBottom: normalize(10),
    width: windowWidth * 0.9,
    backgroundColor: "#8b4513",
  },
  submitContainer: {
    marginBottom: normalize(50),
    width: windowWidth * 0.9,
  },
  picker: {
    height: normalize(40),
    width: "100%",
    marginBottom: normalize(2),
  },
  inputContainer: {
    width: windowWidth * 0.9,
    marginBottom: normalize(12),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: normalize(1),
    alignItems: "center",
  },
  dateOfBirthContainer: {
    width: windowWidth * 0.9,
    marginBottom: normalize(18),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: normalize(8),
  },
  textArea: {
    height: normalize(60),
  },
  inputContainerplumber: {
    width: windowWidth * 0.9,
    marginBottom: normalize(12),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: normalize(1),
  },
});

export default RegisterAsService;
