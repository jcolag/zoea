import React, { Component } from 'react';
import gui from 'gui';
import { render } from 'react-yue';
import Markdown from './markdown';

const LineLength = 125;

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.markdown,
      timestamp: this.props.ts,
      username: this.props.user,
    }
  }
  
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
  
  wrapMessage(text, indent) {
    const messages = [];
    const spacer = new Array(indent * 4).join(' ');
    const slen = this.textWidth(spacer);
    
    text.split('\n').forEach(line =>
    {
      let remain = line;
      let sub = spacer;
      let sublen = slen;
      
      if (remain.trim().indexOf('>') === 0) {
        lines = wrapMessage(remain.substring(1), indent + 2);
        messages.concat(lines);
        return;
      }
    
      while (remain.length > 0) {
        let space = remain.search(/\s/);

        // Orphan Word
        if (sub.length == slen && space < 0) {
          messages.push(<Markdown text={remain} key={this.uuidv4()} />);
          remain = '';
          continue;
        }
        
        let word = space < 0
          ? remain
          : remain.substring(0, space + 1);
        
        if (sublen + this.textWidth(word) > LineLength || space < 0) {
          // End of the line
          if (word === remain) {
            sub = `${sub}${word}`;
            remain = '';
          }

          // Reset
          messages.push(<Markdown
            text={sub}
            key={this.uuidv4()}
          />);
          sub = spacer;
          sublen = slen;
          continue;
        }

        // Shift the word over
        sub = `${sub}${word}`;
        sublen += this.textWidth(word);
        remain = remain.substring(space + 1);
      }
    });
    return messages;
  }

  render() {
    console.log(this.state.message);
    return (
      <container
        style={{
          alignItems: 'flex-start',
          backgroundColor: '#000080',
          color: '#FFFFFF',
          flex: 1,
          height: '100px',
        }}
      >
        <label
          text={this.state.message}
        />
      </container>
    );
  }
}

