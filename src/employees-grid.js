import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./action-bar.js";
import { empData } from "./employee-data.js";
import "./employee-item.js";

class EmployeesGrid extends PolymerElement {
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
      this.empList = this.empList.reverse();
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  employeesChanged() {
    this.$.employeepool.render();
  }

  static get properties() {
    return {
      empList: {
        type: Array,
        value: empData,
        observer: "employeesChanged",
      },
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
    };
  }

  static get template() {
    return html`
      <style>
        h5 {
          margin: 40px;
          font-weight: 400;
          font-size: 20px;
        }
        .employees {
          max-width: 1000px;
          color: #3e4162;
        }
        * {
          box-sizing: border-box;
        }

        h2 {
          font-weight: 300;
        }

        .employee {
          width: 100%;
          display: grid;
          grid-template-columns: 100px 100px 200px 200px 200px 100px;
          padding: 10px;
          margin: 20px 0px;
          border-radius: 10px;
          transition: all 0.2s ease-in-out;
          box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.12);
          -webkit-box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.12);
          -moz-box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.12);
        }

        .employee:hover {
          box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.3);
          -webkit-box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.3);
          -moz-box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .user-img {
          height: 40px;
          width: 40px;
          background-size: cover;
          background-position: center center;
          border-radius: 50px;
          margin: 3px 0px 0px 20px;
        }

        .fullname {
          font-weight: 700;
          text-transform: capitalize;
        }

        .text {
          display: block;
          text-align: center;
        }

        .editicon,
        .deleteicon {
          display: block;
          text-align: center;
        }

        .caption {
          color: #cc0000;
          font-size: 0.7rem;
          font-weight: 500;
          display: block;
          text-align: center;
          margin: 5px 0px;
        }

        .mobile {
          font-weight: 500;
          color: #3d4060;
          text-transform: capitalize;
          font-size: 1rem;
        }

        .eid,
        .fullname,
        .user-img,
        .srno,
        .email,
        .mobile,
        .department {
          font-size: 0.8rem;
          font-weight: 500;
        }
        .delete {
          position: absolute;
          margin: 6px 0px 0px 880px;
          font-size: 2rem;
          color: black;
        }

        .delete svg {
          height: 22px;
          width: 22px;
          color: #ef5350;
          transition: all 0.2s ease-in-out;
        }

        .delete svg:hover {
          color: #d32f2f;
          cursor: pointer;
        }

        .edit {
          position: absolute;
          margin: 6px 0px 0px 820px;
          font-size: 2rem;
          color: black;
        }

        .edit svg {
          height: 22px;
          width: 22px;
          color: #4caf50;
          transition: all 0.2s ease-in-out;
        }

        .edit svg:hover {
          color: #2e7d32;
          cursor: pointer;
        }
      </style>
      <action-bar emp-list="{{empList}}"></action-bar>
      <h5>E M P L O Y E E S</h5>
      <ul class="grid" items="{{empList}}">
        <template id="employeepool" is="dom-repeat" items="{{empList}}">
          <div class="employee">
            <div class="eid">
              <span class="caption">EID</span>
              <span class="text">[[item.eid]]</span>
            </div>
            <div class="user-img">
              <img class="user-img" src="[[item.dp]]" />
            </div>
            <div class="fullname">
              <span class="caption">Name</span>
              <span class="text">[[item.fullname]]</span>
            </div>
            <div class="mobile">
              <span class="caption">Cellphone</span>
              <span class="text">[[item.cellphone]]</span>
            </div>
            <div class="department">
              <span class="caption">Department</span>
              <span class="text">[[item.department]]</span>
            </div>
            <div class="edit">
              <span class="editicon">
                <svg
                  on-click="openEditDialog"
                  val1="[[item.eid]]"
                  val2="[[item.fullname]]"
                  val3="[[item.cellphone]]"
                  val4="[[item.department]]"
                  val5="[[item.dp]]"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="edit"
                  class="svg-inline--fa fa-edit fa-w-18"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                  />
                </svg>
              </span>
            </div>
            <div class="delete">
              <span class="deleteicon">
                <svg
                  on-click="openDeleteDialog"
                  val1="[[item.eid]]"
                  val2="[[item.fullname]]"
                  val3="[[item.cellphone]]"
                  val4="[[item.department]]"
                  val5="[[item.dp]]"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="trash"
                  class="svg-inline--fa fa-trash fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </template>
      </ul>

      <paper-dialog id="editform">
        <h2>Edit Employee</h2>
        <paper-dialog-scrollable>
          <paper-input
            id="e_enm"
            always-float-label
            label="Employee Name"
            allowed-pattern="[a-zA-Z ]"
            value="{{fullname::input}}"
          ></paper-input>
          <paper-input
            id="e_cell"
            always-float-label
            label="Cellphone"
            allowed-pattern="[0-9]"
            value="{{cellphone::input}}"
          ></paper-input>
          <paper-input
            id="e_dept"
            always-float-label
            label="Department"
            allowed-pattern="[a-zA-Z ]"
            value="{{department::input}}"
          ></paper-input>
          <paper-input
            id="e_dp"
            always-float-label
            label="Display Picture"
            value="{{dp::input}}"
          ></paper-input>
        </paper-dialog-scrollable>
        <div class="buttons">
          <paper-button
            id="updemp"
            on-click="updateEmployee"
            dialog-confirm
            autofocus
          >
            Update
          </paper-button>
          <paper-button on-click="clearForm"> Clear </paper-button>
          <paper-button on-click="clearForm" dialog-dismiss>
            Cancel
          </paper-button>
        </div>
      </paper-dialog>

      <paper-dialog id="deleteform">
        <h3>Do you really want to delete the employee record ?</h3>
        <div class="buttons">
          <paper-button
            id="delemp"
            on-click="deleteEmployee"
            dialog-confirm
            autofocus
            >Delete</paper-button
          >
          <paper-button dialog-dismiss> Cancel </paper-button>
        </div>
      </paper-dialog>
    `;
  }
  openEditDialog(e) {
    if (
      (this.fullname = e.target.val2) &&
      (this.cellphone = e.target.val3) &&
      (this.department = e.target.val4) &&
      (this.dp = e.target.val5) &&
      (this.$.updemp.val1 = e.target.val1)
    ) {
      this.$.editform.open();
    }
  }
  updateEmployee(e) {
    let allEmployees = this.empList;
    let eid = e.target.val1;
    for (let i = 0; i < allEmployees.length; i++) {
      if (allEmployees[i]["eid"] == eid) {
        allEmployees[i]["fullname"] = this.$.e_enm.value;
        allEmployees[i]["cellphone"] = this.$.e_cell.value;
        allEmployees[i]["department"] = this.$.e_dept.value;
        allEmployees[i]["dp"] = this.$.e_dp.value;
        this.set("empList", []);
        this.set("empList", allEmployees);
        localStorage.setItem("ems", JSON.stringify(allEmployees));
        this.$.editform.close();
        return alert("Employee Updated Successfully !");
      }
    }
  }
  openDeleteDialog(e) {
    if ((this.$.delemp.val1 = e.target.val1)) {
      this.$.deleteform.open();
    }
  }
  deleteEmployee(e) {
    let allEmployees = this.empList;
    let newEmpList = [];
    let eid = e.target.val1;
    for (let i = 0; i < allEmployees.length; i++) {
      if (!(allEmployees[i]["eid"] == eid)) {
        newEmpList.push(allEmployees[i]);
      }
    }
    this.set("empList", []);
    this.set("empList", newEmpList);
    localStorage.setItem("ems", JSON.stringify(this.empList));
    this.$.deleteform.close();
    return alert("Employee Deleted Successfully!");
  }
}

customElements.define("employees-grid", EmployeesGrid);
