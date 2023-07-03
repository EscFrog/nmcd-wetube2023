import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleDBError = (error) => console.log("❌ DB Error - ", error);
const handleDBOpen = () => console.log("✅ Connected to DB");

db.on("error", handleDBError);
db.once("open", handleDBOpen);
