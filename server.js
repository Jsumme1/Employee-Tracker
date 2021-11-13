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
    console.log(`Server running on port ${PORT}`);
  });
});

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
      console.log(options.options);
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
            console.log(row);
          });

        case "ADD_DEPARTMENT":
          // collect info, add to db INSERT INTO departments (name)
          const sql = `INSERT INTO departments (name) 
              VALUES (?)`;

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
          });

        case "ADD_ROLE" :
           // collect info, add to db INSERT INTO roles (title, salary, department)
        const sql = `INSERT INTO roles (title, salary, department_id)
              VALUES (?,?,?)`;
        const params = [what goes here?];

        db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
             }
        console.log(result);
        });

         case "ADD_EMPLOYEE" :
             // collect info, add to db INSERT INTO employees (first_name, last_name, role, manager)
              const sql = `INSERT INTO employees (first_name, last_name, role, manager)
                VALUES (?,?,?)`;
          const params = [what goes here?];

          db.query(sql, params, (err, result) => {
          if (err) {
              console.log(err);
               }
          console.log(result);
          });

          case "UPDATE_EMPLOYEE":
             // collect info, update db UPDATE employees SET role = (data.role) WHERE name = (data.lname)
        case "QUIT":
          return "";
      }
    });


}
// // - Manager data first

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

// // get team members/subordinates data

// const promptSubs = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "role",
//         message: "What type of employee would you like to add?",
//         choices: ["Engineer", "Intern"],
//       },

//       {
//         type: "input",
//         name: "name",
//         message: "What is the team member's name? (Required)",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter a name!");
//             return false;
//           }
//         },
//       },

//       {
//         type: "input",
//         name: "id",
//         message: "What is the team member's employee id? (Required)",
//         validate: (idInput) => {
//           if (idInput) {
//             return true;
//           } else {
//             console.log("Please enter the id number!");
//             return false;
//           }
//         },
//       },

//       {
//         type: "input",
//         name: "email",
//         message: "What is the team member's email address? (Required)",
//         validate: (email) => {
//           valid =
//             /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
//               email
//             );
//           if (valid) {
//             return true;
//           } else {
//             return "You have entered an invalid email address!";
//           }
//         },
//       },

//       {
//         type: "input",
//         name: "github",
//         message: "Please enter the Engineer's github username.",
//         when: (input) => input.role === "Engineer",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter the employee's github username!");
//           }
//         },
//       },
//       {
//         type: "input",
//         name: "school",
//         message: "Please enter the intern's school",
//         when: (input) => input.role === "Intern",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter the intern's school!");
//           }
//         },
//       },

//       {
//         type: "confirm",
//         name: "confirmAddEmployee",
//         message: "Would you like to add another team memeber?",
//         default: false,
//       },
//     ])
//     .then((subsData) => {
//       let { name, id, email, role, github, school, confirmAddEmployee } =
//         subsData;
//       let employee;

//       if (role === "Engineer") {
//         employee = new Engineer(name, id, email, github);
//       } else if (role === "Intern") {
//         employee = new Intern(name, id, email, school);
//       }

//       teamArray.push(employee);

//       if (confirmAddEmployee) {
//         return promptSubs(teamArray);
//       } else {
//         return teamArray;
//       }
//     });
// };



// promptUser()
//   .then(promptSubs)
//   .then((teamArray) => {
//     return generatePage(teamArray);
//   })
//   .then((pageHTML) => {
//     return writeFile(pageHTML);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

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