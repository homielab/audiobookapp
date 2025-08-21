import { ImageRequireSource } from 'react-native'

export interface Review {
  id: string
  user: string
  date: string
  rating: string
  title: string
  content: string
}

export interface Track {
  title: string
  link: string
}

export interface Category {
  name: string
  key: string
}

export interface Book {
  id: string
  image: ImageRequireSource
  title: string
  authors: string[]
  categories: string[]
  readers: string[]
  description: string
  reviews?: Review[]
  rating: number
  tracks: { title: string; link: string }[]
}

export interface Quote {
  quote: string
  author: string
}
