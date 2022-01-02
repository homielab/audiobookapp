import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, metrics} from '../utils/themes';

const timebarWidth = metrics.screenWidth;

class AudioTimeBar extends Component {
  render() {
    const {percent} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.done,
            {
              width: timebarWidth * percent,
            },
          ]}
        />
      </View>
    );
  }
}

export default AudioTimeBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    width: timebarWidth,
    height: 2,
  },
  done: {
    backgroundColor: colors.textSecondary,
    width: 100,
    height: 2,
  },
});
