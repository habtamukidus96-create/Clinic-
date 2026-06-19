import express from "express";
import cors from "cors";
import fs from "fs-extra";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "./db.json";

/* read DB */
function readDB() {
  return fs.readJsonSync(DB_FILE);
}

/* write DB */
function writeDB(data) {
  fs.writeJsonSync(DB_FILE, data);
}

/* BOOK APPOINTMENT */
app.post("/api/appointment", (req, res) => {
  const db = readDB();

  const newAppointment = {
    id: Date.now(),
    ...req.body
  };

  db.appointments.push(newAppointment);
  writeDB(db);

  res.json({ success: true, message: "Appointment saved!" });
});

/* GET APPOINTMENTS (ADMIN) */
app.get("/api/appointments", (req, res) => {
  const db = readDB();
  res.json(db.appointments);
});

/* AI CHATBOT (SMART LOGIC) */
app.post("/api/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let reply = "I can help with booking, doctors, and services.";

  if (msg.includes("hello")) reply = "Hello 👋 Welcome to Mercy Care Clinic!";
  else if (msg.includes("doctor")) reply = "We have general, dental, and pediatric specialists in Addis Ababa.";
  else if (msg.includes("book")) reply = "You can book an appointment from the booking form.";
  else if (msg.includes("emergency")) reply = "Call +251 911 000 000 immediately!";
  else if (msg.includes("price")) reply = "We offer affordable consultation fees.";

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("Clinic Pro running on http://localhost:3000");
});
