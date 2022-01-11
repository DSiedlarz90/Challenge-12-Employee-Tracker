//dependencies and imports
const db = require('../db/connection');
const inquirer = require('inquirer');
const introRoutes = require('./introRoutes');



module.exports.viewAllEmployees = function () {
  //get all employees
  const sql = `select e.id, e.first_name, e.last_name, r.title as role_name,
  r.salary as salary, d.dept_name as dept_name, concat(m.first_name, " ", m.last_name) as manager
  from employee e
  left join roles r
  on e.roles_id = r.id
  left join department d
  on r.department_id = d.id
  left join employee m
  on e.manager_id = m.id;`;

  db.query(sql, (err, res) => {
    if (err) { console.log(err) };
    console.table(res);
  });
  introRoutes.intro();
};

//add new employee
module.exports.addEmployee = function () {
  //get all the managers
  //the employee can have no manager
  const employeeChoice = [{ name: 'N/A', value: null }];
  db.query("SELECT id, first_name, last_name FROM EMPLOYEE", (err, eeRes) => {
    if (err) throw err;
    eeRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
  });
  //get list of roles
  const roleChoice = [];
  db.query("SELECT id, title FROM roles", (err, rolesRes) => {
    if (err) throw err;
    rolesRes.forEach(({ id, title }) => {
      roleChoice.push({
        name: title,
        value: id
      });
    });
  });
  inquirer
    .prompt([{
      name: 'first_name',
      type: 'input',
      message: "What is the employee's first name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter first name.')
          return false;
        }
      }
    },

    {
      name: 'last_name',
      type: 'input',
      message: "What is the employee's last name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter last name.')
          return false;
        }
      }
    },

    {
      name: 'roles_id',
      type: 'list',
      choices: roleChoice,
      message: "What is this employee's role?"
    },

    {
      name: 'manager_id',
      type: 'list',
      choices: employeeChoice,
      message: "Who is the employee's manager? (can select N/A)"
    },
    ])
    .then(function (answer) {
      const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                  VALUES (?,?,?,?)`;
      const params = [answer.first_name, answer.last_name, answer.roles_id, answer.manager_id];

      db.query(sql, params, (err, result) => {
        if (err) { console.log(err) }
        console.log('Done!')
      });
      introRoutes.intro();
    });
};

//update employee role
module.exports.updateEmployeeRole = function () {
  db.query("SELECT id, first_name, last_name FROM employee", (err, eeRes) => {
    if (err) throw err;
    console.table(eeRes)
  });
  db.query("SELECT * FROM roles", (err, roleRes) => {
    if (err) throw err;
    console.table(roleRes)
  });
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "Which employee are you updating? Enter their employee ID.",
        validate: answer => {
          if (answer) {
              return true;
          } else {
              console.log('Please enter an employee ID.')
              return false;
          }
      }
      },
      {
        name: 'roles_id',
        type: 'input',
        message: 'What is the new role? Enter the corresponding ID.',
        validate: answer => {
          if (answer) {
              return true;
          } else {
              console.log('Please enter a role ID.')
              return false;
          }
      }
      },
    ])
    .then(function (answer) {
      const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
      const params = [answer.roles_id, answer.employee_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log('Employee updated!')
      });
      introRoutes.intro();
    }
    );
};

//delete a employee
module.exports.deleteEmployee = function () {
  inquirer
    .prompt(
      {
        name: "employee_id",
        type: "input",
        message: "Which employee are you deleting? Enter their employee ID."
      })
    .then(function (answer) {
      const sql = `DELETE FROM employee WHERE id = ?`;
      db.query(sql, answer.employee_id, (err) => {
        if (err) { console.log(err) };
        console.log('Done!')
      });
      introRoutes.intro();
    })
};