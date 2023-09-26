// List:
//Save uploaded folder files

//clock
function displayTime() {
  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var amOrPm = "AM";
  if (hour >= 12) {
    amOrPm = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  document.getElementById("clock").innerHTML =
    hour + ":" + min + ":" + sec + " " + amOrPm;
}
setInterval(displayTime, 1000);

//Wait wait(milliseconds);
function wait(milliseconds) {
  const start = new Date().getTime();
  let elapsedTime = 0;

  while (elapsedTime < milliseconds) {
    elapsedTime = new Date().getTime() - start;
  }
}

//Menu stuff
function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }


var filenames = [];
var filenameURL = [];
const loadFile = function(event) {
  const userInput = window.prompt("Enter File Name:");
  if (userInput.length !== 0 && userInput.length < 16) {

    const data = { userInput: userInput };
    fetch('/addUserInput2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      const uploadedFile = event.target.files[0];
      var files = document.getElementById("files");
      const objectURL = URL.createObjectURL(uploadedFile);
      const file = document.createElement("a");
      file.setAttribute('href', objectURL);
      file.setAttribute('download', uploadedFile.name);
      file.innerHTML = "<img src='file.png' width='112px' margin = '0'>"; 
      const whole = document.createElement('div');
      whole.style.width = "175px";
      whole.style.height = "175px";
      whole.style.display = "flex";
      whole.style.flexDirection = "column";      
      whole.style.alignItems = "center";
      whole.style.justifyContent = "center";
      whole.style.marginTop = "11px";
      const label = document.createElement("label");
      label.innerText = userInput;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", removeItem);
      filenameURL.push(uploadedFile.name);
      deleteButton.addEventListener("click", () => {
        deleteFileAndElement(uploadedFile.name)
      });
      
      const data2 = { fileName: uploadedFile.name };
      console.log(uploadedFile.name);
      fetch('/addUserInput6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      });

      files.appendChild(whole);
      whole.style.zIndex = "10";
      whole.appendChild(file);
      whole.appendChild(label);
      whole.appendChild(deleteButton);
      uploadFile2(uploadedFile);
    
  }
  if (userInput.length == 0) {
    alert("Error no text found");
  }
  if (userInput.length > 15) {
    alert("Error too long please try again");
  }
};

function uploadFile2(file) {
  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.text())
  .catch(error => console.error(error));
}


//upload single files on reload

function printFileNames() {
  let i = 0;
  fetch('/getUserInput6')
    .then(response => response.json())
    .then(data => {
      data.forEach(fileNameURL => {
        filenameURL.push(fileNameURL);
      });
      fetch('/list')
    });
  fetch('/getUserInput2')
    .then(response => response.json())
    .then(data => {
      data.forEach(fileName => {
        filenames.push(fileName);
      });
      fetch('/list')
    .then(response => response.json())
    .then(files => {
        files.forEach(file => {
            
          let file2 = document.createElement("a");
          var files = document.getElementById("files");
          file2.href = `/uploads/${filenameURL[i]}`;
          file2.setAttribute('download', `/uploads/${filenameURL[i]}`);
          file2.innerHTML = "<img src='file.png' width='112px' margin = '0'>"; 
          const whole = document.createElement('div');
          whole.style.width = "175px";
          whole.style.height = "175px";
          whole.style.display = "flex";
          whole.style.flexDirection = "column";      
          whole.style.alignItems = "center";
          whole.style.justifyContent = "center";
          whole.style.marginTop = "11px";
          const label = document.createElement("label");
          label.innerText = filenames[i];
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", removeItem);
          const filenameURL1 = filenameURL[i];
          deleteButton.addEventListener("click", () => {
            deleteFileAndElement(filenameURL1);
          });
  
          files.appendChild(whole);
          whole.style.zIndex = "10";
          whole.appendChild(file2);
          whole.appendChild(label);
          whole.appendChild(deleteButton);
          i++;
            
        });
    })
    .catch(error => console.error(error));

        
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
var h = 0;
function deleteFileAndElement(fileName) {
  if (h == 1){
    h = 0;
  const userConfirmed = confirm("Are you sure?");

  if (userConfirmed) {
    fetch(`/delete/${fileName}`, {
      method: 'DELETE',
    })
    .then(response => response.text())
    .then(message => {
      // alert(message);
      // Remove the element from the page on successful deletion
      const elementToRemove = document.querySelector(`[data-filename="${fileName}"]`);
      if (elementToRemove) {
        elementToRemove.remove();
      }
    })
    .catch(error => console.error(error));
      }else{
        printFileNames();
        printFolders();
      }
    }
  }
  

function removeItem(){
  const userConfirmed = confirm("Do you want to proceed?");
  if(userConfirmed){
    this.parentNode.remove();
    h = 1;
  }else{
    h = 0;
  }
}

var folderFileNames = [];
var b = 0;
//All Folder Stuff
function dropdown(){
  document.getElementById("myDropdown").classList.toggle("show");
}

function addFile(){
  const whole = document.createElement("div");;
  const deleteButton = document.createElement("button");
  const file = document.createElement("a");
  const userInput = window.prompt("Enter File Name:");
  if (userInput.length !== 0 && userInput.length < 16) {
    const uploadButton = document.createElement("input");
    uploadButton.type = "file";
    uploadButton.click();
    uploadButton.addEventListener("change", function () {
    const uploadedFile = uploadButton.files[0];
    const objectURL = URL.createObjectURL(uploadedFile);
    whole.style.display="flex";
    whole.style.justifyContent = "space-between";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", removeItem);
    file.setAttribute("href", objectURL);
    file.setAttribute("download", uploadedFile.name);
    file.innerHTML = userInput;
    file.style.backgroundColor = "#f1f1f1";
    });
    this.parentNode.appendChild(whole);
    whole.appendChild(file);
    file.style.width = "90%";
    whole.appendChild(deleteButton);
  }
  if(userInput.length == 0){
    alert("Error no text found");
      }
  if(userInput.length > 25){
    alert("Error too long please try again");
  }
}

function newFolder() {
  const dropdown1 = document.createElement("div");
  const folderContainer = document.getElementById("files");

  dropdown1.classList = "dropdown-content";
  dropdown1.id = "myDropdown";

  const userInput = window.prompt("Enter Folder Name:");
  const data = { userInput: userInput };
  if (userInput.length !== 0 && userInput.length < 16) {
    
    fetch('/addUserInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the server (if needed)
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    const folder = document.createElement("div");
    folder.classList.add("dropdown");
    folder.style.width = "175px";
    folder.style.height = "175px";
    folder.style.display = "flex";
    folder.style.flexDirection = "column";
    folder.style.alignItems = "center";
    folder.style.justifyContent = "center";
    folder.id = "whole";

    const uploadButton = document.createElement("p");
    uploadButton.textContent = "Upload File";
    uploadButton.style.fontSize = "18px";
    uploadButton.style.color = "white";
    uploadButton.style.backgroundColor = "rgb(88,88,88";
    uploadButton.style.cursor = "pointer";
    uploadButton.style.padding = "5px";
    uploadButton.id = "uploadButton";
    uploadButton.style.textAlign = "center";
    uploadButton.addEventListener("click", addFile);

    const button = document.createElement("button");
    button.style.width = "150px";
    button.style.height = "150px";
    button.style.margin = "0px";
    button.style.background = "url(folder.png)";
    button.style.backgroundSize = "150px";
    button.id = "button";
    
    button.addEventListener("click", function () {
      dropdown1.classList.toggle("show");
    });

    const label = document.createElement("label");
    label.innerText = userInput;

    const closeButton = document.createElement("p");
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", function () {
      dropdown1.classList.remove("show");
    });
    closeButton.style.textAlign = "center";
    closeButton.style.cursor = "pointer";
    
    const delBut = document.createElement("button");
    delBut.textContent = "Delete";
    delBut.addEventListener("click", removeFolder);
    const folderName = userInput;
          delBut.addEventListener("click", () => {
            deleteFolderAndElement(folderName);
          });

    folderContainer.appendChild(folder);
    folder.style.zIndex = "0";
    dropdown1.style.maxHeight = "150px";
    folder.appendChild(button);
    folder.appendChild(label);
    folder.appendChild(delBut);
    folder.appendChild(dropdown1);
    dropdown1.appendChild(uploadButton);
    dropdown1.appendChild(closeButton);
    
  } else if (userInput.length == 0) {
    alert("Error: no text found");
  } else if (userInput.length > 15) {
    alert("Error: too long, please try again");
  }
}
function printFolders(){
  fetch('/getUserInput')
  .then(response => response.json())
  .then(data => {
    data.forEach(folderNames => {
      const dropdown1 = document.createElement("div");
      const folderContainer = document.getElementById("files");
    
      dropdown1.classList = "dropdown-content";
      dropdown1.id = "myDropdown";
        const folder = document.createElement("div");
        folder.classList.add("dropdown");
        folder.style.width = "175px";
        folder.style.height = "175px";
        folder.style.display = "flex";
        folder.style.flexDirection = "column";
        folder.style.alignItems = "center";
        folder.style.justifyContent = "center";
        folder.id = "whole";
    
        const uploadButton = document.createElement("p");
        uploadButton.textContent = "Upload File";
        uploadButton.style.fontSize = "18px";
        uploadButton.style.color = "white";
        uploadButton.style.backgroundColor = "rgb(88,88,88";
        uploadButton.style.cursor = "pointer";
        uploadButton.style.padding = "5px";
        uploadButton.id = "uploadButton";
        uploadButton.style.textAlign = "center";
        uploadButton.addEventListener("click", addFile);
    
        const button = document.createElement("button");
        button.style.width = "150px";
        button.style.height = "150px";
        button.style.margin = "0px";
        button.style.background = "url(folder.png)";
        button.style.backgroundSize = "150px";
        button.id = "button";
        
        button.addEventListener("click", function () {
          dropdown1.classList.toggle("show");
        });
    
        const label = document.createElement("label");
        label.innerText = folderNames;
    
        const closeButton = document.createElement("p");
        closeButton.innerHTML = "Close";
        closeButton.addEventListener("click", function () {
          dropdown1.classList.remove("show");
        });
        closeButton.style.textAlign = "center";
        closeButton.style.cursor = "pointer";
        
        const delBut = document.createElement("button");
        delBut.textContent = "Delete";
        delBut.addEventListener("click", removeFolder);   
        const folderName = folderNames;
          delBut.addEventListener("click", () => {
            deleteFolderAndElement(folderName);
          });
        folderContainer.appendChild(folder);
        folder.style.zIndex = "0";
        dropdown1.style.maxHeight = "150px";
        folder.appendChild(button);
        folder.appendChild(label);
        folder.appendChild(delBut);
        folder.appendChild(dropdown1);
        dropdown1.appendChild(uploadButton);
        dropdown1.appendChild(closeButton);

        //upload files back to folder on reload
        // const whole = document.createElement("div");;
        // const deleteButton = document.createElement("button");
        // const file = document.createElement("a");
        // const uploadedFile = uploadBut.files[0];
        // const objectURL = URL.createObjectURL(uploadedFile);
        // whole.style.display="flex";
        // whole.style.justifyContent = "space-between";
        // deleteButton.textContent = "X";
        // deleteButton.addEventListener("click", removeItem);
        // file.setAttribute("href", folderFileUrl[b]);
        // file.setAttribute("download", uploadedFile.name);
        // file.innerHTML = folderFileNames[b];
        // file.style.backgroundColor = "#f1f1f1";
        // dropdown1.appendChild(whole);
        // whole.appendChild(file);
        // file.style.width = "90%";
        // whole.appendChild(deleteButton);
        b++;
       
    });
  });
}
function deleteFolderAndElement(folderName) {
  if (f == 1){
    f = 0;
  const userConfirmed = confirm("Are you sure?");

  if (userConfirmed) {
    const data = { folderName: folderName };
    fetch(`/deletefolder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .catch(error => console.error(error));
      }else{
        printFileNames();
        printFolders();
      }
    }
  }
  
var f = 0;
  function removeFolder(){
    const userConfirmed = confirm("Do you want to proceed?");
    if(userConfirmed){
      this.parentNode.remove();
      f = 1;
    }else{
      f = 0;
    }
  }


window.onload = function() {
  printFolders();
  printFileNames();
};