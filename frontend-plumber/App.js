import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterAsService from "./app/screens/RegisterAsService";
import PlumberViewScreen from "./app/screens/PlumberViewScreen";
import Header from "./app/screens/Header";
import Footer from "./app/screens/Footer";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import LoginPage from "./app/screens/loginpage";

import RegisterAsCustomer from "./app/screens/RegisterAsCustomer";

// import Header from "./Header";

const Stack = createStackNavigator();

const App = () => {
  return (
    // <RegistrationScreen/>
    // <Header/>

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          
            
          
           <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterAsService" component={RegisterAsService} />
          <Stack.Screen name="RegisterAsCustomer"component={RegisterAsCustomer}
          />

          <Stack.Screen name="Service i" component={PlumberViewScreen} />
          {/* <Stack.Screen name="LoginPage" component={LoginPage} /> */}

          {/* <Stack.Screen name="Loginn" component={Header} /> */}
          {/* <Stack.Screen name="hey" component={Footer} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;