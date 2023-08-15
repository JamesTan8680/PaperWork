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

export default createdocument_ep_router;
