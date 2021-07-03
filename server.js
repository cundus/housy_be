require("dotenv").config();
const express = require("express");
const route = require("./src/routes/Route");
const PORT = 5000;

const app = express();

app.use(express.json());
app.use("/api/v1", route);

app.listen(PORT, () => {
  console.log("Sudah Tersambung ke PORT:5000 bosku....");
});
