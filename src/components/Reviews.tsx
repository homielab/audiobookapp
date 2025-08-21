import React from 'react'
import { FlatList } from 'react-native'
import { Review } from '../types'
import { metrics } from '../utils/themes'
import ReviewItem from './ReviewItem'

interface Props {
  reviews?: Review[]
}

export default function Reviews({ reviews }: Props) {
  return (
    <FlatList
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      data={reviews}
      renderItem={({ item }) => {
        return (
          <ReviewItem
            key={item.id}
            item={item}
            width={metrics.screenWidth - metrics.lessPadding * 2}
            height={170}
          />
        )
      }}
    />
  )
}
