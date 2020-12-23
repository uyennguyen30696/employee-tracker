const mysql = require("mysql");
const inquirer = require("inquirer");
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Uyen3061",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    console.log(`
    █▀▀ █▀▄▀█ █▀█ █░░ █▀█ █▄█ █▀▀ █▀▀   ▀█▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀▀ █▀█
    ██▄ █░▀░█ █▀▀ █▄▄ █▄█ ░█░ ██▄ ██▄   ░█░ █▀▄ █▀█ █▄▄ █░█ ██▄ █▀▄`);

    console.log('\n');

    init();
});

const init = async () => {
    await inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Hello! What\'s your name?'
        }
    ]).then(resp => {
        console.log("Hello " + `${resp.name}` + "!");
        console.log(`( ͡♥ ͜ʖ ͡♥)`);
        console.log('\n');
    });

    promptAction();
};

async function promptAction() {
    await inquirer.prompt(
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View list of departments',
                'View department budget',
                'View list of roles',
                'View all employees by department',
                'View all employees by role',
                'View all employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee',
                // 'Update roles',
                // 'Update departments',
                'Quit'
            ]
        }).then(resAction => {
            switch (resAction.action) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'View list of departments':
                    viewDepartmentList();
                    break;

                case 'View department budget':
                    departmentBudget();
                    break;


                case 'View list of roles':
                    viewRoleList();
                    break;

                case 'View all employees by department':
                    viewByDepartment();
                    break;

                case 'View all employees by role':
                    viewByRole();
                    break;

                case 'View all employees by manager':
                    viewByManager();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Remove employee':
                    removeEmployee();
                    break;

                case 'Update employee':
                    updateEmployee();
                    break;

                case 'Quit':
                    connection.end();
                    break;
            }
        });
};

function viewDepartmentList() {
    const query = `SELECT * FROM department;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        promptAction();
    });
};

function departmentBudget() {
    const query = `SELECT department.id, department.department_name, sum(roles.salary) AS budget
    FROM department
    INNER JOIN roles ON department.id = roles.department_id
    GROUP BY department.id;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        console.log(`💰 💰 💰  💰 💰 💰  💰 💰 💰`);
        console.log('\n');
        promptAction();
    });
};

function viewRoleList() {
    const query = `SELECT id, title FROM roles;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        promptAction();
    });
};

function viewAllEmployees() {
    const query = `SELECT employees.id AS employees_ID, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, manager.id AS manager_ID, department.department_name AS department
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN department ON roles.department_id = department.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id
    ORDER BY employees.id;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        promptAction();
    });
};

function viewByDepartment() {
    const query = `SELECT department.id AS department_ID, department.department_name AS department, employees.id AS employee_ID , employees.first_name, employees.last_name, roles.title
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN department ON roles.department_id = department.id
    ORDER BY department.id;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        /*
        // SELECT DISTINCT department FROM employees
        // GROUP_CONCAT

        // connection.query(`SELECT `)
        inquirer.prompt(
            {
                name: 'department_filter',
                type: 'list',
                message: 'Filter by?',
                choices: () => results.map(results => results.department)
            }
        ).then(resFilterDepartment => {
            console.log(resFilterDepartment)
            //console.table(resFilterDepartment.department_filter);
        }); */
    });
    promptAction();
};

function viewByRole() {
    const query = `SELECT roles.id AS role_ID, roles.title, employees.id AS employee_ID, employees.first_name, employees.last_name
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    ORDER BY roles.id;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        promptAction();
    });
};

function viewByManager() {
    const query = `SELECT manager.id AS manager_ID, CONCAT(manager.first_name, manager.last_name) AS manager_name, employees.id AS employee_ID, employees.first_name, employees.last_name, roles.title
    FROM employees
    RIGHT JOIN employees manager ON employees.manager_id = manager.id
    INNER JOIN roles ON employees.role_id = roles.id
    ORDER BY employees.id;`;
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        promptAction();
    });
};

const promptName = () => {
    return inquirer.prompt([
        {
            name: 'add_first_name',
            type: 'input',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'add_last_name',
            type: 'input',
            message: 'What is the employee\'s last name?'
        }
    ]);
};

async function addEmployee() {
    const askName = await promptName();

    const queryRole = `SELECT id, title
        FROM roles
        ORDER BY roles.id;`;
    const queryManager = `SELECT id, first_name, last_name
        FROM employees;`;

    connection.query(queryRole, function (err, roleResults) {
        if (err) throw err;

        let addRole = roleResults.map(({ id, title }) =>
        ({
            id: id,
            name: `${id} ${title}`
        })
        );

        connection.query(queryManager, function (err, managerResults) {
            if (err) throw err;

            let addManager = managerResults.map(({ id, first_name, last_name }) =>
            ({
                id: id,
                name: `${id} ${first_name} ${last_name}`
            })
            );
            let noManager = {
                id: null,
                name: 'None'
            }
            addManager.push(noManager);

            inquirer.prompt([
                {
                    name: 'add_role',
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    choices: addRole
                },
                {
                    name: 'add_manager',
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    choices: addManager
                }
            ]).then(resAdd => {
                connection.query('INSERT INTO employees SET ?',
                    {
                        first_name: askName.add_first_name,
                        last_name: askName.add_last_name,
                        role_id: parseInt(resAdd.add_role),
                        manager_id: parseInt(resAdd.add_manager) || null
                    },
                    function (err) {
                        if (err) throw err;
                    }
                )

                console.log('The new employee has been added. Please view the list of all employees again to verify.');
                viewAllEmployees();
            })
        });
    });
};

function removeEmployee() {
    const queryEmployee = `SELECT * FROM employees;`;
    const queryRemove = `DELETE FROM employees WHERE ?`;
    connection.query(queryEmployee, function (err, employeeResults) {
        if (err) throw err;

        let removeEmployee = employeeResults.map(({ id, first_name, last_name }) =>
        ({
            id: id,
            name: `${id} ${first_name} ${last_name}`
        })
        );
        inquirer.prompt(
            {
                name: 'remove_employee',
                type: 'list',
                message: 'Choose the employee you would like to remove.',
                choices: removeEmployee
            }
        ).then(resRemove => {
            connection.query(queryRemove, { id: parseInt(resRemove.remove_employee) }, function (err) {
                if (err) throw err;

                console.log('The chosen employee has been deleted. Please view the list of all employees again to verify.');
                viewAllEmployees();
            });
        });
    });
};

function updateEmployee() {
    const queryEmployee = `SELECT * FROM employees;`;
    const queryRole = `SELECT * FROM roles;`;
    connection.query(queryEmployee, function (err, updateResults) {
        if (err) throw err;

        let updateEmployee = updateResults.map(({ id, first_name, last_name }) =>
        ({
            id: id,
            name: `${id} ${first_name} ${last_name}`
        })
        );
        inquirer.prompt([
            {
                name: 'update_employee',
                type: 'list',
                message: 'Choose the employee you would like to update.',
                choices: updateEmployee
            },
            {
                name: 'update_list',
                type: 'list',
                message: 'Choose the employee\'s information to update:',
                choices: [
                    'Role',
                    // 'Salary',
                    'Manager'
                ]
            }
        ]).then(resUpdate => {

            if (resUpdate.update_list === 'Role') {
                connection.query(queryRole, function (err, results) {
                    if (err) throw err;

                    let updateEmployeeRole = results.map(({ id, title }) =>
                    ({
                        id: id,
                        name: `${id} ${title}`
                    })
                    );

                    inquirer.prompt(
                        {
                            name: 'update_employee_role',
                            type: 'list',
                            message: 'What is the employee\'s new role?',
                            choices: updateEmployeeRole
                        }
                    ).then(resRole => {
                        connection.query("UPDATE employees SET ? WHERE ?",
                            [
                                {
                                    role_id: parseInt(resRole.update_employee_role)
                                },
                                {
                                    id: parseInt(resUpdate.update_employee)
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                            });

                        console.log('The chosen employee\'s information has been updated. Please view the list of all employees again to verify.');
                        viewAllEmployees();
                    });
                });
            }
            // This feature is for future improvment
            // The salary and role are linked together. Updating one of the two will cause the other to be updated too
            /*
            else if (resUpdate.update_list === 'Salary') {
                connection.query(queryRole, function (err, results) {
                    if (err) throw err;

                    let updateSalary = results.map(({ id, salary }) =>
                    ({
                        id: id,
                        name: `${id} ${salary}`
                    })
                    );

                    inquirer.prompt(
                        {
                            name: 'update_salary',
                            type: 'list',
                            message: 'What is the employee\'s new salary?',
                            choices: updateSalary
                        }
                    ).then(resSalary => {
                        connection.query("UPDATE employees SET ? WHERE ?",
                            [
                                {
                                    role_id: parseInt(resSalary.update_salary)
                                },
                                {
                                    id: parseInt(resUpdate.update_employee)
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                            });

                        console.log('The chosen employee\'s information has been updated. Please view the list of all employees again to verify.');
                        viewAllEmployees();
                    });
                });
            } */
            else if (resUpdate.update_list === 'Manager') {
                connection.query(queryEmployee, function (err, results) {
                    if (err) throw err;

                    let updateManager = results.map(({ id, first_name, last_name }) =>
                    ({
                        id: id,
                        name: `${id} ${first_name} ${last_name}`
                    })
                    );
                    let noManager = {
                        id: null,
                        name: 'None'
                    }
                    updateManager.push(noManager);

                    inquirer.prompt(
                        {
                            name: 'update_manager',
                            type: 'list',
                            message: 'Who is the employee\'s new manager?',
                            choices: updateManager
                        }
                    ).then(resManager => {
                        connection.query("UPDATE employees SET ? WHERE ?",
                            [
                                {
                                    manager_ID: parseInt(resManager.update_manager) || null
                                },
                                {
                                    id: parseInt(resUpdate.update_employee)
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                            });

                        console.log('The chosen employee\'s information has been updated. Please view the list of all employees again to verify.');
                        viewAllEmployees();
                    });
                });
            };
        });
    });
};
// This feature is for future improvement.
// Everything in the department table and roles table is linked together, so updating just the department name or role title will cause disruption in other columns in the same table.
/*
function updateRole() {
    const queryDelete = `DELETE FROM roles WHERE ?`
    connection.query('SELECT * FROM roles;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
                name: 'update_role',
                type: 'list',
                message: 'Would you like to add or delete a role?',
                choices: [
                    'Add new role',
                    'Delete a role'
                ]
            }
        ).then(resUpdateRole => {

            if (resUpdateRole === 'Add new role') {
                connection.query("INSERT INTO roles SET ?",
                    {
                        id:
                        title:
                    },
                    function (err) {
                        if (err) throw err;
                    });
            }
            // else if

            console.log('The chosen employee\'s information has been updated. Please view the list of all employees again to verify.');
            viewAllEmployees();
        });

    });

    console.log('The new role has been added. Please view the list of roles to verify.')
    viewRoleList();
}; */
