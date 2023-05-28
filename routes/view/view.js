const db = require("../../db");
module.exports = (app) => {
  // Main Home page
  app.get("/", (req, res) => {
    return res.render("index", {
      title: "Tutorial 9",
      desc: "Tutorial is mainly about frontend",
    });
  });
  app.get("/employee", (req, res) => {
    return res.render("employee");
  });

  app.get("/addEmployee", (req, res) => {
    return res.render("add");
  });
  app.get("/profile", (req, res) => {
    // const { fname, mname, lname, country, salary, birthdate } = req.body;
    return res.render("profile");
  });
  app.get("/department", async (req, res) => {
    const departmets = await db.select("*").from("departments");
    return res.render("departments", { departmets });
  });
};
