import { LightningElement, api } from "lwc";

export default class StickyComponent extends LightningElement {
  _sticky = false;
  _iconName = "utility:pin";
  _variant = "border-filled";
  @api
  get sticky() {
    return this._sticky;
  }

  set sticky(val) {
    this._sticky = val;
  }

  @api recordId;

  connectedCallback() {
    // this.count = 0;
    window.addEventListener("scroll", function () {
      console.log("scrolled to ", window.pageYOffset);
    });
  }

  handlePinPanel() {
    let pinpanel = this.template.querySelector('[data-id="feedback-panel"]');
    pinpanel.classList.toggle("pinned_panel");
    this._iconName =
      this._iconName === "utility:pin" ? "utility:pinned" : "utility:pin";

    this._variant =
      this._variant === "border-filled" ? "brand" : "border-filled";
  }

  handleNotification(evt) {
    console.log("Current value of the input: " + evt.target.scrollTop);
  }

  handleDrag(event) {
    // console.log("Current value of the input: " + evt.target.scrollTop);
    let style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      "text/plain",
      parseInt(style.getPropertyValue("left"), 10) -
        event.clientX +
        "," +
        (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
    );
    console.log("Dragging");
  }

  drag_over(event) {
    event.preventDefault();
    return false;
  }

  handledrop(event) {
    let offset = event.dataTransfer.getData("text/plain").split(",");
    console.log("offset ", offset);
    let dm = this.template.querySelector('[data-id="feedback-panel"]');
    console.log("dm ", dm);
    console.log(event.clientX);
    dm.style.left = event.clientX + parseInt(offset[0], 10) + "px";
    dm.style.top = event.clientY + parseInt(offset[1], 10) + "px";
    console.log("Dropping ", dm.style);
    event.preventDefault();

    return false;
  }
}