import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, metrics } from '../utils/themes'

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Something cool will be lauched here.</Text>
      <Text style={styles.welcome}>Website: https://audioaz.com/</Text>
      <Text style={styles.welcome}>Fanpage: facebook.com/audioazcom</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.padding,
  },
  lottie: {
    width: 280,
    height: 280,
  },
  welcome: {
    textAlign: 'center',
  },
})
