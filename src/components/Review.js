/**
 * @format
 * @flow
 */
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import StarRating from "./StarRating";
import { Subtitle, Text, SubText } from "./Typos";
import { colors, metrics } from "../utils/themes";

class Review extends PureComponent {
  render() {
    const { width, height } = this.props;
    return (
      <View
        style={[
          styles.container,
          width && {
            width: width
          },
          height && { height: height }
        ]}
      >
        <Subtitle>Hài Lòng</Subtitle>
        <StarRating mini rating={3.4} />
        <Text>
          Cuốn này khá hay, câu chuyện lôi cuốn. kết thúc hơi cụt. Tôi hơi thất
          vọng về đoạn kết. tôi cứ hy vọng chàng trai sẽ có đoạn kết hạnh phúc
          bên 1 gia đình, bên người vợ là cô con gái ông mua lông cừu.
        </Text>
        <View style={styles.author}>
          <SubText>Jun 28</SubText>
          <SubText>wong 20</SubText>
        </View>
      </View>
    );
  }
}

Review.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Review.defaultProps = {
  width: null,
  height: null
};

export default Review;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: metrics.padding,
    marginBottom: metrics.padding,
    borderRadius: metrics.radius
  },
  author: {
    position: "absolute",
    right: metrics.padding,
    top: metrics.padding
  }
});
