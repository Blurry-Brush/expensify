import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import {Image} from 'react-native';
import {colors} from '../themes';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLoading} from '../redux/slices/user';
import Loading from '../components/Loading';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      //show error
      Snackbar.show({
        text: 'Email and Password required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-2">
            <View className="absolute top-0 left-0">
              <BackButton />
            </View>
            <Text className="text-black font-bold text-xl text-center">
              Sign In
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-80 w-80"
              source={require('../assets/images/login.png')}
            />
          </View>
          {/* inputs */}
          <View className="space-y-2 mx-2">
            <Text className="text-black text-lg font-black">Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="p-2 text-black text-lg bg-white rounded-full mb-3"
            />
            <Text className="text-black text-lg font-black">Password</Text>
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={value => setPassword(value)}
              className="p-2 text-black text-lg bg-white rounded-full mb-3"
            />
            <TouchableOpacity className="flex-row justify-end">
              <Text className="text-black">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

    
        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{backgroundColor: colors.button}}
              className="my-6 p-3 shadow-sm mx-2 rounded-full">
              <Text className="text-white text-center text-lg font-bold">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
