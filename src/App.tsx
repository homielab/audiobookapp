import { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import Player from './components/Player'
import {
  PlayerContext,
  playerInitState,
  PlayerState,
} from './context/PlayerContext'
import Navigation from './Navigation'
import { Book } from './types'
import { PLAY_STATUS } from './utils/playerStatus'
import { colors } from './utils/themes'

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true)
  StatusBar.setBackgroundColor(colors.transparent)
} else {
  StatusBar.setBarStyle('light-content')
}

const App = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(playerInitState)

  return (
    <View style={styles.container}>
      <PlayerContext.Provider
        value={{
          playerState: playerState,
          play: (book: Book, trackIndex: number) => {
            setPlayerState({
              ...playerState,
              status: PLAY_STATUS.PLAYING,
              book,
              playingTrackIndex: trackIndex,
            })
          },
          continue: () => {
            setPlayerState({
              ...playerState,
              status: PLAY_STATUS.PLAYING,
            })
          },
          pause: () => {
            setPlayerState({
              ...playerState,
              status: PLAY_STATUS.PAUSE,
            })
          },
          stop: () => {
            setPlayerState(playerInitState)
          },
        }}
      >
        <Navigation />
        <Player />
      </PlayerContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
