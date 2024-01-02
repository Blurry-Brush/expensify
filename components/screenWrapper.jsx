import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function screenWrapper({children}) {
  let statusBarHeight = StatusBar.currentHeight;
  return <View style={{paddingTop: statusBarHeight}}>{children}</View>;
}

const styles = StyleSheet.create({});
