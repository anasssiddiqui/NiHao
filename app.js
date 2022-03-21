const express = require("express");
const app = express();
// const loadCounters = require("./src/loaders/loadCounters");
const loadAppRoutes = require("./src/loaders/loadAppRoutes");
const loadAppMiddlewares = require("./src/loaders/loadAppMiddlewares");
const loadDatabase = require("./src/loaders/loadDatabase");

/** @description Iniitialise the logger middleware and assign it to global logger variable */
global.logger = require("./logger");

/*** @description - This is to handle all the unhandled rejections so as to prevent fatal crash in case of unhandled rejection */

process.on("unhandledRejection", (error) => {
    logger.error("error", error);
});
app.use(express.static(__dirname + '/public'));

/** @description - This function is used to intitialise all the important components of the App at  the initial run of the app like sequence counters , routes points , init middlewares*/
(function () {
    /** @description Sequence counters Initialisation */
    //  @TODO uncomment before using the counters
    // loadCounters.initilizeCounters();

    /** @description App request parser Initialisation */

    loadAppMiddlewares.initRequestParserMiddlewares({ app, express });

    /** @description App routes Iniitialisation */

    loadAppRoutes.initRoutes({ app });

    /**  @description  App middlewares Initialisation*/

    loadAppMiddlewares.initMiddlewares({ app, express });

    /**  @description   Database Initialisation  */

    loadDatabase.initDatabase();
})();
module.exports = app;