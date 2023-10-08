import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";
import mysql from "mysql";

const view_document_ep_router = express.Router();
view_document_ep_router.use(cors());
view_document_ep_router.use(express.json());

const macro = new ep_macros();
const generateSearchString = macro.generate_search_string;
const select = macro.select;
const fetch = macro.query;

const sensitiveDbConfig = {
  host: "database-1.cj0rqzth8q4x.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Paperwork-123",
  database: "paperwork_sensitive",
};

const sensitiveDb = mysql.createConnection(sensitiveDbConfig);

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
  SELECT
  document_template.*,
  (SELECT COUNT(CASE WHEN parties_approval = 1 THEN 1 ELSE NULL END) / COUNT(document_template_id)
   FROM paperwork_project.document_parties
   WHERE document_template_id = document_template.document_template_id) AS approvalRatio,
  (
      SELECT issue_date
      FROM paperwork_project.document_container
      WHERE document_template_id = document_template.document_template_id
      ORDER BY issue_date DESC
      LIMIT 1
  ) AS issueDate
FROM
  paperwork_project.document_template
LEFT JOIN
  paperwork_project.document_container ON document_container.document_template_id = document_template.document_template_id
WHERE
  type = ?
GROUP BY
  document_template.document_template_id;
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
      SELECT parties.parties_id, parties.parties_name, parties.parties_address, parties.parties_email, document_parties.parties_approval
      FROM document_parties
      INNER JOIN parties ON document_parties.parties_id = parties.parties_id
      WHERE document_parties.document_template_id = ?;
    `;

  // Execute the query
  db.query(getPartyInfo, [partyId], (err, result) => {
    if (err) {
      // Handle database query error
      return res.status(500).send(err);
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

view_document_ep_router.get("/recipients/:id", (req, res) => {
  const partyId = req.params.id;

  // Define the SQL queries to retrieve information from both tables
  const getRecipientInfoQuery = `
    SELECT document_container.identity_id, identity.firstname, identity.email
    FROM document_container
    INNER JOIN identity ON document_container.identity_id = identity.identity_id
    WHERE document_container.document_template_id = ?;
  `;

  const getGuestInfoQuery = `
    SELECT document_container.identity_id, guest_identity.firstname, document_container.identity_id as email
    FROM document_container
    INNER JOIN guest_identity ON document_container.document_container_id = guest_identity.document_container_id
    WHERE document_container.document_template_id = ?;
  `;

  // Execute both queries
  db.query(getRecipientInfoQuery, [partyId], (err, recipientInfoResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "An error occurred while querying for recipient information.",
      });
    }

    db.query(getGuestInfoQuery, [partyId], (err, guestInfoResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "An error occurred while querying for recipient information.",
        });
      }

      // Combine and return both results without labels
      const combinedResult = [...recipientInfoResult, ...guestInfoResult];

      if (combinedResult.length === 0) {
        return res.status(404).json({
          error: "Recipient not found.",
        });
      }

      res.status(200).json(combinedResult);
    });
  });
});

view_document_ep_router.get("/document/:id", (req, res) => {
  // Get the party ID from the request parameters
  const template_id = req.params.id;

  // Define the SQL query to retrieve party information based on the given party ID
  const getPartyInfo = `
      SELECT *
      FROM document_template
      WHERE document_template_id = ?;
    `;

  // Execute the query
  db.query(getPartyInfo, [template_id], (err, result) => {
    if (err) {
      // Handle database query error
      return res.status(500).json({
        error: "An error occurred while querying for receipient information.",
      });
    }

    if (result.length === 0) {
      // If no party with the specified ID is found, return a 404 error
      return res.status(404).json({
        error: "Template not found.",
      });
    }

    // If the query is successful, return all matching party information
    res.status(200).json(result);
  });
});

view_document_ep_router.get("/configurations/:id", (req, res) => {
  const template_id = req.params.id;

  const query = `
      SELECT *
      FROM configuration
      WHERE document_template_id = ?;
    `;

  // Execute the query
  db.query(query, [template_id], (err, result) => {
    if (err) {
      // Handle database query error
      return res.status(500).json({
        error: "An error occurred while querying for receipient information.",
      });
    }

    if (result.length === 0) {
      // If no party with the specified ID is found, return a 404 error
      return res.status(404).json({
        error: "Template not found.",
      });
    }

    // If the query is successful, return all matching party information
    res.status(200).json(result);
  });
});

view_document_ep_router.get("/document/:id/:email", (req, res) => {
  const template_id = req.params.id;
  const email = req.params.email;

  const mainDbQuery1 = `
    SELECT a.*, b.firstname, b.lastname, b.email, b.student_id, b.title, b.age, b.address
    FROM document_container a
    INNER JOIN guest_identity b ON a.document_container_id = b.document_container_id
    WHERE a.document_template_id = ? AND a.identity_id = ?;
  `;

  const mainDbQuery2 = `
    SELECT a.*, b.firstname, b.lastname, b.email, b.student_id, b.title, b.age
    FROM document_container a INNER JOIN identity b ON a.identity_id = b.identity_id
    WHERE a.document_template_id = ? AND b.email = ?;
  `;

  const sensitiveDbQuery = `
    SELECT signature
    FROM signature_sensitive
    WHERE document_container_id = ?;
  `;

  let mainDbQueryToExecute;
  let mainDbResults;
  let sensitiveDbResults;

  // Execute the first main database query
  db.query(mainDbQuery1, [template_id, email], (mainDbErr1, mainDbResults1) => {
    if (mainDbErr1) {
      // Handle the error for the first query
      console.error(mainDbErr1);
      res.status(500).send("Error retrieving document information");
      return;
    }

    // If the first query returned results, use it
    if (mainDbResults1.length > 0) {
      mainDbQueryToExecute = mainDbQuery1;
      mainDbResults = mainDbResults1;
    } else {
      // If the first query didn't return results, use the second query
      mainDbQueryToExecute = mainDbQuery2;
    }

    // Execute the main database query (either 1 or 2)
    db.query(mainDbQueryToExecute, [template_id, email], (mainDbErr, mainDbResults) => {
      if (mainDbErr) {
        // Handle the error
        console.error(mainDbErr);
        res.status(500).send("Error retrieving document information");
        return;
      }

      // Execute the sensitive database query for the result
      sensitiveDb.query(sensitiveDbQuery, [mainDbResults[0].document_container_id], (sensitiveDbErr, sensitiveDbResults) => {
        if (sensitiveDbErr) {
          // Handle the error
          console.error(sensitiveDbErr);
          res.status(500).send("Error retrieving signature");
          return;
        }

        // Combine the results from the main database query and sensitive database query
        const combinedResults = {
          documentInfo: mainDbResults[0],
          signature: sensitiveDbResults[0] ? sensitiveDbResults[0].signature : null,
        };

        // Send the combined results back as a response
        res.json(combinedResults);
      });
    });
  });
});



export default view_document_ep_router;
