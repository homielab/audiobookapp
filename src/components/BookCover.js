/**
 * @format
 * @flow
 */
import React, { PureComponent } from "react";
import { View, Image, Platform, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors, metrics } from "../utils/themes";

class BookCover extends PureComponent {
  render() {
    const { imageSource } = this.props;
    return (
      <View style={styles.container}>
        <Image source={imageSource} style={styles.coverImage} />
      </View>
    );
  }
}

BookCover.propTypes = {
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired
};

export default BookCover;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: colors.white,
    width: metrics.coverWidth,
    height: metrics.coverHeight,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10
      },
      android: {
        elevation: 3
      }
    })
  },
  coverImage: {
    width: metrics.coverWidth,
    height: metrics.coverHeight,
    resizeMode: "stretch"
  }
});
