Use company_db;


INSERT INTO department (dept_name)
VALUES
    ('Sales'),
    ('Software'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, dept_id)
VALUES
    ('Sales Mgr', 100000, 1),
    ('Sales Rep', 80000, 1),
    ('Legal Project Manager', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Junior Software Dev', 120000, 2),
    ('Senior Software Dev', 150000, 2),
    ('Account Manager', 160000, 3),
    ('Payroll', 125000, 3);

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