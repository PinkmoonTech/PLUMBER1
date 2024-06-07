import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import PlumberViewScreen from "./app/screens/PlumberViewScreen";

import LoginScreen from "./app/screens/loginpage";
import Header from "./app/screens/Header";
import Footer from "./app/screens/Footer";
import Login from "./app/screens/Login";
import Home from './app/screens/Home';
// import Header from "./Header";


const Stack = createStackNavigator();

const App = () => {
  return (
    // <RegistrationScreen/>
    // <Header/>
    
    
    <SafeAreaProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen name=' ' component={Home}/> 
          <Stack.Screen name="Login" component={Login } />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Service i" component={PlumberViewScreen} />
           {/* <Stack.Screen name="Loginn" component={Header} /> */}
           {/* <Stack.Screen name="hey" component={Footer} /> */}
    
          
      </Stack.Navigator>
       </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
