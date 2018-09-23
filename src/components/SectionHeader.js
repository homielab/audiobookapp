/**
 * @format
 * @flow
 */
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Title } from "./Typos";
import { metrics, colors } from "../utils/themes";

class SectionHeader extends PureComponent {
  render() {
    const { title, right } = this.props;
    return (
      <View style={styles.container}>
        <Title>{title}</Title>
        <View style={styles.divider} />
        {right}
      </View>
    );
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  right: PropTypes.element
};

SectionHeader.defaultProps = {
  right: null
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.padding,
    marginBottom: metrics.lessPadding,
    flexDirection: "row",
    alignItems: "center"
  },
  divider: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    marginHorizontal: metrics.lessPadding
  }
});
