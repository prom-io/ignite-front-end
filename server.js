const { config } = require('dotenv');

config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(process.env.REACT_APP_PRODUCTION_PORT, () => {
    console.log(`Express server is listening on ${process.env.REACT_APP_PRODUCTION_PORT}`);
});
