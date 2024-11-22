const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection');
const cors = require('cors')
const routerAPI = require('./router/api')
const app = express();

// Database Connection 
connection('mongodb://localhost:27017/boardIO').then(()=>{
    console.log("Database Connection Sucessfully ");
    
}).catch((error)=>{
    console.log("Data base Connection Not Sucessfully");
    
});

// Connecction between Frontend to backend

corsOption ={
    origin:'http://localhost:3000',
    optionSuccessfulStatus: 200
}
// Authenticate Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOption))

// Router API Calls 
app.use('/api', routerAPI);

app.listen (5006 , ()=>{
    console.log("Server is Running on the 5006");
    
})