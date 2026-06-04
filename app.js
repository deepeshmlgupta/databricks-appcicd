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

// app.get("/apitest", async (req, res) => {

//     try {

//         const host = process.env.DATABRICKS_HOST;
//         const token = process.env.DATABRICKS_PAT;

//         if (!host) {
//             return res.json({
//                 success: false,
//                 error: "DATABRICKS_HOST missing"
//             });
//         }

//         if (!token) {
//             return res.json({
//                 success: false,
//                 error: "DATABRICKS_CLIENT_SECRET missing"
//             });
//         }

//         const apiUrl = `${host}/api/2.0/clusters/list`;

//         const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         const body = await response.text();

//         res.json({
//             success: true,
//             apiUrl,
//             status: response.status,
//             body
//         });

//     } catch (err) {

//         res.json({
//             success: false,
//             error: err.message,
//             stack: err.stack,
//             cause: err.cause ? err.cause.message : null
//         });

//     }

// });

app.get("/secret-scope", async (req, res) => {

    try {

        const host = process.env.DATABRICKS_HOST;
        const token = process.env.DATABRICKS_PAT;

        const response = await fetch(
            `${host}/api/2.0/secrets/scopes/list`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const body = await response.text();

        res.json({
            status: response.status,
            body: JSON.parse(body)
        });

    } catch (err) {

        res.json({
            success: false,
            error: err.message
        });

    }

});

const port = process.env.DATABRICKS_APP_PORT || 8000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
