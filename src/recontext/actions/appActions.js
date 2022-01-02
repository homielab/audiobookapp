export default {
  LOAD_RECENT_BOOKS: (state, {books}) => ({
    books: books,
    // books: state.books.concat(),
  }),

  LOAD_QUOTES: (state, {quotes}) => ({
    quotes: quotes,
  }),

  LOAD_CATEGORIES: (state, {categories}) => ({
    categories: categories,
  }),

  SEARCH_BOOKS: (state, {books}) => ({
    search_books: books,
  }),
};
