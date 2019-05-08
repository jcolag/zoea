import React, { Component } from 'react';
import gui from 'gui';
import { render } from 'react-yue';
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
      msgs.push(
        <Message
      	  key={msgs.length}
      	  markdown={m.contents}
      	  user={m.author}
      	  ts={m.ts.toString()}
        />
      )
    );
    return (
      <scroll
        style={{
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <container
          style={{
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {msgs}
        </container>
      </scroll>
    );
  }
}

