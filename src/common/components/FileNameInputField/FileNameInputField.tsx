import React from 'react'

import { InputField } from './styledComponents'

class FileNameInputField extends React.Component {
   render() {
      return (
         <InputField type='text' placeholder='File name include extension' />
      )
   }
}

export { FileNameInputField }
