DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department(

  id INT NOT NULL AUTO_INCREMENT
  , name VARCHAR(30)
  , PRIMARY KEY (id)
  
);
CREATE TABLE role (

  id INT NOT NULL AUTO_INCREMENT
  , title VARCHAR(30)
  , salary DECIMAL (10,2)
  , department_id INT (10)
  , PRIMARY KEY (id)
  
);
CREATE TABLE employee (

  id INT NOT NULL AUTO_INCREMENT
  , first_name VARCHAR(30)
  , last_name VARCHAR(30)
  , role_id INT (10)
  , manager_id INT (10) NULL
  , PRIMARY KEY (id)
  
  );
  
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT into department (name)
VALUES  ("Leadership")
        , ("Tech")
        , ("HR")
        , ("Developers");

SELECT * FROM department;

INSERT into role (title, salary, department_id)
VALUES  ("hrRep", 65000, 3)
        , ("Team_Lead", 50000, 1)
        , ("I.T.", 68000, 2)
        , ("Devs", 68000, 4)
        , ("CEO", 100000, 1);

SELECT * FROM role;

INSERT into employee (first_name, last_name, role_id)
values  ("Nick", "Dolly", 2)
        , ("James", "Jameson", 4)
        , ("Happy", "Brooks", 1)
        , ("Ally", "Tong", 6)
        , ("Hether", "Flinks", 7)
        , ("Bobby", "Prone", 8)
        , ("Dusty", "Storm", 3); 

SELECT * FROM employee;
