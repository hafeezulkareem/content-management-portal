import { observable } from 'mobx'

class CodingEditorModel {
   id
   @observable programmingLanguage
   @observable fileName
   @observable content
   roughSolutionId

   constructor({
      id,
      programmingLanguage,
      fileName,
      content,
      roughSolutionId
   }) {
      this.id = id
      this.programmingLanguage = programmingLanguage
      this.fileName = fileName
      this.content = content
      this.roughSolutionId = roughSolutionId
   }
}

export { CodingEditorModel }
