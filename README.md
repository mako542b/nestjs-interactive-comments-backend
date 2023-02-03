# Server side api for project 'Interactive Comment Section"

## Description: 

**App is part of the meant to work with frontend application** [github repository page](https://github.com/mako542b/next-interactive-comments-frontend.git)

- Application build in nest-js. 
- Basic CRUD functionality:
  + Create comment
  + Delete comment
  + Modify comment
  + Rate comment
- Auth flow with passport:
  + local strategy for initial login and after token expires  
  + Jwt strategy: 
    * access token - short lived and stored in app memory  
    * refresh token - long expiration time, stored in http-only cookie

## Installation
 To start an app: 
 - install all necessery packages (e.g. npm install)
 - add .env file with 'MONGO_URI' key and the value of mongo connection string