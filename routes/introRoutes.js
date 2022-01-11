const inquirer = require('inquirer');
const employeeRoutes = require('./employeeRoutes');
const deptartmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./rolesRoutes')
const db = require('../db/connection');

//exit function
function exit() {
    console.log('Goodbye!')
    db.end;
}
//starting function
module.exports.intro = function () {
    inquirer
        .prompt({
            name: 'action',

            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Delete an employee',
                'Delete a role',
                'Delete a department',
                'EXIT'
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case 'View all employees':
                    employeeRoutes.viewAllEmployees();
                    break;

                case 'View all departments':
                    deptartmentRoutes.viewDepartments();
                    break;

                case 'View all roles':
                    roleRoutes.viewRoles();
                    break;

                case 'Add an employee':
                    employeeRoutes.addEmployee();
                    break;

                case 'Add a department':
                    deptartmentRoutes.addDepartment();
                    break;

                case 'Add a role':
                    roleRoutes.addRole();
                    break;

                case 'Update employee role':
                    employeeRoutes.updateEmployee();
                    break;

                case 'Delete an employee':
                    employeeRoutes.deleteEmployee();
                    break;

                case 'Delete a role':
                    roleRoutes.deleteRole();
                    break;

                case 'Delete a department':
                    deptartmentRoutes.deleteDepartment();
                    break;

                case 'EXIT':
                    exit();
                    break;
            };
        });
};