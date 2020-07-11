import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import {Button} from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import auth from "../../../auth";
import { lightTheme } from './themes';

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(../assets/img/data-center.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: 'black',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
        marginLeft: '5em',
        width: '250px',
        textAlign: 'center'
    },
    actions: {
        padding: '0 1em 1em 1em',
        marginLeft: '8em',
    },
}));


const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});
    const classes = useStyles();
   
    function handleChange(event) {
      setUsername(event.target.value);
    }
  
    function handleChange2(event) {
      setPassword(event.target.value);
    }
  

    return (
                <form noValidate>
                    <div className={classes.main}>
                        {/* <Card className={classes.card}> */}
                        <div className={classes.card}>
                            <div className={classes.avatar}>
                                {/* <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar> */}
                                 <img src='../assets/img/dcLogo.png' style={{width: '370px'}} />
                            </div>
                            <div className={classes.hint}>
                                Hint: TM12345 / TM12345
                            </div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <TextField
                                      variant="outlined"
                                      margin="normal"
                                      size="small"
                                      required
                                      fullWidth
                                      id="username"
                                      label="Staff ID"
                                      name="username"
                                      autoFocus
                                      onChange={handleChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        size="small"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange2}
                                      />
                                </div>
                            </div>
                            <CardActions className={classes.actions}>
                            <Button
                                size='lg'
                                //type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="btn btn-pill"
                                onClick={() => {
                                    auth.handleLogin(username,password,() => {
                                      props.history.push("/");
                                    });
                                  }} 
                                >
                                Login
                                </Button>
                                <Button
                                    size='lg'
                                    type="reset"
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    className="btn btn-pill"
                                >
                                Reset
                                </Button>
                            </CardActions>
                        </div>
                    </div>
                </form>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props) => (
    <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;