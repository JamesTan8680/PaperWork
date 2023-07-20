import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "note",
});
app.get("/", (req, res) => {
    //write the query for the sql
    const sql = "SELECT * FROM notes";
    db.query(sql, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

//check if the database is existed or not
db.connect(function (err) {
    if (err) {
        return console.error("error: " + err.message);
    }

    console.log("Connected to the MySQL server.");
});
//listen to the backend
app.listen(8800, () => {
    console.log("backend connected");
});