import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
    document.body.classList.toggle('sidebar-icon-only')

  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{minHeight:"100vh"}}>
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/"><h1 style={{fontFamily:"Alex Brush, cursive", color:"#f2c96a",margin:"0"}}>ShaadiOnChain</h1></a>
          <a className="sidebar-brand brand-logo-mini" href="/"><h3 style={{fontFamily:"Alex Brush, cursive", color:"#f2c96a",margin:"0"}}>SoC</h3></a>
        </div>
        <ul className="nav">
          
          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a className="nav-link" href="/dashboard" >
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </a>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>-----------------------------</Trans></span>
          </li>



          <li className={ this.isPathActive('/dating') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/dating"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/3.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Dating</Trans></span>
            </a>
          </li>
          <li className={ this.isPathActive('/love-letters') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/love-letters"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/love-letter2.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Love Letters</Trans></span>
            </a>
          </li>
          <li className={ this.isPathActive('/rings-marketplace') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/rings-marketplace"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/rings.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Rings Marketplace</Trans></span>
            </a>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Send Proposals</Trans></span>
          </li>
          <li className={ this.isPathActive('/send-engagement-proposal') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/send-engagement-proposal"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/engagement.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Engagement</Trans></span>
            </a>
          </li>
          <li className={ this.isPathActive('/send-marriage-proposal') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/send-marriage-proposal"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/marriage.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Marriage</Trans></span>
            </a>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>-----------------------------</Trans></span>
          </li>
          <li className={ this.isPathActive('/recieved-proposals') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/recieved-proposals"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/love-letter.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Recieved Proposals</Trans></span>
            </a>
          </li>
          <li className={ this.isPathActive('/sent-proposals') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/sent-proposals"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/icon/4.png" alt="Rings" width="20" height="20" className='symbol' /></span>
              <span className="menu-title"><Trans>Sent Proposals</Trans></span>
            </a>
          </li> 

          <li className={ this.isPathActive('/create-ring') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <a  className="nav-link" href="/create-ring"  >
              <span className="menu-icon"><img src="/assets/images/wedding-img/wedding-ring.png" alt="Rings" width="25" height="25" className='symbol' /></span>
              <span className="menu-title"><Trans>Mint a Ring NFT</Trans></span>
            </a>
          </li> 

          
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);