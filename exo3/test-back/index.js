const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // For enabling CORS

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Set up storage for uploaded CV files using Multer
const upload = multer({ dest: 'uploads/' });

app.post('/candidate', upload.single('cv'), (req, res) => {
    const candidateData = req.body;
    const cvFile = req.file;

    if(!candidateData["firstName"]){
        return res.status(400).json({ message: 'firstName is required.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(candidateData["email"])) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    if (!cvFile) {
        return res.status(400).json({ message: 'CV file is required.' });
    }

    fs.writeFileSync('candidate.json', JSON.stringify(candidateData));

    // Store CV file (bonus)
    if (cvFile) {
        fs.renameSync(cvFile.path, 'uploads/' + cvFile.originalname);
    }


    res.status(200).json({ message: 'Data received successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
