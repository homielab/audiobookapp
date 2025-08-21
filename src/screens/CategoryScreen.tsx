import { StaticScreenProps, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useRef } from 'react'
import { Animated, StatusBar, StyleSheet, Text, View } from 'react-native'
import CardBook from '../components/CardBook'
import FooterSpace from '../components/FooterSpace'
import Header from '../components/Header'
import { Book, Category } from '../types'
import { getBooksByCategory } from '../utils/api'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

const PAGE_SIZE = 10

type Props = StaticScreenProps<{
  category: Category
}>

export default function CategoryScreen({ route }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const contentOffset = useRef(new Animated.Value(0))
  const [books, setBooks] = React.useState<Book[]>([])
  const { category } = route.params

  const load = async () => {
    setBooks(await getBooksByCategory(category))
  }

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true)
    load()

    return () => {
      StatusBar.setBarStyle('light-content', true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={books}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.title}>
            <Text style={TextStyles.title}>{'Genres: ' + category.name}</Text>
          </View>
        }
        ListFooterComponent={<FooterSpace />}
        renderItem={({ item, index }) => (
          <CardBook
            item={item}
            index={index % PAGE_SIZE}
            onPress={() =>
              navigation.navigate('BookScreen', {
                item: item,
              })
            }
          />
        )}
        scrollEventThrottle={16}
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
        title={category.name}
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
    justifyContent: 'center',
    padding: metrics.lessPadding,
  },
  title: {},
})
