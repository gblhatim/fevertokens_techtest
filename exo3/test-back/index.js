const express = require('express');
const multer = require('multer'); 
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const port = 3001;

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/candidate', upload.single('cv'), (req, res) => {
  const candidateData = req.body;
  const cvFile = req.file;

  fs.writeFileSync('candidate.json', JSON.stringify(candidateData));

  if (cvFile) {
    fs.renameSync(cvFile.path, 'uploads/' + cvFile.originalname);
  }

  res.status(200).json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
