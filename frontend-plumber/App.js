// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import RegisterAsService from "./app/screens/RegisterAsService";
// import PlumberViewScreen from "./app/screens/PlumberViewScreen";
// import Header from "./app/screens/Header";
// import Footer from "./app/screens/Footer";
// import Login from "./app/screens/Login";
// import Home from "./app/screens/Home";
// import LoginPage from "./app/screens/loginpage";

// import RegisterAsCustomer from "./app/screens/RegisterAsCustomer";
// import CustomerCards from "./app/screens/CustomerCards";

// // import Header from "./Header";

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     // <RegistrationScreen/>
//     // <Header/>

//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name=" " component={Home} options={{ headerShown: true }}/>
//           {/* <Stack.Screen name="Login" component={Login} /> */}
//            <Stack.Screen name="Login" component={LoginPage} />
//           <Stack.Screen name="RegisterAsService" component={RegisterAsService} />
//           <Stack.Screen name="RegisterAsCustomer"component={RegisterAsCustomer}
//           />
//           <Stack.Screen name="CustomerCards" component={CustomerCards} />
//           <Stack.Screen name="Service i" component={PlumberViewScreen} />
//           {/* <Stack.Screen name="LoginPage" component={LoginPage} /> */}

//           {/* <Stack.Screen name="Loginn" component={Header} /> */}
//           {/* <Stack.Screen name="hey" component={Footer} /> */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };
// export default App;




// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import RegisterAsService from "./app/screens/RegisterAsService";
// import PlumberViewScreen from "./app/screens/PlumberViewScreen";
// import Header from "./app/screens/Header";
// import Footer from "./app/screens/Footer";
// // import Login from "./app/screens/Login";
// import Home from "./app/screens/Home";
// import LoginPage from "./app/screens/loginpage";
// import RegisterAsCustomer from "./app/screens/RegisterAsCustomer";
// import CustomerCards from "./app/screens/CustomerCards";

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home" >
//           <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
//           <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: true }}/>
//           <Stack.Screen name="RegisterAsService" component={RegisterAsService}options={{ headerShown: true }} />
//           <Stack.Screen name="RegisterAsCustomer" component={RegisterAsCustomer} options={{ headerShown: true }}/>
//           <Stack.Screen name="CustomerCards" component={CustomerCards} options={{ headerShown: true }}/>
//           <Stack.Screen name="Service i" component={PlumberViewScreen} options={{ headerShown: true }}/>
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;



import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native"; // Import StatusBar
import RegisterAsService from "./app/screens/RegisterAsService";
import PlumberViewScreen from "./app/screens/PlumberViewScreen";
import Header from "./app/screens/Header";
import Footer from "./app/screens/Footer";
import Home from "./app/screens/Home";
import LoginPage from "./app/screens/loginpage"; // Corrected import path
import RegisterAsCustomer from "./app/screens/RegisterAsCustomer";
import CustomerCards from "./app/screens/CustomerCards";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Custom StatusBar */}
        <StatusBar
          barStyle="dark-content" // Customize the status bar style (light-content or dark-content)
          backgroundColor="#FFFFFF" // Customize the background color of the status bar
        />
        
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginPage}  options={{ headerShown: false }}/>
          <Stack.Screen name="RegisterAsService" component={RegisterAsService}  options={{ headerShown: true }}/>
          <Stack.Screen name="RegisterAsCustomer" component={RegisterAsCustomer} options={{ headerShown: true }} />
          <Stack.Screen name="CustomerCards" component={CustomerCards}  options={{ headerShown: true }}/>
          <Stack.Screen name="PlumberViewScreen" component={PlumberViewScreen}  options={{ headerShown: true}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;


// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StatusBar, TouchableOpacity, Text } from "react-native"; // Import TouchableOpacity and Text
// import RegisterAsService from "./app/screens/RegisterAsService";
// import PlumberViewScreen from "./app/screens/PlumberViewScreen";
// import Header from "./app/screens/Header";
// import Footer from "./app/screens/Footer";
// import Home from "./app/screens/Home";
// import LoginPage from "./app/screens/loginpage"; // Corrected import path
// import RegisterAsCustomer from "./app/screens/RegisterAsCustomer";
// import CustomerCards from "./app/screens/CustomerCards";

// const Stack = createStackNavigator();

// const BackButton = ({ navigation }) => (
//   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
//     <Text>Back</Text> {/* You can customize this with any back icon or text */}
//   </TouchableOpacity>
// );

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         {/* Custom StatusBar */}
//         <StatusBar
//           barStyle="dark-content" // Customize the status bar style (light-content or dark-content)
//           backgroundColor="#FFFFFF" // Customize the background color of the status bar
//         />
        
//         <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="Login" component={LoginPage} />
//           <Stack.Screen name="RegisterAsService" component={RegisterAsService} />
//           <Stack.Screen name="RegisterAsCustomer" component={RegisterAsCustomer} />
//           <Stack.Screen name="CustomerCards" component={CustomerCards} />
//           <Stack.Screen
//             name="PlumberViewScreen"
//             component={PlumberViewScreen}
//             options={({ navigation }) => ({
//               headerLeft: () => <BackButton navigation={navigation} />,
//             })}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;


// Example corrected imports and component structure

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { StatusBar, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Assuming Ionicons is used for icons
// import Home from './app/screens/Home';
// import LoginPage from './app/screens/loginpage'; // Ensure correct import path
// import RegisterAsService from './app/screens/RegisterAsService';
// import RegisterAsCustomer from './app/screens/RegisterAsCustomer';
// import CustomerCards from './app/screens/CustomerCards';
// import PlumberViewScreen from './app/screens/PlumberViewScreen';

// const Stack = createStackNavigator();

// const BackButton = ({ navigation }) => (
//   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, paddingBottom:30 }}>
//     <Icon name="arrow-back" size={24} color="pink" /> {/* Adjust size and color as needed */}
//   </TouchableOpacity>
// );

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <StatusBar
//           barStyle="dark-content"
//           backgroundColor="#FFFFFF"
//         />
        
//         <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="Login" component={LoginPage} />
//           <Stack.Screen name="RegisterAsService" component={RegisterAsService} />
//           <Stack.Screen name="RegisterAsCustomer" component={RegisterAsCustomer} />
//           <Stack.Screen name="CustomerCards" component={CustomerCards} />
//           <Stack.Screen
//             name="PlumberViewScreen"
//             component={PlumberViewScreen}
//             options={({ navigation }) => ({
//               headerLeft: () => <BackButton navigation={navigation} />,
//             })}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;



// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { StatusBar, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Assuming Ionicons is used for icons
// import Home from './app/screens/Home';
// import LoginPage from './app/screens/loginpage'; // Ensure correct import path
// import RegisterAsService from './app/screens/RegisterAsService';
// import RegisterAsCustomer from './app/screens/RegisterAsCustomer';
// import CustomerCards from './app/screens/CustomerCards';
// import PlumberViewScreen from './app/screens/PlumberViewScreen';

// const Stack = createStackNavigator();

// const BackButton = ({ navigation }) => (
//   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
//     <Icon name="arrow-back" size={24} color="#000000" /> {/* Adjust size and color as needed */}
//   </TouchableOpacity>
// );

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <StatusBar
//           barStyle="dark-content"
//           backgroundColor="#FFFFFF"
//         />
        
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//           <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
//           <Stack.Screen name="RegisterAsService" component={RegisterAsService} options={{ headerShown: false }} />
//           <Stack.Screen name="RegisterAsCustomer" component={RegisterAsCustomer} options={{ headerShown: false }} />
//           <Stack.Screen name="CustomerCards" component={CustomerCards} options={{ headerShown: false }} />
//           <Stack.Screen
//             name="PlumberViewScreen"
//             component={PlumberViewScreen}
//             options={({ navigation }) => ({
//               headerShown: true,
//               headerLeft: () => <BackButton navigation={navigation} />,
//               title: '', // Empty string to hide the title
//             })}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;



// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { StatusBar, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Assuming Ionicons is used for icons
// import Home from './app/screens/Home';
// import LoginPage from './app/screens/loginpage'; // Ensure correct import path
// import RegisterAsService from './app/screens/RegisterAsService';
// import RegisterAsCustomer from './app/screens/RegisterAsCustomer';
// import CustomerCards from './app/screens/CustomerCards';
// import PlumberViewScreen from './app/screens/PlumberViewScreen';

// const Stack = createStackNavigator();

// const BackButton = ({ navigation }) => (
//   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 150 }}>
//     <Icon name="arrow-back" size={24} color="#000000" /> {/* Adjust size and color as needed */}
//   </TouchableOpacity>
// );

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <StatusBar
//           barStyle="dark-content"
//           backgroundColor="#FFFFFF"
//         />
        
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//           <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: true }} />
//           <Stack.Screen name="RegisterAsService" component={RegisterAsService} options={{ headerShown: true }} />
//           <Stack.Screen name="RegisterAsCustomer" component={RegisterAsCustomer} options={{ headerShown: true }} />
//           <Stack.Screen name="CustomerCards" component={CustomerCards} options={{ headerShown: true }} />
//           <Stack.Screen
//             name="PlumberViewScreen"
//             component={PlumberViewScreen}
//             options={({ navigation }) => ({
//               headerShown: true,
//               headerLeft: () => <BackButton navigation={navigation} />,
//               title: '', // Empty string to hide the title
//             })}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;
