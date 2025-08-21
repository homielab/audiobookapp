import { createContext } from 'react'
import { Book } from '../types'
import { PLAY_STATUS } from '../utils/playerStatus'

export type PlayerState = {
  status: number
  book: Book | null
  playingTrackIndex: number | null
}

export const playerInitState: PlayerState = {
  status: PLAY_STATUS.INIT,
  book: null,
  playingTrackIndex: null,
}

export const PlayerContext = createContext({
  playerState: playerInitState,
  play: (_book: Book, _trackIndex: number) => {},
  continue: () => {},
  pause: () => {},
  stop: () => {},
})
