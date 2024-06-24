// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Footer = () => {
//   return (
//     <View style={styles.footer}>
//       <Text style={styles.footerText}>
//         <Text style={styles.link} onPress={() => console.log('Redirect to PINKMOON Technologies')}>
//           PINKMOON TECHNOLOGIES Pvt Ltd
//         </Text>
//       </Text>
//       {/* <Text style={styles.privacyPolicy}>Privacy Policy</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#b0c4de',
//     padding: 20,
//     alignItems: 'center',
//     // marginBottom:20
//   },
//   footerText: {
//     fontSize: 15,
//     color: 'white',
//     marginBottom: 2,
//     // paddingTop:10
//   },
//   link: {
//     textDecorationLine: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//   },

// });

// export default Footer;



import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        <Text style={styles.link} onPress={() => console.log('Redirect to PINKMOON Technologies')}>
          PINKMOON TECHNOLOGIES Pvt Ltd
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: windowWidth, // Adjust to full screen width
    backgroundColor: '#b0c4de',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: 'white',
    marginBottom: 2,
  },
  link: {
    textDecorationLine: 'none',
    color: '#c1205f',
    fontWeight: 'bold',
  },
});

export default Footer;
