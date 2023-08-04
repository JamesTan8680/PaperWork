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

function select(table, args, res){
  var q = "SELECT ";
  if (args.columns) q += args.columns;
  else q += "*";
  q+= " FROM " + table;
  if (args.where) q+= " WHERE " + args.where;
  if (args.orderBy) q+= " ORDER BY " + args.orderBy;
  console.log(q);
  fetch(q,res);
}

// !!! Consider injection measures later (unless "[multipleStatements: false]" is enough??) !!!
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //get table names
// app.get("/tables", (req, res) => {
//   //write the query for the sql
//   fetch("SELECT table_name FROM information_schema.tables WHERE table_schema = 'paperwork_project';", res);
// });

//https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express

//get table (version 0.2)
// EXAMPLE
//http://localhost:8800/select/document_template?where=type=%27nda%27
//http://localhost:8800/select/document_template?columns=title,date_added&orderBy=parties_number%20desc
app.get("/select/:table", (req, res) => {
  select(req.params.table,req.query,res);
});


// //get table (test params)
// app.get("/select/:tables", (req, res) => {
//   fetch("SELECT * FROM " + req.params["table"], res);
// });
// app.get("/select/:table/:col", (req, res) => {
//   fetch("SELECT " + req.params["col"] +" FROM " + req.params["table"], res);
// });


//count rows
app.get("/count", (req, res) => {
   select(req.params.table,{"columns":"COUNT(*) AS length"},res);

});

//most popular template
app.get("/top/document", (req, res) => {
  // get:    select id, title, count from documents joined with document templates, group by id, order by count, limit to 1 item
  // result: most popular template name
  fetch("SELECT document_container.document_template_id, document_template.title, COUNT(*) AS count FROM document_container INNER JOIN document_template ON document_container.document_template_id = document_template.document_template_id GROUP BY document_container.document_template_id ORDER BY COUNT(*) DESC LIMIT 1", res);
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
  
//