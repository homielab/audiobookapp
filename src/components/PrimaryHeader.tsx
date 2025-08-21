import React from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { metrics } from '../utils/themes'

interface Props {
  animatedY: Animated.AnimatedInterpolation<string | number>
  children: React.ReactNode
}

export default function PrimaryHeader({ animatedY, children }: Props) {
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animatedY }] }]}
    >
      <Image
        source={require('../images/header-bg.png')}
        style={styles.headerBg}
      />
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: metrics.statusBarHeight,
    height: metrics.headerHeightX3,
    width: metrics.screenWidth,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: metrics.headerHeightX3,
    width: metrics.screenWidth,
    resizeMode: 'stretch',
  },
})
