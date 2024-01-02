import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../themes';
import randomImage from '../assets/images/randomImage';

const items = [
  {
    id: 1,
    place: 'Gujrat',
    country: 'India',
  },
  {
    id: 2,
    place: 'London Eye',
    country: 'England',
  },
  {
    id: 3,
    place: 'Washington dc',
    country: 'America',
  },
  {
    id: 4,
    place: 'New york',
    country: 'America',
  },
  
];

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between p-4 items-center">
        <Text className={`text-gray-700 font-extrabold text-3xl shadow-sm`}>
          Expensify
        </Text>
        <TouchableOpacity className="bg-white py-2 px-3 border border-gray-300 rounded-full">
          <Text className="text-gray-700 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* banner image */}
      <View className="flex flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          className="w-60 h-60"
          source={require('../assets/images/banner.png')}
        />
      </View>

      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 text-xl font-bold">Recent Trips</Text>
          <TouchableOpacity className="bg-white py-2 px-3 border border-gray-300 rounded-full">
            <Text className="text-gray-700 font-semibold">Add Trip</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 430, paddingBottom: 50}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={item => item.id}
            data={items}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="m-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity className="bg-white p-3 rounded-2xl mb-3 shadow-xl">
                  <View>
                    <Image
                      source={randomImage()}
                      className="h-32 w-32 mb-2"
                    />
                    <Text className="text-gray-700 font-bold">
                      {item.place}
                    </Text>
                    <Text className="text-gray-700 text-xs">
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
