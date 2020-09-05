import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import MainPage from './screens/MainPage';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  return (
        <MainPage />
  );
}
