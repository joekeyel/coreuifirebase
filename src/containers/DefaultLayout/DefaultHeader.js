import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge,Row, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/telekom.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import auth from '../../../src/auth';
import Avatar from 'react-avatar';
import { connect } from "react-redux";


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PendingApproval: [],
      PendingTask: [],
      openSnackBar: false,
      userFullName: ""
    };
  }
  componentDidMount() {
  
    this.props.fetchUpAsync();
    this.props.fetchPendingApproval();
   
    var username = localStorage.getItem('username').toUpperCase();
    var password = localStorage.getItem('password');
    //console.log('login',username1,password);

   // var username = auth.authenticated.username.toUpperCase();

    fetch('/claritybqm/reportFetch/?scriptName=DC_INBOX_LIST&userid='+ username)
    .then(response => response.json())
    .then((inbox) => {
        //var approver = Object.values(user.user).filter(u => u.USER_APPROVE === 'Y');
        //console.log('inbox',inbox); 
        inbox.map((i)=>{
         
          if(i.TYPE === 'INVENTORY'){
            var dataInventory = Object.values(inbox).filter(u => u.TYPE === 'INVENTORY');
            this.setState({
              PendingApproval: dataInventory,
              openSnackBar: true
            })
          }
          if(i.TYPE === 'TASK'){
            var dataTask = Object.values(inbox).filter(u => u.TYPE === 'TASK');
            this.setState({
              PendingTask: dataTask,
              openSnackBar: true
            })
          }

        })
       
    })

    fetch('/claritybqm/reportFetch/?scriptName=DC_USER&userid='+ username)
    .then(response => response.json())
    .then((user) => {
        //console.log('user',user);
        if(user.user){
          user.user.map((u)=>{
            this.setState({
              userFullName: u.NAME
            })
          })
        }
       
    })

  }

  handleClose(event, reason){

    if (reason === 'clickaway') {
      return;
    }
  
    this.setState({
      openSnackBar: false
    })
   
  
  };
  render() {
    //console.log('render',this.state);
    console.log('props',this.props);
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const task = this.state.PendingTask ? this.state.PendingTask.length : 0;
    var pendingApproval = this.props.pendingApproval ? this.props.pendingApproval.length : 0;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 75, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/main-menu" className="nav-link" > Main Menu</NavLink>
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">{pendingApproval}</Badge></NavLink>
          </NavItem>
          
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <span id={auth.authenticated.username.toUpperCase()} >{this.state.userFullName}</span>
              {/* <img src={'../../assets/img/avatars/telekom.png'} className="img-avatar" /> */}
              <Avatar name={this.state.userFullName} value={this.state.userFullName ? this.state.userFullName : 'TM'} color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} size="40" round={true} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem> */}
              <DropdownItem action tag="a" href="#/taskList"><i className="fa fa-tasks"></i> Tasks<Badge color="danger">0</Badge></DropdownItem>
              <DropdownItem action tag="a" href="#/pendingApproval"><i className="fa fa-bell-o"></i>Pending Approval<Badge color="warning"> {pendingApproval}</Badge></DropdownItem>
               {/*<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
        
        <Snackbar style={{marginBottom:'50px'}}
          open={this.state.openSnackBar} autoHideDuration={1500} onClose={this.handleClose.bind(this)} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert variant="filled"  onClose={this.handleClose.bind(this)}  severity="info" >
                You have {pendingApproval} Pending Approval.
            </Alert>
      </Snackbar>
      <Snackbar
          open={this.state.openSnackBar} autoHideDuration={1500} onClose={this.handleClose.bind(this)} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert variant="filled"  onClose={this.handleClose.bind(this)}  severity="info" >
                You have {task} Pending Task.
            </Alert>
      </Snackbar>
      
      </React.Fragment>
    );
    
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;



const mapStateToProps = state => {
  return {
    user: state.user,
    pendingApproval: state.pendingApproval
  };
};

const mapDispachToProps = dispatch => {
  return {

    fetchUpAsync: () => dispatch({ type: "FETCH_USER"}),
    fetchPendingApproval: () => dispatch({ type: "FETCH_PENDINGAPPROVAL"}),
  
  };
};
export default connect(mapStateToProps,mapDispachToProps)(DefaultHeader);
