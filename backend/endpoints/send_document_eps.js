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

  const query =
    `SELECT identity.email AS combined_column
    FROM document_container
    INNER JOIN identity ON document_container.identity_id = identity.identity_id
    WHERE document_container.document_template_id = ?
    
    UNION
    
    SELECT document_container.identity_id AS combined_column
    FROM document_container
    WHERE document_container.document_template_id = ?;    
    `;
  db.query(query, [doc_id, doc_id], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      return res.status(500).send("Internal Server Error");
    }

    // Extract the email data into identity_email_list
    for (const row of results) {
      identity_email_list.push(row.combined_column);
    }

    // Now, filter out the emails that already exist in the database
    const remainingEmails = email_list.filter(
      (input_email) => !identity_email_list.includes(input_email)
    );

    // Iterate through the remaining emails
    remainingEmails.forEach((input_email) => {
      // Check if the email exists in the identity table
      const identityQuery = "SELECT identity_id FROM identity WHERE email = ?";
      db.query(
        identityQuery,
        [input_email],
        (identityError, identityResults) => {
          if (identityError) {
            console.error("Error executing identity SQL query:", identityError);
            // Handle the error as needed
          } else if (identityResults.length > 0) {
            const identity_id = identityResults[0].identity_id;
            const issue_date = new Date().toISOString(); // Today's date as an ISO string

            // Insert into the document_container table
            const insertQuery =
              "INSERT INTO document_container (identity_id, document_template_id, issue_date) VALUES (?, ?, ?)";
            db.query(
              insertQuery,
              [identity_id, doc_id, issue_date],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error(
                    "Error executing INSERT SQL query:",
                    insertError
                  );
                  // Handle the error as needed
                } else {
                  console.log("Inserted into document_container");
                  // Continue processing or send a success response if needed
                }
              }
            );
          } else {
            // If the email is not found in the identity table, insert into guest_identity
            const guestInsertQuery =
              `INSERT INTO guest_identity (email)
              VALUES (?)
              ON DUPLICATE KEY UPDATE email = email;`;
            db.query(
              guestInsertQuery,
              [input_email],
              (guestInsertError, guestInsertResults) => {
                if (guestInsertError) {
                  console.error(
                    "Error executing guest INSERT SQL query:",
                    guestInsertError
                  );
                  // Handle the error as needed
                } else {
                  const identity_id = input_email; // Use the email as identity_id
                  const issue_date = new Date().toISOString(); // Today's date as an ISO string

                  // Insert into the document_container table
                  const insertQuery =
                    "INSERT INTO document_container (identity_id, document_template_id, issue_date) VALUES (?, ?, ?)";
                  db.query(
                    insertQuery,
                    [identity_id, doc_id, issue_date],
                    (insertError, insertResults) => {
                      if (insertError) {
                        console.error(
                          "Error executing INSERT SQL query:",
                          insertError
                        );
                        // Handle the error as needed
                      } else {
                        console.log("Inserted into document_container");
                        // Continue processing or send a success response if needed
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
    // Return a response after processing all remaining emails
    res.status(200).json({ message: "Processing completed." });
  });
});

  send_document_ep_router.get("issued/:id", (req, res)=>{
    let sql = "SELECT issue_date FROM document_container WHERE document_template_id = ? ORDER BY issue_date DESC";
    db.query(
      sql,
      [req.params.id],
      (error, result) => {
        if (error) {
          result.status(500).send(error)
        } else {
          result.json(result.data)
        }
      }
      )
  })

export default send_document_ep_router;
