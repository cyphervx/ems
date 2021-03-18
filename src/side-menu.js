import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

export default class SideMenu extends PolymerElement {
  static get properties() {
    return {};
  }

  static get template() {
    return html`
 
         <style>
 
           *{
             box-sizing: border-box;
           }
 
           #side-menu{
             background:  #453240 ;
             height: 500vh;
             padding: 100px 10px;
           }
 
           .logo{
             text-align: center;
             padding-top: 50px;
           }
 
           .logo img{
             width: 130px;
           }
 
           
           .title{
             font-weight: 400;
            color:gold;
             text-align: center;
             font-size: 20px;
             padding: 15px 0px 30px 20px;
             text-transform: uppercase;
             margin: 0px 20px 0px 0px;
           }
           
 
       
         </style>
 
         <section id="side-menu">
             <div class="logo">
               <img src="https://img2.pngio.com/worker-png-financial-wellness-platform-real-transparent-employee-png-800_700.png"/>          
             </div>
             <div class="menu"></div>
             <div class="title">E m p l o y e e<br><br>D a t a<br><br>S t o r e</div>
             
           </div>
         </section>
     `;
  }
}

window.customElements.define("side-menu", SideMenu);
