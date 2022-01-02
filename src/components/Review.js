import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, metrics} from '../utils/themes';
import StarRating from './StarRating';
import {SubText, Subtitle, Text} from './Typos';

class Review extends Component {
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
        ]}
      >
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
