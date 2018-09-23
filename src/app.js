/**
 * @format
 * @flow
 */

import React from "react";
import { StatusBar, Platform, YellowBox } from "react-native";
import { createStackNavigator } from "react-navigation";
import { colors } from "./utils/themes";
import TabbarStack from "./tabbar";
import ActionScreen from "./screens/ActionScreen";
import { Provider } from "./recontext/store";

YellowBox.ignoreWarnings([
  "Remote debugger",
  "Trying to animate a view on an unmounted component"
]);

if (Platform.OS === "android") {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor(colors.transparent);
} else {
  StatusBar.setBarStyle("light-content");
}

const AppNavigator = createStackNavigator(
  {
    Tabbar: TabbarStack,
    ActionSheet: {
      screen: ActionScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    cardStyle: {
      backgroundColor: colors.transparent
    }
  }
);

const App = () => (
  <Provider>
    <AppNavigator />
  </Provider>
);

export default App;
