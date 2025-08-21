import { StaticScreenProps } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { Animated, StatusBar, StyleSheet, Text, View } from 'react-native'
import ButtonNewReview from '../components/ButtonNewReview'
import FooterSpace from '../components/FooterSpace'
import Header from '../components/Header'
import ReviewItem from '../components/ReviewItem'
import StarRating from '../components/StarRating'
import { Review } from '../types'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

type Props = StaticScreenProps<{
  reviews: Review[]
}>

export default function ReviewsScreen({ route }: Props) {
  const title = 'Cảm nhận sách'
  const contentOffset = useRef(new Animated.Value(0))

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true)
    return () => {
      StatusBar.setBarStyle('light-content', true)
    }
  }, [])

  const reviews = route.params.reviews || []
  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.title}>
            <Text style={TextStyles.heading}>{title}</Text>
            <StarRating rating={4} />
            <ButtonNewReview />
          </View>
        }
        ListFooterComponent={<FooterSpace />}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: contentOffset.current } },
            },
          ],
          { useNativeDriver: true },
        )}
      />
      <Header
        hasBackButton
        title={title}
        rightButton={{
          onPress: () => null,
          iconName: 'pen',
        }}
        animatedY={contentOffset.current.interpolate({
          inputRange: [0, 70],
          outputRange: [60, 0],
          extrapolate: 'clamp',
        })}
        animatedOpacity={contentOffset.current.interpolate({
          inputRange: [0, 70],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.headerHeight,
  },
  title: {
    paddingBottom: metrics.padding,
    marginBottom: metrics.padding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  list: {
    justifyContent: 'center',
    padding: metrics.lessPadding,
  },
})
