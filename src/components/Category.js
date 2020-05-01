/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {SubText} from './Typos';
import {colors, metrics} from '../utils/themes';

class CategoryTags extends PureComponent {
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

CategoryTags.propTypes = {
  data: PropTypes.array.isRequired,
};

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
