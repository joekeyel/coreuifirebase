import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import navigationkl from '../../_navkl';
import navigationAdmin from '../../_navDCOAdmin';
import navigationInventory from '../../navInventory';
import navigationResourceCheck from '../../navResourceCheck';
import navigationDashboard from '../../navDashboard';

// routes config
import routes from '../../routes';
//import routeskl from '../../routesKL';
import routesAdmin from '../../routeDCOadmin';


//authenticate
import auth from '../../auth'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
     // usergroup: localStorage.getItem('username').toUpperCase(),
      menuSelected: auth.isAuthenticated().menuSelected,
    }

  }

  componentDidMount(){
   // console.log('layout', auth.isAuthenticated());
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    console.log('state',auth.isAuthenticated());
    
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="sm">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={
              this.state.menuSelected === "inventory" ? navigationInventory
              :
              this.state.menuSelected === "resource check" ? navigationResourceCheck
              :
              this.state.menuSelected === "dashboard" ? navigationDashboard
              :
              navigationAdmin
              } 
              {...this.props} 
              router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer auto/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routesAdmin} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routesAdmin.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  {
                  auth.isAuthenticated().status && this.state.menuSelected === 'inventory' ? <Redirect from="/" to="/ListDCSite" />
                  :
                  auth.isAuthenticated().status && this.state.menuSelected === 'resource check' ? <Redirect from="/" to="/resourceChecking" />
                  :
                  auth.isAuthenticated().status && this.state.menuSelected === 'dashboard' ? <Redirect from="/" to="/summary" />
                  :
                  auth.isAuthenticated().status && this.state.menuSelected === "" ? <Redirect from="/" to="/main-menu" />
                  : <Redirect from="/" to="/login" />}
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
