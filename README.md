# 12 MySQL Homework: Employee Tracker

## Description

Check out the demo [here](https://www.youtube.com/watch?v=gXqlzYxBIqU).

This is an CLI application that uses node, inquirer, and MySQL to prompt the user for managing options in the employee database, including: 

* View all departments, roles, and employees in a combined table

* View department budget

* View employees sorted by department, roles, or managers

* View the lists of department and roles

* Add and delete employees

* Update employees (department, role, and manager)

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

## Credit

Visit [fsymbols.com](https://fsymbols.com/ ) for more font styling in the terminal.

## Future improvements

* View employees in a specific department or role instead of a combined table

* Update salary

* Add or delete departments and roles

* Group duplicated rows into one
