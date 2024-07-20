import { LightningElement, api } from "lwc";
export default class FieldListFlow extends LightningElement {
  @api objectName;
  @api fields;
  @api recordId;

  get listOfFields() {
    if (this.fields) {
      return this.fields.split(",");
    }
    return this.fields;
  }
}