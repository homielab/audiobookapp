import FontAwesome6, {
  type FontAwesome6SolidIconName,
} from '@react-native-vector-icons/fontawesome6'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

const MAX_STAR = 5

interface Props {
  rating: number
  mini?: boolean
}

export default function StartRating({ rating, mini }: Props) {
  const starSize = mini ? 20 : 24
  const starColor = mini ? colors.star : colors.black
  const starsComponent = []
  let starLeft = Math.round(rating * 2) / 2

  for (let index = 0; index < MAX_STAR; index++) {
    let iconName: FontAwesome6SolidIconName = 'star'
    let filled = false
    if (starLeft > 0) {
      iconName = starLeft < 1 ? 'star-half-stroke' : 'star'
      starLeft--
      filled = true
    }

    starsComponent.push(
      <FontAwesome6
        iconStyle={filled ? 'solid' : 'regular'}
        key={index}
        name={iconName}
        size={starSize}
        color={starColor}
        style={styles.starIcon}
      />,
    )
  }

  if (mini) {
    return <View style={styles.mini}>{starsComponent}</View>
  }

  return (
    <View style={styles.container}>
      {starsComponent}
      {rating > 0 ? (
        <Text style={[TextStyles.title, styles.text]}>{rating}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.lessPadding,
    marginBottom: metrics.lessPadding / 2,
    flexDirection: 'row',
    backgroundColor: colors.transparent,
  },
  mini: {
    marginVertical: metrics.lessPadding / 2,
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: -2,
  },
  text: {
    marginLeft: metrics.lessPadding,
    color: colors.black,
  },
})
