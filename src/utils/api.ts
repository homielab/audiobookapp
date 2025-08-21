// sample data
import BOOKS_DATA from '../sampledata/books'
import CATEGORIES_DATA from '../sampledata/categories.json'
import QUOTES_DATA from '../sampledata/quotes.json'
import { Category } from '../types'

export async function getRecentBooks() {
  // send api request
  return BOOKS_DATA
}

export async function getQuotes() {
  // send api request
  return QUOTES_DATA
}

export async function searchBooks() {
  // send api request
  return BOOKS_DATA
}

export async function getCategories() {
  // send api request
  return CATEGORIES_DATA
}

export async function getBooksByCategory(category: Category) {
  // send api request
  console.log('Searching books by category: ', category.name)
  return BOOKS_DATA
}
