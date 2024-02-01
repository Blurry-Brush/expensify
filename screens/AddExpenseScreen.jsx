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
import {categories} from '../constants';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';
import Loading from '../components/Loading';

const AddExpenseScreen = props => {
  const {id} = props.route.params;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const handleTrip = async () => {
    if (title && amount && category) {
      //good to go
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        category,
        amount,
        title,
        tripId: id,
      });
      setLoading(false);

      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      //show error
      Snackbar.show({
        text: 'Please fill all the fields!',
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
              Add Expense
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/expenseBanner.png')}
            />
          </View>
          {/* inputs */}
          <View className="space-y-2 mx-2">
            <Text className="text-black text-lg font-black">For What?</Text>
            <TextInput
              value={title}
              onChangeText={value => setTitle(value)}
              className="p-2 text-black text-lg bg-white rounded-full mb-3"
            />
            <Text className="text-black text-lg font-black">How Much</Text>
            <TextInput
              value={amount}
              onChangeText={value => setAmount(value)}
              className="p-2 text-black text-lg bg-white rounded-full mb-3"
            />
          </View>
          <View className="mx-2 space-x-2">
            <Text className="text-black text-lg font-black">Category</Text>
            <View className="flex-row flex-wrap">
              {categories.map(cat => {
                let bgColor = 'bg-white';
                if (cat.value === category) bgColor = 'bg-green-200';
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`${bgColor} px-4 p-3 mb-2 mr-2 rounded-full`}>
                    <Text className="text-black">{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleTrip}
              style={{backgroundColor: colors.button}}
              className="my-4 p-3 shadow-sm mx-2 rounded-full">
              <Text className="text-white text-center text-lg font-bold">
                Add Expense
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({});
