ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword'

DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL
);
CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL
);

INSERT INTO department (department_name)
VALUES 
('Executive'),
('HR'),
('Finance'),
('Software'),
('Quality Assurance'),
('Cyber Security'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES 
('CEO', 500000, 1),
('CTO', 400000, 1),

('HR Director', 200000, 2),
('Recruiter', 100000, 2),

('Financial Analyst', 150000, 3),
('Payroll Specialist', 90000, 3),

('Project Manager', 180000, 4),
('Tech Lead', 150000, 4), 
('Software Engineer', 110000, 4), 
('Software Engineer Intern', 50000, 4),

('QA Engineer', 90000, 5), 

('Security Consultant', 90000, 6), 

('Media Specialist', 70000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Icy', 'Master', 1, NULL),
('Anna', 'Conda', 2, 1),

('Polymers', 'De Generus', 3, NULL),
('Tallen', 'Hunter', 4, 3),

('Moodies', 'Dow', 5, NULL),
('Elite', 'Cashspringler', 6, NULL),

('Eugene', 'Antenna', 7, NULL),
('Hai', 'Wify', 8, 7),
('Turbou', 'Typer', 9, 7),
('Cody', 'Pirates', 9, 7),
('Cocoa', 'Googineer', 9, 7),
('Diva', 'Minion the Third', 10, 7),
('Troubles', 'Marker', 10, 7),

('Clumzy', 'Bunn', 11, NULL),

('Nibbles', 'Harker', 12, NULL),

('Streamer', 'Prou', 13, NULL);
