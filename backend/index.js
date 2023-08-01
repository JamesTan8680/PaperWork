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
  database: "paperwork_project",
});

function fetch(q, res){
  const sql = q;
    db.query(sql, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}

app.get("/tables", (req, res) => {
  //write the query for the sql
  fetch("SELECT table_name FROM information_schema.tables WHERE table_schema = 'paperwork_project';", res);
});
app.get("/select/:table/:cols", (req, res) => {
  fetch("SELECT " + req.params["cols"] +" FROM " + req.params["table"], res);
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
  
