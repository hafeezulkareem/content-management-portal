import { observable } from 'mobx'

class HintModel {
   uniqueId: string
   id: number
   @observable number: number
   @observable title: string
   @observable description: {
      content: string
      contentType: string
   }
   @observable isActive: boolean

   constructor({ uniqueId, hintDetails }) {
      this.uniqueId = uniqueId
      this.id = hintDetails.hint_id
      this.number = hintDetails.hint_number
      this.title = hintDetails.title
      this.description = {
         content: hintDetails.description.content,
         contentType: hintDetails.description.content_type
      }
      this.isActive = true
   }

   updateNumber(updatedNumber: number) {
      this.number = updatedNumber
   }

   setActiveState() {
      this.isActive = true
   }

   removeActiveState() {
      this.isActive = false
   }
}

export { HintModel }
