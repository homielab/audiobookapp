import React, {Component} from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import {metrics} from '../utils/themes';

class PrimaryHeader extends Component {
  render() {
    const {animatedY, children} = this.props;
    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: animatedY}]}]}
      >
        <Image
          source={require('../images/header-bg.png')}
          style={styles.headerBg}
        />
        {children}
      </Animated.View>
    );
  }
}

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: metrics.statusBarHeight,
    height: metrics.headerHeightX3,
    width: metrics.screenWidth,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: metrics.headerHeightX3,
    width: metrics.screenWidth,
    resizeMode: 'stretch',
  },
});
