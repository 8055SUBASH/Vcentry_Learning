import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
import http, { request } from "http";

const app = express(); // important because using express we are creating REST API
const server = http.createServer(app);

app.use(cors({
    credentials: true,
    origin: "*"
}));

app.use(express.json()); // sending and recieving data in json format 
//----------------------------------------------------------------------------------------------------------------
//http://localhost:5001/api/test
//METHOD : GET
app.get("/api/test", (request, response) => {
    response.status(200).send("Node is working");
})
//----------------------------------------------------------------------------------------------------------------
//http://localhost:5001/api/test/getapi
//METHOD : GET using Object
app.get("/api/test/getapi", (request, response) => {
    response.status(200).send(GetMethodList);
})
let GetMethodList = [
    {
        Name: "Subash",
        City: "Kanchipuram",
        Age: 22
    },
    { Name: "Vijay", City: "Chennai", Age: 47 },
    { Name: "Kamal", City: "Paramakudi", Age: 67 },
    { Name: "Rahman", City: "Chennai", Age: 52 },
    { Name: "Keanu", City: "Canada", Age: 50 },
    { Name: "Jackie", City: "Hong Kong", Age: 65 }
]
//----------------------------------------------------------------------------------------------------------------
/*
http://localhost:5001/api/read/postapi
METHOD : POST using 
PAYLOAD - means we have to send the data from react to node JS according to our wish
Here the form is Object 
{
    Name : "",
    City : "",
    Age : ""

} 
*/
app.post("/api/read/postapi", (request, response) => {
    const incomingData = request.body; // user object comes as it is
    GetMethodList.push(incomingData);
    response.status(200).send("Profile has been updated");
})
//----------------------------------------------------------------------------------------------------------------
//CRUD OPERATION Basic Setup
// Connecting Online Sql Server
const sql_connection = mysql.createConnection({
    host: "db4free.net",
    user: "vcentry",
    password: "test@123",
    database: "travelix",
    port: 3306,
})
sql_connection.connect((error) => {
    if (error) {
        throw (error);
    }
    else {
        console.log("MYSQL Connected");
    }
})
//----------------------------------------------------------------------------------------------------------------
//CRUD Operation Coding Starts From here
// Creating the API using POST Method in SQL 
// http://localhost:5001/api/create/crud
app.post("/api/create/crud", (request, response) => {
    const incomingData = request.body;
    const Age = parseInt(incomingData.Age)
    const Phone = parseInt(incomingData.Phone)
    const sql_query = `INSERT INTO subash_practice (Name, Email, Age, Location, Phone, College) 
    VALUES ('${incomingData.Name}','${incomingData.Email}',${Age},'${incomingData.Location}',${Phone},'${incomingData.College}');`
    sql_connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send(result);
        }
    })
});
//----------------------------------------------------------------------------------------------------------------
//CRUD Operation Coding Starts From here
// Loading the Created API using GET Method
// http://localhost:5001/api/load/crud
app.get("/api/load/crud", (request, response) => {
    const sql_query = `SELECT * FROM subash_practice`;
    sql_connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send(result);
        }
    })

})
//----------------------------------------------------------------------------------------------------------------
const portNumber = process.env.PORT || 5001;
server.listen(portNumber, () => {
    console.log("Node JS project is running");
})
