import React, {Component} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import Backdrop from '../components/Backdrop';
import {Text} from '../components/Typos';
import {colors, metrics} from '../utils/themes';

const SWIPE_HEIGHT = 150;
const INIT_OFFSET = 40;

class ActionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      dragging: false,
      offsetBottom: new Animated.Value(INIT_OFFSET),
    };
    this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
    this.onPanResponderTerminate = this.onPanResponderTerminate.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderRelease = this.onPanResponderRelease.bind(this);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
    });
  }

  onPanResponderGrant() {
    this.setState({
      dragging: true,
    });
  }

  onPanResponderTerminate() {
    this.setState({
      dragging: false,
      offsetBottom: new Animated.Value(INIT_OFFSET),
    });
  }

  onPanResponderMove(evt, gestureState) {
    if (gestureState.dy > -INIT_OFFSET) {
      this.setState({
        offsetBottom: new Animated.Value(gestureState.dy),
      });
    }
  }

  onPanResponderRelease(evt, gestureState) {
    if (gestureState.dy > SWIPE_HEIGHT) {
      this.setState({
        visible: false,
        dragging: false,
      });
    } else {
      const {offsetBottom} = this.state;
      Animated.timing(offsetBottom, {
        toValue: INIT_OFFSET,
        duration: 200,
        useNativeDriver: true,
      }).start(() =>
        this.setState({
          dragging: false,
        }),
      );
    }
  }

  render() {
    const {offsetBottom, dragging, visible} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Backdrop onPress={() => navigation.goBack()} visible={visible} />
        <Animated.View
          style={[
            styles.sheetContainer,
            {
              transform: [{translateY: offsetBottom}],
            },
          ]}
          ref={ref => (this.viewRef = ref)}
          {...this._panResponder.panHandlers}
        >
          <View style={[styles.indicator, dragging && styles.dragging]} />
          <View style={styles.sheet}>
            <Text>Hello</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default ActionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    transform: [
      {
        translateY: INIT_OFFSET,
      },
    ],
  },
  indicator: {
    height: 6,
    width: 60,
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    opacity: 0.8,
    marginBottom: metrics.lessPadding,
    alignSelf: 'center',
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    padding: metrics.padding,
    paddingBottom: metrics.padding - INIT_OFFSET,
  },
  dragging: {
    opacity: 0.5,
  },
});
