# site powered by Express JS

learning Express JS

in package.json "start": "node src/app.js" inside "scripts" specifies what command to execute when starting the application using "npm run start"

in package.json "dev": "nodemon src/app.js" anytime there is a change in any of the file inside the project we want src/app.js to be run again whitout having to restart the server manually, but we have to use "npm run dev" instead of "npm run start"

"ext" sets a series of extension names the changes of which will cause a server restart. However, it looks like some extentions are set by default and it is not always needed, non in this tutorial at least.

you want to use "npm run start" for deployment and "npm run dev" for testing
------------------------------------------------------------------------------------------------------------
in the directory "public" we are going to put all the files that are going to be sent to the browser directly and without changes.
Indeed we are going to use this folder using "express.static"
------------------------------------------------------------------------------------------------------------
vercel.json is this case is required to help vercel understand how our project is structured, in particular:

"builds"
- "src": "src/app.js" specifies the main file we want to build and install all the dependencies for
- "use": "@vercel/node" tell Vercel to use the node.js environment (which is among the ones Vercel supports)
"routes"
- "src": "/(.*)"       no matter what route we try to access...
- "dest": "src/app.js" ...we want them all to be sent to src/app.js (not Vercel itself)
------------------------------------------------------------------------------------------------------------
GET request: all the parameters will be sent as part of the *url* of the request
POST request:  all the parameters will be sent as part of the *body* of the request

Bonus: every request also has a *header*
------------------------------------------------------------------------------------------------------------
"npm install nodemailer dotenv body-parser" explanation

*nodemailer* is a Node.js module for sending emails using a simple and flexible API.

the *dotenv* package is used to insert sensitive information in the project (let's say we want tu share it on GitHub) but not visible in the code

the request body posted using a POST request is then parsed using *body-parser*