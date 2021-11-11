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

// start of the user interface - Manager data first
const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name? (Required)",
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
        message: "What is the team manager's employee id? (Required)",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter the id number!");
            return false;
          }
        },
      },
      // not going to pretend - got this from StackOverflow
      {
        type: "input",
        name: "email",
        message: "What is the team manager's email address? (Required)",
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
        name: "phone",
        message: "What is the team manager's phone number? (Required)",
        validate: (phone) => {
          pass =
            /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/.test(
              phone
            );
          if (pass) {
            return true;
          } else {
            return "Please enter a valid phone number";
          }
        },
      },
    ])

    .then((managerData) => {
      const { name, id, email, phone } = managerData;
      const manager = new Manager(name, id, email, phone);

      teamArray.push(manager);
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
