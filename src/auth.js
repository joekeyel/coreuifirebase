//import app from "./firebase"
import Swal from 'sweetalert2';
import axios from 'axios';
// var express =require('express');
// const app = express();
//const ldap = require('ldapjs');
// const client = ldap.createClient({
//   url: 'ldap://10.45.236.28:636'
// });
// console.log('client',client);

//const ldapUser = "cn=NICEldapadmin,ou=serviceAccount,o=Telekom";  //:"cn=NICEldapadmin,ou=serviceAccount,o=Telekom",
//const ldapPass = "2Fe97Bm2";  //:"Passw0rd"

class Auth {
    constructor() {
      this.authenticated = {status:false,region:"",division:"",username:"", password:"",menuSelected:""};
    }


    login(username,cb) {
      this.authenticated.status = true;
      this.authenticated.username = username;
      //this.handleLogin();
      cb();
      
    }
  
    logout(cb) {
      this.authenticated.status = false;
      this.authenticated.username = ""
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }

    handleLogin = (username,password,cb)   =>  {
    //console.log('username',username);
    
        const dataForm = new FormData();
        dataForm.append("username", username);
        dataForm.append("password", password);
        this.authenticated.status = true;
        this.authenticated.menuSelected = "";
        this.authenticated.username = username;
        this.authenticated.password = password;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
       
        if(username){

          axios.get('/claritybqm/reportFetch/?scriptName=DC_USER&userid='+username.toUpperCase(), 
          ).then(resp => {
           
               // console.log('d',resp.data)               
                if(!resp.data.user.length){
                  Swal.fire({
                    width: '30%',
                    icon: 'error',
                    title: 'Invalid DCO User',
                    text: 'Login error, check with DCO Administrator!',
                    fontsize: '10px'
                    //footer: '<a href>Why do I have this issue?</a>'
                  })
                }
                else{
                    cb(username,cb);  
                }
        
          });
        
       }

    }

    MenuSelected(menu,username,cb) {
      //console.log('selecteMenu',menu);
      this.authenticated.menuSelected = menu;
      this.authenticated.status = true;
      this.authenticated.username = username;
      //localStorage.setItem('menuSelected', menu);
      cb(username,cb)
    }

}

  export default new Auth();
