var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "12345",
  database: "employee_tracker_db"
});

connection.connect(function (err) {
  if (err) throw err;

  start();
  console.log("connected");
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
          "Add Employee",
          "View all Employees",
          "Remove Employee",
          "Add Department",
          "View all Departments",
          "Add Roles",
          "View all Roles",
          "Update Employee Role",
          "Exit"
        ]
      }
    ])
    .then(function (res) {
      switch (res.start) {

        case "Add Employee":
          addEmployee();
          break;

        case "View all Employees":
          viewAllEmployees();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Add Department":
          addDept();
          break;

        case "View all Departments":
          viewAllDept();
          break;

        case "Add Roles":
          addRole();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    })
}

function addEmployee() {
  console.log("Inserting a new employee.\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "First Name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "Last Name?",
        name: "last_name"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: [1, 2, 3]
      },
      {
        type: "input",
        message: "Who is their manager?",
        name: "manager_id"
      }
    ])
    .then(function (res) {
      const query = connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${res.first_name}", "${res.last_name}", "${res.role_id}", "${res.manager_id}")`,
        res,
        function (err, res) {
          if (err) throw err;
          console.log("Employee added!\n");

          start();
        }
      );
    })
}
function viewAllEmployees() {

  connection.query("SELECT employee.first_name, employee.last_name, role.title AS \"role\", managers.first_name AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee managers ON employee.manager_id = managers.id GROUP BY employee.id",
    function (err, res) {
      if (err) throw err;

      console.table(res);
      start();
    });
}

function removeEmployee() {
  let employeeList = [];
  connection.query(
    "SELECT employee.first_name, employee.last_name FROM employee", (err, res) => {
      for (let i = 0; i < res.length; i++) {
        employeeList.push(res[i].first_name + " " + res[i].last_name);
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to delete?",
            name: "employee",
            choices: employeeList

          },
        ])
        .then(function (res) {
          const query = connection.query(
            `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
            function (err, res) {
              if (err) throw err;
              console.log("Employee deleted!\n");
              start();
            });
        });
    }
  );
};

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What Department would you like to add?"
      }
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: res.deptName
        },
        function (err, res) {
          connection.query("SELECT * FROM department", function (err, res) {
            console.table(res);
            start();
          })
        }
      )
    })
}

function viewAllDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    start();
  })
}

function addRole() {
  let department = [];
  connection.query("SELECT * FROM department",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        res[i].first_name + " " + res[i].last_name
        departments.push({ name: res[i].name, value: res[i].id });
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What role would you like to add?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for the role?"
          },
          {
            type: "list",
            name: "department",
            message: "what department?",
            choices: department
          }
        ])
        .then(function (res) {
          console.log(res);
          const query = connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
              department_id: res.department
            },
            function (err, res) {
              if (err) throw err;
              //const id = res.insertId;
              start();
            }
          )
        })
    })
}

function viewAllRoles() {
  connection.query("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  }
  )
}

function updateEmployeeRole() {

  connection.query("SELECT first_name, last_name, id FROM employee",
    function (err, res) {
      // for (let i=0; i <res.length; i++){
      //   employee.push(res[i].first_name + " " + res[i].last_name);
      // }
      // let employees = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }))

      // inquirer
      //   .prompt([
      //     {
      //       type: "list",
      //       name: "employeeName",
      //       message: "Which employee's role would you like to update?",
      //       choices: employee
      //     },
      //     {
      //       type: "input",
      //       name: "role",
      //       message: "What is your new role?"
      //     }
      //   ])
      //   .then(function (res) {
      //     connection.query(`UPDATE employees SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
      //       function (err, res) {
      //         console.log(res);
      //         //updateRole(res);
      //         start()
      //       }
      //     );
      //   })
    }
  )
}