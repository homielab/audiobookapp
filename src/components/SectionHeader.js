import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, metrics} from '../utils/themes';
import {Title} from './Typos';

class SectionHeader extends Component {
  render() {
    const {title, right} = this.props;
    return (
      <View style={styles.container}>
        <Title>{title}</Title>
        <View style={styles.divider} />
        {right}
      </View>
    );
  }
}

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.padding,
    marginBottom: metrics.lessPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    marginHorizontal: metrics.lessPadding,
  },
});
