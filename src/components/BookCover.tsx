import React from 'react'
import {
  Image,
  type ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { colors, metrics } from '../utils/themes'

interface Props {
  imageSource?: ImageSourcePropType
}

export default function BookCover({ imageSource }: Props) {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.coverImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.white,
    width: metrics.coverWidth,
    height: metrics.coverHeight,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  coverImage: {
    width: metrics.coverWidth,
    height: metrics.coverHeight,
    resizeMode: 'stretch',
  },
})
