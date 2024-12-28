# Description
This project was developed using NestJS with Javascript and Typescript. 
Here we have a some modules that allows the user to create a budgets orders for construction. The modules description following bellow.

## Modules
- Login: This module allows the user to login
- Order: This module allows the user to create a order budget
- Material: This module allows to user to register materials
- Report: This module contains managing reports.
- User: This module allows user managment.

## Business rules
> To access the endpoints the application, the users shold be perform a login (Except to route status), and send the `tokenAuthorization` in header the requisition.
- The comon user can be create a users with role "user".
- The comon user can be create, update e delete orders.
- Only user with role "administrator" can manage users and access this module.
- Only user with role "administrator" can list all orders.
- Only user with role "administrator" can access the report module.

# Endpoints 
*`GET` /status*  

> USER MANAGMENT
- `POST` /user/create  
- `GET` /user 
- `GET` /user/:id  
- `DEL` /user/:id  
- `PUT` /user/:id  

> LOGIN
- `POST` /auth  

> ORDER
- `GET` /order
- `GET` /order/:id
- `POST` /order/create
- `DELETE` /order/:id
- `PUT` /order/:id

> MATERIAL
- `GET` /material
- `GET` /material/:id
- `GET` /material/name
- `POST` /material/create
- `DELETE` /material/:id
- `PUT` /material/:id

`*` The endpoint `GET material/name` has query parameter *name*

> REPORTS
- `GET` /report/:userid
- `GET` /report/costs *

`*` The endpoint `/report/costs` has query parameters *reportType | date | initialDate | finalDate* 

# Installation
> Before your install modules and dependencies and run the migration, you must setup the `.env` file. This file will setup your connection with the database.

```
$ npm install
$ npm run migration:run
```
*The command migration:run will create all tables in your database.* 

# Running the app or testing
## Development
```
$ npm run start:dev
```

## Testing
```
$ npm run test:watch
```

# Additional information
*The file `budgetConstruction.postman_collection.json` contains the postman collection this endpoints listed above.*
