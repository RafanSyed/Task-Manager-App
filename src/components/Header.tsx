import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Blue header with Title
export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Chapter One Task Manager</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //Blue header with aligned text
  headerContainer: {
    backgroundColor: '#0077b6',
    padding: 16,
    alignItems: 'center',
  },
  //white color text with bold font
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
