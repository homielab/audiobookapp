import React, {Component} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import Header from '../components/Header';
import StarRating from '../components/StarRating';
import {SubText} from '../components/Typos';
import {colors, metrics} from '../utils/themes';

class NewReviewScreen extends Component {
  constructor(props) {
    super(props);
    this._contentOffset = new Animated.Value(0);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <StarRating rating={0} />
          <SubText style={styles.welcome}>Select rating star</SubText>
        </View>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Title"
        />
        <TextInput
          multiline
          style={[styles.input, styles.multiline]}
          autoCorrect={false}
          placeholder="Content"
        />
        <Header
          hasBackButton
          animatedOpacity={this._contentOffset.interpolate({
            inputRange: [0, 60, 70],
            outputRange: [0, 0.3, 1],
            extrapolate: 'clamp',
          })}
          animatedY={this._contentOffset.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 0],
            extrapolate: 'clamp',
          })}
          title="Write review"
          rightButton={{
            onPress: () => null,
            iconName: 'send',
          }}
        />
      </View>
    );
  }
}

export default NewReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.headerHeight,
  },
  center: {
    marginTop: metrics.extraPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.background,
    padding: metrics.lessPadding,
    borderRadius: metrics.radius,
    marginTop: metrics.padding,
    marginHorizontal: metrics.padding,
    fontSize: 16,
  },
  multiline: {
    height: 120,
  },
});
