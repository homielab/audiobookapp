import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../utils/themes'
import { TextStyles } from '../utils/typos'

export default function ButtonNewReview() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('NewReviewScreen')}
    >
      <FontAwesome6
        name="pen"
        size={16}
        iconStyle="solid"
        color={colors.primary}
        style={styles.icon}
      />
      <Text style={[TextStyles.text, styles.text]}>Write your review</Text>
    </TouchableOpacity>
  )
}

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
})
