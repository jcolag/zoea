import React, { Component } from 'react';
import {
  Box,
  Text,
  render,
} from 'proton-native';
import Message from './message';

export default class MessagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: props.column,
      messages: props.messages,
      row: props.row,
    }
  }

  render() {
    const msgs = [];
    this.state.messages.forEach(m =>
      msgs.push(<Message
      	key={msgs.length}
      	markdown={m.contents}
      	user={m.author}
      	ts={m.ts.toString()}
      />)
    );
    return (
      <Box row={this.state.row} column={this.state.column}>
        {/* This is stupid, but apparently needed to set a non-zero */}
        {/* width for the StyledText elements in the Messages. */}
        <Text>
           {'                                                                                                                                                                                                                                                                       '}
        </Text>
        {msgs}
      </Box>
    );
  }
}

