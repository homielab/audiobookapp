import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import AnimatedFlatList from '../components/AnimatedFlatList';
import CardBook from '../components/CardBook';
import PrimaryHeader from '../components/PrimaryHeader';
import {AnimatedHeading, Text} from '../components/Typos';
import Api from '../helpers/Api';
import {connect} from '../recontext/store';
import {colors, metrics} from '../utils/themes';

const pickRandomProperty = obj => {
  var result;
  var count = 0;
  for (var prop in obj) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }
  return result;
};

const LOGO_SIZE = 24;
const HEADER_OFFSET = metrics.screenWidth / 2 - 40;
const PAGE_SIZE = 10;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this._contentOffset = new Animated.Value(0);
  }

  componentDidMount() {
    Api.loadRecentBooks();
    Api.loadQuotes();
  }

  render() {
    const {navigation, books, quotes} = this.props;
    const randomQuoteKey = pickRandomProperty(quotes);

    const animatedY = this._contentOffset.interpolate({
      inputRange: [-metrics.screenHeight / 2, 0, metrics.headerHeight],
      outputRange: [
        metrics.headerHeight - 10,
        -metrics.headerHeight,
        -metrics.headerHeightX2,
      ],
      extrapolate: 'clamp',
    });

    const fadeOutAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.5, metrics.headerHeight],
        outputRange: [1, 0.2, 0],
        extrapolate: 'clamp',
      }),
    };

    const fadeInAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
        outputRange: [0.2, 0.5, 1],
        extrapolate: 'clamp',
      }),
    };

    const scaleAnimation = {
      scale: this._contentOffset.interpolate({
        inputRange: [0, metrics.headerHeight * 0.8, metrics.headerHeight],
        outputRange: [1, 2, 1],
        extrapolate: 'clamp',
      }),
    };

    const titleLeftAnimation = {
      transform: [
        {
          translateX: this._contentOffset.interpolate({
            inputRange: [0, metrics.headerHeight],
            outputRange: [-HEADER_OFFSET + 40, 0],
            extrapolate: 'clamp',
          }),
        },
        scaleAnimation,
      ],
    };

    const titleRightAnimation = {
      transform: [
        {
          translateX: this._contentOffset.interpolate({
            inputRange: [0, metrics.headerHeight],
            outputRange: [HEADER_OFFSET, 0],
            extrapolate: 'clamp',
          }),
        },
        scaleAnimation,
      ],
    };

    return (
      <View style={styles.container}>
        <AnimatedFlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<View style={styles.headerComponent} />}
          renderItem={({item, index}) => (
            <CardBook
              item={item}
              index={index % PAGE_SIZE}
              onPress={() =>
                navigation.navigate('BookScreen', {
                  id: item.id,
                  item: item,
                })
              }
            />
          )}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this._contentOffset}},
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <PrimaryHeader animatedY={animatedY}>
          <View>
            <Animated.View style={[styles.headerText, fadeOutAnimation]}>
              {quotes[randomQuoteKey] ? (
                <Text style={styles.textWhite}>
                  &ldquo;
                  {quotes[randomQuoteKey].quote}
                  &rdquo; - {quotes[randomQuoteKey].author}
                </Text>
              ) : null}
            </Animated.View>
            <Animated.View style={[styles.headerTitle, fadeInAnimation]}>
              <Animated.Image
                source={require('../images/logo-white.png')}
                style={[styles.logo, titleLeftAnimation]}
              />
              <AnimatedHeading style={[styles.textWhite, titleRightAnimation]}>
                AudioAZ.com
              </AnimatedHeading>
            </Animated.View>
          </View>
        </PrimaryHeader>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  quotes: state.quotes,
});

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    padding: metrics.lessPadding,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginHorizontal: metrics.lessPadding,
  },
  textWhite: {
    color: colors.white,
  },
  list: {
    flex: 1,
  },
  headerComponent: {
    height: metrics.headerHeightX2,
  },
});
