# site powered by Express JS

learning Express JS

in package.json "start": "node src/app.js" inside "scripts" specifies what command to execute when starting the application using "npm run start"

in package.json "dev": "nodemon src/app.js" anytime there is a change in any of the file inside the project we want src/app.js to be run again whitout having to restart the server manually, but we have to use "npm run dev" instead of "npm run start"

"ext" sets a series of extension names the changes of which will cause a server restart. However, it looks like some extentions are set by default and it is not always needed, non in this tutorial at least.

you want to use "npm run start" for deployment and "npm run dev" for testing
------------------------------------------------------------------------------------------------------------
in the directory "public" we are going to put all the files that are going to be sent to the browser directly and without changes.
Indeed we are going to use this folder using "express.static"