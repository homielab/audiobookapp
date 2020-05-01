/**
 * @format
 * @flow
 */

export default {
  loadRecentBooks: (state, {books}) => ({
    books: state.books.concat(books),
  }),

  loadQuotes: (state, {quotes}) => ({
    quotes: state.quotes.concat(quotes),
  }),

  loadCategories: (state, {categories}) => ({
    categories: categories,
  }),

  searchBooks: (state, {books}) => ({
    search_books: books,
  }),
};
