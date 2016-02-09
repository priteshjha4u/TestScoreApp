# About

#This is a angular-require-seed project built using following technologies:

 - AngularJS
 - RequireJS
 - Browsers localStorage to manipulate data.

 # if localStorage is not supported in the browser then you will not be able to play with the application.


To run the project, you need to have Node.js installed on your system. After installing Node.js, you need to install a few packages globally using the following commands:

 - npm install bower -g
 - npm install karma-cli -g

Open a command prompt and move to the folder where you have this project cloned. You need to install the dependencies. Following are the commands for it:

 - npm install
 - bower install

Now, you have everything ready to work on the project. To run and see how the application looks, run the following command:

 - npm start

This command starts a light weight server at http://localhost:8000/app/ where it runs the application.

- open you browser and point to http://localhost:8000/app/#/TestList

- Also you can put the app directory to any running web server public directory to see the application running.

# Currently unit tests are not written, however unit testing background is all set.

## Testing

    # Run unit tests automatically whenever app changes
    npm test

    # Run end to end tests (requires web server to be running)
    npm run protractor




