import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";
import view_document_ep_router from "./view_document_eps.js";

const send_document_ep_router = express.Router();
send_document_ep_router.use(cors());
send_document_ep_router.use(express.json());

const macro = new ep_macros();
const generateSearchString = macro.generate_search_string;
const select = macro.select;
const fetch = macro.query;

//get the number and ratio of sign entries of a template
send_document_ep_router.get("/:id/progress", (req, res) => {
  //https://stackoverflow.com/questions/4666042/sql-query-to-get-total-rows-and-total-rows-matching-specific-condition
  //https://stackoverflow.com/questions/1271810/counting-null-and-non-null-values-in-a-single-query
  //https://stackoverflow.com/questions/14962970/sql-query-if-value-is-null-then-return-1
  //select
  //  results:  the total number of the non-null signatures
  //  ratio:    number of approvals divided by the total matches in group (throws 0 if then dividing by zero)
  //from template parties BUT right-joined to AND grouped by ALL templates
  macro.query(
    "SELECT COUNT(CASE WHEN document_parties.document_template_id IS NOT NULL THEN 1 END) as results, CASE WHEN document_parties.document_template_id IS NULL THEN 0 ELSE COUNT(CASE WHEN parties_approval=1 THEN 1 END)/COUNT(*) END AS ratio FROM paperwork_project.document_parties RIGHT JOIN paperwork_project.document_template ON document_parties.document_template_id = document_template.document_template_id WHERE document_template.document_template_id='" +
      req.params.id +
      "' GROUP BY document_template.document_template_id",
    res
  );
});

//get all sign entries of a template
send_document_ep_router.get("/:id/signature", (req, res) => {
  macro.select(
    "document_parties",
    { where: "document_template_id='" + req.params.id + "'" },
    res
  );
});
send_document_ep_router.post("/container/:id", (req, res) => {
    const email_list = req.body;
    const doc_id = req.params.id; // Use req.params.id to get the value of ":id" in the route
    const identity_email_list = [];
  
    // Check if email_list is an array
    if (!Array.isArray(email_list)) {
      return res.status(400).send("email_list is not provided as an array.");
    }
  
    // First, retrieve the identity emails
    const query = "SELECT identity_id, email FROM identity";
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).send("Internal Server Error");
      }
  
      // Extract the email and identity data into identity_email_list
      for (const row of results) {
        identity_email_list.push({ identity: row.identity_id, email: row.email });
      }
  
      // Now, iterate through email_list and perform INSERT queries
      for (const input_email of email_list) {
        // Check if input_email exists in identity_email_list
        const matchingIdentity = identity_email_list.find(
          (identityEmail) => identityEmail.email === input_email
        );
  
        if (matchingIdentity) {
            // Define the issue_date value (you may need to replace this with the actual date)
            const issue_date = new Date().toISOString(); // Example: using the current date as an ISO string
          
            // Perform the INSERT query
            const insertQuery =
              "INSERT INTO document_container (identity_id, document_template_id, issue_date) VALUES (?, ?, ?)";
            db.query(
              insertQuery,
              [matchingIdentity.identity, doc_id, issue_date], // Include the issue_date value
              (insertError, insertResults) => {
                if (insertError) {
                  console.error("Error executing INSERT SQL query:", insertError);
                  res.status(500).send("Internal Server Error");
                } else {
                  console.log("Inserted into document_container");
                  // Continue processing or send a success response if needed
                }
              }
            );
          }
      }
  
      // Send a success response once all INSERTs are done
      res.status(200).send("Emails inserted into document_container successfully.");
    });
  });

export default send_document_ep_router;
