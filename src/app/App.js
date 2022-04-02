import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";
import AppLayout from './AppLayout';
class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged();
  }
  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    let layoutComponent = this.state.isAppLayoutRoute ? <AppLayout/> : '';
    return (
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          { navbarComponent }
          { layoutComponent }

          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector('body');
    if(this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/','/login-register','/wedding', '/error-pages/error-404', '/error-pages/error-500'];
    const notAppLayoutRoutes = ['/dashboard']


    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
          isAppLayoutRoute: false,
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        document.body.classList.toggle('sidebar-icon-only')
        break;
      } else {
        if (this.props.location.pathname === '/dashboard' || this.props.location.pathname === '/create-ring') {
          this.setState({
            isFullPageLayout: false,
            isAppLayoutRoute: false,
          })
          document.body.classList.toggle('sidebar-icon-only')
        }
        else{
        this.setState({
          isFullPageLayout: false,
          isAppLayoutRoute: true,
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
      }
    }
  }

}

export default withTranslation()(withRouter(App));
