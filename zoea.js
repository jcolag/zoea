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
      messages: [],
      sideElements: [],
      timeoutId,
    }
  }
  
  stubData(who) {
    const messages = [];
    const sideElements = [
    ];
    
    clearTimeout(who.state.timeoutId);
          who.setState({
            messages,
            sideElements,
            timeoutId: null,
          });
  }
  
  render() {
    return (
      <App>
        <Window
          title="Zoea Scuttlebutt Client"
          size={{ w: 1300, h: 800 }}
          menuBar={true}
          margined
          >
            <Grid padded={true}>
              <Sidebar row={0} column={0} items={this.state.sideElements} />
              <Separator row={0} column={1} />
              <MessagePanel
                row={0}
                column={2}
                messages={this.state.messages}
                />
            </Grid>
        </Window>
      </App>
    );
  }
}

render(<MainWindow />);
