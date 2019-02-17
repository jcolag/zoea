import React, { Component } from 'react';
import { render, StyledText } from 'proton-native';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.markdown,
    }
  }

  render() {
    return (
        <StyledText
          style={{
            fontSize: 20,
            fontWeight: 'normal',
          }}
        >
          {this.state.message}
        </StyledText>
    );
  }
}

