import React, { Component } from 'react';
import {
  Box,
  Grid,
  Separator,
  StyledText,
  Text,
  render,
} from 'proton-native';
import Markdown from './markdown';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.markdown,
      timestamp: this.props.ts,
      username: this.props.user,
    }
  }

  render() {
    return (
      <Grid>
        <Text
          column={0}
          row={0}
          >
          {this.state.username}
        </Text>
        <Text
          column={1}
          row={0}
          >
          {new Array(25).join(' ')}
        </Text>
        <Text
          column={2}
          row={0}
          >
          {this.state.timestamp}
        </Text>
        <Box
          column={0}
          row={1}
          span={{
            x: 3,
            y: 1,
          }}
        >
          <Markdown text={this.state.message} />
        </Box>
        <Separator
          column={0}
          row={3}
          vertical={false}
          visible={true}
        />
      </Grid>
    );
  }
}

