# .NET-Practice

Project Overview
This repository contains a sample project with a backend developed in .NET Core and a frontend created with React. The project demonstrates a simple employee and department management system where users can perform CRUD operations.

Backend (/Backend)
Project: Employee & Department Management API
The backend is built with .NET Core and provides API endpoints for managing employees and departments. Data is stored in a SQL Server database.

Technologies Used
.NET Core
Entity Framework Core
SQL Server

Setup Instructions

1. Clone the Repository:

git clone https://github.com/IT21049590/.NET-Practice
cd .NET-Practice/Backend

2. Configure the Database:

Ensure you have SQL Server installed and running.
Update the connection string in appsettings.json with your SQL Server instance.

3. Migrate the Database: Run migrations to set up the database tables.
   dotnet ef database update

4. Run the Application: Start the backend server.
   dotnet run

API Endpoints
Employees

GET /api/Employee - Get all employees
GET /api/Employee/{id} - Get employee by ID
POST /api/Employee - Add new employee
PATCH /api/Employee?email={email} - Update employee by email
DELETE /api/Employee/{id} - Delete employee by ID
Departments

GET /api/Department - Get all departments
GET /api/Department/{id} - Get department by ID
POST /api/Department - Add new department
PATCH /api/Department?departmentId={id} - Update department
DELETE /api/Department/{id} - Delete department

Frontend (/Frontend)
Project: Employee & Department Management UI
The frontend is built with React and provides an interface for managing employees and departments through API calls to the backend.

Technologies Used
React
Axios for API calls
React Router for navigation

Setup Instructions

1. Navigate to the Frontend Directory:
   cd ../Frontend

2. Install Dependencies:
   npm install

3. Run the Application:
   npm run dev
