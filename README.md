# Employee Tracker

## Description

Check out the demo [here]().

This is an CLI application that uses node, inquirer, and MySQL to prompt the user for managing options in the employee database, including: 

* View all departments, roles, and employees

* View employees sorted by department, roles, or managers

* Add and delete employees

* Update employees (department, role, salary, and manager)

The database is designed as followed: 

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

## Future improvements

* Add or delete departments and roles

* View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Usage
This is a quick and easy tool for managing a company's employees.

## User story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Installation
Install Node js, npm, and inquirer to interact with the user via the command-line. 
<br>
Install MySQL to connect to MySQL database and perform queries.
<br>
Install console.table to have a nicely formatted table in the terminal.
<br>
To start in the terminal run:
<br>
mysql -u root -p < ./employee_trackerDB.sql 
<br>
node server.js
