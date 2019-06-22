/**
 * @format
 * @flow
 */
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import FooterSpace from "../components/FooterSpace";
import { Text } from "../components/Typos";
import { metrics, colors } from "../utils/themes";
import { TouchableOpacity } from "react-native-gesture-handler";

class AccountScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Something cool will be lauched here.</Text>
        <Text style={styles.welcome}>Website: sachnoi.app</Text>
        <Text style={styles.welcome}>Fanpage: facebook.com/sachnoiapp</Text>
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
