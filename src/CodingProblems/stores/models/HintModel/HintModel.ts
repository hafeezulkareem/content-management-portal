import { observable } from 'mobx'

class HintModel {
   uniqueId
   id
   @observable number
   @observable title
   @observable description
   @observable order
   @observable isActive

   constructor({ uniqueId, number, hintDetails }) {
      this.uniqueId = uniqueId
      this.id = hintDetails.hint_id
      this.title = hintDetails.title
      this.description = hintDetails.description
      this.order = hintDetails.order
      this.number = number
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
