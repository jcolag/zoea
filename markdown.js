import React, { Component } from 'react';
import {
  StyledText,
  render,
} from 'proton-native';

export default class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.text,
    }
  }
  
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  convert(text, style = null) {
    const parts = [];
    let index = 0;
    let indexPrev = 0;
    let boldStyle = {
      fontWeight: 'heavy',
    };
    let italicStyle = {
      fontStyle: 'italic',
    };
    let codeStyle = {};
    let sizes = [ 11, 16, 16, 14, 14, 12, 12 ];
    let hn = 0;
    
    if (style === null && text[0] === '#') {
      while (text[0] === '#') {
        hn += 1;
        text = text.substring(1);
      }
      
      return this.convert(
        text.trim(),
        {
          fontWeight: hn % 2 === 0 ? 'normal' : 'bold',
          fontSize: sizes[hn],
        });
    }
    
    while (index >= 0 && index < text.length) {
      let match = text
        .slice(index)
        .match(/[_\*`]/);
      let exit = false;

      if (!match) {
        parts.push(text.substring(index));
        break;
      }
      
      indexPrev = index;
      index = text.indexOf(match[0], index);
      let newStyle = italicStyle;
      let target = text[index];
      let tlen = 1;
 
      if (match[0] === '`') {
        newStyle = codeStyle;
      } else if (text[index + 1] === text[index]) {
        target = `${text[index]}${text[index]}`;
        tlen = 2;
        newStyle = boldStyle;
      }
    }

    const indexNext = text
      .indexOf(target, index + tlen);
      
    if (indexNext < 0) {
      parts.push(text.slice(index));
      exit = true;
    }

    if (!exit) {
      parts.push(text.substring(indexPrev, index));
      parts.push(
        this.convert(
          text.substring(
            index + tlen,
            indexNext
          ),
          newStyle
        )
      );
      
      index = indexNext + tlen;
      if (style === null) {
        return parts;
      } else {
        return (
          <StyledText
            key={this.uuidv4()}
            style={style}
          >
            {parts}
          </StyledText>
        );
      }
    }
  }

  render() {
    return (
      <StyledText
        style={{
          fontWeight: 'normal',
          fontSize: 11,
        }}
      >
        {this.convert(this.state.message)}
      </StyledText>
    );
  }
}

