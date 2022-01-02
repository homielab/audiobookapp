import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {metrics} from '../utils/themes';
import Review from './Review';

class Reviews extends Component {
  renderItem({item}) {
    return (
      <Review
        key={item.id}
        item={item}
        width={metrics.screenWidth - metrics.lessPadding * 2}
        height={170}
      />
    );
  }

  render() {
    const {reviews} = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={reviews}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default Reviews;
