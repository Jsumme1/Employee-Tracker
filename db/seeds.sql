INSERT INTO department (name)
VALUES
  ('Finance'),
  ('Scheduling'),
  ('Invoicing'),
  ('Trading'),
  ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', NULL, 1);

  INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 'jf@goldenbough.edu'),
  ('Jack', 'London', 'jlondon@ualaska.edu'),
  ('Robert', 'Bruce', 'rbruce@scotland.net'),
  ('Peter', 'Greenaway', 'pgreenaway@postmodern.com'),
  ('Derek', 'Jarman', 'djarman@prospectcottage.net'),