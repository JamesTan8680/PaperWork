import mysql from "mysql";

//DEBUG LOCAHOST-ONLY MODE !!!
//TODO: Maybe delete me in production
const LOCALHOST_ONLY_MODE = false;
if (LOCALHOST_ONLY_MODE) console.warn("LOCALHOST_ONLY_MODE on!!");

const db = mysql.createConnection(!LOCALHOST_ONLY_MODE ? {
  host: "database-2.co8ctu949l8t.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Paperwork-123",
  database: "paperwork_project"
} : {
  host: "localhost",
  user: "root",
  password: "",
  database: "paperwork_project"
}
);

export default db;

