import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Review } from '../types'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'
import StarRating from './StarRating'

interface Props {
  width?: number
  height?: number
  item: Review
}

export default function ReviewItem({ width, height, item }: Props) {
  return (
    <View
      style={[
        styles.container,
        width
          ? {
              width: width,
            }
          : {},
        height ? { height: height } : {},
      ]}
    >
      <Text style={TextStyles.subtitle}>{item.title}</Text>
      <StarRating mini rating={3.4} />
      <Text style={TextStyles.text}>{item.content}</Text>
      <View style={styles.author}>
        <Text style={TextStyles.subText}>{item.date}</Text>
        <Text style={TextStyles.subText}>{item.user}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: metrics.padding,
    marginBottom: metrics.padding,
    borderRadius: metrics.radius,
  },
  author: {
    position: 'absolute',
    right: metrics.padding,
    top: metrics.padding,
  },
})
