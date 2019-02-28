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

  textWidth(text) {
    const quarter = 'Iijl`|;\':,.';
    const half = 'frt-[]"\\{}/ ';
    const whole = 'FJLPSTabcdeghknopqsuvxyz1234567890';
    const wholehalf = 'ABCDEGHKNOQRUVXYZ~=_+<>?';
    const double = 'Mmw';
    const doublehalf = 'W';
    let width = 0;
    let c = ' ';
    
    for (let idx = 0; idx < text.length; idx++) {
      c = text[idx];
      if (quarter.indexOf(c) >= 0) {
        width += 0.25;
      } else if (half.indexOf(c) >= 0) {
        width += 0.5;
      } else if (whole.indexOf(c) >= 0) {
        width += 1;
      } else if (wholehalf.indexOf(c) >= 0) {
        width += 1.5;
      } else if (double.indexOf(c) >= 0) {
        width += 2;
      } else if (doublehalf.indexOf(c) >= 0) {
        width += 2.5;
      } else {
        width += 1;
      }
    }
    
    return width;
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

