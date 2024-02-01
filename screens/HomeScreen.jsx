import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../themes';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';

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
  const handleLogout = async () => {
    await signOut(auth);
  };
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapShot = await getDocs(q);
    let data = [];

    querySnapShot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };

  useEffect(() => {
    if(isFocused)
    fetchTrips();
  }, [isFocused]);

  const navigation = useNavigation();
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between p-4 items-center">
        <Text className={`text-gray-700 font-extrabold text-3xl`}>
          Expensify
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white py-2 px-3 border border-gray-300 rounded-full">
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
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="bg-white py-2 px-3 border border-gray-300 rounded-full">
            <Text className="text-gray-700 font-semibold">Add Trip</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 430, paddingBottom: 50}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={item => item.id}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any trips yet"} />
            }
            data={trips}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="m-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpenses', {...item})}
                  className="bg-white p-3 rounded-2xl mb-3">
                  <View>
                    <Image source={randomImage()} className="h-32 w-32 mb-2" />
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
