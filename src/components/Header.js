/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {Animated, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import {Title} from './Typos';
import {metrics, colors} from '../utils/themes';

class Header extends PureComponent {
  render() {
    const {
      animatedY,
      animatedOpacity,
      title,
      rightButton,
      hasBackButton,
      navigation,
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.center,
            {
              transform: [{translateY: animatedY || 0}],
              opacity: animatedOpacity || 1,
            },
          ]}>
          <Title numberOfLines={1}>{title}</Title>
          {rightButton ? (
            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => rightButton.onPress()}>
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
            onPress={() => navigation.goBack()}>
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
  }
}

Header.propTypes = {
  animatedY: PropTypes.instanceOf(Animated.Interpolation).isRequired,
  animatedOpacity: PropTypes.instanceOf(Animated.Interpolation).isRequired,
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.shape({
    onPress: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
  }),
  hasBackButton: PropTypes.bool,
};

Header.defaultProps = {
  rightButton: null,
  hasBackButton: true,
};

export default withNavigation(Header);

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
