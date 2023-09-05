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
    "document_default_template.type AS id, document_default_template.*, COUNT(*) AS count";
  req.query.other =
    "INNER JOIN document_template ON document_default_template.type = document_template.type";
  req.query.groupBy = "document_default_template.type";
  select("document_default_template", req.query, res);
});

//get all types
view_document_ep_router.get("/document-template/type", (req, res) => {
  if (req.query.search)
    req.query.where = generateSearchString("", req.query.search, ["title"]);
  req.query.columns =
    "document_default_template.type AS id, document_default_template.*, COUNT(*) AS count";
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
  if (req.query.search)
    req.query.where += generateSearchString(" AND ", req.query.search, [
      "document_template.title",
      "content",
    ]);
  select("document_template", req.query, res);
});

view_document_ep_router.get("/document-template2/:id", (req, res) => {
  const type_id = req.params.id;

  // Query to retrieve document_template data with approval ratio
  const getPartyInfoWithRatio = `
    SELECT document_template.*,
      (SELECT COUNT(CASE WHEN parties_approval = 1 THEN 1 ELSE NULL END) / COUNT(document_template_id)
       FROM document_parties
       WHERE document_template_id = document_template.document_template_id) AS approvalRatio
    FROM document_template
    WHERE type = ?;
  `;

  // Execute the query to retrieve document_template data with approval ratio
  db.query(getPartyInfoWithRatio, type_id, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      return res.status(500).send("Internal Server Error");
    }

    // Send the response with data and approval ratios
    res.json(results);
  });
});



view_document_ep_router.get("/parties/:id", (req, res) => {
  // Get the party ID from the request parameters
  const partyId = req.params.id;

  // Define the SQL query to retrieve party information based on the given party ID
  const getPartyInfo = `
      SELECT parties.parties_id, parties.parties_name, parties.address, parties.email
      FROM document_parties
      INNER JOIN parties ON document_parties.parties_id = parties.parties_id
      WHERE document_parties.document_template_id = ?;
    `;

  // Execute the query
  db.query(getPartyInfo, [partyId], (err, result) => {
    if (err) {
      // Handle database query error
      return res.status(500).json({
        error: "An error occurred while querying for party information.",
      });
    }

    if (result.length === 0) {
      // If no party with the specified ID is found, return a 404 error
      return res.status(404).json({
        error: "Party not found.",
      });
    }

    // If the query is successful, return all matching party information
    res.status(200).json(result);
  });
});

view_document_ep_router.get("/receipients/:id", (req, res) => {
  // Get the party ID from the request parameters
  const partyId = req.params.id;

  // Define the SQL query to retrieve party information based on the given party ID
  const getPartyInfo = `
      SELECT document_container.identity_id, identity.firstname, identity.email
      FROM document_container
      INNER JOIN identity ON document_container.identity_id = identity.identity_id
      WHERE document_container.document_template_id = ?;
    `;

  // Execute the query
  db.query(getPartyInfo, [partyId], (err, result) => {
    if (err) {
      // Handle database query error
      return res.status(500).json({
        error: "An error occurred while querying for receipient information.",
      });
    }

    if (result.length === 0) {
      // If no party with the specified ID is found, return a 404 error
      return res.status(404).json({
        error: "Receipient not found.",
      });
    }

    // If the query is successful, return all matching party information
    res.status(200).json(result);
  });
});

export default view_document_ep_router;
