/**
 * @format
 * @flow
 */

const playerState = {
  visible: false,
  status: false,
  book: null,
  duration: null,
  track: null,
};

const initialState = {
  books: [],
  search_books: [],
  quotes: [],
  categories: [],
  player: playerState,
};

export default initialState;
