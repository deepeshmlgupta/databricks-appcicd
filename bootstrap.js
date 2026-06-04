const fs = require("fs");

async function loadSecrets() {

    const scope = process.env.SECRET_SCOPE;
    const token = process.env.DATABRICKS_PAT;
    const host = process.env.DATABRICKS_HOST;

    const keys = [
        "CLIENT_ID",
        "TEST_SECRET",
        "COSMOS_AUTH_KEY",
        "AZURE_CLIENT_SECRET"
    ];

    for (const key of keys) {

        // fetch secret from Databricks Secret Scope
        const value = await getSecretValue(key);

        process.env[key] = value;
    }
}

module.exports = loadSecrets;
