import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div className="Footer py-4 mb-4">
        <div className="container" align="center">
          <span className="text-muted">
            &copy; 2020 <strong>THAI COVID-19 REPORT</strong> - API by <a href="https://covid19.th-stat.com/" target='_bank'>covid19.th-stat.com</a>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
