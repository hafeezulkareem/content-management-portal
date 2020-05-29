import { observable } from 'mobx'

class StatementModel {
   @observable shortText: string
   @observable content: string
   @observable contentType: string

   constructor(statementDetails) {
      this.shortText = statementDetails.short_text
      this.content = statementDetails.problem_description.content
      this.contentType = statementDetails.problem_description.content_type
   }
}

export { StatementModel }
