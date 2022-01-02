import PLAYER_STATUS from '../../utils/playerStatus';

export default {
  LOAD_AUDIO: (state, {book, track}) => ({
    player: {
      visible: true,
      status: PLAYER_STATUS.LOADING,
      book,
      duration: null,
      track,
    },
  }),

  LOAD_AUDIO_ERROR: state => ({
    player: {
      ...state.player,
      status: PLAYER_STATUS.ERROR,
    },
  }),

  PLAY_AUDIO: (state, {duration}) => ({
    player: {
      ...state.player,
      duration,
      status: PLAYER_STATUS.PLAYING,
    },
  }),

  PAUSE_AUDIO: state => ({
    player: {
      ...state.player,
      status: PLAYER_STATUS.PAUSE,
    },
  }),

  PLAY_AUDIO_ENDED: state => ({
    player: {
      ...state.player,
      status: PLAYER_STATUS.STOP,
    },
  }),

  SHOW_PLAYER: state => ({
    player: {
      ...state.player,
      visible: true,
    },
  }),

  HIDE_PLAYER: state => ({
    player: {
      ...state.player,
      visible: false,
    },
  }),

  UNLOAD_AUDIO: () => ({
    player: {
      visible: false,
      status: false,
      book: null,
      duration: null,
      track: null,
    },
  }),
};
