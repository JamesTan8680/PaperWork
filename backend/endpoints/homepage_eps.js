import express from "express";
import cors from "cors";
import db from "./db.js";

const homepage_ep_router = express.Router();
homepage_ep_router.use(cors());
homepage_ep_router.use(express.json());



homepage_ep_router.get("/documents/total", (req, res) => {
    //write the query for the sql
    const sql = "SELECT count(*) AS 'total' FROM document_default_template";
    db.query(sql, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  homepage_ep_router.get("/documents/most-popular", (req, res) => {
    // Write the query for the SQL
    const sql =
      "SELECT title, COUNT(*) AS count FROM document_template GROUP BY type ORDER BY count DESC LIMIT 1";
    db.query(sql, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  homepage_ep_router.get("/documents/recently-created", (req, res) => {
    const sql =
      "SELECT title, version, DATE_FORMAT(created_date, '%d/%m/%Y') AS date_created FROM document_template ORDER BY created_date DESC LIMIT 5";
  
    db.query(sql, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  homepage_ep_router.get("/notes", (req, res) => {
    // Write the query for the SQL, using DATE_FORMAT to format the date
    const sql =
      "SELECT note_id, DATE_FORMAT(date_created, '%d/%m/%Y') AS date_created, person_created, header, content from notes where is_removed = '0'";
  
    db.query(sql, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  //for update
  homepage_ep_router.put("/notes/:note_id", (req, res) => {
    const noteId = req.params.note_id;
    const { header, content } = req.body;
  
    const sql = "UPDATE notes SET header = ?, content = ? WHERE note_id = ?";
  
    db.query(sql, [header, content, noteId], (err, result) => {
      if (err) return res.send(err);
      return res.json({ message: "Note updated successfully" });
    });
  });
  
  //for delete
  homepage_ep_router.delete("/notes/:note_id", (req, res) => {
    const noteId = req.params.note_id;
  
    const sql = "UPDATE notes SET is_removed = '1' WHERE note_id = ?";
  
    db.query(sql, [noteId], (err, result) => {
      if (err) return res.send(err);
      return res.json({ message: "Note deleted successfully" });
    });
  });
  
  //for insert
  homepage_ep_router.post("/notes", (req, res) => {
    const { date_created, person_created, header, content } = req.body;
  
    const sql =
      "INSERT INTO notes (date_created, person_created, header, content, is_removed) VALUES (?, ?, ?, ?, '0')";
  
    db.query(
      sql,
      [date_created, person_created, header, content],
      (err, result) => {
        if (err) return res.send(err);
        return res.json({
          message: "Note inserted successfully",
          note_id: result.insertId,
        }); 
      }
    );
  });

  export default homepage_ep_router;