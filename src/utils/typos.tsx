import { StyleSheet } from 'react-native'
import { colors } from './themes'

export const TextStyles = StyleSheet.create({
  animatedHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    paddingBottom: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    paddingBottom: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'normal',
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.text,
  },
  subText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 10,
    fontWeight: 'normal',
    color: colors.textSecondary,
  },
})
