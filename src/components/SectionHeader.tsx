import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

interface Props {
  title: string
  right?: React.ReactNode
}

export default function SectionHeader({ title, right }: Props) {
  return (
    <View style={styles.container}>
      <Text style={TextStyles.title}>{title}</Text>
      <View style={styles.divider} />
      {right}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.padding,
    marginBottom: metrics.lessPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    marginHorizontal: metrics.lessPadding,
  },
})
