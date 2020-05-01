/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import {Subtitle, Text, SubText} from './Typos';
import {colors, metrics} from '../utils/themes';

class Review extends PureComponent {
  render() {
    const {width, height, item} = this.props;

    return (
      <View
        style={[
          styles.container,
          width && {
            width: width,
          },
          height && {height: height},
        ]}>
        <Subtitle>{item.title}</Subtitle>
        <StarRating mini rating={3.4} />
        <Text>{item.content}</Text>
        <View style={styles.author}>
          <SubText>{item.date}</SubText>
          <SubText>{item.user}</SubText>
        </View>
      </View>
    );
  }
}

Review.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Review.defaultProps = {
  width: null,
  height: null,
};

export default Review;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: metrics.padding,
    marginBottom: metrics.padding,
    borderRadius: metrics.radius,
  },
  author: {
    position: 'absolute',
    right: metrics.padding,
    top: metrics.padding,
  },
});
