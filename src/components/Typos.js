import React, {PureComponent} from 'react';
import {
  Animated,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/themes';

class AnimatedHeading extends PureComponent {
  render() {
    const {style} = this.props;
    return (
      <Animated.Text {...this.props} style={[styles.animatedHeading, style]} />
    );
  }
}

const AnimatedTitle = props => (
  <Animated.Text {...props} style={[styles.heading, props.style]} />
);

class Heading extends PureComponent {
  render() {
    return (
      <RNText {...this.props} style={[styles.heading, this.props.style]} />
    );
  }
}

class AnimatedText extends PureComponent {
  render() {
    return (
      <Animated.Text {...this.props} style={[styles.title, this.props.style]} />
    );
  }
}

class Title extends PureComponent {
  render() {
    return <RNText {...this.props} style={[styles.title, this.props.style]} />;
  }
}

class Subtitle extends PureComponent {
  render() {
    return (
      <RNText {...this.props} style={[styles.subtitle, this.props.style]} />
    );
  }
}

class TextButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <RNText {...this.props} style={[styles.textButton, this.props.style]} />
      </TouchableOpacity>
    );
  }
}

class Text extends PureComponent {
  render() {
    return <RNText {...this.props} style={[styles.text, this.props.style]} />;
  }
}

class SubText extends PureComponent {
  render() {
    return (
      <RNText {...this.props} style={[styles.subText, this.props.style]} />
    );
  }
}

class Caption extends PureComponent {
  render() {
    return (
      <RNText {...this.props} style={[styles.caption, this.props.style]} />
    );
  }
}

export {
  AnimatedHeading,
  AnimatedTitle,
  AnimatedText,
  Heading,
  Title,
  Subtitle,
  Text,
  TextButton,
  SubText,
  Caption,
};

const styles = StyleSheet.create({
  animatedHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    paddingBottom: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    paddingBottom: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'normal',
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.text,
  },
  subText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 10,
    fontWeight: 'normal',
    color: colors.textSecondary,
  },
});
