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

function fetch(q, res) {
  const sql = q;
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}

function select(table, args, res) {
  var q = "SELECT ";
  if (args.columns) q += args.columns;
  else q += "*";
  q += " FROM " + table;
  if (args.other) q += " " + args.other;
  if (args.where) q += " WHERE " + args.where;
  if (args.groupBy) q += " GROUP BY " + args.groupBy;
  if (args.orderBy) q += " ORDER BY " + args.orderBy;
  console.log(q);
  fetch(q, res);
}

//get all documents by template
app.get("/view-document/document-template", (req, res) => {
  req.query.columns =
    "document_template.document_template_id AS id, document_template.title, document_default_template.type, document_default_template.title AS type_name, COUNT(*) AS count";
  req.query.other =
    "INNER JOIN document_default_template ON document_default_template.type = document_template.type";
  req.query.groupBy =
    "document_template.type";
  if (req.query.search) req.query.where = generateSearchString("", req.query.search, ["document_template.title","document_default_template.title"]);
  select("document_template", req.query, res);
});

//get list of signatories of document
//tempId: ID of the template type
//docId: ID of the document
app.get("/view-document/document-template/:tempId/:docId", (req, res) => {
  req.query.where =
    "document_template.type = '" +
    req.params.tempId +
    "' AND document_template.document_template_id = '" +
    req.params.docId +
    "'";
    if (req.query.search) req.query.where += generateSearchString(" AND ", req.query.search, ["document_template.title", "CONVERT(signed_date, CHAR)", "CONVERT(issue_date, CHAR)"]);

  req.query.other =
    "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
  select("document_container", req.query, res);
});

//get list of documents by type
app.get("/view-document/document-template/:id", (req, res) => {
  req.query.where = "document_template.type = '" + req.params.id + "'";
  // req.query.other = "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
  if (req.query.search) req.query.where += generateSearchString(" AND ", req.query.search, ["document_template.title", "content"]);
  select("document_template", req.query, res);
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
  const sql =
    "SELECT title, COUNT(*) AS count FROM document_template GROUP BY type ORDER BY count DESC LIMIT 1";
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/homepage/documents/recently-created", (req, res) => {
  const sql =
    "SELECT title, version, DATE_FORMAT(created_date, '%d/%m/%Y') AS date_created FROM document_template ORDER BY created_date DESC LIMIT 5";

  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/homepage/notes", (req, res) => {
  // Write the query for the SQL, using DATE_FORMAT to format the date
  const sql =
    "SELECT note_id, DATE_FORMAT(date_created, '%d/%m/%Y') AS date_created, person_created, header, content from notes where is_removed = '0'";

  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//for update
app.put("/homepage/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  const { header, content } = req.body;

  const sql = "UPDATE notes SET header = ?, content = ? WHERE note_id = ?";

  db.query(sql, [header, content, noteId], (err, result) => {
    if (err) return res.send(err);
    return res.json({ message: "Note updated successfully" });
  });
});

//for delete
app.delete("/homepage/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;

  const sql = "UPDATE notes SET is_removed = '1' WHERE note_id = ?";

  db.query(sql, [noteId], (err, result) => {
    if (err) return res.send(err);
    return res.json({ message: "Note deleted successfully" });
  });
});

//for insert
app.post("/homepage/notes", (req, res) => {
  const { date_created, person_created, header, content } = req.body;

  const sql =
    "INSERT INTO notes (date_created, person_created, header, content, is_removed) VALUES (?, ?, ?, ?, '0')";

  db.query(
    sql,
    [date_created, person_created, header, content],
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Note inserted successfully",
        note_id: result.insertId,
      });
    }
  );
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
