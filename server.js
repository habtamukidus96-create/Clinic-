import express from "express";
import cors from "cors";
import fs from "fs-extra";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "./db.json";

function db() {
  return fs.readJsonSync(DB_FILE);
}

function save(data) {
  fs.writeJsonSync(DB_FILE, data);
}

/* LOGIN / REGISTER CLINIC */
app.post("/api/login", (req, res) => {
  const { email } = req.body;
  const data = db();

  let clinic = data.clinics.find(c => c.email === email);

  if (!clinic) {
    clinic = {
      id: Date.now(),
      name: "New Clinic",
      email,
      appointments: []
    };
    data.clinics.push(clinic);
    save(data);
  }

  res.json({ clinicId: clinic.id });
});

/* BOOK APPOINTMENT */
app.post("/api/:id/book", (req, res) => {
  const data = db();
  const clinic = data.clinics.find(c => c.id == req.params.id);

  clinic.appointments.push({
    id: Date.now(),
    ...req.body
  });

  save(data);
  res.json({ success: true });
});

/* GET DATA */
app.get("/api/:id", (req, res) => {
  const data = db();
  const clinic = data.clinics.find(c => c.id == req.params.id);
  res.json(clinic);
});

/* ADMIN VIEW ALL CLINICS */
app.get("/api/admin/all", (req, res) => {
  res.json(db().clinics);
});

app.listen(3000, () => console.log("SAAS running"));
