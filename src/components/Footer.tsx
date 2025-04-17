import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


//typical blue footer styled to be at the bottom of the screen with my name and current year on it
export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>© 2025 Rafan Syed</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  //set footer at the bottom with centered items
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0077b6',
    padding: 16,
    alignItems: 'center',
  },
  //footer text to be set to white with 16 font size
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});
