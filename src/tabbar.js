import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AccountScreen from './screens/AccountScreen';
import BookScreen from './screens/BookScreen';
import CategoryScreen from './screens/CategoryScreen';
import HomeScreen from './screens/HomeScreen';
import NewReviewScreen from './screens/NewReviewScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import SearchScreen from './screens/SearchScreen';

const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="BookScreen" component={BookScreen} />
      <HomeStack.Screen name="ReviewsScreen" component={ReviewsScreen} />
      <HomeStack.Screen name="NewReviewScreen" component={NewReviewScreen} />
    </HomeStack.Navigator>
  );
}

function SearchNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} />
      <HomeStack.Screen name="BookScreen" component={BookScreen} />
      <HomeStack.Screen name="ReviewsScreen" component={ReviewsScreen} />
      <HomeStack.Screen name="NewReviewScreen" component={NewReviewScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabbarStack = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchNav"
        component={SearchNavigator}
        options={{
          tabBarLabel: 'Seach',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountNav"
        component={AccountScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabbarStack;
