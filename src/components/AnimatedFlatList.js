import React from 'react';
import {Animated} from 'react-native';
import FooterSpace from './FooterSpace';

const AnimatedFlatList = props => (
  <Animated.FlatList
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={16}
    ListFooterComponent={<FooterSpace />}
    {...props}
  />
);

export default AnimatedFlatList;
