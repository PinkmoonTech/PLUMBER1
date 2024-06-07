import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        <Text style={styles.link} onPress={() => console.log('Redirect to PINKMOON Technologies')}>
          PINKMOON TECHNOLOGIES Pvt Ltd
        </Text>
      </Text>
      {/* <Text style={styles.privacyPolicy}>Privacy Policy</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'lightpink',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: 'white',
    marginBottom: 2,
  },
  link: {
    textDecorationLine: 'none',
    color: 'white',
    fontWeight: 'bold',
  },

});

export default Footer;
