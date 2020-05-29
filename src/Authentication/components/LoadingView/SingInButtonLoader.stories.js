import React from 'react'
import Loader from 'react-loader-spinner'
import { withKnobs, color, number } from '@storybook/addon-knobs'

export default {
   title: 'src/Spinners'
}

export const singInButtonLoader = () => (
   <Loader
      type='TailSpin'
      color={color('Color', '#000000')}
      width={number('Width', 20)}
      height={number('Height', 20)}
   />
)

singInButtonLoader.story = {
   decorators: [withKnobs]
}
