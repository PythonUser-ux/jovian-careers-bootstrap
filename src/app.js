// this javascript code is running on the server thus it is not visible to the client (the browser), never send sensible data to the browser!

const exp = require('constants');
const express = require('express'); // this allow us to access the express library/utility
const path = require('path');
const app = express(); // we create an express web application

app.use(express.static(path.join(__dirname, 'public')))
// we use app.use to add features to our app

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, 'pages/index.html'));
});
// we are now attaching a route to the application
// '/'                              - when you try to access the web application root level route, without sub url parts for instance
// (req, res) =>{res.send('Ciao')}; - route handler, where (req,res) is the couple (request given from the client, response object), then use the response object to invoke "send" to send data back to the client

const port = process.env.PORT || 3000; // it uses the port 3000 if not other port is specified, process.env.PORT checks if there's an environment variable named PORT

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
});
// here we run the server
// app.listen - the web application starts listening for requests from the same port where we are running the project, so we need to specify a port, many applications run on the same computer/hardware

