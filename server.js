//list
//folder files dont work
//make files downloadable
//make item delete work
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use(express.static('public'));


const folderList = [];
const fileNameList = [];
const fileUrlList = [];
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
//single file urls
app.post('/addUserInput3', (req, res) => {
  const { userInput } = req.body;
  fileUrlList.push(userInput);
  console.log(fileUrlList);
  res.json({ success: true, message: 'User input added to the server array.' });
});
app.get('/getUserInput3', (req, res) => {
  res.json(fileUrlList);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
