//dependencies and imports
const db = require('../db/connection');
const inquirer = require('inquirer');
const introRoutes = require('./introRoutes');

//get all roles
module.exports.viewRoles = function () {
    const sql = `SELECT roles.*, department.dept_name
                AS department_name
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id;`;
    db.query(sql, (err, res) => {
        if (err) { console.log(err) };
        console.table(res);
    });
    introRoutes.intro();
};

//create a role
module.exports.addRole = function () {
    //get the list of all departments
    const departments = [];
    db.query("SELECT * FROM department", async (err, res) => {
        if (err) throw err;
        await res.forEach(dept => {
            let deptChoice = {
                name: dept.dept_name,
                value: dept.id,
            }
            departments.push(deptChoice);
        });
    })
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of this role?',
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log('Please enter a role.')
                        return false;
                    }
                }
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this position?',
                validate: salary => {
                    if (salary) {
                        return true;
                    } else {
                        console.log('Please enter a valid salary for this position.')
                        return false;
                    }
                }
            },
            {
                name: 'department_id',
                type: 'list',
                choices: departments,
                message: 'What is the corresponding department?'
            }
        ])
        .then(function (answer) {
            const sql = `INSERT INTO roles (title, salary, department_id) 
                  VALUES (?,?,?)`
            const params = [answer.title, answer.salary, answer.department_id];

            db.query(sql, params, (err) => {
                if (err) { console.log(err) }
                console.log('Done!');
                console.table(answer)
            });
            introRoutes.intro();
        });
};

//delete a role
module.exports.deleteRole = function () {
    inquirer
        .prompt([
            {
                name: "role_id",
                type: "input",
                message: "Which role are you deleting? Enter the corresponding ID."
            }])
        .then(function (answer) {
            const sql = `DELETE FROM roles WHERE id = ?`;
            const params = [answer.role_id];
            db.query(sql, params, (err) => {
                if (err) { console.log(err) };
                console.table('Done!')
            });
            introRoutes.intro();
        });
};