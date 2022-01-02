import React, {Component} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

class Backdrop extends Component {
  constructor(props) {
    super(props);
    this.dismis = this.dismis.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {visible} = this.props;
    const {visible: nextVisible} = nextProps;
    if (visible === true && nextVisible === false) {
      this.dismis();
    }
  }

  dismis() {
    const fadeOut = {
      from: {
        opacity: 0.5,
      },
      to: {
        opacity: 0,
      },
    };

    this.viewRef.animate(fadeOut, 300).then(() => {
      const {onPress} = this.props;
      if (onPress) {
        onPress();
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismis}>
        <View />
      </TouchableWithoutFeedback>
    );
  }
}

export default Backdrop;
