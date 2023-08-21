import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const createdocument_ep_router = express.Router();
createdocument_ep_router.use(cors());
createdocument_ep_router.use(express.json());
const macros = new ep_macros();

createdocument_ep_router.get("/default-templates", (req, res) => {
  const query =
    "SELECT type, title, content FROM document_default_template";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const dataArray = [];
    let idCounter = 1; // Initialize the counter at 1

    results.forEach((result) => {
      const dataObject = {
        id: idCounter++, // Increment the counter and assign it as id
        docTitle: result.title,
        template: {
          type: result.type,
          term: result.content,
        },
        defaultTemplate: {
          type: `${result.type} (Default Template)`,
          term: "",
        },
      };

      dataArray.push(dataObject);
    });

    res.json(dataArray);
  });
});

createdocument_ep_router.get("/variables/:type", (req, res) => {
  const type = req.params.type;
  const query =
    "SELECT id, var_name, var_hint FROM document_default_template_variables WHERE type = ?";

  db.query(query, [type], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred while fetching data." });
    }

    return res.json(result);
  });
});

createdocument_ep_router.post("/variables", (req, res) => {
  const { type, var_name, var_hint } = req.body;

  const query =
    "INSERT INTO document_default_template_variables (type, var_name, var_hint) VALUES (?, ?, ?)";

  db.query(query, [type, var_name, var_hint], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred while inserting the variable." });
    }

    return res.json({ message: "Variable inserted successfully" });
  });
});

createdocument_ep_router.delete("/variables/:id", (req, res) => {
  const varId = req.params.id;

  const query = "DELETE FROM document_default_template_variables WHERE id = ?";

  db.query(query, [varId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred while deleting the variable." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Variable not found" });
    }

    return res.json({ message: "Variable deleted successfully" });
  });
});


createdocument_ep_router.post("/template", (req, res) => {
  const { type, title, content, parties_number, created_date, var_list } = req.body;

  // Query to get the latest version with the given type
  const getLatestVersion =
    "SELECT version FROM document_template WHERE type = ? ORDER BY version DESC LIMIT 1";

  db.query(getLatestVersion, [type], (latest_version_err, latest_version_result) => {
    if (latest_version_err) {
      return res.status(500).json({ error: "An error occurred while querying for the latest version." });
    }

    let newNumber = 1; // Initialize the newNumber to 1 as default
    if (latest_version_result.length > 0) {
      const latest_version = latest_version_result[0].version;
      newNumber = latest_version + 1; // Increment the latest version to get the new number
    }

    // Create the new template ID
    const document_template_id = `${type}_${newNumber}`;

    // Insert the new template
    const insertQuery =
    "INSERT INTO document_template (document_template_id, type, title, content, parties_number, created_date, var_list, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      insertQuery,
      [document_template_id, type, title, content, parties_number, created_date, JSON.stringify(var_list), newNumber],
      (insert_err, insert_result) => {
        if (insert_err) {
          return res.status(500).json({ error: "An error occurred while inserting the template." });
        }
        
        return res.json({ message: "Template inserted successfully", document_template_id }); // Return the new ID
      }
    );
  });
});


export default createdocument_ep_router;
