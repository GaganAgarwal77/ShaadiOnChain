import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Error500 extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center text-center error-page bg-info pt-5 pb-4 h-100">
          <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
            <h2>SORRY!</h2>
            <h3 className="font-weight-light">Internal server error!</h3>
          </div>
        </div>  
      </div>
    )
  }
}

export default Error500
