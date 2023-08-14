import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const create_document = express.Router();
create_document.use(cors());
create_document.use(express.json());
const macro = new ep_macros();
const fetch = macro.query;

//Return object list of all version-template
create_document.get("create-document/template-version", (req, res) => {
  //write the query for the sql
  fetch("SELECT count(*) AS 'total' FROM document_default_template", res);
});


//Return term base on the template id and version id for preview
create_document.get("create-document/:template/:version", (req, res) => {
  // Write the query for the SQL
  fetch(
    "SELECT title, COUNT(*) AS count FROM document_template GROUP BY type ORDER BY count DESC LIMIT 1",
    res
  );
});


export default create_document;
