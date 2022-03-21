const app = require("./app");
const { port, serverUrl } = require("./src/utility/config");
const PORT = port || 2356;

app.listen(PORT, () => {
    logger.info(`App listening on ${serverUrl}:${PORT}`);
});