import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Link , Switch } from 'react-router-dom';
import { Row, Col, Button,Container } from 'reactstrap';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core';
import ImgInventory from './inventory.jpg';
import ImgResource from './resource.jpg';
import ImgDashboard from './dashboard.png';
import auth from '../../auth';
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

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});


 function MediaCard(props) {
  const classes = useStyles();

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  const [userID, setUserID] = useState(""); 
  const [disableInventory, setDisableInventory] = useState(true); 
  const [disabledResource, setDisabledResource] = useState(true);
  const [disabledDashboard, setDisabledDashboard] = useState(true);

  useEffect(()=>{
    var user = localStorage.getItem('username').toUpperCase();
    var password = localStorage.getItem('password');
    
    setUserID(user)
    //console.log('user',user);
    fetch('https://10.54.5.141:3443/claritybqm/reportFetch/?scriptName=DC_USER&userid='+ user)
    .then(resp => resp.json())
    .then((user)=>{
        //console.log('user',user.rights);
        user.rights.map((rights) =>{
            if(rights === "CAN_VIEW_INVENTORY"){
                setDisableInventory(false);
            }
            if(rights === "CAN_VIEW_RESOURCE"){
                setDisabledResource(false);
            }
            if(rights === "CAN_VIEW_DASHBOARD"){
                setDisabledDashboard(false);
            }
        })

    })

  },[]);

  const signOut = (e) => {
    e.preventDefault()
    props.history.push('/login')
  }

  return (<>
<div className="app">
    <AppHeader fixed>
        <Suspense  fallback={loading()}>
        <DefaultHeader onLogout={e=>signOut(e)}/>
        </Suspense>
    </AppHeader>
 <div className="app flex-row align-items-center">
    <Container>
        <Row className="justify-content-center">
            <Col xs='4' hidden={disableInventory}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={ImgInventory}
                title="Inventory"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Inventory
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    As a DC Operation, I want system to be able to input, manage and track DC inventory element so that DC inventory is up-to-date and the information can be shared across divisions.
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <Button 
                        block 
                        color="primary" 
                        className="btn-pill"  
                        //href="#/inventoryLayout" 
                        onClick={() => {
                            auth.MenuSelected('inventory',userID,() => {
                            props.history.push("/");
                            });
                        }} 
                        >
                        Click Here</Button>
                    </Col>
            </CardActions>
            </Card>
            </Col>
            <Col xs='4' hidden={disabledResource}>
            <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={ImgResource}
                title="Resource Check"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                Resource Check
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    As a Sales/AE/Solution Consultant, I want system to be able to check available DC resource so that quotation to customer can be issued in timely manner.
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
               <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <Button 
                        block 
                        color="primary" 
                        className="btn-pill" 
                        onClick={() => {
                            auth.MenuSelected('resource check',userID,() => {
                            props.history.push("/");
                            });
                        }} 
                        >
                        Click Here</Button>
               </Col>
            </CardActions>
            </Card>
        </Col>
            <Col xs='4' hidden={disabledDashboard}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={ImgDashboard}
                title="Dashboard"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Dashboad
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    As a Product Owner and DC Manager, I want system to be able to show DC resource utilization dashboard so that proper capacity planning can be implemented.
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <Button 
                        block 
                        color="primary" 
                        className="btn-pill" 
                         onClick={() => {
                            auth.MenuSelected('dashboard',userID,() => {
                            props.history.push("/");
                            });
                        }} 
                        > Click Here</Button>
               </Col>
            </CardActions>
            </Card>
        </Col>
        </Row>
        </Container>
        </div>
        </div>
  </>);
}
export default MediaCard;