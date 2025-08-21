import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import { PlayerContext } from '../context/PlayerContext'
import { PLAY_STATUS } from '../utils/playerStatus'
import seconds2time from '../utils/seconds2time'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'
import AudioTimeBar from './AudioTimeBar'

export default function Player() {
  const _deltaX = useRef(new Animated.Value(metrics.screenWidth))
  const _deltaY = useRef(new Animated.Value(metrics.screenHeight))
  const _playerHeight = useRef(0)
  const _playerY = useRef(metrics.screenHeight)
  const intervalTimer = useRef<number>(0)
  const durationIntervalTimer = useRef<number>(0)
  const player = useContext(PlayerContext)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const isPlaying = player.playerState.status === PLAY_STATUS.PLAYING
  const status = player.playerState.status
  const currentTrack =
    player.playerState.playingTrackIndex !== null
      ? player.playerState.book?.tracks[player.playerState.playingTrackIndex]
      : null
  const currentTrackLink = currentTrack?.link

  useEffect(() => {
    if (status === PLAY_STATUS.INIT) {
      Animated.spring(_deltaX.current, {
        toValue: metrics.screenWidth,
        useNativeDriver: true,
      }).start()
      SoundPlayer.stop()
    } else {
      Animated.spring(_deltaX.current, {
        toValue: 0,
        delay: 1000,
        useNativeDriver: true,
      }).start()
    }

    if (status === PLAY_STATUS.PLAYING) {
      intervalTimer.current = setInterval(async () => {
        const info = await SoundPlayer.getInfo()
        setCurrentTime(info.currentTime)
      }, 1000)
      SoundPlayer.play()
    } else {
      clearInterval(intervalTimer.current)
      SoundPlayer.pause()
    }
  }, [status])

  useEffect(() => {
    if (currentTrackLink && isPlaying) {
      SoundPlayer.playUrl(currentTrackLink)
    }
  }, [currentTrackLink, isPlaying])

  useEffect(() => {
    if (!duration && currentTrackLink) {
      durationIntervalTimer.current = setInterval(() => {
        SoundPlayer.getInfo().then(info => {
          if (info.duration) {
            setDuration(info.duration)
            clearInterval(durationIntervalTimer.current)
          }
        })
      }, 1000)
    }

    return () => {
      clearInterval(durationIntervalTimer.current)
    }
  }, [duration, currentTrackLink])

  const timePercent = duration ? currentTime / duration : 0

  return (
    <Animated.View
      {...PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_event, gestureState) => {
          if (gestureState.dx > 0) {
            _deltaX.current.setValue(gestureState.dx)
          }
        },
        onPanResponderRelease: (_event, gestureState) => {
          if (gestureState.dx > metrics.screenWidth / 2) {
            player.stop()
          } else {
            Animated.spring(_deltaX.current, {
              toValue: 0,
              useNativeDriver: true,
            }).start()
          }
        },
        onPanResponderTerminate: (_event, gestureState) => {
          if (gestureState.dx > metrics.screenWidth / 2) {
            player.stop()
          } else {
            Animated.spring(_deltaX.current, {
              toValue: 0,
              useNativeDriver: true,
            }).start()
          }
        },
      }).panHandlers}
      onLayout={event => {
        _playerHeight.current = event.nativeEvent.layout.height
        _playerY.current =
          metrics.screenHeight -
          metrics.tabbarHeight -
          _playerHeight.current -
          metrics.bottomSpaceHeight
        _deltaY.current.setValue(_playerY.current)
      }}
      style={[
        styles.player,
        {
          opacity: _deltaX.current.interpolate({
            inputRange: [0, metrics.screenWidth],
            outputRange: [0.98, 0],
            extrapolateRight: 'clamp',
          }),
          transform: [
            { translateY: _deltaY.current },
            {
              translateX: _deltaX.current,
            },
          ],
        },
      ]}
    >
      <AudioTimeBar percent={timePercent} />
      <View style={styles.row}>
        <Animated.View style={styles.info}>
          <Text style={TextStyles.title} numberOfLines={1}>
            {player.playerState.book?.title}{' '}
          </Text>
          <Text numberOfLines={1}>{currentTrack?.title} </Text>
        </Animated.View>
        {duration ? (
          <View style={styles.controls}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={isPlaying ? player.pause : player.continue}
              >
                <FontAwesome6
                  iconStyle="solid"
                  name={isPlaying ? 'pause' : 'play'}
                  size={22}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
            <Text>
              {seconds2time(currentTime)}/{seconds2time(duration)}
            </Text>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator animating />
          </View>
        )}
      </View>
    </Animated.View>
  )
}

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
})
