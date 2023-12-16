import express from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";

const app = express();
const server = http.createServer(app);

var arrayList = [
  {name : "Subash"},
  {name : "Kamal"},
  {name : "Vijay"},
  {name : "Rahman"},
  {name : "Harris"}
]

app.use(cors({
  credentials : true,
  origin : "*"
}));

app.use(express.json());
//----------------------------------------------------------------------------------------------------------------

// const list = mysql.createConnection({
//   host : "db4free.net" , 
//   user : "vcentry" ,
//   password : "test@123" ,
//   database : "travelix" ,
//   port : 3306
// })

// list.connect ((error) => {
//   if(error){
//     throw error;
//   }
//   else{
//     console.log("My SQL Server is Connected")
//   }
// })
// //http://localhost:5000/api/create/list
// //METHOD : POST
// app.post("/api/create/list", (request, response) => {
//   var incomingSqlData = request.body;
//   var Age = parseInt(incomingSqlData.Age);

//   var sql_query = `INSERT INTO subash_table (Name, Age, City) 
//   VALUES ('${incomingSqlData.Name}',${incomingSqlData.Age},'${incomingSqlData.City}')`

//   list.query(sql_query, (error, result) => {
//     if(error){
//       response.status(500).send(error);
//     }
//     else{
//       response.status(200).send(result);
//     }
//   })
// })
// // http://localhost:5000/api/user/read
// app.get("/api/user/read", (request, response) => {
//   const sql_query = `SELECT * subash_table`;
//   connection.query(sql_query, (error, result) => {
//     if(error){
//       response.status(500).send(error);
//     }
//     else{
//       response.status(200).send(result);
//     }
//   })
// })


app.use(express.json());

const connection = mysql.createConnection({
  host : "db4free.net",
  user : "vcentry",
  password : "test@123",
  database : "travelix",
  port : 3306
});

connection.connect((error) => {
  if(error){
    throw error;
  }
  else{
    console.log("MYSQL Server has been connected");
  }
})
app.post("/api/create/record", (request, response) => {
  const incomingData = request.body;
  const Age = parseInt(incomingData.Age);
  
  const sql_query = `INSERT INTO subash_table (Name, Age, City) VALUES ('${incomingData.Name}', ${Age}, '${incomingData.City}')`;

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})

// URL : http://localhost:5000/api/read/record
// METHOD : GET

app.get("/api/read/record", (request, response) => {
  const sql_query = `SELECT * FROM subash_table`;
  
  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})

// http://localhost:5000/api/test
//----------------------------------------------------------------------------------------------------------------
app.put("/api/update/record/:id", (request, response) => {
  const incomingData = request.body;
  const incomingid = request.params.id;
  
  const Age = parseInt(incomingData.Age);
  
  const sql_query = `UPDATE subash_table SET Name='${incomingData.Name}', Age=${Age}, City='${incomingData.City}' WHERE id=${incomingid}`;
  
  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})
//----------------------------------------------------------------------------------------------------------------
// Method : DELETE
// http://localhost:5000/api/delete/record/2
app.delete("/api/delete/record/:id", (request, response) => {
  const incomingId = request.params.id;
  
  const sql_query = `DELETE FROM subash_table WHERE id=${incomingId};`;
  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })  
})
//----------------------------------------------------------------------------------------------------------------
// Method : GET

app.get("/api/test", (request, response) => {
  response.status(200).send("Node js API is working fine");
})

// http://localhost:5000/api/name/list
// GET Method
app.get("/api/name/list", (request, response) => { //requset is request to react js and response is response from react js
   response.status(200).send(arrayList); //here 200 is success where as above 400 is failure
})

// http://localhost:5000/api/user/create
// Method : POST
// Payload :
// {
//   name : "any username"
// }

app.post("/api/user/create", (request, response) => {
  const incomingData = request.body;
  arrayList.push(incomingData);
  response.status(200).send("User profile has been created");  
})


const portNumber = process.env.PORT || 5000;
// http://localhost:5000/api/user/create
// Method : POST
// Payload :
// {
//   name : "any username"
// }

app.post("/api/user/create", (request, response) => {
  const incomingData = request.body;
  arrayList.push(incomingData);
  response.status(200).send("User profile has been created");  
})

server.listen(portNumber, () => {
  console.log("Node JS project is running")
})