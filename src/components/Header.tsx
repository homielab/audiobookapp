import FontAwesome6, {
  type FontAwesome6SolidIconName,
} from '@react-native-vector-icons/fontawesome6'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

export default function Header({
  animatedY,
  animatedOpacity,
  title,
  rightButton,
  hasBackButton,
}: {
  animatedY?: Animated.AnimatedInterpolation<string | number>
  animatedOpacity?: Animated.AnimatedInterpolation<string | number>
  title: string
  rightButton?: {
    onPress: () => void
    iconName: FontAwesome6SolidIconName
  }
  hasBackButton?: boolean
}) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.center,
          {
            transform: [{ translateY: animatedY || 0 }],
            opacity: animatedOpacity || 1,
          },
        ]}
      >
        <Text numberOfLines={1} style={TextStyles.title}>
          {title}
        </Text>
        {rightButton ? (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => rightButton.onPress()}
          >
            <FontAwesome6
              iconStyle="solid"
              name={rightButton.iconName}
              size={26}
              color={colors.black}
            />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
      {hasBackButton ? (
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6
            iconStyle="solid"
            name="arrow-left"
            size={28}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: metrics.screenWidth,
    height: metrics.headerHeight,
    backgroundColor: colors.white,
    paddingTop: metrics.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  leftButton: {
    paddingHorizontal: metrics.lessPadding,
    paddingBottom: metrics.lessPadding,
    position: 'absolute',
    left: 0,
    top: metrics.statusBarHeight,
  },
  rightButton: {
    paddingHorizontal: metrics.lessPadding,
    paddingBottom: metrics.lessPadding,
    position: 'absolute',
    right: 0,
    top: metrics.statusBarHeight,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.screenWidth,
    height: metrics.headerHeight,
    paddingTop: metrics.statusBarHeight,
    flex: 1,
    paddingHorizontal: 40,
  },
})
