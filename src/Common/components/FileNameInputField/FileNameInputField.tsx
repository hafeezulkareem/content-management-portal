import React, { ChangeEvent } from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'

import { InputField } from './styledComponents'

interface FileNameInputFieldProps {
   fileName: string
   onChangeFileName: (event: ChangeEvent<HTMLInputElement>) => void
}

@observer
class FileNameInputField extends React.Component<FileNameInputFieldProps> {
   render() {
      const { fileName, onChangeFileName } = this.props
      const { fileNameInputField } = i18n
      return (
         <InputField
            value={fileName}
            onChange={onChangeFileName}
            type={fileNameInputField.type}
            placeholder={fileNameInputField.placeholder}
         />
      )
   }
}

export { FileNameInputField }
