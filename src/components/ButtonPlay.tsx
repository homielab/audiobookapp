import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../utils/themes'
import { TextStyles } from '../utils/typos'

export default function ButtonPlay({
  onPress,
  isPlaying,
}: {
  onPress: () => void
  isPlaying: boolean
}) {
  if (isPlaying) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <FontAwesome6
          iconStyle="solid"
          name="pause"
          size={20}
          color={colors.white}
        />
        <Text style={[TextStyles.text, styles.buttonText]}>Pause</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome6
        iconStyle="solid"
        name="headphones"
        size={20}
        color={colors.white}
      />
      <Text style={styles.buttonText}>Play</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 120,
    borderRadius: 15,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
})
