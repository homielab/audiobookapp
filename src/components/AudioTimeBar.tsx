import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, metrics } from '../utils/themes'

interface Props {
  percent: number
}

export default function AudioTimeBar({ percent }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.done, { width: metrics.screenWidth * percent }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    width: metrics.screenWidth,
    height: 2,
  },
  done: {
    backgroundColor: colors.textSecondary,
    width: 100,
    height: 2,
  },
})
