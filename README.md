## Intro
This project was developed using NestJS with Javascript + Typescript. 
Here we have a some modules that allows the user to create a budgets orders for construction. The modules description following bellow.

## Modules description
- Login: This module allows the user to login
- Order: This module allows the user to create a order budget
- Material: This module allows to user to register materials
- Report: This module contains managing reports.
- User: This module allows user managment.

## Business rules
- To access the endpoints the application, the users shold be perform a login (Except to route status).
- The comon user can be create a users with role "user".
- The comon user can be create, update e delete orders.
- Only user with role "administrator" can manage users and access this module.
- Only user with role "administrator" can list all orders.
- Only user with role "administrator" can access the report module.

## Endpoints 
```terminal
-GET /status  

USER MANAGMENT
-POST /user/create  
-GET /user (Get all users) 
-GET /user/:id  
-DEL /user/:id  
-PUT /user/:id  

LOGIN
-POST /auth (login)  

ORDER
-GET /order (list all orders)
-GET /order/:id
-POST /order/create
-DELETE /order/:id
-PUT /order/:id

MATERIAL
-GET /material (list all materials)
-GET /material/:id
-POST /material/name (Get material by name description)
-POST /material/create
-DELETE /material/:id
-PUT /material/:id

REPORT
-GET /report/:userid (Get reports by userId)
-POST /report/costs (Get reports by Day, Month, Year)
```

## Building migration
After run initial migration, executing in your database that following comands for create the following index:
```terminal
    - CREATE INDEX user_id_index ON "order" (user_id)
    - CREATE INDEX material_name_index ON "material" (name)
    - CREATE INDEX access_token_index ON "auth" (access_token) 
```

To show all indexes on query tool use the comand below:
```terminal
SELECT indexname AS index_name,
       tablename AS table_name
FROM pg_indexes
WHERE schemaname = 'public';
```

## Additional information
The file "budgetConstruction.postman_collection.json" contains the postman collection this endpoints listed above.

## Running the app
```terminal
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```