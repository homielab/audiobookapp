import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

interface Props {
  data: string[]
}

export default function CategoryTags({ data }: Props) {
  if (data?.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={styles.item} key={index}>
          <Text style={TextStyles.subText}>{item}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.lessPadding,
    flexDirection: 'row',
  },
  item: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textSecondary,
    borderRadius: metrics.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
})
