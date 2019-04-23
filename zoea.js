import React, { Component } from 'react';
import {
  App,
  Grid,
  Separator,
  Window,
  render,
} from 'proton-native';
import Sidebar from './sidebar';
import MessagePanel from './messagepanel';

const ssbClient = require('ssb-client');
const pull = require('pull-stream');

class MainWindow extends Component {
  constructor(props) {
    super(props);
    const timeoutId = setTimeout(this.stubData, 500, this);
    this.state = {
      endIdx: 4,
      messages: [],
      sideElements: [],
      startIdx: 0,
      timeoutId,
    }
  }
  
  stubData(who) {
    const messages = [];
    const sideElements = [
    ];
    
    clearTimeout(who.state.timeoutId);
    ssbClient(function (err, sbot) {
      let scutId;
      if (err) {
        throw err;
      }

      sbot.whoami(function(err, info) {
        const stream = sbot.createUserStream({
          id: info.id,
        });
        pull (stream, pull.collect((err, msgs) => {
          if (err) {
            sbot.close();
            throw err;
          }
          msgs.forEach(m => {
            if (m.value.content.type !== 'post') {
              return;
            }
            messages.push({
              author: m.value.author,
              contents: m.value.content.text,
              ts: new Date(m.value.timestamp),
            });
          });
          messages.reverse();
          who.setState({
            messages,
            sideElements,
            timeoutId: null,
          });
          sbot.close();
        }));
      });
    });
  }
  
  render() {
    if (this.state.messages.length === 0) {
      return null;
    }
    return (
      <App>
        <Window
          title="Zoea Scuttlebutt Client"
          size={{ w: 1300, h: 800 }}
          menuBar={true}
          margined
          >
            <Grid padded={true}>
              <Sidebar
                row={0}
                column={0}
                items={this.state.sideElements}
                />
              <Separator row={0} column={1} />
              <MessagePanel
                row={0}
                column={2}
                messages={this.state.messages.slice(
                  this.state.startIdx,
                  this.state.endIdx
                )}
                />
            </Grid>
        </Window>
      </App>
    );
  }
}

render(<MainWindow />);
