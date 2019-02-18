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
    
    while (index >= 0 && index < text.length) {
      let match = text
        .slice(index)
        .match(/[_\*]/);
      if (!match) {
        parts.push(text.substring(index));
        break;
      }
      
      indexPrev = index;
      index = text.indexOf(match[0], index);
      let target = text[index];
      let tlen = 1;
      let newStyle = italicStyle;
      
      if (text[index + 1] === text[index]) {
        target = `${text[index]}${text[index]}`;
        tlen = 2;
        newStyle = boldStyle;
      }

      const indexNext = text
        .indexOf(target, index + tlen);
      
      if (indexNext < 0) {
        parts.push(text.slice(index));
        break;
      }

      console.log(`${target}: ${indexPrev} -> ${index} -> ${indexNext}`);
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
    }
    
    if (style == null) {
      return parts;
    } else {
      return (
        <StyledText
          key={`${Date.now()}${parts.length}${text[indexPrev]}`}
          style={style}
        >
          {parts}
        </StyledText>
      );
    }
  }

  render() {
    return (
      <StyledText
        style={{
          fontWeight: 'normal',
        }}
      >
        {this.convert(this.state.message)}
      </StyledText>
    );
  }
}

