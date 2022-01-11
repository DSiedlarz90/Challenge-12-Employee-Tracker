USE employeesdb;

INSERT INTO department (dept_name)
VALUES ("Sales"),
("Engineering"),
("Finance"), 
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Doe", 1, 3),
("Maliah", "Brown", 2, 1),
("Sarah", "Lourd", 3, null),
("Tom", "Allen", 4, 3),
("Sam", "Kash", 3, null),
("Mike", "Chan", 2, null),
("Ashley", "Rodriguez", 4, 4),
("David", "Siedlarz", 1, 2)