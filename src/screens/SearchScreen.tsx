import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import FooterSpace from '../components/FooterSpace'
import PrimaryHeader from '../components/PrimaryHeader'
import { Category } from '../types'
import { getCategories } from '../utils/api'
import { colors, metrics } from '../utils/themes'
import { TextStyles } from '../utils/typos'

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const contentOffset = useRef(new Animated.Value(-metrics.headerHeight))
  const [focused, setFocused] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  const load = async () => {
    setCategories(await getCategories())
  }

  useEffect(() => {
    load()
  }, [])

  const onTextInputFocus = () => {
    setFocused(true)
    Animated.spring(contentOffset.current, {
      toValue: -metrics.headerHeightX2,
      useNativeDriver: true,
    }).start()
  }

  const doClearKeywords = () => {
    setKeyword('')
    setFocused(false)
    Keyboard.dismiss()
    Animated.spring(contentOffset.current, {
      toValue: -metrics.headerHeight,
      useNativeDriver: true,
    }).start()
  }

  const fadeOutAnimation = {
    opacity: contentOffset.current.interpolate({
      inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }

  const switchPageAnimation = {
    transform: [
      {
        translateY: contentOffset.current.interpolate({
          inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
          outputRange: [0, -metrics.screenHeight],
          extrapolateRight: 'clamp',
        }),
      },
    ],
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Animated.View style={[styles.searchResult, switchPageAnimation]}>
          <View style={[styles.page, styles.result]}>
            <FontAwesome6
              iconStyle="solid"
              name="magnifying-glass"
              size={100}
              color={colors.black}
              style={styles.icon}
            />
            <Text style={TextStyles.title}>Search for your favourite book</Text>
            <Text>You can search by book's title or author's name</Text>
          </View>
          <View style={[styles.page, styles.categories]}>
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              ListFooterComponent={<FooterSpace />}
              data={categories}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() =>
                    navigation.navigate('CategoryScreen', {
                      category: item,
                    })
                  }
                >
                  <View style={styles.category}>
                    <Text style={TextStyles.title}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Animated.View>
        <PrimaryHeader
          animatedY={contentOffset.current.interpolate({
            inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
            outputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
            extrapolateRight: 'clamp',
          })}
        >
          <View style={styles.headerText}>
            <Animated.Text
              style={[TextStyles.heading, styles.textWhite, fadeOutAnimation]}
            >
              Search
            </Animated.Text>
            <View style={styles.searchContainer}>
              <View style={styles.search}>
                <FontAwesome6
                  iconStyle="solid"
                  name="magnifying-glass"
                  size={20}
                  color={colors.textSecondary}
                  style={styles.icon}
                />
                <TextInput
                  autoCorrect={false}
                  placeholder="What are you looking for?"
                  value={keyword}
                  onChangeText={setKeyword}
                  onFocus={onTextInputFocus}
                  style={styles.textInput}
                />
              </View>
              {focused ? (
                <TouchableOpacity
                  onPress={doClearKeywords}
                  style={styles.buttonClear}
                >
                  <Text style={[TextStyles.subtitle, styles.textWhite]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </PrimaryHeader>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: metrics.statusBarHeight + metrics.padding,
    paddingHorizontal: metrics.padding,
    backgroundColor: colors.white,
  },
  headerText: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: metrics.radius,
    backgroundColor: colors.lightOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: metrics.lessPadding,
  },
  textInput: {
    flex: 1,
    padding: 6,
    color: colors.black,
  },
  buttonClear: {
    paddingHorizontal: metrics.lessPadding,
  },
  searchResult: {
    position: 'absolute',
    width: metrics.screenWidth,
    height: metrics.screenHeight * 2,
    backgroundColor: colors.background,
  },
  page: {
    paddingTop: metrics.headerHeight,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  },
  result: {
    alignItems: 'center',
  },
  categories: {
    paddingTop: metrics.headerHeightX2 + metrics.padding,
  },
  category: {
    width: (metrics.screenWidth - metrics.lessPadding * 2) / 2,
    margin: metrics.lessPadding / 2,
    padding: metrics.lessPadding,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: metrics.radius,
  },
  textWhite: {
    color: colors.white,
  },
  footerComponent: {
    height: 100,
  },
})
