/**
 * @format
 * @flow
 */
import React, { PureComponent } from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { metrics, colors } from "../utils/themes";

class Backdrop extends PureComponent {
  constructor(props) {
    super(props);
    this.dismis = this.dismis.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    const { visible: nextVisible } = nextProps;
    if (visible === true && nextVisible === false) {
      this.dismis();
    }
  }

  dismis() {
    const fadeOut = {
      from: {
        opacity: 0.5
      },
      to: {
        opacity: 0
      }
    };

    this.viewRef.animate(fadeOut, 300).then(() => {
      const { onPress } = this.props;
      if (onPress) onPress();
    });
  }

  render() {
    const fadeIn = {
      from: {
        opacity: 0
      },
      to: {
        opacity: 0.5
      }
    };

    return (
      <TouchableWithoutFeedback onPress={this.dismis}>
        <View />
      </TouchableWithoutFeedback>
    );
  }
}

Backdrop.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Backdrop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    backgroundColor: colors.black,
    opacity: 0.5
  }
});
