const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
// serve up production assets
app.use(express.static('build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


app.use(
    '/loginprocess',
    createProxyMiddleware({
      target: 'https://nd.tm.com.my/spheremobile_test/loginprocess.php',
      changeOrigin: true,
      secure:false
    })
  )

  app.use(
    '/fetchBadge',
    createProxyMiddleware({
     target: 'https://10.54.5.141:3443/claritybqm/reportFetch/?scriptName=DC_BADGE',
      changeOrigin: true,
      secure:false
    })
   
  )



// if not in production use the port 5000
const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT);