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