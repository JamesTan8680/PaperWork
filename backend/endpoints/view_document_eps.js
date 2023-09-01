import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const view_document_ep_router = express.Router();
view_document_ep_router.use(cors());
view_document_ep_router.use(express.json());

const macro = new ep_macros();
const generateSearchString = macro.generate_search_string;
const select = macro.select;
const fetch = macro.query;

//get all types
view_document_ep_router.get("/document-template/type/:id", (req, res) => {

  req.query.where = "document_default_template.type = '" + req.params.id + "'"; 
  if (req.query.search)
    req.query.where += generateSearchString(" AND ", req.query.search, [
      "title",
    ]);
  req.query.columns =
    "document_default_template.type AS id, document_default_template.*, COUNT(*) AS count"
  req.query.other =
    "INNER JOIN document_template ON document_default_template.type = document_template.type";
  req.query.groupBy = "document_default_template.type";
  select("document_default_template", req.query, res);
});

//get all types
view_document_ep_router.get("/document-template/type", (req, res) => {

  if (req.query.search)
    req.query.where = generateSearchString("", req.query.search, [
      "title",
    ]);
  req.query.columns =
    "document_default_template.type AS id, document_default_template.*, COUNT(*) AS count"
  req.query.other =
    "INNER JOIN document_template ON document_default_template.type = document_template.type";
  req.query.groupBy = "document_default_template.type";
  select("document_default_template", req.query, res);
});

//get all documents by template
view_document_ep_router.get("/document-template", (req, res) => {
  req.query.columns =
    "document_template.document_template_id AS id, document_template.title, document_default_template.type, document_default_template.title AS type_name, COUNT(*) AS count";
  req.query.other =
    "INNER JOIN document_default_template ON document_default_template.type = document_template.type";
  req.query.groupBy = "document_template.type";
  if (req.query.search)
    req.query.where = generateSearchString("", req.query.search, [
      "document_template.title",
      "document_default_template.title",
    ]);
  select("document_template", req.query, res);
});





//get list of signatories of document
//tempId: ID of the template type
//docId: ID of the document
view_document_ep_router.get("/document-template/:tempId/:docId", (req, res) => {
  req.query.where =
    "document_template.type = '" +
    req.params.tempId +
    "' AND document_template.document_template_id = '" +
    req.params.docId +
    "'";
  if (req.query.search)
    req.query.where += generateSearchString(" AND ", req.query.search, [
      "document_template.title",
      "CONVERT(signed_date, CHAR)",
      "CONVERT(issue_date, CHAR)",
    ]);

  req.query.other =
    "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
  select("document_container", req.query, res);
});

//get list of documents by type
view_document_ep_router.get("/document-template/:id", (req, res) => {
  req.query.where = "document_template.type = '" + req.params.id + "'";
  // req.query.other = "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
  if (req.query.search)
    req.query.where += generateSearchString(" AND ", req.query.search, [
      "document_template.title",
      "content",
    ]);
  select("document_template", req.query, res);
});

export default view_document_ep_router;