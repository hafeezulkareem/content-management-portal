import { observable } from 'mobx'

class CodingEditorModel {
   id
   @observable programmingLanguage
   @observable fileName
   @observable content

   constructor({ id, programmingLanguage, fileName, content }) {
      this.id = id
      this.programmingLanguage = programmingLanguage
      this.fileName = fileName
      this.content = content
   }
}

export { CodingEditorModel }
