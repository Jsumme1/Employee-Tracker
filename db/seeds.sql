INSERT INTO departments (name)
VALUES
  ('Finance'),
  ('Scheduling'),
  ('Trading'),
  ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Finance Manager', 150000, 1),
('Scheduling Manager', 100000, 2),
('Trading Manager', 200000, 3),
('HR Manager', 50000, 4),
('Finance Analyst', 30000, 1),
('Scheduler', 130000, 2),
('Trader', 1300000, 3),
('HR Analyst', 30000, 4);


  INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
 

  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, NULL),
  ('Piers', 'Gaveston', 3, NULL),
  ('Charles', 'LeRoi', 4, NULL),
  ('Katherine', 'Mansfield', 5, 1),
  ('Dora', 'Carrington', 6, 2),
  ('Edward', 'Bellamy', 7, 3),
  ('Montague', 'Summers', 8, 4),
  ('Octavia', 'Butler', 5, 1),
  ('Unica', 'Zurn', 6, 2),
   ('William', 'Carleton', 7, 3),
  ('Gerald', 'Griffin', 8,4);
