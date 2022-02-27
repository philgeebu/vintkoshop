![alt text](https://www.vintko.com/img/vintko_logo.9b6e233f.png)

Vintko is a vintage watch shop application that allows an admin to control inventory while providing regular users visibility to said inventory.

This application and its scripts assume you have nodemon globally installed, and have MongoDB running on localhost:27017

- Have MongoDB running on localhost:27017
- Have nodemon installed globally
- Create:
- -- db: vintkoshop
- -- user/pass/roles: vintko/vintko_secret/readWrite
- CD to the 'server' directory
- Run 'npm install' to populate node_modules
- Run 'npm initialize && npm start' to initialize user collection with default users and provoke nodemon to run server.js

Logging in with vintko_admin@vintko.com (pass: 123123) will provide you with admin access to the application.

Logging in with vintko_user@vintko.com (pass: 123123) will provide you with general access to the application.
