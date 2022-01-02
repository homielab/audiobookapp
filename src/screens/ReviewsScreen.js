import React, {Component} from 'react';
import {Animated, FlatList, StatusBar, StyleSheet, View} from 'react-native';
import ButtonNewReview from '../components/ButtonNewReview';
import FooterSpace from '../components/FooterSpace';
import Header from '../components/Header';
import Review from '../components/Review';
import StarRating from '../components/StarRating';
import {Heading} from '../components/Typos';
import {colors, metrics} from '../utils/themes';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

class ReviewsScreen extends Component {
  constructor(props) {
    super(props);
    this._contentOffset = new Animated.Value(0);
    this._title = 'Cảm nhận sách';
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content', true);
  }

  renderItem({item}) {
    return <Review key={item.id} item={item} />;
  }

  render() {
    const reviews = this.props.route.params.reviews || [];
    return (
      <View style={styles.container}>
        <AnimatedFlatlist
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={reviews}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.title}>
              <Heading>{this._title}</Heading>
              <StarRating rating={4} />
              <ButtonNewReview />
            </View>
          }
          ListFooterComponent={<FooterSpace />}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this._contentOffset}},
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <Header
          hasBackButton
          title={this._title}
          rightButton={{
            onPress: () => null,
            iconName: 'edit',
          }}
          animatedY={this._contentOffset.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 0],
            extrapolate: 'clamp',
          })}
          animatedOpacity={this._contentOffset.interpolate({
            inputRange: [0, 70],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })}
        />
      </View>
    );
  }
}

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.headerHeight,
  },
  title: {
    paddingBottom: metrics.padding,
    marginBottom: metrics.padding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  list: {
    justifyContent: 'center',
    padding: metrics.lessPadding,
  },
});
