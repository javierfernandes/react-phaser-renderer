import React from 'react'
import ReactConsole from './ReactConsole'
import colors from 'colors'

describe('ReactConsole', () => {
  it('should output text with colors into console', () => {
    ReactConsole.render(
      <div>
        <red>Hello</red>
        <yellow>World</yellow>
        <cyan>React</cyan>
        <rainbow>Custom Renderer!</rainbow>
      </div>,
      () => console.log(colors.inverse('##### Update ######'))
    );
    ReactConsole.render(
      <div>
        <green>Hello</green>
        <yellow>World2</yellow>
        <cyan>React</cyan>
      </div>
    );
  })
});