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

//this route is not needed
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

//this route is not needed
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

//this route is not needed
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

export default createdocument_ep_router;
