import React, {Component} from 'react';
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedFlatList from '../components/AnimatedFlatList';
import PrimaryHeader from '../components/PrimaryHeader';
import {AnimatedTitle, Subtitle, Title} from '../components/Typos';
import Api from '../helpers/Api';
import {connect} from '../recontext/store';
import {colors, metrics} from '../utils/themes';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      keyword: '',
    };
    this._contentOffset = new Animated.Value(-metrics.headerHeight);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderCategoryItem = this.renderCategoryItem.bind(this);
    this.onTextInputFocus = this.onTextInputFocus.bind(this);
    this.doClearKeywords = this.doClearKeywords.bind(this);
  }

  componentDidMount() {
    Api.loadCategories();
  }

  onChangeText(text) {
    this.setState({
      keyword: text,
    });
  }

  onTextInputFocus() {
    this.setState({
      isFocused: true,
    });
    Animated.spring(this._contentOffset, {
      toValue: -metrics.headerHeightX2,
      useNativeDriver: true,
    }).start();
  }

  doClearKeywords() {
    this.setState({
      keyword: '',
      isFocused: false,
    });
    Keyboard.dismiss();
    Animated.spring(this._contentOffset, {
      toValue: -metrics.headerHeight,
      useNativeDriver: true,
    }).start();
  }

  renderCategoryItem({item}) {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() =>
          navigation.navigate('CategoryScreen', {
            category: item,
          })
        }
      >
        <View style={styles.category}>
          <Title>{item.name}</Title>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {categories} = this.props;
    const {keyword, isFocused} = this.state;
    const fadeOutAnimation = {
      opacity: this._contentOffset.interpolate({
        inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };

    const switchPageAnimation = {
      transform: [
        {
          translateY: this._contentOffset.interpolate({
            inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
            outputRange: [0, -metrics.screenHeight],
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Animated.View style={[styles.searchResult, switchPageAnimation]}>
            <View style={[styles.page, styles.result]}>
              <Feather
                name="search"
                size={100}
                color={colors.black}
                style={styles.icon}
              />
              <Title>Search for your favourite book</Title>
              <Text>You can search by book's title or author's name</Text>
            </View>
            <View style={[styles.page, styles.categories]}>
              <AnimatedFlatList
                data={categories}
                numColumns={2}
                keyExtractor={item => item.key}
                renderItem={this.renderCategoryItem}
              />
            </View>
          </Animated.View>
          <PrimaryHeader
            animatedY={this._contentOffset.interpolate({
              inputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
              outputRange: [-metrics.headerHeightX2, -metrics.headerHeight],
              extrapolateRight: 'clamp',
            })}
          >
            <View style={styles.headerText}>
              <AnimatedTitle style={[styles.textWhite, fadeOutAnimation]}>
                Search
              </AnimatedTitle>
              <View style={styles.searchContainer}>
                <View style={styles.search}>
                  <Feather
                    name="search"
                    size={20}
                    color={colors.textSecondary}
                    style={styles.icon}
                  />
                  <TextInput
                    autoCorrect={false}
                    placeholder="What are you looking for?"
                    value={keyword}
                    onChangeText={this.onChangeText}
                    onFocus={this.onTextInputFocus}
                    style={styles.textInput}
                  />
                </View>
                {isFocused ? (
                  <TouchableOpacity
                    onPress={this.doClearKeywords}
                    style={styles.buttonClear}
                  >
                    <Subtitle style={styles.textWhite}>Cancel</Subtitle>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </PrimaryHeader>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: metrics.statusBarHeight + metrics.padding,
    paddingHorizontal: metrics.padding,
    backgroundColor: colors.white,
  },
  headerText: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.extraPadding,
    paddingVertical: metrics.lessPadding,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: metrics.radius,
    backgroundColor: colors.lightOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: metrics.lessPadding,
  },
  textInput: {
    flex: 1,
    padding: 6,
    color: colors.black,
  },
  buttonClear: {
    paddingHorizontal: metrics.lessPadding,
  },
  searchResult: {
    position: 'absolute',
    width: metrics.screenWidth,
    height: metrics.screenHeight * 2,
    backgroundColor: colors.background,
  },
  page: {
    paddingTop: metrics.headerHeight,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  },
  result: {
    alignItems: 'center',
  },
  categories: {
    paddingTop: metrics.headerHeightX2 + metrics.padding,
  },
  category: {
    width: (metrics.screenWidth - metrics.lessPadding * 2) / 2,
    margin: metrics.lessPadding / 2,
    padding: metrics.lessPadding,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: metrics.radius,
  },
  textWhite: {
    color: colors.white,
  },
  footerComponent: {
    height: 100,
  },
});
