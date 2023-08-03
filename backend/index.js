import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "database-2.co8ctu949l8t.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Paperwork-123",
  database: "paperwork_project",
});
app.get("/return_number_of_documents", (req, res) => {
  //write the query for the sql
  const sql = "SELECT count(*) AS 'total' FROM document_container";
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/return_most_popular_document", (req, res) => {
  // Write the query for the SQL
  const sql = "SELECT document_template_id, COUNT(*) AS count FROM document_container GROUP BY document_template_id ORDER BY count DESC LIMIT 1";
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/return_recent_created_documents", (req, res) => {
  // Write the query for the SQL
  const sql = "SELECT document_container.document_template_id, document_template.version, document_container.issue_date FROM document_container INNER JOIN document_template ON document_container.document_template_id = document_template.document_template_id ORDER BY document_container.issue_date DESC LIMIT 5";
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
