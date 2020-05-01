/**
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {colors} from './utils/themes';
import TabbarStack from './tabbar';
import {Provider} from './recontext/store';

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor(colors.transparent);
} else {
  StatusBar.setBarStyle('light-content');
}

const AppNavigator = createAppContainer(TabbarStack);

const App = () => (
  <Provider>
    <AppNavigator />
  </Provider>
);

export default App;
