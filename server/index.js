const express = require("express");
const mysql = require("mysql")
const app = express();
const cors = require("cors");
const db = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "",
    database: "crud_employees"
})

app.use(cors());
app.use(express.json())

app.post("/create", (req, res)=>
{
    console.log(req.body)
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const years = req.body.years;

    db.query("INSERT INTO employees(name, age, country, position, years) VALUES(?, ?, ?, ?, ?)", [name, age, country, position, years],
    (err, result)=>
    {
        if(err){
            console.log(err);
        }else{
            res.send("XDDD")
        }
    });
})

app.listen(3001, ()=>
{
    
})