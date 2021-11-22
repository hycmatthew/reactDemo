'use strict'

import React from 'react'
import { SketchPicker } from 'react-color'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {
    return (
        <List>
            <ListItem>
            <div className="background-color-block" onClick={ this.handleClick }>
            <div className="background-color-btn" />
            </div>
            { this.state.displayColorPicker ? <div lassName="background-color-popup">
            <div className="background-color-cover" onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
            </div> : null }

        </ListItem>
      </List>
    )
  }
}
