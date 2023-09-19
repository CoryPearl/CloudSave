// List:
//Make it save all info using node

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

//All Folder Stuff
function dropdown(){
  document.getElementById("myDropdown").classList.toggle("show");
}

function addFile(){
  const whole = document.createElement("div");;
  const deleteButton = document.createElement("button");
  const file = document.createElement("a");
  const userInput = window.prompt("Enter File Name:");
  const data = { userInput: userInput };
  fetch('/addUserInput4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
  if (userInput.length !== 0 && userInput.length < 16) {
    const uploadButton = document.createElement("input");
    uploadButton.type = "file";
    uploadButton.click();
    uploadButton.addEventListener("change", function () {
    const uploadedFile = uploadButton.files[0];
    const objectURL = URL.createObjectURL(uploadedFile);
    const data2 = { objectURL: objectURL };
    fetch('/addUserInput5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data2),
    })
      .then(response => response.json())
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
    delBut.addEventListener("click", removeItem);

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

var loadFile = function(event) {
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

      files.appendChild(whole);
      whole.style.zIndex = "10";
      whole.appendChild(file);
      whole.appendChild(label);
      whole.appendChild(deleteButton);
      const data2 = { userInput: objectURL };
      fetch('/addUserInput3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      })
        .then(response => response.json())


  }
  if (userInput.length == 0) {
    alert("Error no text found");
  }
  if (userInput.length > 15) {
    alert("Error too long please try again");
  }
};
var objectURL = [];
function printFileNames() {
  let i = 0;
  fetch('/getUserInput3')
  .then(response => response.json())
  .then(data => {
    data.forEach(urlNames => {
      objectURL.push(urlNames);
    })
  });
  fetch('/getUserInput2')
    .then(response => response.json())
    .then(data => {
      data.forEach(fileName => {
        let file = document.createElement("a");
        var files = document.getElementById("files");
        file.setAttribute('href', objectURL[i]);
        file.setAttribute('download', fileName);
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
        label.innerText = fileName;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", removeItem);

        files.appendChild(whole);
        whole.style.zIndex = "10";
        whole.appendChild(file);
        whole.appendChild(label);
        whole.appendChild(deleteButton);
        i++;
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function removeItem(){
  const userInput = window.prompt("Type Y to delete or N to cancel");
  if(userInput == "y" || userInput == "Y"){
    this.parentNode.remove();
  }
}

var folderFileUrl = [];
var folderFileNames = [];
var b = 0;
function printFolders(){
  fetch('/getFolderFileUrl')
  .then(response => response.json())
  .then(data => {
    data.forEach(urlNames => {
      folderFileUrl.push(urlNames);
    })
  });
  fetch('/getFolderFiles')
        .then(response => response.json())
        .then(data => {
          data.forEach(fileNames => {
            folderFileNames.push(fileNames);
          });
        });
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
        delBut.addEventListener("click", removeItem);
    
        folderContainer.appendChild(folder);
        folder.style.zIndex = "0";
        dropdown1.style.maxHeight = "150px";
        folder.appendChild(button);
        folder.appendChild(label);
        folder.appendChild(delBut);
        folder.appendChild(dropdown1);
        dropdown1.appendChild(uploadButton);
        dropdown1.appendChild(closeButton);
        
        const whole = document.createElement("div");;
        const deleteButton = document.createElement("button");
        const file = document.createElement("a");
        // const uploadedFile = uploadBut.files[0];
        // const objectURL = URL.createObjectURL(uploadedFile);
        whole.style.display="flex";
        whole.style.justifyContent = "space-between";
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", removeItem);
        file.setAttribute("href", folderFileUrl[b]);
        // file.setAttribute("download", uploadedFile.name);
        file.innerHTML = folderFileNames[b];
        file.style.backgroundColor = "#f1f1f1";
        dropdown1.appendChild(whole);
        whole.appendChild(file);
        file.style.width = "90%";
        whole.appendChild(deleteButton);
        b++;
       
    });
  });
}

window.onload = function() {
  printFolders();
  printFileNames();
};