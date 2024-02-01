import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../components/BackButton';
import {Image} from 'react-native';
import {colors} from '../themes';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import Animated, {useSharedValue} from 'react-native-reanimated';

const AddTripScreen = () => {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  //state.slice
  const {user} = useSelector(state => state.user);

  const navigation = useNavigation();
  const handleTrip = async () => {
    if (place && country) {
      //good to go
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      //show error
      Snackbar.show({
        text: 'Place and Country are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton />
            </View>
            <Text className="text-black font-bold text-xl text-center">
              Add Trip
            </Text>
          </View>
          {/* image */}
          <Animated.View className="flex-row justify-center my-3 mt-5">
            <Animated.Image
              style={{height: 300, width: 300}}
              source={require('../assets/images/4.png')}
            />
          </Animated.View>
          {/* inputs */}
          <View className="space-y-2 mx-2">
            <Text className="text-black text-lg font-black">
              Where on Earth?
            </Text>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              className="p-2 text-black text-lg bg-white rounded-full mb-3"
            />
            <Text className="text-black text-lg font-black">
              Which Country?
            </Text>
            <TextInput
              value={country}
              onChangeText={value => setCountry(value)}
              className="p-2 text-black text-lg bg-white rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleTrip}
              style={{backgroundColor: colors.button}}
              className="my-6 p-3 shadow-sm mx-2 rounded-full">
              <Text className="text-white text-center text-lg font-bold">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddTripScreen;

const styles = StyleSheet.create({});
