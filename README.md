
# my-Helsinki-fullstack-app

A small React-Node app for a test assignment.

**Update!**: The application can now be checked out at [this address](https://blooming-journey-14473.herokuapp.com/). 

Credits to [Heroku](https://www.heroku.com) for the free cloud deployment!

## How to run the application

1. Clone the repository to your local machine
2. Install the necessary dependencies
    1. Install [Node.js](https://nodejs.org/en/)
    2. Install the package *concurrently* by running the below command at the root folder:
    ```
    npm install
    ```
    3. Then we go to the client folder and install its dependencies:
    ```
    cd client
    npm install
    ```
    4. After that we go to the server folder and install its dependencies:
    ```
    cd ..
    cd server
    npm install
    ```
3. Finally we return to the root folder and run the fullstack application
    ```
    cd ..
    npm run fullstack
    ```
4. Optionally, to test the application:
    1. We can test the backend with mock API:
    ```
    cd server
    npm run test
    ```
    2. We can test the front-end with Cypress:
    ```
    cd client
    npm run cypress:open
    ```
    
