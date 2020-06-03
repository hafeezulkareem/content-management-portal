import { observable } from 'mobx'

class HintModel {
   uniqueId
   id
   @observable number
   @observable title
   @observable description
   @observable isActive

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

   updateNumber(updatedNumber) {
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
