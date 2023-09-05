import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const customise_document_ep_router = express.Router();
customise_document_ep_router.use(cors());
customise_document_ep_router.use(express.json());
const macros = new ep_macros();

//no need this route, the data is sent through props from create_document
// customise_document_ep_router.get("/:id", (req, res) => {
//   macros.select("document_template", {where:"document_template_id='"+req.params.id+"'"}, res);
// })

//no need id, just return all the parties from parties
//--> It is temporarily in a different file as it has nothing to do with the template
// customise_document_ep_router.get("/:id/parties", (req, res) => {
//   macros.select("document_parties", {where:"document_template_id='"+req.params.id+"'"}, res);
// })

//no need this route, just need post method
// customise_document_ep_router.get("/:id/configuration", (req, res) => {
//   macros.select("configuration", {where:"document_template_id='"+req.params.id+"'"}, res);
// })

//the :id in param is redundant if u have it in the body
//--> Done
customise_document_ep_router.post("/:id/parties", (req, res) => {
  const { parties_id, parties_approval } = req.body;

  const sql =
    "INSERT INTO document_parties (document_template_id, parties_id, parties_approval) VALUES (?, ?, ?)";

  db.query(
    sql,
    [req.params.id, parties_id, parties_approval], // Use the boolean value directly
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Document parties appended successfully",
        insert_id: result.insertId,
      });
    }
  );
});

customise_document_ep_router.put("/:id/parties", (req, res) => {
  const { parties_id, parties_approval } = req.body;

  const sql =
    "UPDATE document_parties SET parties_id=? parties_approval=? WHERE document_template_id = ?";

  db.query(
    sql,
    [parties_id, parties_approval, req.params.id], // Use the boolean value directly
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Document parties appended successfully",
        insert_id: result.insertId,
      });
    }
  );
});

//the :id in param is redundant if u have it in the body, besides, there are 8 fields in the frontend, u need to add more field in the database if neccessary
// --> Done. The extra fields are meant to be redundant as they are mandatory!

customise_document_ep_router.post("/:id/configuration", (req, res) => {
  const dataArray = req.body;

  const exists_tinyint = (name) => (dataArray.includes(name) ? 1 : 0);

  // Create an object to hold the values for each field
  const fieldValues = {
    student_id: exists_tinyint("student_id"),
    address: exists_tinyint("address"),
    title: exists_tinyint("title"),
    age: exists_tinyint("age"),
    email: exists_tinyint("email"),
  };

  const sql =
    "INSERT INTO configuration (document_template_id, student_id, address, title, age, email) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      req.params.id,
      fieldValues.student_id,
      fieldValues.address,
      fieldValues.title,
      fieldValues.age,
      fieldValues.email,
    ],
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Document configuration appended successfully",
        insert_id: req.params.id,
      });
    }
  );
});

customise_document_ep_router.put("/:id/configuration", (req, res) => {
  const dataArray = req.body;

  const exists_tinyint = (name) => (dataArray.includes(name) ? 1 : 0);

  // Create an object to hold the values for each field
  const fieldValues = {
    student_id: exists_tinyint("student_id"),
    address: exists_tinyint("address"),
    title: exists_tinyint("title"),
    age: exists_tinyint("age"),
    email: exists_tinyint("email"),
  };

  const sql =
    "UPDATE configuration SET student_id=?, address=?, title=?, age=?, email=? WHERE document_template_id=?";
  db.query(
    sql,
    [
      fieldValues.student_id,
      fieldValues.address,
      fieldValues.title,
      fieldValues.age,
      fieldValues.email,
      req.params.id,
    ],
    (err, result) => {
      if (err) return res.send(err);
      return res.json({
        message: "Document configuration edited successfully",
        insert_id: req.params.id,
      });
    }
  );
});

// edit a template (NOT INCREMENT IT)

customise_document_ep_router.put("/:id", (req, res) => {
  const { type, title, content, parties_number, created_date } = req.body;
  const id = req.params.id;

  {
    // Insert the new template
    const insertQuery =
      "UPDATE document_template SET type=?, title=?, content=?, parties_number=?, created_date=? WHERE document_template_id=?";

    db.query(
      insertQuery,
      [type, title, content, parties_number, created_date, id],
      (insert_err, insert_result) => {
        if (insert_err) {
          return res.send(insert_err);
        }

        return res.json({
          message: "Template edited successfully",
        }); // Return the new ID
      }
    ); // end of second query
  }
});

// fork a template (do increment it)

customise_document_ep_router.post("/template", (req, res) => {
  const { type, title, content, parties_number, created_date } = req.body;

  // Query to get the latest version with the given type
  const getLatestVersion =
    "SELECT version FROM document_template WHERE type = ? ORDER BY version DESC LIMIT 1";

  db.query(
    getLatestVersion,
    [type],
    (latest_version_err, latest_version_result) => {
      if (latest_version_err) {
        return res.status(500).json({
          error: "An error occurred while querying for the latest version.",
        });
      }

      let newNumber = 1; // Initialize the newNumber to 1 as default
      if (latest_version_result.length > 0) {
        const latest_version = latest_version_result[0].version;
        newNumber = (latest_version + 0.1).toFixed(1);
      }

      // Create the new template ID
      const document_template_id = `${type}_${newNumber}`;

      // Insert the new template
      const insertQuery =
  "INSERT INTO document_template (document_template_id, type, title, content, parties_number, created_date, date_modified, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(
        insertQuery,
        [
          document_template_id,
          type,
          title,
          content,
          parties_number,
          created_date,
          created_date,
          newNumber,
        ],
        (insert_err, insert_result) => {
          if (insert_err) {
            return res.status(500).json({
              error: "An error occurred while inserting the template.",
            });
          }

          return res.json({
            message: "Template inserted successfully",
            document_template_id,
          }); // Return the new ID
        }
      ); // end of second query
    }
  ); // end of first query
}); // end of event

export default customise_document_ep_router;
