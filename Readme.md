Employee Management API


A REST API built using Node.js, Express.js, PostgreSQL, and JWT Authentication. The application supports user registration, login, and Employee CRUD operations.

Features
User Registration
User Login
JWT Authentication
Protected Routes using Middleware
Create Employee
Get All Employees
Get Employee By Id
Update Employee
Delete Employee
PostgreSQL Database Connectivity
MVC Architecture


Technologies Used
Node.js
Express.js
PostgreSQL
JWT (JSON Web Token)
bcrypt
dotenv


src ├── config ├── controllers ├── services ├── repositories ├── routes ├── middlewares └── server.js

Authentication
POST /register POST /login

Employees
GET /employees GET /employees/:id POST /employees PUT /employees/:id DELETE /employees/:id

Authentication Flow
User registers with email and password.
User logs in using valid credentials.
JWT token is generated.
Token is sent in the Authorization header.
Middleware validates the token.
If the token is valid, access to Employee APIs is granted.


Database
Tables:

users
employees

Raghavendra G