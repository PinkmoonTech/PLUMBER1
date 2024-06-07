import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Footer from "./Footer";
import Header from "./Header";

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const[country,setCountry]=useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [identityCard, setIdentityCard] = useState("adhaar"); // Default value
  const [idNumber, setIdNumber] = useState("");
  const [idProofImage, setIdProofImage] = useState(null); // Image URI
  const [charges, setCharges] = useState("");
  const [photo, setPhoto] = useState(null); // Image URI
  const [error, setError] = useState(""); // To display errors

  // Function to handle ID proof image upload
  const handleIdProofUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setIdProofImage(result.uri);
    }
  };
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };
  const onFocusDate = () => {
    setShowDatePicker(true);
  };

  // Function to handle passport-size photo upload
  const handlePhotoUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleRegistration = () => {
    setError(""); // Clear previous errors

    // Validate input
    // if (!name || !phoneNumber) {
    //   setError("Name and phone number are required");
    //   return;
    // }

    // Send registration data to backend
    const handleRegistration = () => {
      const registrationData = {
        name,
        dob,
        phone_number: phoneNumber,
        alt_phone_number,
        email,
        country,
        state,
        city,
        address,
        identity_card,
        id_number,
        id_proof_image_url: idProofImage,
        charges,
        photo_url: photo
      };
  
      axios.post('http://your_backend_url:3000/register', registrationData)
        .then(response => {
          console.log('Registration successful');
          // Handle success, e.g., navigate to another screen
        })
        .catch(error => {
          console.error('Error registering:', error);
          // Handle error, e.g., display error message
        });
    };
  
    // Remaining code...
  
    
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Header /> */}

        <Text style={styles.header}>Registration </Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity // Use TouchableOpacity for date selection
          style={styles.dateofbirthContainer}
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
            <Picker.Item label="Select State" value="" />
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
        {/* <Button title="Upload ID Proof" onPress={handleIdProofUpload} style={{ marginBottom: 20 }} /> */}
        <View style={styles.uploadidContainer}>
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
        <View style={styles.uploadphotoContainer}>
          <Button
            title="Upload Passport-size Photo"
            onPress={handlePhotoUpload}
          />
        </View>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        <View style={styles.submitCointainer}>
          <Button title="Submit" onPress={handleRegistration} />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};
// headerCointainer:{
//   width:"100%"
// }
const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100vh",
    overflow: "auto",
  },

  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
    width: "100%",
  },

  // picker: {
  //   height: 5,
  //   width: "10%",
  //   marginBottom: 12,

  // },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  uploadidContainer: {
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#8b4513",
  },
  uploadphotoContainer: {
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#8b4513",
  },

  footerContainer: {
    width: "100%",
  },

  submitCointainer: {
    marginBottom: 50,
    width: "100%",
  },
  picker: {
    height: 20,
    width: "100%",
    marginBottom: 12,
    paddingBottom: 10,
    paddingTop: 0,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    // padding: 10,
    paddingBottom: 20,

    aligntext: "center",
    paddingLeft: 0,
  },
  dateofbirthContainer: {
    width: "100%",
    marginBottom: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 10,
  },
  headerContainer: {
    width: "100%",
    marginTop: 20,
  },
  textArea: {
    height: 80, // Set desired height
  },
});

export default RegistrationScreen;
