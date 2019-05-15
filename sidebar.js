import React, { Component } from 'react';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: props.column,
      items: props.items,
      row: props.row,
    }
  }

  render() {
    let itemCount = 0;
    const list = [];

    this.state.items.forEach(item =>
      list.push(
        <Text
          key={itemCount++}
        >
          {item}
        </Text>
      )
    );
    return (
      <Box row={this.state.row} column={this.state.column} stretchy={false}>
        {list}
      </Box>
    );
  }
}

