import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
          <div className="container">
              <div className="navbar-brand"> THAI COVID-19 REPORT</div>
              <ul class="navbar-nav ml-auto">
                <li className='nav-item active'>
                  <a className='nav-link' target='_bank' href="https://github.com/krishanathep/react-covid-app"><i className="fab fa-github"></i> github</a>
                </li>
              </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
