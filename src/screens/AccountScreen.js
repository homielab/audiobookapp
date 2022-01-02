import React from 'react';
import {StyleSheet, View} from 'react-native';
import FooterSpace from '../components/FooterSpace';
import {Text} from '../components/Typos';
import {colors, metrics} from '../utils/themes';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Something cool will be lauched here.</Text>
      <Text style={styles.welcome}>Website: https://audioaz.com/</Text>
      <Text style={styles.welcome}>Fanpage: facebook.com/audioazcom</Text>
      <FooterSpace />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.padding,
  },
  lottie: {
    width: 280,
    height: 280,
  },
  welcome: {
    textAlign: 'center',
  },
});
