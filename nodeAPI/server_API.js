
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())



//GET EMPLOYEES
app.get('/api/getEmployees', function (req, res) {
    getAllUsers(res);
    
});

// UPDATE EMPLOYEE
app.post('/api/updateEmployee', function (req,res) {
        updateUser(req,res);
    });
    
// CREATE EMPLOYEE
app.post('/api/createEmployee', function (req,res) {
       createUser(req,res) 
    });
    
// DELETE EMPLOYEE
app.post('/api/deleteEmployee', function (req, res) {
        deleteUser(req,res)
    });
    

//LISTEN ON SPECIFIED PORT
var server = app.listen(8081, function () {
    console.log("Server is running")
});




function updateUser(user,res){
    //
   
    let message = `Updated employee with ID ${user.body.EmployeeID} and Name ${user.body.Name}`
    res.send({Action:message});
}

function deleteUser(user,res){
    //
    
    let message = `Deleted employee with ID ${user.body.EmployeeID} and Name ${user.body.Name}`
    res.send({Action:message});
}

function createUser(user,res){
    //
    
    let message = `Created employee with Name ${user.body.Name} `
    res.send({Action:message});
}

function getAllUsers(res) {
    var list = [];
    list.push({
        EmployeeID: 1,
        Name: 'Ravi',
        Address: 'Dwarka, Delhi',
        Mobile: '9871169929'
    });
    list.push({
        EmployeeID: 2,
        Name: 'Ravi 1',
        Address: 'Dwarka 1, Delhi',
        Mobile: '1'
    });
    list.push({
        EmployeeID: 3,
        Name: 'Ravi 2',
        Address: 'Dwarka 2, Delhi',
        Mobile: '2'
    });
    list.push({
        EmployeeID: 4,
        Name: 'Ravi 3',
        Address: 'Dwarka 3, Delhi',
        Mobile: '3'
    });
    // res.json(list);
    res.send(list);
    // return list;
    
}