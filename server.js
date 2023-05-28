const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const employeeApi=require('./routes/api/employee')
const employeeView=require('./routes/view/view')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.static('public'));

// Handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// routes
employeeView(app)
employeeApi(app)

app.listen(3000, ()=>{
    console.log("Server is now listening at port 3000 on http://localhost:3000/");
})

