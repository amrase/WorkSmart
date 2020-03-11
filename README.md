# WorkSmart# WorkSmart

    A front-end job-platform that allows users to find and apply to different jobs. Allows companies to post jobs and view different user applications, schedule their interviews and hire them for different job applications

# Requirements 

    Node is really easy to install & now include NPM. You should be able to run the following command after the installation procedure below.

    $ node --version
    v12.14.0

    $ npm --version
    6.13.4

# Quick Overview

First, clone/fork-clone the WorkSmart app. Once your inside of that repo run the following:
            cd worksmart/jobs-backend
            rails db:migrate && rails db:seed && rails db:start

This will automatically migrate the database,seed the data from the seed file and 
start the server on http://localhost://3000

Then run on another bash the following:
            cd worksmart/jobs-frontend
            npm install && npm start
        
This will run the app on http://localhost://3001

# Languages and Frameworks 
    Front-End
    CSS React React Semantic UI React-Routers Rails API

    Back-End
    Ruby PostgreSQL ActiveRecord   

# File Structure - Front-end

# public/
    This is where your application will be compiled. Assets, like images and fonts, should be placed directly within this folder. Also in this folder is a default index.html file for serving up the application.

# src/
    The client folder houses the client application for the project. This is where the client-side Javascript components and React components live.

# src/main-container 
    This is where the Login and Navigation files are located.It handles the Login and Signup.The Nav components handle the login by generating the profile link deppending on the user as a simple user or company.

# src/content 
    The Content components handles the fetches depending who the user is and shows jobs and companyies that are releated to that user.Also different Route paths are handled in this component.

# src/components 
    This folder contains all the reusable components for jobs and companies.

# scr/child-compoentns
    This folder contains all the card component for a single company and jobs card and container.


# Contribution

Pull requests are more than welcome. For major changes, please open an issue first to discuss what you would like to change.

This project does not have any tests.



# README

Work Smart 

A front-end job-platform that allows users to find and apply to different jobs. Allows companies to post jobs and view different user a pplications, schedule their interviews and hire them for differe nt job applications.

* Ruby version

* System dependencies




* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify








