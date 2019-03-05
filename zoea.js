import React, { Component } from 'react';
import { render, Window, App, Grid } from 'proton-native';
import {
  App,
  Grid,
  Window,
  render,
} from 'proton-native';
import MessagePanel from './messagepanel';

class MainWindow extends Component {
  render() {
    const messages = [
    ];
    return (
      <App>
        <Window
          title="Zoea Scuttlebutt Client"
          size={{ w: 1300, h: 800 }}
          menuBar={true}
          margined
          >
            <Grid padded={true}>
              <MessagePanel row={0} column={2} messages={messages} />
            </Grid>
        </Window>
      </App>
    );
  }
}

render(<MainWindow />);
