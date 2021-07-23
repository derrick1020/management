Use companys_db;


INSERT INTO department (dept_name)
VALUES
    ('Manager'),
    ('Supervisor'),
    ('Design'),
    ('Intern');

INSERT INTO role (title, salary, dept_id)
VALUES
    ('Game Mgr', 100000, 1),
    ('Game spv', 80000, 1),
    ('Design vis', 250000, 4),
    ('Design app', 190000, 4),
    ('Junior intern Dev', 120000, 2),
    ('Senior intern Dev', 150000, 2),
    

INSERT INTO employee (first_name, last_name, role_id, mgr_id)
VALUES
    ('Sara', 'Luz', 7, NULL),
    ('Babineau', 'Oma', 1, NULL),
    ('Kevin', 'Chipper', 4, 3),
    ('bob', 'Russ', 3, NULL),
    ('Jackie', 'Jacks', 2, 1),
    ('Paul', 'Kanz', 6, 5),
    ('Mortal', 'Kombat', 8, 7),
    ('Jay', 'Sidney', 5, NULL);