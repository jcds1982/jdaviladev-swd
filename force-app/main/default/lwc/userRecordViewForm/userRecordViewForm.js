import { LightningElement } from "lwc";

export default class UserRecordViewForm extends LightningElement {
  _recordId = "00561000000it6j";
  objectAPI = "User";

  //   _recordId = "0036100001dOHEqAAO";
  //   objectAPI = "Contact";

  user = { FirstName: "FirstName", LastName: "LastName", Email: "Email" };

  get recordId() {
    return this._recordId;
  }
}