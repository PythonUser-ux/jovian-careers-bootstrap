// this javascript code is running on the server thus it is not visible to the client (the browser), never send sensible data to the browser!

const exp = require('constants');
const express = require('express'); // this allow us to access the express library/utility
const path = require('path');
const JOBS = require('./jobs'); // importing the jobs module
const mustacheExpress = require('mustache-express'); // this object contains the mustache template rendering object
const app = express(); // we create an express web application

// last import to make the application send by email once the form is posted (a POST request has been sent)
require('dotenv').config(); // it reads the .env files present in the project folder and loads them into the process.env variable
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extented:false})) //  now our application is going to use bodyParser to parse the body of the incoming POST request


// Configure mustache
app.use(express.static(path.join(__dirname, 'public')));
// we use app.use to add features to our app
app.set('views', path.join(__dirname, 'pages'))
// "inside the pages folder I have some views/templates I would like to use, indeed I have index.mustache"
app.set('view engine', 'mustache');
// This line sets the view engine for rendering dynamic views in Express.js. In this case, it sets the view engine to 'mustache'. The 'mustache' view engine is associated with the Mustache templating language, and it will be used to render views dynamically based on data provided to the views.
app.engine('mustache', mustacheExpress())
// for the engine we provide the proper handler function mustacheExpress()
// it is also possible to use templates in css, for example

// Render the template
app.get('/',(req, res) =>{
    //res.sendFile(path.join(__dirname, 'pages/index.html'));
    res.render('index', { jobs: JOBS}); // "we want to render the view/template index.mustache and send the data contained in {jobs:JOBS} to populate that view"
});
// we are now attaching a route to the application
// '/'                              - when you try to access the web application root level route, without sub url parts for instance
// (req, res) =>{res.send('Ciao')}; - route handler, where (req,res) is the couple (request given from the client, response object), then use the response object to invoke "send" to send data back to the client


app.get('/jobs/:id', (req, res) => {
    const id = req.params.id;
    const matchedJob = JOBS.find(job => job.id.toString() === id);
    res.render('job', { job: matchedJob});
});




// in order to process the request we need this

// const transporter = nodemailer.createTransport({
//   host: 'mail.gmx.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_ID,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    }
});


const multer = require('multer');
const upload = multer({ dest: "src/uploads" });
// In case of file array
const uploadConfig = upload.single("resume"); 
// router.use(uploadConfig); is often preferred when you want to apply the same middleware to multiple routes, this option would replace passing *uploadConfig* to app.post


app.post('/jobs/:id/apply',uploadConfig, (req, res) => {
    const { name, email, phone, dob, resume, coverletter } = req.body;

    console.log('LOG', req.file);

    const id = req.params.id;
    const matchedJob = JOBS.find(job => job.id.toString() === id);
  
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: process.env.EMAIL_ID, // lists are accepted as well, in the real usecase I think this should be set to the *email* variable
      subject: `New Application for ${matchedJob.title}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Cover Letter:</strong> ${coverletter}</p>
      `,
      attachments:{   // utf-8 string as an attachment
        filename: 'e9a447810aa5f582897508864cc7e5a5.pptx',
        path: 'src/uploads/e9a447810aa5f582897508864cc7e5a5'
    }
    };
  
    transporter.sendMail(mailOptions, (error, info) => { //transporter.sendMail(data[, callback])
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        // res.status(200).send('Email sent successfully');
        res.status(200).render('applied');
      }
    });
  });


const port = process.env.PORT || 3000; // || is used as the "default operator". Our application is going to use the port 3000 if not other port is specified, process.env.PORT equals *undefined* unless there's an environment variable named PORT
// the result would be that when the application is running on a local server in wll run on port 3000, when the application is running on Vercel (let's say we are using this infrastructure platform) then process.env.PORT is going to be set by Vercel and used.

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
});
// here we run the server
// app.listen - the web application starts listening for requests from the same port where we are running the project, so we need to specify a port, many applications run on the same computer/hardware

