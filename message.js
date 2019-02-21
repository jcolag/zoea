import React, { Component } from 'react';
import {
  Box,
  StyledText,
  render,
} from 'proton-native';
import Markdown from './markdown';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.markdown,
    }
  }

  render() {
    return (
        <Box
          span={{
            x: 3,
            y: 1,
          }}
        >
          <Markdown text={this.state.message} />
        </Box>
    );
  }
}

