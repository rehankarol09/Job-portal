const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

env.config();

const app = express();
const PORT = env.PORT || 8000;

app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  return res.send("Hello from Job portal");
});
app.use("/api", authRoutes);
app.use("/api",jobRoutes);

mongoose
  .connect("mongodb://localhost:27017")
  .then((res) => console.log("Database Connected"));

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
