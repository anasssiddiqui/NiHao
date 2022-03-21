require("dotenv").config();

const swaggerDefination = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Ni Hao Api",
        description: "List of Ni Hao Api",
    },
    servers: [{ url: "http://localhost:2356", description: "Local server" }, { url: "https://api.ni-hao-world.com", description: "dev server" }],
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
};

const options = {
    swaggerDefinition: swaggerDefination,
    apis: [
        "./src/routes/v1/*.routes.js",
        "./src/routes/v1/*/*/*.routes.js",
        // "./src/routes/v1/adminsRoutes/*/*.routes.js",

        "./src/models/*.model.js",
    ],
};

/** @description - This is the config object which will contain the environment variables */

const config = {
    baseUrl: process.env.BASE_URL || "",
    env: process.env.NODE_ENV,
    jwtForgotPasswordSecret: process.env.JWT_FORGOT_PASSWORD_SECRET,
    // JWT expiry time in minutes
    jwtExpirationInterval: process.env.JWT_EXPIRATION_INTERVAL,
    jwtSecret: process.env.JWT_SECRET,
    mongo: { uri: process.env.DB_CONNECTION_STRING },
    senderEmail: process.env.SENDER_EMAIL,
    senderEmailPassword: process.env.SENDER_EMAIL_PASSWORD,
    port: process.env.PORT,
    roles: ["admin", "artist", "artist_shop", "client"],
    socketPort: process.env.SOCKET_PORT,
    socketUrl: process.env.SOCKET_URL,
    saltRounds: Number(process.env.SALT_ROUNDS) || 8,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    otpSecret: process.env.OTP_SECRET,
    stripeTestPubKey: process.env.STRIPE_TEST_PUB_KEY,
    stripeTestSecretKey: process.env.STRIPE_TEST_SECRET_KEY,
    stripeLivePubKey: process.env.STRIPE_LIVE_PUB_KEY,
    stripeLiveSecretKey: process.env.STRIPE_LIVE_SECRET_KEY,
    serverUrl: `${process.env.SERVER_URL}`,
    stripeWebhookSecret: process.env.STRIPE_WB_SECRET,
    otpDigits: 4,
    otpPeriod: 300,

    //FIREBASE ENV
    SERVER_KEY:process.env.SERVER_KEY,

    // TWILIO ENV
    ACCOUNT_SID: process.env.ACCOUNT_SID,
    AUTH_TOKEN:process.env.AUTH_TOKEN,
    TWILIO_API_KEY:process.env.TWILIO_API_KEY,

    // AWS ENV
    s3AccessKeyId: process.env.S3ACCESSKEYID,
    bucketName: process.env.BUCKET_NAME,
    s3AccessKey: process.env.S3ACCESSKEY,
    region: process.env.REGION,

    s3BaseUrl: process.env.S3BASE_URL,
    swaggerOptions: options,
    sendGridKey: process.env.SENDGRID_KEY || ""
};

module.exports = config;