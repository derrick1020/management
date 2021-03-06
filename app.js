const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const ctable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "102044dh!",
  database: "companys_db",
});

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
//   exports.start();
// });

connection.connect(function (err) {
  if (err) throw err;
  management();
});
function management() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "exit",
        ],
        name: "choice",
      },
    ])
    .then(function (res) {
      console.log(res.choice);
      switch (res.choice) {
        case "View all employees":
          employeeView();
          break;

        case "View all employees by department":
          departmentView();
          break;

        case "View all employees by Manager":
          managerView();
          break;

        case "Add Employee":
          employeeAdd();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Update Manager":
          employeeManager();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}

const employeeView = (inputs = []) => {
  inquirer
    .prompt({
      name: "employeeView",
      type: "input",
      message: "Enter Employee last name to begin search",
    })
    .then(function (choice) {
      let query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(
        query,
        { last_name: choice.employeeView },
        function (err, res) {
          if (err) throw err;

          for (var i = 0; i < res.length; i++) {
            console.log(
              " | First Name: " +
                res[i].first_name +
                " | Last name: " +
                res[i].last_name +
                " | Id: " +
                res[i].id
            );
          }
        }
      );
      management();
    });
};
const departmentView = (res) => {
  let query = "SELECT dept_name FROM department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  });
};
const managerView = (res) => {
  let query =
    "SELECT mgr_id, first_name, last_name FROM employee WHERE mgr_id IN (SELECT mgr_id FROM employee WHERE mgr_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id
      );
    }
  });
  menu();
};
const employeeAdd = () => {
  inquirer
    .prompt({
      name: "employeeAdd",
      type: "input",
      message: "Enter Employee First then Last Name",
    })

    .then(function (answer) {
      console.log(answer);
      let name = answer.employeeAdd;
      let firstAndLastName = name.split(" ");
      console.log(firstAndLastName);
      let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {
        if (err) throw err;
        console.log(err);
      });
      management();
    });
};
const employeeRemove = () => {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "What employee would you like to remove?",
    })
    .then(function () {
      console.log(choice);
      let query = "DELETE FROM employee WHERE ?";
      let delId = Number(choice.employeeRemove);
      console.log(delId);
      connection.query(query, { id: delId }, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log(res[i].employeeRemove);
        }
        management();
      });
    });
};
const employeeUpdate = () => {
  inquirer
    .prompt({
      name: "employeeUpdate",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (choice) {
      let id = choice.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (choice) {
          let empId = choice.empId;

          let query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [empId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            management();
          });
        });
    });
};
const employeeManager = () => {
  inquirer
    .prompt({
      name: "employeeManager",
      type: "input",
      message: "What employee would you like to update the manager for?",
    })
    .then(function () {
      let query = "SELECT manager_id FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log(res[i].employee);
        }
        management();
      });
    });
};
