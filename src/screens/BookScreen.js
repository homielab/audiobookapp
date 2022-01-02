import React, {Component} from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import BookCover from '../components/BookCover';
import ButtonNewReview from '../components/ButtonNewReview';
import ButtonPlay from '../components/ButtonPlay';
import Category from '../components/Category';
import FooterSpace from '../components/FooterSpace';
import Header from '../components/Header';
import Reviews from '../components/Reviews';
import SectionHeader from '../components/SectionHeader';
import StarRating from '../components/StarRating';
import {SubText, Text, TextButton, Title} from '../components/Typos';
import PlayerControl from '../helpers/PlayerControl';
import {connect} from '../recontext/store';
import PLAYER_STATUS from '../utils/playerStatus';
import {colors, metrics} from '../utils/themes';

class BookScreen extends Component {
  constructor(props) {
    super(props);
    this._contentOffset = new Animated.Value(0);
    this.play = this.play.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  componentDidMount() {
    const {player} = this.props;
    StatusBar.setBarStyle('dark-content', true);
    if (!player.book) {
      this.play(0);
    }
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content', true);
  }

  play(trackIndex = 0) {
    const item = this.props.route.params.item;
    PlayerControl.load(item, trackIndex);
  }

  render() {
    const {route, navigation, player} = this.props;
    const {collapsed} = this.state;
    const item = route.params.item;

    const isPlaying =
      player.status === PLAYER_STATUS.PLAYING && player.book.id === item.id;

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
          )}
        >
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
                style={styles.readmoreText}
                onPress={() => this.setState({collapsed: false})}
              >
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
                  navigation.navigate('ReviewsScreen', {
                    reviews: item.reviews,
                  })
                }
              >
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
          hasBackButton
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
  readmoreText: {
    fontSize: 14,
  },
});
