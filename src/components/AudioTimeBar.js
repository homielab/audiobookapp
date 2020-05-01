/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {metrics, colors} from '../utils/themes';

const timebarWidth = metrics.screenWidth;

class AudioTimeBar extends PureComponent {
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

AudioTimeBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

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
