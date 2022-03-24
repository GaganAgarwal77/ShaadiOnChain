import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export class LoginRegister extends Component {
  render() {
    return (
      <div style={{backgroundColor:"#191f3c"}}>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className='gradient-text'>
                  ShaadiOnChain
                </div>
                <h4>Get Started Now!</h4>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Name" size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                  <Form.Control as="select" size="lg" placeholder="Gender">
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other </option>
                  </Form.Control>

                  </Form.Group>
                  
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">

                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Already Registered? then <i className='mdi mdi-arrow-down'/></a>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <img src="/assets/images/metamask.svg" alt="MetaMask" width="30" height="30" /> LoginRegister with MetaMask
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <img alt="" style={{position:"absolute",bottom:"15%",right:"5%",width:"25vw"}} src="../assets/images/wedding-img/icon/couple1.png" />

          </div>
        </div>  
      </div>
    )
  }
}

export default LoginRegister
