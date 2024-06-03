const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(fileUpload());

const ALLOWED_EXTENSIONS = /png|jpg|jpeg|gif|pdf/;

function isValidFile(fileName) {
    const extName = ALLOWED_EXTENSIONS.test(path.extname(fileName).toLowerCase());
    const mimeType = ALLOWED_EXTENSIONS.test(fileName);
    return extName && mimeType;
}

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;
    
    if (!isValidFile(sampleFile.name)) {
        return res.status(400).send('Invalid file type.');
    }

    let safeFileName = path.basename(sampleFile.name);
    let uploadPath = path.join(__dirname, 'uploads', safeFileName);

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error occurred.');
        }
        res.send('File uploaded!');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
