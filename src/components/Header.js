import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors, metrics} from '../utils/themes';
import {Title} from './Typos';

const Header = ({
  animatedY,
  animatedOpacity,
  title,
  rightButton,
  hasBackButton,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.center,
          {
            transform: [{translateY: animatedY || 0}],
            opacity: animatedOpacity || 1,
          },
        ]}
      >
        <Title numberOfLines={1}>{title}</Title>
        {rightButton ? (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => rightButton.onPress()}
          >
            <Feather
              name={rightButton.iconName}
              size={26}
              color={colors.black}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
      {hasBackButton ? (
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="arrow-left"
            size={28}
            color={colors.black}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

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
});
