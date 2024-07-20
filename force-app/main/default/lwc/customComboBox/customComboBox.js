import { LightningElement, api, wire } from "lwc";
import getAccountStatuses from "@salesforce/apex/CustomComboBoxController.getAccountStatuses";

export default class CustomComboBox extends LightningElement {
  @api recordId;
  get options() {
    console.log(`recordId ${this.recordId}`);
    console.log(`getStatus ${JSON.stringify(this.getStatuses.data)}`);
    return this.getStatuses.data;
    // return [
    //   { label: "option A", value: "optionA", description: "" },
    //   { label: "option B", value: "optionB", description: "" },
    //   { label: "option C", value: "optionC", description: "" }
    // ];
  }

  @wire(getAccountStatuses) getStatuses;
  optionValue;

  handleChange(event) {
    try {
      this.value = event.detail.value;
      console.log(this.value);
    } catch (e) {
      console.log(`Error ${e}`);
    }
  }
}