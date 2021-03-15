const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const port = 5000;

app.use(fileUpload());

app.post('/upload', (req, res) => {
    console.log('Used');
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(port, () => console.log(`Server Started at port ${port}`));