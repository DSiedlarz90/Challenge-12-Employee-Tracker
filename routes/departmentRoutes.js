const db = require('../db/connection');
const inquirer = require('inquirer');
const introRoutes = require('./introRoutes');


//get all departments
module.exports.viewDepartments = function () {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) { console.log(err) };
        console.table(res);
    });
    introRoutes.intro();;
};

//create a department
module.exports.addDepartment = function () {
    inquirer
        .prompt([{
            name: 'dept_name',
            type: 'input',
            message: 'What is the name of the new department?'
        },
        ])
        .then(function (answer) {
            const sql = `INSERT INTO department (dept_name) 
                  VALUES (?)`;
            const params = [answer.dept_name];

            db.query(sql, params, (err) => {
                if (err) { console.log(err) }
                console.log('Done!')
            });
            introRoutes.intro();
        });
};

//delete a department
module.exports.deleteDepartment = function () {
    db.query("SELECT * FROM department", async (err, res) => {
        if (err) throw err;
       await console.table(res)
    }); 
    inquirer
        .prompt(
            {
                name: "dept_id",
                type: "input",
                message: "Which department would you like to delete? Enter the department id."
            })
        .then(function (answer) {
            const sql = `DELETE FROM department WHERE id = ?`;
            db.query(sql, answer.dept_id, (err) => {
                if (err) { console.log(err) };
                console.log('Done!')
            });
            introRoutes.intro();
        })
};