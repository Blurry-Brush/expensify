import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
