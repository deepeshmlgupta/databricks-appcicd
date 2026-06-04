const express = require("express");

const app = express();

app.get("/", (req, res) => {

    res.json({
        DATABRICKS_HOST: process.env.DATABRICKS_HOST || "NOT_FOUND",

        DATABRICKS_CLIENT_ID_EXISTS:
            !!process.env.DATABRICKS_CLIENT_ID,

        DATABRICKS_CLIENT_SECRET_EXISTS:
            !!process.env.DATABRICKS_CLIENT_SECRET,

        DATABRICKS_APP_NAME:
            process.env.DATABRICKS_APP_NAME || "NOT_FOUND"
    });

});

app.get("/apitest", async (req, res) => {

    try {

        const host = process.env.DATABRICKS_HOST;
        const token = process.env.DATABRICKS_CLIENT_SECRET;

        if (!host) {
            return res.json({
                success: false,
                error: "DATABRICKS_HOST missing"
            });
        }

        if (!token) {
            return res.json({
                success: false,
                error: "DATABRICKS_CLIENT_SECRET missing"
            });
        }

        const response = await fetch(
            `https://${host}/api/2.0/clusters/list`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const body = await response.text();

        res.json({
            success: true,
            status: response.status,
            body: body
        });

    } catch (err) {

        res.json({
            success: false,
            error: err.message,
            stack: err.stack
        });

    }

});

const port = process.env.DATABRICKS_APP_PORT || 8000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
