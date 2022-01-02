import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../utils/themes';
import {Text} from './Typos';

const ButtonNewReview = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('NewReviewScreen')}
    >
      <Feather
        name="edit"
        size={16}
        color={colors.primary}
        style={styles.icon}
      />
      <Text style={styles.text}>Write your review</Text>
    </TouchableOpacity>
  );
};

export default ButtonNewReview;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: colors.primary,
  },
});
