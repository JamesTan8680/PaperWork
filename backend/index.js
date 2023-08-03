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
 
// !!! Consider injection measures later (unless "[multipleStatements: false]" is enough??) !!!
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //get table names
// app.get("/tables", (req, res) => {
//   //write the query for the sql
//   fetch("SELECT table_name FROM information_schema.tables WHERE table_schema = 'paperwork_project';", res);
// });

//https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express

//get table (test queries)
app.get("/select", (req, res) => {
  if (req.query.col){
    fetch("SELECT " + req.query.col + " FROM " + req.query.table,res);

  }
  else if (req.query.by){
    fetch("SELECT * FROM " + req.query.table,res + "ORDER BY" + req.query.by,res);

  }
  else{
    fetch("SELECT * FROM " + req.query.table,res);

  }
});

// //get table (test params)
// app.get("/select/:tables", (req, res) => {
//   fetch("SELECT * FROM " + req.params["table"], res);
// });
// app.get("/select/:table/:col", (req, res) => {
//   fetch("SELECT " + req.params["cols"] +" FROM " + req.params["table"], res);
// });


//count rows
app.get("/count", (req, res) => {
   fetch("SELECT COUNT(*) AS length FROM " + req.query.table, res);
});

//most popular template
app.get("/top/document", (req, res) => {
  fetch("SELECT document_container.document_template_id, document_template.title, COUNT(*) AS count FROM document_container INNER JOIN document_template ON document_container.document_template_id = document_template.document_template_id GROUP BY document_container.document_template_id ORDER BY COUNT(*) DESC LIMIT 1", res);
});
//SELECT document_default_template.type, document_default_template.title, COUNT(*)





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
  
