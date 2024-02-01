import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../themes';
import {useNavigation} from '@react-navigation/native';
import {LinkIcon} from 'react-native-heroicons/outline';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="h-full flex justify-around">
        <View className="flex-row mt-10 justify-center ">
          <Image
            className="h-80 w-80"
            source={require('../assets/images/Welcome-bro.png')}
          />
        </View>

        <View className="mx-5 mb-20">
          <Text className="text-black text-center font-bold text-4xl mb-10">
            Expensify
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className="mb-5 p-3 rounded-full"
            style={{backgroundColor: colors.button}}>
            <Text className="text-white text-center text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="p-3 rounded-full"
            style={{backgroundColor: colors.button}}>
            <Text className="text-white text-center text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mx-6 justify-end flex-row">
          <View className="flex-row gap-2 items-center">
            <Text style={{color: colors.button}} className="text-lg">
              Github
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://github.com/Blurry-Brush/expensify')
              }>
              <LinkIcon size={20} color={colors.button} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
