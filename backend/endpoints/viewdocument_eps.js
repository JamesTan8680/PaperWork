import express from "express";
import cors from "cors";
import db from "./db.js";
const viewdocument_ep_router = express.Router();
viewdocument_ep_router.use(cors());
viewdocument_ep_router.use(express.json());

  export function fetch(q, res) {
    const sql = q;
    db.query(sql, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }

  //create a search string, automatically creating an OR statement for different columns to search
//prefix: (optional else use "") the operator to put in front of the string WITH SPACES
//search: the string to search for
//inArgs: an array of column name strings to search in
function generateSearchString(prefix, search, inArgs){
    var s = prefix;
    s += "(";
    for (var i in inArgs){
      s += inArgs[i] + " LIKE '%" + search + "%'";
      if (i != inArgs.length - 1) s += " OR ";
    }
    s += ")";
    return s;
  }
  
  export function select(table, args, res) {
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
viewdocument_ep_router.get("/document-template", (req, res) => {
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
  viewdocument_ep_router.get("/document-template/:tempId/:docId", (req, res) => {
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
  viewdocument_ep_router.get("/document-template/:id", (req, res) => {
    req.query.where = "document_template.type = '" + req.params.id + "'";
    // req.query.other = "INNER JOIN document_template ON document_template.document_template_id = document_container.document_template_id";
    if (req.query.search)
      req.query.where += generateSearchString(" AND ", req.query.search, [
        "document_template.title",
        "content",
      ]);
    select("document_template", req.query, res);
  });

 export default viewdocument_ep_router;