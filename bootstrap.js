const fetch = global.fetch;

async function getSecret(key) {

    const response = await fetch(
        `${process.env.DATABRICKS_HOST}/api/2.0/secrets/list?scope=${process.env.SECRET_SCOPE}`,
        {
            headers: {
                Authorization:
                    `Bearer ${process.env.DATABRICKS_PAT}`
            }
        }
    );

    return response;
}

module.exports = getSecret;
