import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveEmail, setSaveEmail] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Text> <Icon name="home" size={50} /> </Text> */}
      
      <Text style={styles.title}>Log in to your account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password "
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={saveEmail}
            onValueChange={setSaveEmail}
          />
          <Text style={styles.switchLabel}>Save Email</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Haven't setup your account yet? <Text style={styles.registerLink}>Register</Text>
        </Text>
        <View style={styles.authMethods}>
          <TouchableOpacity style={styles.authMethod}>
            <Text style={styles.authMethodText}>🔒 Passcode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authMethod}>
            <Text style={styles.authMethodText}>📱 Face ID®</Text>
           
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Help  •  Terms & Conditions  •  Privacy Policy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A1B9A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  // eyeIcon: {
  //   marginLeft: -30,
  // },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    marginLeft: 10,
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
  },
  forgotPassword: {
    color: '#6A1B9A',
    marginBottom: 20,
  },
  registerText: {
    color: '#6A1B9A',
    marginBottom: 20,
  },
  registerLink: {
    textDecorationLine: 'underline',
  },
  authMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  authMethod: {
    flex: 1,
    alignItems: 'center',
  },
  authMethodText: {
    color: '#6A1B9A',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    color: '#fff',
  },
});

export default LoginScreen;