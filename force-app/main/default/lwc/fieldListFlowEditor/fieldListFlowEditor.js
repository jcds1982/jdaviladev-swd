/* eslint-disable guard-for-in */
import { LightningElement, wire, api } from "lwc";
import getListOfFields from "@salesforce/apex/fieldListForFlow.getFields";
import { loadStyle } from "lightning/platformResourceLoader";
import fieldListFlowEditorStyle from "@salesforce/resourceUrl/fieldListFlowEditor";

export default class FieldListFlowEditor extends LightningElement {
  value = [];
  listOfFields = [];

  // for dual listbox
  _selected = [];

  @api inputVariables;
  @api builderContext;

  get inputValue() {
    const param = this.inputVariables.find(({ name }) => name === "fields");
    return param && param.value;
  }

  connectedCallback() {
    loadStyle(this, fieldListFlowEditorStyle);

    if (this.inputVariables) {
      console.log(
        "inputVariables --> ",
        JSON.parse(JSON.stringify(this.inputVariables))[0].value
      );
      this.value = JSON.parse(
        JSON.stringify(this.inputVariables)
      )[0].value.split(",");
    }
  }

  @wire(getListOfFields) listOfAccountFields({ data }) {
    let templistOfFields = [];
    if (data) {
      for (let key in data) {
        templistOfFields.push({
          label: JSON.parse(data[key]).label,
          value: JSON.parse(data[key]).apiName
        });
      }

      templistOfFields.sort((a, b) => (a.label > b.label ? 1 : -1));
      this.listOfFields = templistOfFields;
    }
  }

  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  get options() {
    return this.listOfFields;
  }

  get selectedValues() {
    return this.value.join(",");
  }

  handleChange(e) {
    this.value = e.detail.value;

    if (e && e.detail) {
      const newValue = e.detail.value.toString();
      console.log("newValue --> ", newValue);
      const valueChangedEvent = new CustomEvent(
        "configuration_editor_input_value_changed",
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            name: "fields",
            newValue,
            newValueDataType: "String"
          }
        }
      );
      console.log("Dispatching Event!");
      this.dispatchEvent(valueChangedEvent);
    }
  }

  findCheckboxGroup() {
    let checkboxGroup = this.template.querySelector(
      ".slds-form-element__control"
    );
    console.log("checkboxGroup ", checkboxGroup);
  }

  // for dual listbox
  get selected() {
    return this._selected.length ? this._selected : "none";
  }

  handleChange_dl(e) {
    this._selected = e.detail.value;
  }
}