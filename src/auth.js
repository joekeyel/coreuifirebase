//import app from "./firebase"
import Swal from 'sweetalert2';
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
      this.authenticated = {status:false,region:"",division:"",username:"", password:"",};
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
    console.log('username',username);
    
      const dataForm = new FormData();
        dataForm.append("username", username);
        dataForm.append("password", password);
        this.authenticated.status = true;
        this.authenticated.username = username;
        this.authenticated.password = password;

        if(username){

            fetch('/claritybqm/reportFetch/?scriptName=DC_USER&userid='+ username.toUpperCase())
            .then(response => response.json())
            .then((user) => 
            {
              cb(username,cb);
              console.log('user', user)
              //   if(!user.user.length){
              //       Swal.fire({
              //           width: '30%',
              //           icon: 'error',
              //           title: 'Invalid DCO User',
              //           text: 'Login error, check with DCO Administrator!',
              //           fontsize: '10px'
              //           //footer: '<a href>Why do I have this issue?</a>'
              //         })
              //   }
              //   else{
              //       cb(username,cb);
              //   }
              //   console.log('user',user)
            }
            ).catch(error => {
              // console.log(error)

              // if(error){

              //   Swal.fire({
              //     width: '30%',
              //     icon: 'error',
              //     title: 'Error fetching data',
              //     text: 'Please check with your intranet (TM network) connection!',
              //     //fontsize: '10px'
              //     //footer: '<a href>Why do I have this issue?</a>'
              //   })
              // }
            
            });
            
            
        }
       
     
    }



}

  export default new Auth();
