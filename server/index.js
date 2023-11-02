const express = require("express");
const mysql = require("mysql")
const app = express();
const cors = require("cors");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_employees"
})

app.use(cors());
app.use(express.json())

app.get("/empleados", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
})

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const years = req.body.years;

    db.query("INSERT INTO employees(name, age, country, position, years) VALUES(?, ?, ?, ?, ?)", [name, age, country, position, years],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
})

app.put("/update", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const years = req.body.years;
    const id = req.body.id;

    db.query("UPDATE employees SET name=?, age=?, country=?, position=?, years=? WHERE id=?", [name, age, country, position, years, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        });
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM employees WHERE id=?", id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        });
})

app.listen(3001, () => {
    console.log("Servidor iniciado")
})