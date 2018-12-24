
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//Import SQL library
var sql = require('mssql')

//SQL DB Configuration 
var config = {
    server: '192.168.3.9',
    user: 'leave',
    password: 'B@cstech135',
    database: 'Arush'
}



//Parse JSON or URLencoded
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
    
    // let message = `Created employee with Name ${user.body.Name} `
    // res.send({Action:message});

    async function createEmployee_sql(){
        try{
            var conn = new sql.ConnectionPool(config)
            var pool = await conn.connect()
            var list = await pool.request()
                    .input("Name", sql.NVarChar(50),user.body.Name )
                    .input("Address",sql.NVarChar(100), user.body.Address)
                    .input("Mobile",sql.NVarChar(50), user.body.Mobile)
                    .execute("createEmployee")
            console.log(list)
            res.json(list)
        }catch(err){

        }
    } createEmployee_sql();
}

function getAllUsers(res) {
    // var list = [];
    // list.push({
    //     EmployeeID: 1,
    //     Name: 'Ravi',
    //     Address: 'Dwarka, Delhi',
    //     Mobile: '9871169929'
    // });
    // list.push({
    //     EmployeeID: 2,
    //     Name: 'Ravi 1',
    //     Address: 'Dwarka 1, Delhi',
    //     Mobile: '1'
    // });
    // list.push({
    //     EmployeeID: 3,
    //     Name: 'Ravi 2',
    //     Address: 'Dwarka 2, Delhi',
    //     Mobile: '2'
    // });
    // list.push({
    //     EmployeeID: 4,
    //     Name: 'Ravi 3',
    //     Address: 'Dwarka 3, Delhi',
    //     Mobile: '3'
    // });
    // res.json(list);
    // res.send(list);
    // return list;
    async function getemployees_sql () {
        try {
            var conn = new sql.ConnectionPool(config)
            var pool = await conn.connect()
            var list = await pool.request()
                            .query('select * from Employees')
            console.log(list.recordset)

        }catch (err){
            console.log(err)
        }
    } getemployees_sql();
}