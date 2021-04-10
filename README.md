# WCRealEstate-Backend
This is the backend API for the World Class Real Estate Project.

note - All teh commands needed to be run without the quotes

## Steps to set up the application
1. Clone the repository by using the commannd "git clone https://github.com/gurparshad/visioncraft-assignement-backend.git"
2. To install all teh dependencies run the command "npm install" 

## Setting up the database
1. Create a database schema through the command line or MySQL workbench.
2. Change the environment variables in the .env file located in the root directory.
    DATABASE_DEV = nameOfYourDatabase
    DATABASE_USERNAME = yourDatabaeUsername
    DATABASE_PASSWORD = yourDatabasePassword
    DATABASE_DIALECT = yourDatabaseDialect (mysql if using mysql database)
3. Run the command "npx sequelize-cli db:migrate" The database will be created with three tables - users, properties and pictures.

## Start the application
Run command "npm start"

## Postman API CLient link
https://www.getpostman.com/collections/ae25afdc3ed07c005cd4

## Languages and libraries used

- node js
- express js
- mysql
- javascript
- sequelize
- mysql2
- bcrypt
- sequelize-cli
- express-validators
- cross-env
- config 
