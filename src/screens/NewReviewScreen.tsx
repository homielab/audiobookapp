import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native'
import Header from '../components/Header'
import StarRating from '../components/StarRating'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

export default function NewReviewScreen() {
  const contentOffset = useRef(new Animated.Value(0))

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <StarRating rating={0} />
        <Text style={[TextStyles.subText, styles.welcome]}>
          Select rating star
        </Text>
      </View>
      <TextInput style={styles.input} autoCorrect={false} placeholder="Title" />
      <TextInput
        multiline
        style={[styles.input, styles.multiline]}
        autoCorrect={false}
        placeholder="Content"
      />
      <Header
        hasBackButton
        animatedOpacity={contentOffset.current.interpolate({
          inputRange: [0, 60, 70],
          outputRange: [0, 0.3, 1],
          extrapolate: 'clamp',
        })}
        animatedY={contentOffset.current.interpolate({
          inputRange: [0, 70],
          outputRange: [60, 0],
          extrapolate: 'clamp',
        })}
        title="Write review"
        rightButton={{
          onPress: () => null,
          iconName: 'paper-plane',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.headerHeight,
  },
  center: {
    marginTop: metrics.extraPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.background,
    padding: metrics.lessPadding,
    borderRadius: metrics.radius,
    marginTop: metrics.padding,
    marginHorizontal: metrics.padding,
    fontSize: 16,
  },
  multiline: {
    height: 120,
  },
  welcome: {},
})
