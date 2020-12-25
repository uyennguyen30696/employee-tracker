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

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;

-- View all employees
SELECT employees.id AS employees_ID, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, manager.id AS manager_ID, department.department_name AS department
FROM employees
INNER JOIN roles ON employees.role_id = roles.id
INNER JOIN department ON roles.department_id = department.id
LEFT JOIN employees manager ON employees.manager_id = manager.id
ORDER BY employees.id;

-- View all employees by department
SELECT department.id AS department_ID, department.department_name AS department, employees.id AS employee_ID , employees.first_name, employees.last_name, roles.title
FROM employees
INNER JOIN roles ON employees.role_id = roles.id
INNER JOIN department ON roles.department_id = department.id
ORDER BY department.id;

-- View all employees by role
SELECT roles.id AS role_ID, roles.title, employees.id AS employee_ID, employees.first_name, employees.last_name
FROM employees
INNER JOIN roles ON employees.role_id = roles.id
ORDER BY roles.id;

-- View all employees by manager
SELECT manager.id AS manager_ID, CONCAT(manager.first_name, ' ',manager.last_name) AS manager_name, employees.id AS employee_ID, employees.first_name, employees.last_name, roles.title
FROM employees
RIGHT JOIN employees manager ON employees.manager_id = manager.id
INNER JOIN roles ON employees.role_id = roles.id
ORDER BY employees.id;

-- View department budget
SELECT department.id, department.department_name, sum(roles.salary) AS budget
FROM department
INNER JOIN roles ON department.id = roles.department_id
GROUP BY department.id;