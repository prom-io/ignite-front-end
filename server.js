const {config} = require("dotenv");
config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (request, response) => {
    request.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.REACT_APP_PRODUCTION_PORT, () => {
    console.log(`Express server is listening on ${process.env.REACT_APP_PRODUCTION_PORT}`);
});
