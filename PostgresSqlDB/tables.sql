create table Departments(
    id serial primary key,
    name text not null unique
);


create table Employees(
    id serial primary key,
    firstname text not null, 
    middlename text not null, 
    lastname text not null,
    country text not null, 
    salary integer default 0,
    departmentId integer not null,
    birthDate DATE NOT NULL,
    constraint fk_emp_dep foreign key(departmentId) references Departments(id)
);