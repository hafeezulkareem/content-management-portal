import React from 'react'
import { render } from '@testing-library/react'

import { CodeEditor } from './CodeEditor'

describe('CodeEditor Tests', () => {
   it('should render given programming language', () => {
      const { getByText } = render(
         <CodeEditor
            code={''}
            programmingLanguage={'JAVASCRIPT'}
            onChangeFileName={() => {}}
            fileName={''}
            codeEditorId={''}
            onChangeProgrammingLanguage={() => {}}
            onChangeContent={() => {}}
            onClickDeleteButton={() => {}}
            roughSolutionId={''}
         />
      )

      expect(getByText(/javascript/i)).toBeInTheDocument()
   })

   it('should render given filename', () => {
      const { getByPlaceholderText } = render(
         <CodeEditor
            code={''}
            programmingLanguage={''}
            onChangeFileName={() => {}}
            fileName={'sample.js'}
            codeEditorId={''}
            onChangeProgrammingLanguage={() => {}}
            onChangeContent={() => {}}
            onClickDeleteButton={() => {}}
            roughSolutionId={''}
         />
      )

      expect(
         (getByPlaceholderText(
            /file name include extension/i
         ) as HTMLInputElement).value
      ).toBe('sample.js')
   })
})
