/**
 * @format
 * @flow
 */

import PLAYER_STATUS from "../../utils/playerStatus";

export default {
  loadAudio: (state, { book, track }) => ({
    player: {
      visible: true,
      status: PLAYER_STATUS.LOADING,
      book,
      duration: null,
      track
    }
  }),

  loadAudioError: state => ({
    player: {
      ...state.player,
      status: PLAYER_STATUS.ERROR
    }
  }),

  playAudio: (state, { duration }) => ({
    player: {
      ...state.player,
      duration,
      status: PLAYER_STATUS.PLAYING
    }
  }),

  pauseAudio: state => ({
    player: {
      ...state.player,
      status: PLAYER_STATUS.PAUSE
    }
  }),

  playAudioEnded: state => ({
    player: {
      ...state.player,
      status: PLAYER_STATUS.STOP
    }
  }),

  showPlayer: state => ({
    player: {
      ...state.player,
      visible: true
    }
  }),

  hidePlayer: state => ({
    player: {
      ...state.player,
      visible: false
    }
  }),

  unloadAudio: () => ({
    player: {
      visible: false,
      status: false,
      book: null,
      duration: null,
      track: null
    }
  })
};
