const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    CLIENT_ID: process.env.CLIENT_ID || "NOT_FOUND",
    TEST_SECRET: process.env.TEST_SECRET || "NOT_FOUND",
    BACKEND_SECRET: process.env.BACKEND_SECRET || "NOT_FOUND",
    DATABRICKS_HOST: process.env.DATABRICKS_HOST || "NOT_FOUND",
    DATABRICKS_PATH: process.env.DATABRICKS_PATH || "NOT_FOUND"
  });
});

const port = process.env.DATABRICKS_APP_PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
