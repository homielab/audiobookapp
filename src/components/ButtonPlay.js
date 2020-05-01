/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../utils/themes';
import {Text} from './Typos';

class ButtonPlay extends PureComponent {
  render() {
    const {onPress, isPlaying} = this.props;
    if (isPlaying) {
      return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Feather name="pause" size={20} color={colors.white} />
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Feather name="headphones" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    );
  }
}

ButtonPlay.propTypes = {
  isPlaying: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

ButtonPlay.defaultProps = {
  isPlaying: false,
};

export default ButtonPlay;

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 120,
    borderRadius: 15,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
});
