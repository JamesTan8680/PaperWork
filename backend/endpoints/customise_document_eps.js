import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const customise_document_ep_router = express.Router();
customise_document_ep_router.use(cors());
customise_document_ep_router .use(express.json());
const macros = new ep_macros();

customise_document_ep_router.get("/:id", (req, res) => {
  macros.select("document_template", {where:"document_template_id='"+req.params.id+"'"}, res);
})

customise_document_ep_router.get("/:id/parties", (req, res) => {
  macros.select("document_parties", {where:"document_template_id='"+req.params.id+"'"}, res);
})

customise_document_ep_router.get("/:id/configuration", (req, res) => {
  macros.select("configuration", {where:"document_template_id='"+req.params.id+"'"}, res);
})

customise_document_ep_router.post("/:id/parties", (req, res) => {
  const { document_template_id, parties_id, parties_approval } = req.body;

  const sql =
    "INSERT INTO document_parties (document_template_id, parties_id, parties_approval) VALUES (?, ?, '0')";

  db.query(
    sql,
    [document_template_id, parties_id, parties_approval],
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Document parties appended successfully",
        insert_id: result.insertId,
      }); 
    }
  );
});

customise_document_ep_router.post("/:id/configuration", (req, res) => {
  const {document_template_id, email, address, student_id, age, title} = req.body;

  const sql =
    "INSERT INTO configuration (document_template_id, email, address, student_id, age, title) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [document_template_id, email, address, student_id, age, title],
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Document configuration appended successfully",
        insert_id: result.insertId,
      }); 
    }
  );
});


export default customise_document_ep_router;
