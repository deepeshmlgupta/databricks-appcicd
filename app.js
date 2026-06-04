const express = require("express");

const app = express();

app.get("/", async (req, res) => {

    try {

        const response = await fetch(
            `https://${process.env.DATABRICKS_HOST}/api/2.0/secrets/get`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.DATABRICKS_CLIENT_SECRET}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    scope: "lineage-secret-scope",
                    key: "TEST_SECRET"
                })
            }
        );

        const result = await response.text();

        res.json({
            success: true,
            result
        });

    } catch (err) {

        res.json({
            success: false,
            error: err.message
        });

    }

});

app.listen(process.env.DATABRICKS_APP_PORT || 8000);
