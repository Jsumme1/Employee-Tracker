// external paths needed
const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template");

// Team building!
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const teamArray = [];

// start of the user interface
// TODO: Create an array of questions for user input
function init() {
  inquirer
    .prompt([
  
           {
        type: "list",
        name: "options",
        message:
          "What would you like to do?(select one, hit enter)",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an employee role",
          "Quit",
        ],
      }
    ])

    .then(function (data) {
      switch(data){
          case "View All Departments":
            //   return query
        ;
        case "View All Roles":
            // return query
            ;
        case "View All Employees" :
            //  return query
            ;
        case"Add a Department" :
        // collect info, add to db
        ;
        case "Add a Role" :
           // collect info, add to db
        ;   
       case "Add an Employee" :
           // collect info, add to db
        ;   
        case "Update an employee role" :
           // collect info, update db
        ; 
         case "Quit":
             return "";
        
    };

    });

}
// - Manager data first

// add Employee prompts
const addEmployee = () => {
  return inquirer
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
        type: "input",
        name: "role",
        message: "What is the employee's role? (Required)",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("Please enter the role!");
            return false;
          }
        },
      },

       {
        type: "input",
        name: "manager",
        message: "Who is the employee's manager? (Required)",
        validate: (managerInput) => {
          if (managerInput) {
            return true;
          } else {
            console.log("Please enter the manager!");
            return false;
          }
        },
      },
    ])

    .then((EmployeeData) => {
      const { fname, lname, role, manager } = EmployeeData;
      const employee = new Employee(fname, lname, role, manager);

      teamArray.push(Employee);
    });
};

// get team members/subordinates data

const promptSubs = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What type of employee would you like to add?",
        choices: ["Engineer", "Intern"],
      },

      {
        type: "input",
        name: "name",
        message: "What is the team member's name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a name!");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "id",
        message: "What is the team member's employee id? (Required)",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter the id number!");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "email",
        message: "What is the team member's email address? (Required)",
        validate: (email) => {
          valid =
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
              email
            );
          if (valid) {
            return true;
          } else {
            return "You have entered an invalid email address!";
          }
        },
      },

      {
        type: "input",
        name: "github",
        message: "Please enter the Engineer's github username.",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's github username!");
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the intern's school!");
          }
        },
      },

      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add another team memeber?",
        default: false,
      },
    ])
    .then((subsData) => {
      let { name, id, email, role, github, school, confirmAddEmployee } =
        subsData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
      }

      teamArray.push(employee);

      if (confirmAddEmployee) {
        return promptSubs(teamArray);
      } else {
        return teamArray;
      }
    });
};

// function to generate HTML page file using file system
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team profile has been successfully generated! Please check out the index.html in dist folder"
      );
    }
  });
};

promptUser()
  .then(promptSubs)
  .then((teamArray) => {
    return generatePage(teamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });


    {
        type: "input",
        name: "salary",
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