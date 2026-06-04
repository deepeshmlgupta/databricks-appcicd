const loadSecrets = require("./bootstrap");

(async () => {

    await loadSecrets();

    require("./app");

})();
