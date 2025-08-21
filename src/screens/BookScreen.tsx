import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { StaticScreenProps, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import BookCover from '../components/BookCover'
import ButtonNewReview from '../components/ButtonNewReview'
import ButtonPlay from '../components/ButtonPlay'
import Category from '../components/Category'
import FooterSpace from '../components/FooterSpace'
import Header from '../components/Header'
import Reviews from '../components/Reviews'
import SectionHeader from '../components/SectionHeader'
import StarRating from '../components/StarRating'
import { PlayerContext } from '../context/PlayerContext'
import { Book } from '../types'
import { PLAY_STATUS } from '../utils/playerStatus'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

export type BookScreenProps = StaticScreenProps<{
  item: Book
}>

export default function BookScreen({ route }: BookScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const contentOffset = useRef(new Animated.Value(0))
  const [collapsed, setCollapsed] = useState(true)
  const player = useContext(PlayerContext)
  const { item } = route.params
  const playingTrackIndex = player.playerState.playingTrackIndex

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true)

    return () => {
      StatusBar.setBarStyle('light-content', true)
    }
  }, [])

  const play = useCallback(
    (trackIndex = 0) => {
      if (
        player.playerState.book?.id !== item.id ||
        playingTrackIndex !== trackIndex
      ) {
        player.play(item, trackIndex)
        return
      }

      if (player.playerState.status === PLAY_STATUS.PLAYING) {
        player.pause()
      } else if (player.playerState.status === PLAY_STATUS.PAUSE) {
        player.continue()
      } else {
        player.play(item, trackIndex)
      }
    },
    [playingTrackIndex, item, player],
  )

  const isPlaying =
    player.playerState.status === PLAY_STATUS.PLAYING &&
    player.playerState.book?.id === item.id

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.list}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: contentOffset.current } },
            },
          ],
          { useNativeDriver: true },
        )}
      >
        <View style={styles.paddingLeft}>
          <BookCover imageSource={item.image} />
          <Text numberOfLines={3} style={TextStyles.title}>
            {item.title}
          </Text>
          <Text>{item.authors.join(' ,')}</Text>
          <Category data={item.categories} />
          <View style={styles.line} />
          <Text>Narrator: {item.readers.join(' ,')}</Text>
          <StarRating rating={item.rating} />
          <ButtonPlay isPlaying={isPlaying} onPress={() => play()} />
        </View>
        <ScrollView style={styles.playlist}>
          {item.tracks &&
            item.tracks.map((track, index) => (
              <TouchableOpacity key={index} onPress={() => play(index)}>
                <View style={styles.chapter}>
                  <FontAwesome6
                    iconStyle="solid"
                    name="circle-play"
                    size={24}
                    color={colors.primary}
                    style={styles.chapterIcon}
                  />
                  <Text style={TextStyles.textButton}>{track.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <SectionHeader title="Summary" />
        {collapsed ? (
          <View>
            <Text numberOfLines={3}>{item.description}</Text>
            <TouchableOpacity onPress={() => setCollapsed(false)}>
              <Text
                style={[TextStyles.textButton, styles.readmoreText]}
                onPress={() => setCollapsed(false)}
              >
                Read more
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>{item.description}</Text>
        )}
        <SectionHeader
          title="Reviews"
          right={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReviewsScreen', {
                  reviews: item.reviews,
                })
              }
            >
              <Text style={TextStyles.textButton}>View all</Text>
            </TouchableOpacity>
          }
        />
        <Reviews reviews={item.reviews} />
        <ButtonNewReview />
        <SectionHeader title="Where to buy?" />
        <Text style={TextStyles.subtitle}>...</Text>
        <SectionHeader title="Where to borrow" />
        <Text style={TextStyles.subtitle}>...</Text>
        <FooterSpace />
      </Animated.ScrollView>
      <Header
        hasBackButton
        title={item.title}
        rightButton={{
          onPress: () => play(0),
          iconName: 'headphones',
        }}
        animatedY={contentOffset.current.interpolate({
          inputRange: [0, 70],
          outputRange: [60, 0],
          extrapolate: 'clamp',
        })}
        animatedOpacity={contentOffset.current.interpolate({
          inputRange: [0, 60, 70],
          outputRange: [0, 0.3, 1],
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
  list: {
    padding: metrics.lessPadding,
  },
  paddingLeft: {
    paddingLeft: metrics.coverWidth + metrics.padding,
    paddingBottom: metrics.padding,
    minHeight: metrics.coverHeight,
  },
  chapter: {
    paddingTop: metrics.lessPadding,
    flexDirection: 'row',
  },
  chapterIcon: {
    marginHorizontal: metrics.lessPadding,
  },
  readmoreText: {
    fontSize: 14,
  },
  line: {},
  playlist: {},
})
