<template>
  <div class="about">
    <h3>This is a basic Task Management SPA utilizing Vue 3.0 for building the User Interface. This app is deployed on Heroku and
      communicates with a node.js server instance running on AWS Elastic Beanstalk. </h3>
    <a href="https://github.com/sam29061994/taskmanager-client" style="margin-right:20px" target="_blank">Frontend Github Repository</a> 
    <a href="https://github.com/sam29061994/taskmanager " target="_blank" >Backend Github Repository</a>
    <h3> Key Features: </h3>
    <ul>
      <li> User is able to Create, Read, Update (Double click on a task), Delete tasks </li>
       <li> User is able to filter task by their completion status, see the count and clear the completed tasks </li>
      <li> User is authenticated by JWT and the token is saved on local storage of the browser </li>
      <li> The app routes are guarded, without the token, user won't be able to see Home or About page</li>
      <li> User can signin and add tasks without any additional clicks </li>
    </ul>

    <h3> Notes: </h3>
    <ul>
      <li> The app can be accessed only by the admin user and no other user registrations are allowed </li>
      <li>The app does not have a pagination feature added, that means all the tasks regardless of how many, would be shown on the Home page</li>
      <li> Task ownership feature is not implemented as there is only one type of user who can access this app</li>
    </ul>

    <h3>Tools Used in this app:</h3>
    <ul>
    <li> Frontend: Vue 3.0, Vue Router, Mitt event emmiter, Express, Axios, etc.. </li>
    <li> Backend: Nest.js, Mongoose, Passport (JWT Authentication), Bcrypt, JWT, etc..  </li>
    </ul>

    <h5>API access: http://taskmanager.us-east-2.elasticbeanstalk.com/ </h5>
 

    
  </div>
</template>
