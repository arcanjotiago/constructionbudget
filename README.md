## Description
This project was developed using NestJS. Here we have a login module that allows the user to login in application.
We also have a construction budget module that allows a user to create quotes.

## Busines specification
- The normal user can login, register new users, and create, list and update budgets;
- The budget have (client name, adress, service type, materials [with price], labor price and total price);
- The admin user can manage users and budgets. The administrator can access some reports.

## Endpoints
### method-description / endpoint  
-GET Status: /status  
-POST Create user: /user/create  
-POST Login: /auth  
-GET All users: /user  
-GET User by id: /user/:id  
-DEL Delete User: /user/:id  
-PUT Update User: /user/:id  
--------------------------


## Installation
```terminal
$ npm install
```

## Running the app
```terminal
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```