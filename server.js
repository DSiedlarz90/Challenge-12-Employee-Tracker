//dependencies and imports
const db = require('./db/connection');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const index = require('./routes/index');

//start connection
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});