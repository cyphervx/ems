import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./employees-grid.js";
import "./side-menu.js";
import { empData } from "./employee-data.js";

export default class ContentArea extends PolymerElement {
  constructor() {
    super();
  }

  ready() {
    super.ready();
    let employees = JSON.parse(localStorage.getItem("ems"));
    if (employees == undefined) {
      localStorage.setItem("ems", JSON.stringify(this.empList));
    } else {
      this.empList = employees;
    }
  }
  connectedCallback() {
    super.connectedCallback();
  }

  employeesChanged() {}

  static get properties() {
    return {
      empList: {
        type: Array,
        value: empData,
        observer: "employeesChanged",
      },
    };
  }

  static get template() {
    return html`
      <style>
        * {
          box-sizing: border-box;
        }

        side-menu {
          float: left;
        }
        employees-grid {
          float: left;
        }
      </style>

      <section id="content-area">
        <side-menu></side-menu>
        <employees-grid emp-list="{{empList}}"></employees-grid>
      </section>
    `;
  }
}

window.customElements.define("content-area", ContentArea);
