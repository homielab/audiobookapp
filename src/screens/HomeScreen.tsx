import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import CardBook from '../components/CardBook'
import FooterSpace from '../components/FooterSpace'
import PrimaryHeader from '../components/PrimaryHeader'
import { Book, Quote } from '../types'
import { getQuotes, getRecentBooks } from '../utils/api'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

const LOGO_SIZE = 24
const HEADER_OFFSET = metrics.screenWidth / 2 - 40
const PAGE_SIZE = 10

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const contentOffset = useRef(new Animated.Value(0))
  const [books, setBooks] = useState<Book[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])

  const load = async () => {
    setBooks(await getRecentBooks())
    setQuotes(await getQuotes())
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    metrics.tabbarHeight = tabBarHeight
  }, [tabBarHeight])

  const randomQuoteKey = Math.floor(Math.random() * quotes.length)

  const animatedY = contentOffset.current.interpolate({
    inputRange: [-metrics.screenHeight / 2, 0, metrics.headerHeight],
    outputRange: [
      metrics.headerHeight - 10,
      -metrics.headerHeight,
      -metrics.headerHeightX2,
    ],
    extrapolate: 'clamp',
  })

  const fadeOutAnimation = {
    opacity: contentOffset.current.interpolate({
      inputRange: [0, metrics.headerHeight * 0.5, metrics.headerHeight],
      outputRange: [1, 0.2, 0],
      extrapolate: 'clamp',
    }),
  }

  const fadeInAnimation = {
    opacity: contentOffset.current.interpolate({
      inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
      outputRange: [0.2, 0.5, 1],
      extrapolate: 'clamp',
    }),
  }

  const scaleAnimation = {
    scale: contentOffset.current.interpolate({
      inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
      outputRange: [1, 2, 1],
      extrapolate: 'clamp',
    }),
  }

  const titleLeftAnimation = {
    transform: [
      {
        translateX: contentOffset.current.interpolate({
          inputRange: [0, metrics.headerHeight],
          outputRange: [-HEADER_OFFSET + 40, 0],
          extrapolate: 'clamp',
        }),
      },
      scaleAnimation,
    ],
  }

  const titleRightAnimation = {
    transform: [
      {
        translateX: contentOffset.current.interpolate({
          inputRange: [0, metrics.headerHeight],
          outputRange: [HEADER_OFFSET, 0],
          extrapolate: 'clamp',
        }),
      },
      scaleAnimation,
    ],
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
        ListHeaderComponent={<View style={styles.headerComponent} />}
        ListFooterComponent={<FooterSpace />}
        data={books}
        renderItem={({ item, index }) => (
          <CardBook
            item={item}
            index={index % PAGE_SIZE}
            onPress={() =>
              navigation.navigate('BookScreen', {
                item,
              })
            }
          />
        )}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: contentOffset.current } },
            },
          ],
          { useNativeDriver: true },
        )}
      />
      <PrimaryHeader animatedY={animatedY}>
        <View>
          <Animated.View style={[styles.headerText, fadeOutAnimation]}>
            {quotes[randomQuoteKey] ? (
              <Text style={[TextStyles.text, styles.textWhite]}>
                &ldquo;
                {quotes[randomQuoteKey].quote}
                &rdquo; - {quotes[randomQuoteKey].author}
              </Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.headerTitle, fadeInAnimation]}>
            <Animated.Image
              source={require('../images/logo-white.png')}
              style={[styles.logo, titleLeftAnimation]}
            />
            <Animated.Text
              style={[
                TextStyles.animatedHeading,
                styles.textWhite,
                titleRightAnimation,
              ]}
            >
              AudioAZ.com
            </Animated.Text>
          </Animated.View>
        </View>
      </PrimaryHeader>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    padding: metrics.lessPadding,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginHorizontal: metrics.lessPadding,
  },
  textWhite: {
    color: colors.white,
  },
  list: {
    flex: 1,
  },
  headerComponent: {
    height: metrics.headerHeightX2,
  },
})
