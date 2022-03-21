const mongoose = require("mongoose");
const { mongo, env } = require("../src/utility/config");
let client = null;

(async function () {
    try {
        client = await mongoose.connect(mongo.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        //@TODO - On production exit and stop the server if mongodb does not work
        // process.exit(-1);
    }
})();

mongoose.connection
    .once("open", () => {
        logger.info("info", "MongoDB connected successfully");
        console.log("MongoDB connected successfully")
    })
    .on("error", (error) => {
        logger.error(`MongoDB connection error: ${error}`);
        //@TODO - On production exit and stop the server if mongodb does not work
        // process.exit(-1);
    });

if (env === "development") {
    mongoose.set("debug", true);
}
module.exports = client;