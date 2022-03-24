import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { loadWeb3, loadAccount, getUser, registerUser } from "./services/web3";

const LoginRegister = () => {

  const router = useHistory();

  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0); 

  const register = async (event) => {
    event.preventDefault();
    await loadWeb3();
    const account = await loadAccount();
    setWallet(account);

    const result = await registerUser(name, gender);
    if (result) {
        const userData = await getUser(account);
        if(userData.id === 0) {
            window.alert('Something Went Wrong!');
            return;
        }
        router.push({
            pathname: '/dashboard',
            state: { user: userData, wallet: wallet }
        })
    }
  };


  const connect = async (event) => {
      event.preventDefault();
      await loadWeb3();
      const account = await loadAccount();
      setWallet(account);

      const userData = await getUser(account);
      if(userData.id > 0) {
          router.push({
              pathname: '/dashboard',
              state: { user: userData, wallet: wallet }
          })
      }
      else {
          window.alert('Account does not exist. Please register!');
      }
  };

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleGenderChange = (event) => {
      // 0 -> Male, 1-> Female, 2-> Other
      const genderStr = event.target.value
      if(genderStr === "Male") {
          setGender(0);
      }
      else if(genderStr === "Female") {
          setGender(1);
      }
      else if(genderStr === "Other") {
          setGender(2);
      }
  }


    return (
      <div style={{backgroundColor:"#191f3c"}}>
          <div className="side-decore">
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
              <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
          </div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div style={{marginLeft:"25%"}}className="col-lg-4">
              <div style={{minWidth:"50vw"}}className="card text-left py-5 px-4 px-sm-5">
                <div className='gradient-text'>
                  ShaadiOnChain
                </div>
                <h4>Get Started Now!</h4>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control placeholder="Name" size="lg" className="h-auto" onChange={handleNameChange} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                  <Form.Control as="select" size="lg" placeholder="Gender" onChange={handleGenderChange}>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other </option>
                  </Form.Control>

                  </Form.Group>
                  
                  <div className="mt-3">
                    <button  className="btn btn-block btn-primary btn-lg  gradient-button" to="/dashboard" onClick={register}>Register</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">

                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Already Registered? then <i className='mdi mdi-arrow-down'/></a>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-primary " onClick={connect}>
                      <img src="/assets/images/metamask.svg" alt="MetaMask" width="30" height="30" /> Login with MetaMask
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            {/* <img alt="" style={{position:"absolute",bottom:"15%",right:"5%",width:"10vw"}} src="../assets/images/wedding-img/icon/bride.png" /> */}

          </div>
        </div>  
      </div>
    )
}

export default LoginRegister
