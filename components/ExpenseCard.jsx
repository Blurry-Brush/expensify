import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {categoryBG} from '../themes';

const ExpenseCard = ({item}) => {
  return (
    <View>
      <View
        style={{backgroundColor: categoryBG[item.category]}}
        className="p-3 mb-3 rounded-2xl px-5 h-15 flex-row justify-between items-center">
        <View>
          <Text className="text-black font-black ">{item.title}</Text>
          <Text className="text-black font-bold text-xs">{item.category}</Text>
        </View>
        <View>
          <Text className="text-black">$ {item.amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({});
