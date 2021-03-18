import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-input/paper-input.js";

class ActionBar extends PolymerElement {
  constructor() {
    super();
  }

  ready() {
    super.ready();
  }

  static get properties() {
    return {
      fullname: {
        type: String,
        notify: true,
        value: "",
      },
      department: {
        type: String,
        notify: true,
        value: "",
      },
      cellphone: {
        type: Number,
        notify: true,
        value: "",
      },
      dp: {
        type: String,
        notify: true,
        value: "",
      },
      empList: {
        type: Array,
        notify: true,
      },
    };
  }

  static get template() {
    return html`
      <style>
        .createbtn {
          margin: 40px;
          color: lime;
          background-color: #453240;
        }
        #search {
          margin: -95px 0px 0px 300px;
        }
      </style>

      <paper-button class="createbtn" raised on-click="openEmpForm">
        Create Employee
      </paper-button>

      <paper-input
        id="search"
        on-input="getSearchResult"
        always-float-label
        label="Search"
      ></paper-input>

      <paper-dialog id="empform">
        <h2>Create Employee</h2>
        <paper-dialog-scrollable>
          <paper-input
            id="enm"
            always-float-label
            label="Employee Name"
            allowed-pattern="[a-zA-Z ]"
            value="{{fullname::input}}"
          ></paper-input>
          <paper-input
            id="cell"
            always-float-label
            label="Cellphone"
            allowed-pattern="[0-9]"
            value="{{cellphone::input}}"
          ></paper-input>
          <paper-input
            id="dept"
            always-float-label
            label="Department"
            allowed-pattern="[a-zA-Z ]"
            value="{{department::input}}"
          ></paper-input>
          <paper-input
            id="dp"
            always-float-label
            label="Display Picture"
            value="{{dp::input}}"
          ></paper-input>
        </paper-dialog-scrollable>
        <div class="buttons">
          <paper-button dialog-confirm autofocus on-click="createEmployee">
            Create
          </paper-button>
          <paper-button on-click="clearForm"> Clear </paper-button>
          <paper-button dialog-dismiss> Cancel </paper-button>
        </div>
      </paper-dialog>
    `;
  }

  openEmpForm() {
    this.$.empform.open();
  }

  clearForm() {
    this.$.enm.value = "";
    this.$.cell.value = "";
    this.$.dept.value = "";
    this.$.dp.value = "";
    this.$.e_enm.value = "";
    this.$.e_cell.value = "";
    this.$.e_dept.value = "";
    this.$.e_dp.value = "";
  }

  createEmployee() {
    let allEmployees = this.empList;
    let lastElement = this.empList.length - 1;
    let employee = {
      eid: allEmployees[lastElement]["eid"] + 1,
      fullname: this.fullname,
      cellphone: this.cellphone,
      department: this.department,
      dp: this.dp,
    };

    allEmployees.push(employee);
    this.set("empList", []);
    this.set("empList", allEmployees);
    localStorage.setItem("ems", JSON.stringify(allEmployees));
    this.clearForm();
    this.$.empform.close();
    alert("Employee Created Successfully!");
  }

  getSearchResult(e) {
    if (e.target.value.length == 0) {
      let employees = JSON.parse(localStorage.getItem("ems"));
      this.empList = employees;
    } else {
      let allEmployees = this.empList;
      let allEmployeesLength = this.empList.length;
      let keyword = e.target.value;
      let searchResult = [];
      for (let i = 0; i < allEmployeesLength; i++) {
        let eid = allEmployees[i]["eid"];
        let enm = allEmployees[i]["eid"];
        let cell = allEmployees[i]["eid"];
        let dept = allEmployees[i]["eid"];
        let dp = allEmployees[i]["eid"];

        if (enm.search(keyword) != -1 || dept.search(keyword) != -1) {
          searchResult.push(allEmployees[i]);
        }
      }
      this.set("empList", []);
      this.set("empList", searchResult);
    }
  }
}

customElements.define("action-bar", ActionBar);
