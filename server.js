// external paths needed
const express = require("express");
const cTable = require("console.table");
const inquirer = require("inquirer");

// internal paths required
const db = require("./db/connection");
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
  });
});

console.log('\n', '             Welcome to the Employee Tracker!             ', '\n')
// start of the user interface

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?(select one, hit enter)",
        choices: [
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add a Department",
            value: "ADD_DEPARTMENT",
          },

          {
            name: "Add a Role",
            value: "ADD_ROLE",
          },
          {
            name: "Add an Employee",
            value: "ADD_EMPLOYEE",
          },

          {
            name: "Update an employee role",
            value: "UPDATE_ROLE",
          },

          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Quit",
            value: "QUIT",
          }
        ],
      },
    ])

    .then(function (options) {
      switch (options.options) {
        case "VIEW_DEPARTMENTS":
          //   return query
          db.query(`SELECT * FROM departments`, (err, row) => {
            if (err) {
              console.log(err);
            }
            console.log(cTable.getTable(row));
          });
          break;
        case "VIEW_ROLES":
          // return query
          db.query(`SELECT * FROM roles`, (err, row) => {
            if (err) {
              console.log(err);
            }
            console.log(cTable.getTable(row));
          });
          break;
        case "VIEW_EMPLOYEES":
          //  return query SELECT * FROM employees
          db.query(`SELECT * FROM employees`, (err, row) => {
            if (err) {
              console.log(err);
            }
            console.log(cTable.getTable(row));
          });
 break;
        case "ADD_DEPARTMENT":
          // collect info, add to db INSERT INTO departments (name)
         
           function departmentInit() {
                 inquirer.prompt([
                       {
                          type: "input",
                          name: "department",
                          message: "What is the name of the department? (Required)",
                          validate: (departmentInput) => {
                            if (departmentInput) {
                              return true;
                            } else {
                              console.log("Please enter the department");
                              return false;
                            }
                          },
                        },
                      ])              
        .then((answers) => {
          //  const departments_name = answers.departmentInput;
          const sql = `INSERT INTO departments (name) 
              VALUES (?)`;
          console.log(answers.departmentInput);
          const value = [answers.departmentInput];
          db.query(sql, value, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log("New Department Added");
          });
        });
      }
      departmentInit()
 break;
//         case "ADD_ROLE":
//            // collect info, add to db INSERT INTO roles (title, salary, department)
//            const titleName = data.titleChoice;
//            const salaryValue = data.salaryChoice;
//            const departmentValue = data.departmentChoice;
//            const sql = `INSERT INTO roles (title, salary, department_id)
//               VALUES (?,?,?)`;
//            const value = [titleName, salaryValue, departmentValue];
       

//         db.query(sql, value, (err, result) => {
//         if (err) {
//             console.log(err);
//              }
//         console.log('New Role Added!');
//         });
//  break;
//          case "ADD_EMPLOYEE" :
//                const firstName = data.fname;
//                const lastName = data.lname;
//                const roleName = data.role;
//                const managerName = data.manager
//              // collect info, add to db INSERT INTO employees (first_name, last_name, role, manager)
//               const sql = `INSERT INTO employees (first_name, last_name, role, manager)
//                 VALUES (?,?,?)`;
//               const value = [firstName, lastName, roleName, managerName];
       
         

//           db.query(sql, value, (err, result) => {
//           if (err) {
//               console.log(err);
//                }
//           console.log("New Employee Added!");
//           });
//  break;
//           case "UPDATE_EMPLOYEE":
//              // collect info, update db UPDATE employees SET role = (data.role) WHERE name = (data.lname)
//  break;
             case "QUIT":
          return "";
      }
    });


}


// // add Employee prompts
// const addEmployee = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "fname",
//         message: "What is the employee's first name? (Required)",
//         validate: (fnameInput) => {
//           if (fnameInput) {
//             return true;
//           } else {
//             console.log("Please enter a name!");
//             return false;
//           }
//         },
//       },

//       {
//         type: "input",
//         name: "lname",
//         message: "What is the employee's last name? (Required)",
//         validate: (lnameInput) => {
//           if (lnameInput) {
//             return true;
//           } else {
//             console.log("Please enter a name!");
//             return false;
//           }
//         },
//       },
//       {
//         type: "input",
//         name: "role",
//         message: "What is the employee's role? (Required)",
//         validate: (roleInput) => {
//           if (roleInput) {
//             return true;
//           } else {
//             console.log("Please enter the role!");
//             return false;
//           }
//         },
//       },

//        {
//         type: "input",
//         name: "manager",
//         message: "Who is the employee's manager? (Required)",
//         validate: (managerInput) => {
//           if (managerInput) {
//             return true;
//           } else {
//             console.log("Please enter the manager!");
//             return false;
//           }
//         },
//       },
//     ])

//     .then((EmployeeData) => {
//       const { fname, lname, role, manager } = EmployeeData;
//       const employee = new Employee(fname, lname, role, manager);

//       teamArray.push(Employee);
//     });
// };


 init();

    // {
    //     type: "input",
    //     name: "salary",
    //     message: "What is the employee's salary? (Required)",
    //     validate: (salaryInput) => {
    //       if (salaryInput) {
    //         return true;
    //       } else {
    //         console.log("Please enter the salary!");
    //         return false;
    //       }
    //     },
    //   },