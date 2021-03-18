import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./content-area.js";

class MyApp extends PolymerElement {
  constructor() {
    super();
  }

  ready() {
    super.ready();
  }

  static get template() {
    return html`
      <style>
        * {
          box-sizing: border-box;
        }

        .main-page {
          display: grid;
        }
      </style>
      <content-area> </content-area>
    `;
  }
}

customElements.define("my-app", MyApp);
