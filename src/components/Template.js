import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Template extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Template</Text>
      </View>
    );
  }
}

export default Template;

const styles = StyleSheet.create({
  container: {},
});
