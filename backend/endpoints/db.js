import mysql from "mysql";

const db = mysql.createConnection({
    host: "database-2.co8ctu949l8t.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Paperwork-123",
    database: "paperwork_project",
  });

  export default db;

