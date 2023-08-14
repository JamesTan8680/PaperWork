import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const createdocument_ep_router = express.Router();
createdocument_ep_router.use(cors());
createdocument_ep_router.use(express.json());
const macros = new ep_macros();

createdocument_ep_router.get("/templates", (req, res) => {
    macros.query("SELECT * FROM document_default_template",res);
});


// createdocument_ep_router.get("/templates", (req, res) => {
//    const sql = "SELECT document_template_id AS id, document_template.title AS doc_title, document_template.type AS default_template, document_default_template.title, version, document_template.content FROM document_template INNER JOIN document_default_template ON document_default_template.type = document_template.type";
//    db.query(sql, (err, data) => {
//        if (err) return res.send(err);


//     data.forEach(result => {
//         const dataArray = [];

//         results.forEach(result => {
//           const dataObject = {
//             id: result.id,
//             docTitle: result.doc_title,
//             template: {
//               type: result.template_type,
//               term: result.content,
//             },
//             defaultTemplate: {
//               type: result.template_type,
//               term: '',
//             },
//           };
    
//           dataArray.push(dataObject);
//         });
//     });
//        return res.json(data);
//    });
// });
  

//Return object list of all version-template
createdocument_ep_router.get("create-document/template-version", (req, res) => {
    //write the query for the sql
    fetch("SELECT count(*) AS 'total' FROM document_default_template", res);
  });
  
  
  //Return term base on the template id and version id for preview
  createdocument_ep_router.get("create-document/:template/:version", (req, res) => {
    // Write the query for the SQL
    fetch(
      "SELECT title, COUNT(*) AS count FROM document_template GROUP BY type ORDER BY count DESC LIMIT 1",
      res
    );
  });
  

export default createdocument_ep_router;