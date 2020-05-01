/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {
  ScrollView,
  Animated,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import zget from 'zget';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from '../recontext/store';
import Header from '../components/Header';
import BookCover from '../components/BookCover';
import Category from '../components/Category';
import StarRating from '../components/StarRating';
import FooterSpace from '../components/FooterSpace';
import Reviews from '../components/Reviews';
import ButtonNewReview from '../components/ButtonNewReview';
import {Title, Text, SubText, TextButton} from '../components/Typos';
import {colors, metrics} from '../utils/themes';
import ButtonPlay from '../components/ButtonPlay';
import SectionHeader from '../components/SectionHeader';
import PlayerControl from '../helpers/PlayerControl';
import PLAYER_STATUS from '../utils/playerStatus';

class BookScreen extends PureComponent {
  constructor(props) {
    super(props);
    this._contentOffset = new Animated.Value(0);
    this.play = this.play.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  componentDidMount() {
    const {navigation, player} = this.props;
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content', true);
    });
    if (!player.book) {
      this.play(0);
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  play(trackIndex = 0) {
    const item = zget(this.props, 'navigation.state.params.item');
    PlayerControl.load(item, trackIndex);
  }

  render() {
    const {navigation, player} = this.props;
    const {collapsed} = this.state;
    const item = navigation.state.params.item;

    const isPlaying =
      player.status === PLAYER_STATUS.PLAYING &&
      zget(player, 'book.id') === item.id;

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.list}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this._contentOffset}},
              },
            ],
            {useNativeDriver: true},
          )}>
          <View style={styles.paddingLeft}>
            <BookCover imageSource={item.image} />
            <Title numberOfLines={3}>{item.title}</Title>
            <Text>{item.authors.join(' ,')}</Text>
            <Category data={item.categories} />
            <View style={styles.line} />
            <Text>Narrator: {item.readers.join(' ,')}</Text>
            <StarRating rating={item.rating} />
            <ButtonPlay isPlaying={isPlaying} onPress={() => this.play(0)} />
          </View>
          <ScrollView style={styles.playlist}>
            {item.tracks &&
              item.tracks.map((track, index) => (
                <TouchableOpacity key={index}>
                  <View style={styles.chapter}>
                    <Feather
                      name="play-circle"
                      size={24}
                      color={colors.primary}
                      style={styles.chapterIcon}
                    />
                    <View>
                      <TextButton>{track.title}</TextButton>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
          <SectionHeader title="Summary" />
          {collapsed ? (
            <View>
              <Text numberOfLines={3}>{item.description}</Text>
              <TextButton
                style={{fontSize: 14}}
                onPress={() => this.setState({collapsed: false})}>
                Read more
              </TextButton>
            </View>
          ) : (
            <Text>{item.description}</Text>
          )}
          <SectionHeader
            title="Reviews"
            right={
              <TextButton
                onPress={() =>
                  navigation.push('ReviewsScreen', {
                    reviews: item.reviews,
                  })
                }>
                View all
              </TextButton>
            }
          />
          <Reviews reviews={item.reviews} />
          <ButtonNewReview />
          <SectionHeader title="Where to buy?" />
          <SubText>...</SubText>
          <SectionHeader title="Where to borrow" />
          <SubText>...</SubText>
          <FooterSpace />
        </Animated.ScrollView>
        <Header
          title={item.title}
          rightButton={{
            onPress: () => this.play(0),
            iconName: 'headphones',
          }}
          animatedY={this._contentOffset.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 0],
            extrapolate: 'clamp',
          })}
          animatedOpacity={this._contentOffset.interpolate({
            inputRange: [0, 60, 70],
            outputRange: [0, 0.3, 1],
            extrapolate: 'clamp',
          })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(BookScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.headerHeight,
  },
  list: {
    padding: metrics.lessPadding,
  },
  paddingLeft: {
    paddingLeft: metrics.coverWidth + metrics.padding,
    paddingBottom: metrics.padding,
    minHeight: metrics.coverHeight,
  },
  chapter: {
    paddingTop: metrics.lessPadding,
    flexDirection: 'row',
  },
  chapterIcon: {
    marginHorizontal: metrics.lessPadding,
  },
});
