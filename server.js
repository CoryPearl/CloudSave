const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const openai = require('openai');

const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use(express.static('public'));


const folderList = [];
const fileNameList = [];
const fileNameListURL = [];
const fileList = [];
const folderFileUrlList = [];
//folder names
app.post('/addUserInput', (req, res) => {
  const { userInput } = req.body;
  folderList.push(userInput);
  console.log(folderList);
  res.json({ success: true, message: 'User input added to the server array.' });
});
app.get('/getUserInput', (req, res) => {
  res.json(folderList);
});
//folder file names
app.post('/addUserInput4', (req, res) => {
  const { userInput } = req.body;
  fileList.push(userInput);
  console.log(fileList);
  res.json({ success: true, message: 'User input added to the server array.' });
});
app.get('/getFolderFiles', (req, res) => {
  res.json(fileList);
});
//folder file urls
app.post('/addUserInput5', (req, res) => {
  const { userInput } = req.body;
  folderFileUrlList.push(userInput);
  console.log(fileList);
  res.json({ success: true, message: 'User input added to the server array.' });
});
app.get('/getFolderFileUrl', (req, res) => {
  res.json(fileList);
});
//single file names
app.post('/addUserInput2', (req, res) => {
  const { userInput } = req.body;
  fileNameList.push(userInput);
  console.log(fileNameList);
  res.json({ success: true, message: 'User input added to the server array.' });
});
app.get('/getUserInput2', (req, res) => {
  res.json(fileNameList);
});
app.post('/addUserInput6', (req, res) => {
  const { fileName } = req.body;
  fileNameListURL.push(fileName);
  console.log(fileNameListURL);
  res.json({ success: true, message: 'User input added to the server array.' });
});
app.get('/getUserInput6', (req, res) => {
  res.json(fileNameListURL);
});

app.use(fileUpload());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Upload route
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;
    const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded successfully.');
    });
});

// List uploaded files
app.get('/list', (req, res) => {
  fs.readdir('uploads', (err, files) => {
      if (err) {
          console.error(err); // Log the error to the console
          return res.status(500).send('Internal Server Error');
      }
      res.json(files);
  });
});


app.delete('/delete/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath);
    res.send('File deleted successfully.');

    const index = fileNameListURL.indexOf(fileName);
        if (index !== -1) {
            fileNameList.splice(index, 1);
        }
    const index1 = fileNameListURL.indexOf(fileName);
    if (index !== -1) {
        fileNameListURL.splice(index1, 1);
    }
  } else {
    res.status(404).send('File not found.');
  }
});

const folderName = 'uploads';
const folderPath = path.join(__dirname, folderName);

if (fs.existsSync(folderPath)) {
  // Get a list of all files and subdirectories in the folder
  const folderContents = fs.readdirSync(folderPath);

  // Loop through the contents of the folder
  for (const content of folderContents) {
      const contentPath = path.join(folderPath, content);

      // Check if the content is a file
      if (fs.statSync(contentPath).isFile()) {
          // Delete the file
          fs.unlinkSync(contentPath);
          console.log(`Deleted file: ${contentPath}`);
      }
  }

  console.log(`Folder "${folderPath}" has been cleared.`);
} else {
  console.error(`Folder "${folderPath}" does not exist.`);
}






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
