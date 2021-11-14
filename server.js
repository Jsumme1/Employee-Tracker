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
            init();
          });
          break;
        case "VIEW_ROLES":
          // return query
          db.query(`SELECT * FROM roles`, (err, row) => {
            if (err) {
              console.log(err);
            }
            console.log(cTable.getTable(row));
            init();
          });
          break;
        case "VIEW_EMPLOYEES":
          //  return query SELECT * FROM employees
          db.query(`SELECT * FROM employees`, (err, row) => {
            if (err) {
              console.log(err);
            }
            console.log(cTable.getTable(row));
            init();
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
          console.log(answers);
          //  const departments_name = answers.departmentInput;
          const sql = `INSERT INTO departments (name) 
              VALUES (?)`;
          
          const value = [answers.department];
          db.query(sql, value, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log("New Department Added");
            init();
          });
        });
      }
      departmentInit()

 break;
        case "ADD_ROLE":
            function roleInit() {
               db.query(`SELECT * FROM departments`, (err, row) => {
                 if (err) {
                   console.log(err);
                 }
                 var departmentChoices = row.map((department) => {
                   return { name: department.name, value: department.id };
                 });
                 console.log(departmentChoices);
                 inquirer
                   .prompt([
                     {
                       type: "input",
                       name: "titleInput",
                       message: "What is the name of the title? (Required)",
                       validate: (departmentInput) => {
                         if (departmentInput) {
                           return true;
                         } else {
                           console.log("Please enter the title");
                           return false;
                         }
                       },
                     },
                     {
                       type: "input",
                       name: "salaryInput",
                       message: "What is the employee's salary? (Required)",
                       validate: (salaryInput) => {
                         if (salaryInput) {
                           return true;
                         } else {
                           console.log("Please enter the salary!");
                           return false;
                         }
                       },
                     },
                     {
                       type: "list",
                       name: "departmentChoice",
                       message:
                         "What is the name of the department? (Required)",
                       choices: departmentChoices,
                     },
                   ])

                   .then((data) => {
                     console.log(data);

                     // collect info, add to db INSERT INTO roles (title, salary, department)
                     const titleName = data.titleInput;
                     const salaryValue = data.salaryInput;
                     const departmentValue = data.departmentChoice;
                     const sql = `INSERT INTO roles (title, salary, department_id)
              VALUES (?,?,?)`;
                     const value = [titleName, salaryValue, departmentValue];
                     console.log(value);

                     db.query(sql, value, (err, result) => {
                       if (err) {
                         console.log(err);
                       }
                       console.log("New Role Added!");
                       init();
                     });
                   });
               }); 
    }

    roleInit()
 break;
         case "ADD_EMPLOYEE" :
              function employeeInit() {
               db.query(`SELECT * FROM roles`, (err, row) => {
                 if (err) {
                   console.log(err);
                 }
                 var roleChoices = row.map((role) => {
                   return { name: role.title, value: role.id };
                 });
                 console.log(roleChoices);

                 db.query(`SELECT * FROM employees`, (err, row) => {
                 if (err) {
                   console.log(err);
                 }
                 var managers = row.filter (employee =>  {console.log(employee.manager_id); 
                  return employee.manager_id == null})
                 console.log(managers);
                 var managerChoices = managers.map((manager) => {
                   return { name: manager.first_name + manager.last_name, value: manager.id };
                 });
                 
                 console.log(managerChoices);
                 // add Employee prompts
  
                  inquirer
                           .prompt([
                                      {
                                        type: "input",
                                        name: "fname",
                                        message: "What is the employee's first name? (Required)",
                                        validate: (fnameInput) => {
                                          if (fnameInput) {
                                            return true;
                                          } else {
                                            console.log("Please enter a name!");
                                            return false;
                                          }
                                        },
                                      },

                                      {
                                        type: "input",
                                        name: "lname",
                                        message: "What is the employee's last name? (Required)",
                                        validate: (lnameInput) => {
                                          if (lnameInput) {
                                            return true;
                                          } else {
                                            console.log("Please enter a name!");
                                            return false;
                                          }
                                        },
                                      },
                                      {
                                        type: "list",
                                        name: "role",
                                        message: "What is the employee's role? (Required)",
                                        choices: roleChoices
                                        
                                      },

                                      {
                                        type: "list",
                                        name: "manager",
                                        message: "Who is the employee's manager? (Required)",
                                        choices: managerChoices
                                      },
                                    ])
              .then((data) => {
               console.log(data);
               const firstName = data.fname;
               const lastName = data.lname;
               const roleName = data.role;
               const managerName = data.manager
             // collect info, add to db INSERT INTO employees (first_name, last_name, role, manager)
              const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
              const value = [firstName, lastName, roleName, managerName];
       
          db.query(sql, value, (err, result) => {
          if (err) {
              console.log(err);
               }
          console.log("New Employee Added!");
          init();
          });
        })
        });
      });
   
    }
   employeeInit();   
 break;
          case "UPDATE_EMPLOYEE":
                function updateRole() {
                  db.query(`SELECT * FROM employees`, (err, row) => {
                    if (err) {
                      console.log(err);
                    }
                    var employeeChoices = row.map((employee) => {
                      return {
                        name: employee.first_name+ employee.last_name, value: employee.id};
                    });
                    console.log(employeeChoices);

                    db.query(`SELECT * FROM roles`, (err, row) => {
                      if (err) {
                        console.log(err);
                      }
                      var roleChoices = row.map((role) => {
                        return { name: role.title, value: role.id };
                      });
                      console.log(roleChoices);

                      inquirer
                        .prompt([
                          {
                            type: "list",
                            name: "EmployeeChoice",
                            message: "What is the name of the employee?",
                            choices: employeeChoices
                          },
                          {
                            type: "list",
                            name: "role",
                            message: "What is the new employee's role?",
                            choices: newRoleChoices
                          },
                        ])

                        .then((data) => {
                          console.log(data);
                          // collect info, update db UPDATE employees SET role = (data.role) WHERE name = (data.fist_name)
                          const employeeId = data.EmployeeChoice;
                          const newRole = data.role;

                          const sql = `UPDATE employees SET role = (data.role) WHERE = (data.employee_id)
              VALUES (?,?)`;
                          const value = [newRole, employeeId];
                          console.log(value);

                          db.query(sql, value, (err, result) => {
                            if (err) {
                              console.log(err);
                            }
                            console.log("Role Updated!");
                            init();
                          });
                        })
                    });
                  });

                
                }
            updateRole();
            
 break;
          case "QUIT":
          process.exit();
      }
    });


}





 init();

  