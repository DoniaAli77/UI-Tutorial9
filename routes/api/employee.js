const db = require("../../db");
module.exports = (app) => {
  // routes
  app.get("/", function (req, res) {
    return res.send("Welcome localhost:3000");
  });

  app.get("/api/v1/employee", async (req, res) => {
    return res.send("default get Employee .....");
  });

  app.get("/api/v1/employees/view", async (req, res) => {
    try {
      const employees = await db.select("*").from("employees").orderBy('id');
      console.log(`result here`, employees);
      return res.status(200).send(employees);
    } catch (err) {
      console.log("error message", err.message);
      return res.status(400).send("Could not get employees");
    }
  });

  app.post("/api/v1/employees/new", async (req, res) => {
    try {
      const { firstname, middlename, lastname, country, salary, birthdate } =
        req.body;
      console.log(req.body);
      let newEmployee = {
        firstname,
        middlename,
        lastname,
        country,
        salary,
        birthdate,
        departmentid:1
      };
      const addedEmployee = await db("employees")
        .insert(newEmployee)
        .returning("*");
      console.log(addedEmployee);
      return res.status(201).json("sucessfully added");
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(400).send(err.message);
    }
  });

  app.get("/api/v1/employee/:employeeId", async (req, res) => {
    try {
      const { employeeId } = req.params;
      console.log(req.params);
      const employee = await db
        .select("*")
        .from("employees")
        .where("id", employeeId);
      console.log(req.params.employeeId);
      return res.status(200).json(employee);
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(404).send("failed to get this employee id");
    }
  });

  app.delete("/api/v1/employee/:employeeId", async (req, res) => {
    try {
      const { employeeId } = req.params;
      const deletedEmployee = await db("employees")
        .where("id", employeeId)
        .del()
        .returning("*");
      console.log("deleted", deletedEmployee);
      return res.status(200).json(deletedEmployee);
    } catch (err) {
      console.log("error message", err.message);
      return res.status(400).send("failed to delete employee");
    }
  });

  app.put("/api/v1/employee/:employeeId", async (req, res) => {
    try {
      const { country, birthdate, salary } = req.body;
      const { employeeId } = req.params;
      const updatedEmployee = await db("employees")
        .where("id", employeeId)
        .update({
          country: country,
          salary: salary,
          birthdate: birthdate,
        })
        .returning("*");
      if (updatedEmployee.length == 0)
        return res.status(404).json("no employee with that id");
      return res.status(200).json(updatedEmployee[0]);
    } catch (err) {
      console.log("eror message", err.message);
      return res.status(400).send("Could not update employee");
    }
  });

  app.get("/api/v1/employee/dep/:code", async (req, res) => {
    try {
      console.log("hello", req.params.code);
      const result = await db
        .select("e.*", "d.name as depName")
        .from("employees as e")
        .innerJoin("departments as d", "d.id", "e.departmentid")
        .where("d.name", req.params.code);

      console.log("hi", result);
      res.status(200).send(result);
    } catch (err) {
      console.log("error message", err.message);
      res.status(400).send(err.message);
    }
  });
  app.put("/api/employee/update", async (req, res) => {
    try {
      const empArray = req.body.row;

      console.log("row",req.body);
      for (let embObj of empArray) {
        //{id : 4, salary : 20000}
        let { id, salary } = embObj;
        await db('employees').update({salary}).where('id',id);
          
      }
      return res.send("updated Successfully");
    } catch (err) {
      console.log("error message", err.message);
     return  res.send(err.message);
    }
  });
};
