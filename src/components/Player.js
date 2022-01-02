import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PlayerControl from '../helpers/PlayerControl';
import {connect} from '../recontext/store';
import PLAYER_STATUS from '../utils/playerStatus';
import seconds2time from '../utils/seconds2time';
import {colors, metrics} from '../utils/themes';
import AudioTimeBar from './AudioTimeBar';
import {Text, Title} from './Typos';

const SCREEN_HEIGHT = metrics.screenHeight;
const SCREEN_WIDTH = metrics.screenWidth;
const TABBAR_HEIGHT = metrics.tabbarHeight;
const MAX_PLAYER_OPACITY = 0.98;

class Player extends PureComponent {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(SCREEN_WIDTH);
    this._deltaY = new Animated.Value(SCREEN_HEIGHT);
    this._playerHeight = 0;
    this._playerY = SCREEN_HEIGHT;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this.onPanResponderMove.bind(this),
      onPanResponderRelease: this.onPanResponderRelease.bind(this),
      onPanResponderTerminate: this.onPanResponderRelease.bind(this),
    });
    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.showFullPlayer = this.showFullPlayer.bind(this);
    this._intervalTimer = null;
    this.state = {
      currentTime: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentVisible = this.props.player.visible;
    const nextVisible = nextProps.player.visible;
    if (!currentVisible && nextVisible) {
      this.showMiniPlayer();
    }

    const currentStatus = this.props.player.status;
    const nextStatus = nextProps.player.status;
    if (
      !currentStatus !== PLAYER_STATUS.PLAYING &&
      nextStatus === PLAYER_STATUS.PLAYING
    ) {
      if (this._intervalTimer) {
        clearInterval(this._intervalTimer);
      }
      this._intervalTimer = setInterval(this.updateCurrentTime.bind(this), 500);
    } else {
      if (this._intervalTimer) {
        clearInterval(this._intervalTimer);
      }
      if (
        nextStatus !== PLAYER_STATUS.PLAYING &&
        nextStatus !== PLAYER_STATUS.PAUSE
      ) {
        this.setState({
          currentTime: 0,
        });
      }
    }
  }

  onPanResponderMove(event, gestureState) {
    if (gestureState.dx > 0) {
      this._deltaX.setValue(gestureState.dx);
    }
  }

  onPanResponderRelease(event, gestureState) {
    if (gestureState.dx > SCREEN_WIDTH / 2) {
      Animated.spring(this._deltaX, {
        toValue: SCREEN_WIDTH,
        useNativeDriver: true,
      }).start();
      PlayerControl.unloadAudio();
    } else {
      Animated.spring(this._deltaX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }

  async updateCurrentTime() {
    const seconds = await PlayerControl.getCurrentTime();
    if (seconds) {
      this.setState({currentTime: seconds});
    }
  }

  togglePlay() {
    PlayerControl.togglePlay();
  }

  measureView(event) {
    this._playerHeight = event.nativeEvent.layout.height;
    this._playerY =
      SCREEN_HEIGHT -
      TABBAR_HEIGHT -
      this._playerHeight -
      metrics.bottomSpaceHeight;
    this._deltaY.setValue(this._playerY);
  }

  showMiniPlayer() {
    Animated.spring(this._deltaX, {
      toValue: 0,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }

  showFullPlayer() {}

  renderPlayButtonComponent(status) {
    if (status === PLAYER_STATUS.PLAYING) {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={this.togglePlay}>
            <Feather name="pause" size={22} color={colors.black} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={this.togglePlay}>
            <Feather name="play" size={22} color={colors.black} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderLoading() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating />
      </View>
    );
  }

  renderControls() {
    const {player} = this.props;
    const {currentTime} = this.state;
    const status = player.status;

    return (
      <View style={styles.controls}>
        {this.renderPlayButtonComponent(status)}
        <Text>
          {seconds2time(currentTime)}/{seconds2time(player.duration)}
        </Text>
      </View>
    );
  }

  render() {
    const {player} = this.props;
    const {currentTime} = this.state;
    const book = player?.book || {};
    const timePercent = player?.duration ? currentTime / player.duration : 0;

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        onLayout={event => this.measureView(event)}
        style={[
          styles.player,
          {
            opacity: this._deltaX.interpolate({
              inputRange: [0, SCREEN_WIDTH],
              outputRange: [MAX_PLAYER_OPACITY, 0],
              extrapolateRight: 'clamp',
            }),
            transform: [
              {translateY: this._deltaY},
              {
                translateX: this._deltaX,
              },
            ],
          },
        ]}
      >
        <AudioTimeBar percent={timePercent} />
        <View style={styles.row}>
          <Animated.View style={styles.info}>
            <Title numberOfLines={1}>{book.title} </Title>
            <Text numberOfLines={1}>{player?.track?.title} </Text>
          </Animated.View>
          {player?.duration ? this.renderControls() : this.renderLoading()}
        </View>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(Player);

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    width: metrics.screenWidth,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.darkOpacity,
    minHeight: 70,
    // borderTopRightRadius: metrics.radius,
    // borderTopLeftRadius: metrics.radius
  },
  row: {
    flexDirection: 'row',
    paddingTop: metrics.padding,
    paddingHorizontal: metrics.padding,
  },
  info: {
    flex: 1,
    paddingRight: 40,
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: metrics.padding,
  },
  button: {},
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
