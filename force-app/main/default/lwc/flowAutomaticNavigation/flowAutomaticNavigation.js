import { LightningElement, api } from "lwc";
import { FlowNavigationNextEvent } from "lightning/flowSupport";

export default class FlowAutomaticNavigation extends LightningElement {
  @api next;

  connectedCallback() {
    console.log("entered");
    const navigateNextEvent = new FlowNavigationNextEvent();
    // this.dispatchEvent(navigateNextEvent);
    
  }
}