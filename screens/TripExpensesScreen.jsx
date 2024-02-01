import {
  FlatList,
  Image,
  ScrollView,
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
import BackButton from '../components/BackButton';
import ExpenseCard from '../components/ExpenseCard';
import {deleteDoc, doc, getDocs, query, where} from 'firebase/firestore';
import {db, expensesRef} from '../config/firebase';
import {tripsRef} from '../config/firebase';
import {TrashIcon} from 'react-native-heroicons/solid';
import Snackbar from 'react-native-snackbar';
export default function TripExpensesScreen(props) {
  const navigation = useNavigation();
  const {id, place, country} = props.route.params;
  const [totalExpense, setTotalExpense] = useState();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripId', '==', id));
    const querySnapShot = await getDocs(q);
    let data = [];

    querySnapShot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    let total = 0;
    // console.log(data);
    data.forEach(item => {
      total += parseInt(item.amount);
    });
    setTotalExpense(total);

    setExpenses(data);
  };

  const deleteTrip = async () => {
    await deleteDoc(doc(db, 'trips', id));
    Snackbar.show({
      text: `Succesfully deleted the ${place} trip`,
      backgroundColor: 'green',
    });
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);

  return (
    <View className="flex-1">
      <View className="relative mt-5">
        <View className="absolute top-2 left-4">
          <BackButton />
        </View>
        <View>
          <Text className="text-black font-bold text-xl text-center">
            {place}
          </Text>
          <Text className="text-black  text-xl text-center">{country}</Text>
        </View>

        <View className="absolute top-2 right-2">
          <TouchableOpacity onPress={() => deleteTrip()}>
            <TrashIcon color="#ef233c" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* banner image */}
      <View className="flex flex-row justify-center items-center rounded-xl mx-4 mb-4">
        <Image
          className="w-80 h-80"
          source={require('../assets/images/7.png')}
        />
      </View>

      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 text-xl font-bold">Expenses</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddExpense', {id, place, country})
            }
            className="bg-white py-2 px-3 border border-gray-300 rounded-full">
            <Text className="text-gray-700 font-semibold">Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <View className="bg-yellow-100 p-2 px-4 rounded-full border border-yellow-700">
            <Text className="text-yellow-800 font-bold text-md">
              Total Expense : $ {totalExpense}
            </Text>
            
          </View>
        </View>

        <View style={{height: 430, paddingBottom: 200}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            key={item => item.id}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any expenses yet"} />
            }
            data={expenses}
            className=""
            renderItem={({item}) => {
              return <ExpenseCard item={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
