import {dispatch} from '../recontext/store';
// sample data
import BOOKS_DATA from '../sampledata/books';
import CATEGORIES_DATA from '../sampledata/categories.json';
import QUOTES_DATA from '../sampledata/quotes.json';

function loadRecentBooks() {
  // send api request
  dispatch('LOAD_RECENT_BOOKS', {
    books: BOOKS_DATA,
  });
}

function loadQuotes() {
  // send api request
  dispatch('LOAD_QUOTES', {
    quotes: QUOTES_DATA,
  });
}

function searchBooks() {
  // send api request
  dispatch('SEARCH_BOOKS', {
    books: BOOKS_DATA,
  });
}

function loadCategories() {
  // send api request
  dispatch('LOAD_CATEGORIES', {
    categories: CATEGORIES_DATA,
  });
}

export default {loadRecentBooks, loadQuotes, searchBooks, loadCategories};
