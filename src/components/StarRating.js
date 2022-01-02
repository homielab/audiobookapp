import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, metrics} from '../utils/themes';
import {Title} from './Typos';

const MAX_STAR = 5;

class StartRating extends Component {
  render() {
    const {rating, mini} = this.props;
    const starSize = mini ? 20 : 24;
    const starColor = mini ? colors.star : colors.black;
    const starsComponent = [];
    let starLeft = Math.round(rating * 2) / 2;

    for (let index = 0; index < MAX_STAR; index++) {
      let iconName = 'star-outline';
      if (starLeft > 0) {
        iconName = starLeft < 1 ? 'star-half' : 'star';
        starLeft--;
      }

      starsComponent.push(
        <MaterialCommunityIcons
          key={index}
          name={iconName}
          size={starSize}
          color={starColor}
          style={styles.starIcon}
        />,
      );
    }

    if (mini) {
      return <View style={styles.mini}>{starsComponent}</View>;
    }

    return (
      <View style={styles.container}>
        {starsComponent}
        {rating > 0 ? <Title style={styles.text}>{rating}</Title> : null}
      </View>
    );
  }
}

export default StartRating;

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.lessPadding,
    marginBottom: metrics.lessPadding / 2,
    flexDirection: 'row',
    backgroundColor: colors.transparent,
  },
  mini: {
    marginVertical: metrics.lessPadding / 2,
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: -2,
  },
  text: {
    marginLeft: metrics.lessPadding,
    color: colors.black,
  },
});
