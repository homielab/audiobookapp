/**
 * @format
 * @flow
 */
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import FooterSpace from "../components/FooterSpace";
import { Text } from "../components/Typos";
import { metrics, colors } from "../utils/themes";

class AccountScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Something cool will be lauched here.</Text>
        <Text style={styles.welcome}>Check back again soon!</Text>
        <Text style={styles.welcome}>
          Theo dõi cập nhật tại: https://sachnoi.app
        </Text>
        <FooterSpace />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: metrics.padding
  },
  lottie: {
    width: 280,
    height: 280
  },
  welcome: {
    textAlign: "center"
  }
});

export default AccountScreen;
