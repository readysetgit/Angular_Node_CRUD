const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')

//SQL Connection configurations
const config = require('./sqlconfig')
const sql = require('mssql')

//For reading Http requests data
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

const port = process.env.PORT || 8081

//Serving the Angular Production App
app.use(express.static(__dirname + '/dist/AngularApp'))


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
    


app.all('/*', (req,res)=> {
        res.sendFile(path.join(__dirname + '/dist/AngularApp/index.html'))
})
    
//LISTEN ON SPECIFIED PORT
var server = app.listen(port, function () {
    console.log(`Server is running on ${port}`)
});
// server.listen(port,()=>console.log(`Running`))



 function updateUser(user,res){
    //
   
    // let message = `Updated employee with ID ${user.body.EmployeeID} and Name ${user.body.Name}`
    // res.json({Action:message});


    //Update Employee in sql DB 
    async function updateEmployee_sql () {
        try{

            console.log('trying')
            let conn = new sql.ConnectionPool(config)
            let pool = await conn.connect()
            let list = await pool.request()
                .input("EmployeeId",sql.NVarChar(50), user.body.EmployeeID)
                .input("Name",sql.NVarChar(50), user.body.Name)
                .input("Address",sql.NVarChar(100), user.body.Address)
                .input("Mobile",sql.NVarChar(50), user.body.Mobile)
                .execute("updateEmployee")
            console.log(list)
            res.json(list)

        } catch (err){
            console.log(err)
        }
    } updateEmployee_sql();
}

 function deleteUser(user,res){
    //
    
    // let message = `Deleted employee with ID ${user.body.EmployeeID} and Name ${user.body.Name}`
    // res.json({Action:message});


    //Delete Employee in sql DB 
    async function deleteEmployee_sql () {
        try{

            console.log('trying')
            let conn = new sql.ConnectionPool(config)
            let pool = await conn.connect()
            let list = await pool.request()
                .input("EmployeeId",sql.NVarChar(50), user.body.EmployeeID)
                .execute("deleteEmployee")
            console.log(list)
            res.json(list)

        } catch (err){
            console.log(err)
        }
    } deleteEmployee_sql();
}

function createUser(user,res){
    //
    
    // let message = `Created employee with Name ${user.body.Name} `
    // res.json({Action:message});

    //create user in sql DB 
    async function createEmployee_sql () {
        try{

            console.log('trying')
            let conn = new sql.ConnectionPool(config)
            let pool = await conn.connect()
            let list = await pool.request()
                .input("Name",sql.NVarChar(50), user.body.Name)
                .input("Address",sql.NVarChar(100), user.body.Address)
                .input("Mobile",sql.NVarChar(50), user.body.Mobile)
                .execute("createEmployee")
            console.log(list)
            res.json(list)

        } catch (err){
            console.log(err)
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
    
    //GET From SQL DB. ASYNC/AWAIT used
    async function getemployees_sql () {
        try{
            console.log('trying')
            let conn = new sql.ConnectionPool(config)
            let pool = await conn.connect()
            let list = await pool.request()
                    .query('select * from Employees')
                    // .execute("getEmployees")
            console.log(list.recordset)
            res.json(list.recordset)
        } catch (err){
            console.log(err)
        }
    } getemployees_sql();
}