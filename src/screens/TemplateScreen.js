import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/themes';

const TemplateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Something cool here! </Text>
    </View>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
