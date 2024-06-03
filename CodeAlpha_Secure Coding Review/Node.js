const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;
    sampleFile.mv(path.join(__dirname, 'uploads', sampleFile.name), (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
