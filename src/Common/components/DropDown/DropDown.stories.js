import React from 'react'

import i18n from '../../i18n/strings.json'

import { DropDown } from './DropDown'

export default {
   title: 'common/DropDown'
}

export const dropDownDefaultView = () => (
   <DropDown
      options={i18n.codeEditorLanguageOptions}
      defaultOption='Languages'
   />
)
