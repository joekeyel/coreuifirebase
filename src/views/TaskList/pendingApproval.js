import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane
,Pagination, PaginationItem, PaginationLink, Table, Button,CardTitle, CardText, Input} from 'reactstrap';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {TextField,Avatar} from '@material-ui/core';
import auth from '../../../src/auth';
import TableApproved from './TableAproved';

class myTask extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      pendingApprove: [],
      dataAll: [],
      dataToday: [],
      data7days:[],
      data2weeks:[],
      valueOPt: "All",
      inputValue: "",
      colorSiteToday: "",
      colorSite7days: "",
      colorSite2week: "",
      approved: {},
      approvedData:{},
    };
  }

  componentDidMount(){
    this.props.fetchPendingApproval();
    this.props.fetchUser();
    this.props.fetchSite();
    this.getInboxList();
    this.getApproved();
  }

  componentWillReceiveProps(props){
      //console.log('componentWillReceiveProps',props);
      var username = localStorage.getItem('username').toUpperCase();
      var filtersite = Object.values(props.site).filter((r)=> r.SITE_VERIFIED_BY === username)
      var filtersite2 = Object.values(filtersite).filter((r)=> r.SITE_VERIFIED_TAG === 'Y')
      // console.log('componentWillReceiveProps2',filtersite,filtersite2);
      this.setState({
        approvedData: filtersite2
      })
  }

  getInboxList(){

    var username = localStorage.getItem('username').toUpperCase();
    var password = localStorage.getItem('password');

    fetch('/claritybqm/reportFetch/?scriptName=DC_PENDING_APPROVAL&userid=' + username)
    .then(response => response.json())
    .then((pending) => {
        //var approver = Object.values(user.user).filter(u => u.USER_APPROVE === 'Y');
        //console.log('pending',pending); 
        if(pending){
          this.setState({
            pendingApprove: pending.length,
            dataAll: pending,
          })
        }
     

        pending.map((d)=>{
          if(d.AGING === 0){

            var dataToday = Object.values(pending).filter(u => u.AGING === 0);

            this.setState({
              dataToday: dataToday,
              colorSiteToday: 'green',
            })
          }
          if(d.AGING >= 1 && d.AGING <= 7){
            var data7 = Object.values(pending).filter(u => u.AGING <= 7);
            this.setState({
              data7days: data7,
              colorSite7days: 'yellow',
            })
          }
          if(d.AGING > 7){
           // console.log('2week',d);
           var data2w = Object.values(pending).filter(u => u.AGING > 7);
            this.setState({
              data2weeks: data2w,
              colorSite2week: 'red',
            })
          }
        })

    })

  }

  getApproved(){
    var username = localStorage.getItem('username').toUpperCase();
    var filtersite = Object.values(this.props.site).filter((r)=> r.SITE_VERIFIED_BY === username)
    var filtersite2 = Object.values(filtersite).filter((r)=> r.SITE_VERIFIED_TAG === 'Y')
    // console.log('componentWillReceiveProps2',filtersite,filtersite2);
    this.setState({
      approvedData: filtersite2
    })

  }
  handleChange(e){
   // console.log('onchange',e.target.value);
    this.setState({
      valueOPt: e.target.value
    })
    
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  // handleChangeSite(e){
  //   console.log('onchange',e.target.value);
  //   //Object.values(pending).filter(u => u.AGING <= 7);

  // }
  render() {
    const task = this.state.pendingApprove
    const valueOPt = this.state.valueOPt
    const dataAll = this.state.dataAll
    const dataToday = this.state.dataToday   
    const data7days = this.state.data7days
    const data2weeks = this.state.data2weeks    
    //console.log('data2weeks',data2weeks);
    const color1 = this.state.colorSiteToday
    const color2 = this.state.colorSite7days
    const color3 = this.state.colorSite2week
    const site = this.state.approvedData;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Pending Approval</strong>
                {/* <div className="card-header-actions">
                  <p><b><em>Pending:</em></b><Badge color="warning">{task}</Badge></p>
                </div> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="3">
                    <ListGroup id="list-tab" role="tablist">
                     <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >Pending <i className="float-right fa fa-bell-o"><Badge color="danger">{task}</Badge></i></ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >Approved</ListGroupItem>
                      {/* <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >All Workgroup</ListGroupItem> */}
                    </ListGroup>
                  </Col>
                  <Col xs="6">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0} >
                      <Row>
                        <Col>
                          <Input
                              id="listOption"
                              type="select"
                              onChange={this.handleChange.bind(this)}
                              value={valueOPt}
                          >
                            <option value="All">All</option>
                            <option value="Today">Today</option>
                            <option value="7days">Last 7 days</option>
                            <option value="2weeks">Last 2 weeks</option>
                          </Input>
                        </Col>
                        <Col xs='4'>
                          {/* <Input id="site" placeholder="Search Site" style={{textTransform: 'uppercases'}} onChange={(e)=>this.handleChangeSite(e)}/> */}
                        </Col>
                        </Row>
                            {
                            valueOPt==="All" ?
                             Object.values(dataAll).map((t)=> {

                                if(t.AGING <= 3){

                                  var color = 'green'

                                }
                                if(t.AGING > 3){

                                  var color = 'yellow'

                                }
                                if(t.AGING > 7){

                                  var color = 'red'

                                }
                                return(<div className="callout callout-info shadow-md m-4">
                                  <Card body>
                                   <Avatar style={{backgroundColor: color, width: '80px', height: '80px'}}><strong className="h5">{t.TYPE_NAME ? t.TYPE_NAME : ""}</strong></Avatar>
                                  <div className="chart-wrapper">
                                    <Row>
                                      Verified by:
                                    </Row>
                                    <Row>
                                      {t.USER_NAME}
                                    </Row>
                                    <Row>
                                      {t.AGING}{' '}<small> days ago</small>
                                    </Row>
                                    <Row>
                                      <Link to={{pathname:"/ApproveSite/" + t.FOREIGN_ID+"/true"}}
                                        className="btn btn-pill btn-success" size="sm">
                                        View Details
                                      </Link>
                                      </Row>
                                    </div>
                                    </Card>
                                  </div>)
                              })
                              :
                              valueOPt === 'Today' ?
                              Object.values(dataToday).map((t)=> {
                                return(<div className="callout callout-info shadow-md m-4">
                                  <Card body>
                                   <Avatar style={{backgroundColor: color1, width: '80px', height: '80px'}}><strong className="h5">{t.TYPE_NAME ? t.TYPE_NAME : ""}</strong></Avatar>
                                  <div className="chart-wrapper">
                                    <Row>
                                      Verified by:
                                    </Row>
                                    <Row>
                                      {t.USER_NAME}
                                    </Row>
                                    <Row>
                                      <Button className="btn btn-pill" type='button' style={{cursor: 'pointer'}} color="success" size="sm" tag='a' 
                                      href={"#/EditSite/" + t.FOREIGN_ID} >
                                        View Details
                                      </Button>
                                      </Row>
                                    </div>
                                    </Card>
                                  </div>)
                              })
                              :
                              valueOPt === '7days' ?
                              Object.values(data7days).map((t)=> {
                                if(t.AGING <= 3){

                                  var color = 'green'

                                }
                                if(t.AGING > 3){

                                  var color = 'yellow'

                                }
                                console.log('data2weeks',t);
                                
                                return(<div className="callout callout-info shadow-md m-4">
                                  <Card body>
                                   <Avatar style={{backgroundColor: color, width: '80px', height: '80px'}}><strong className="h5">{t.TYPE_NAME ? t.TYPE_NAME : ""}</strong></Avatar>
                                  <div className="chart-wrapper">
                                    <Row>
                                      Verified by:
                                    </Row>
                                    <Row>
                                      {t.USER_NAME}
                                    </Row>
                                    <Row>
                                      {t.AGING}{' '}<small> days ago</small>
                                    </Row>
                                    <Row>
                                      <Button className="btn btn-pill" type='button' style={{cursor: 'pointer'}} color="success" size="sm" tag='a' 
                                      href={"#/EditSite/" + t.FOREIGN_ID} >
                                        View Details
                                      </Button>
                                      </Row>
                                    </div>
                                    </Card>
                                  </div>)
                              })
                              :
                              valueOPt === '2weeks' ?
                              Object.values(data2weeks).map((t)=> {
                                console.log('data2weeks',t);
                                
                                return(<div className="callout callout-info shadow-md m-4">
                                  <Card body>
                                   <Avatar style={{backgroundColor: color3, width: '80px', height: '80px'}}><strong className="h5">{t.TYPE_NAME ? t.TYPE_NAME : ""}</strong></Avatar>
                                  <div className="chart-wrapper">
                                    <Row>
                                      Verified by:
                                    </Row>
                                    <Row>
                                      {t.USER_NAME}
                                    </Row>
                                    <Row>
                                      {t.AGING}{' '}<small> days ago</small>
                                    </Row>
                                    <Row>
                                      <Button className="btn btn-pill" type='button' style={{cursor: 'pointer'}} color="success" size="sm" tag='a' 
                                      href={"#/EditSite/" + t.FOREIGN_ID} >
                                        View Details
                                      </Button>
                                      </Row>
                                    </div>
                                    </Card>
                                  </div>)
                              })
                              :
                              ""
                            }
                        
                      </TabPane>
                      <TabPane tabId={1}>
                      <TableApproved data={site} />
                      </TabPane>
                      {/* <TabPane tabId={2}>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Date registered</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Vishnu Serghei</td>
                                <td>2012/01/01</td>
                                <td>Member</td>
                                <td>
                                <Badge color="success">Active</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Zbyněk Phoibos</td>
                                <td>2012/02/01</td>
                                <td>Staff</td>
                                <td>
                                <Badge color="danger">Banned</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Einar Randall</td>
                                <td>2012/02/01</td>
                                <td>Admin</td>
                                <td>
                                <Badge color="secondary">Inactive</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Félix Troels</td>
                                <td>2012/03/01</td>
                                <td>Member</td>
                                <td>
                                <Badge color="warning">Pending</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Aulus Agmundr</td>
                                <td>2012/01/21</td>
                                <td>Staff</td>
                                <td>
                                <Badge color="success">Active</Badge>
                                </td>
                            </tr>
                            </tbody>
                            </Table>
                            <nav>
                            <Pagination>
                                <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                <PaginationItem active>
                                <PaginationLink tag="button">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                            </Pagination>
                            </nav>
                      </TabPane>
                    */}
                   </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      pendingApproval:state.pendingApproval,
      user: state.user,
      site: state.site,
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
      fetchPendingApproval: () => dispatch({ type: "FETCH_PENDINGAPPROVAL"}),
      fetchUser: () => dispatch({ type: "FETCH_USER"}),
      fetchSite: () => dispatch({ type: "FETCH_DCSITE"}),
       
    };
  };
  
  export default connect(mapStateToProps,mapDispachToProps)(myTask);
