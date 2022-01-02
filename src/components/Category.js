import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, metrics} from '../utils/themes';
import {SubText} from './Typos';

class CategoryTags extends Component {
  render() {
    const {data} = this.props;
    if (!data || data.length === 0) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        {data.map((item, index) => (
          <View style={styles.item} key={index}>
            <SubText>{item}</SubText>
          </View>
        ))}
      </View>
    );
  }
}

export default CategoryTags;

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.lessPadding,
    flexDirection: 'row',
  },
  item: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textSecondary,
    borderRadius: metrics.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
