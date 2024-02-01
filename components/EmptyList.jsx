import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyList = ({message}) => {
  return (
    <View className="flex-1 justify-center items-center my-5 space-y-3">
        <Image className="w-36 h-36" source={require("../assets/images/empty.png")} />
      <Text className="text-black font-bold">{message || "Data not found!"}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})