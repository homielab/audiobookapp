/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import {Text} from './Typos';
import {colors} from '../utils/themes';

class ButtonNewReview extends PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.push('NewReviewScreen')}>
        <Feather
          name="edit"
          size={16}
          color={colors.primary}
          style={styles.icon}
        />
        <Text style={styles.text}>Write your review</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ButtonNewReview);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: colors.primary,
  },
});
