import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Book } from '../types'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'
import BookCover from './BookCover'
import Category from './Category'
import StarRating from './StarRating'

interface Props {
  index: number
  item: Book
  onPress: () => void
}

export default function CardBook({ index, item, onPress }: Props) {
  const visibility = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(visibility.current, {
      toValue: 1,
      duration: index * 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View />
      <Animated.View
        style={{
          opacity: visibility.current,
          transform: [
            {
              translateY: visibility.current.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 1],
              }),
            },
          ],
        }}
      >
        <View style={styles.cardHeader}>
          <StarRating rating={item.rating} />
        </View>
        <View style={styles.card}>
          <Text numberOfLines={2} style={TextStyles.title}>
            {item.title}
          </Text>
          <Text style={TextStyles.text}>{item.authors.join(' ,')}</Text>
          <Category data={item.categories} />
          <View style={styles.line} />
          <Text style={TextStyles.caption}>
            Narrator: {item.readers.join(' ,')}
          </Text>
        </View>
        <BookCover imageSource={item.image} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: metrics.padding,
  },
  cardHeader: {
    marginLeft: metrics.coverWidth + metrics.lessPadding,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    padding: metrics.lessPadding,
    minHeight: metrics.coverHeight - 30,
    marginLeft: metrics.coverWidth / 3,
    paddingLeft: (metrics.coverWidth * 2) / 3 + metrics.padding,
    // ...colors.shadow
  },
  line: {
    height: 2,
    width: metrics.extraPadding,
    backgroundColor: colors.textSecondary,
    marginBottom: metrics.padding / 2,
  },
})
