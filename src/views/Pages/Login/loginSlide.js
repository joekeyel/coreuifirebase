import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import auth from "../../../auth";
import Slider from './slider';
import {Typography, Box} from '@material-ui/core';


class Login extends Component {


  constructor(props){
    super(props)
    this.state = {

      username:"",
      password:"",
      authenticated:{
        status:false,
        region:"",
        division:"",
         ldapBind: "",
         ldapSearch: "",
        invalidTmUser:"", 
        invalidTmUser2: "", 
        LdapFailedfindUser: "", 
        wrongPass: "",
        wrongUsername: ""
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleChange2(event) {
    this.setState({password: event.target.value});
  }

  Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <img src="/assets/img/Telekom.png" style={{width: '10%'}} />
        {'Copyright © '}
          DC Portal
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  render() {
   // console.log('auth',auth.isAuthenticated());
    return (
    <div style={{ display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'url(../assets/img/bgdcp.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover' }}>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  {/* <span>{auth.isAuthenticated().ldapSearch}</span> */}
                    <Form /*action="/dco/login" method="post" */>
                      <center><img src="/assets/img/dcLogo.png" style={{width: '80%'}} />
                      {/* <h3>Login</h3> */}
                      {/* <p className="text-muted">Sign In to your account</p> */}
                      </center>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username"  id="username" name="username"  autoComplete="username" onChange={this.handleChange}  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" id="password" name="password" autoComplete="current-password"  onChange={this.handleChange2} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4"   onClick={() => {
                            auth.handleLogin(this.state.username,this.state.password,() => {
                              this.props.history.push("/");
                            });
                          }} 
                          >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                      <Row>
                      <Box mt={5}>
                        {this.Copyright()}
                        </Box>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                    <Slider />
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    );
  }
}

export default Login;
