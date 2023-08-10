import express from "express";
import cors from "cors";
import mysql from "mysql";

const db = mysql.createConnection({
  host: "database-2.co8ctu949l8t.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Paperwork-123",
  database: "paperwork_project",
});

const app = express(); 
app.use(cors());
app.use(express.json());

function fetch(q, res){
  const sql = q;
    db.query(sql, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);

    });
}

function select(table, args, res){
  var q = "SELECT ";
  if (args.columns) q += args.columns;
  else q += "*";
  q+= " FROM " + table;
  if (args.other) q+= " " + args.other;
  if (args.where) q+= " WHERE " + args.where;
  if (args.orderBy) q+= " ORDER BY " + args.orderBy;
  console.log(q);
  fetch(q,res);
}

//get all documents by template
app.get("/select/viewDocument/documentTemplate", (req, res) => {
  req.query.columns = "document_template.document_template_id AS id, document_template.title, COUNT(*) AS count";
  req.query.other = "INNER JOIN document_default_template ON document_default_template.type = document_template.type GROUP BY document_template.type";
  select("document_template",req.query,res);
});

//get list of signatories of document
//tempId: ID of the template type
//docId: ID of the document
app.get("/select/viewDocument/documentTemplate/:tempId/:docId", (req, res) => {
  req.query.where = "document_template.type = '" + req.params.tempId + "' AND document_template.document_template_id = '" + req.params.docId + "'";
  req.query.other = "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
  select("document_container",req.query,res);
});


app.get("/select/viewDocument/documentTemplate/:id", (req, res) => {
  req.query.where = "document_template.type = '" + req.params.id + "'"
 // req.query.other = "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
  select("document_template",req.query,res);
});


//This line separate Jordan code and Simon code --------------------------------------------------------------------------------------------
//Simon`s code

app.get("/homepage/documents/total", (req, res) => {
  //write the query for the sql
  const sql = "SELECT count(*) AS 'total' FROM document_container";
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/homepage/documents/most-popular", (req, res) => {
  // Write the query for the SQL
  const sql = "SELECT document_template_id, COUNT(*) AS count FROM document_container GROUP BY document_template_id ORDER BY count DESC LIMIT 1";
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/homepage/documents/recently-created", (req, res) => {
  // Write the query for the SQL, using DATE_FORMAT to format the date
  const sql = "SELECT document_container.document_template_id, document_template.version, DATE_FORMAT(document_container.issue_date, '%d/%m/%Y') AS date_created FROM document_container INNER JOIN document_template ON document_container.document_template_id = document_template.document_template_id ORDER BY document_container.issue_date DESC LIMIT 5";

  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/homepage/notes", (req, res) => {
  // Write the query for the SQL, using DATE_FORMAT to format the date
  const sql = "SELECT note_id, DATE_FORMAT(date_created, '%d/%m/%Y') AS date_created, person_created, header, content from notes where is_removed = '0'";

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
  
