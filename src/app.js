import {NavigationContainer} from '@react-navigation/native';
import React, {memo} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import Player from './components/Player';
import {Provider} from './recontext/store';
import TabbarStack from './tabbar';
import {colors} from './utils/themes';

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor(colors.transparent);
} else {
  StatusBar.setBarStyle('light-content');
}

const App = () => {
  return (
    <View style={styles.container}>
      <Provider>
        <NavigationContainer>
          <TabbarStack />
        </NavigationContainer>
        <Player />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(App, () => true);
