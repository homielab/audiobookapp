/**
 * @author minhtcx
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../utils/themes';

class TemplateScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Something cool here! </Text>
      </View>
    );
  }
}

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
