import FontAwesome6, {
  FontAwesome6IconName,
} from '@react-native-vector-icons/fontawesome6'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import BookScreen from './screens/BookScreen'
import CategoryScreen from './screens/CategoryScreen'
import HomeScreen from './screens/HomeScreen'
import NewReviewScreen from './screens/NewReviewScreen'
import ReviewsScreen from './screens/ReviewsScreen'
import SearchScreen from './screens/SearchScreen'
import { default as SettingScreen } from './screens/SettingScreen'

const HomeStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    HomeScreen: HomeScreen,
    BookScreen: BookScreen,
    ReviewsScreen: ReviewsScreen,
    NewReviewScreen: NewReviewScreen,
  },
})

const SearchStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    SearchScreen: SearchScreen,
    CategoryScreen: CategoryScreen,
    BookScreen: BookScreen,
    ReviewsScreen: ReviewsScreen,
    NewReviewScreen: NewReviewScreen,
  },
})

const Tabs = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ color, size }) => {
      let iconName: FontAwesome6IconName = 'book'
      if (route.name === 'Home') {
        iconName = 'book'
      } else if (route.name === 'Search') {
        iconName = 'magnifying-glass'
      } else if (route.name === 'Setting') {
        iconName = 'gear'
      }

      return (
        <FontAwesome6
          iconStyle="solid"
          name={iconName}
          color={color}
          size={size}
        />
      )
    },
  }),
  screens: {
    Home: HomeStack,
    Search: SearchStack,
    Setting: SettingScreen,
  },
})

const Navigation = createStaticNavigation(Tabs)

export default Navigation
