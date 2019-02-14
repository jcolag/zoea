import React, { Component } from 'react';
import { render, Window, App, Grid } from 'proton-native';

class MainWindow extends Component {
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
            </Grid>
        </Window>
      </App>
    );
  }
}

render(<MainWindow />);
