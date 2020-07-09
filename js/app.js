console.log("Welcome to Notes App");                                //Welcome Message
showNotes();                                                       //Function to display notes
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle") ;
  let notes = localStorage.getItem("notes");                        //Using browsers local storage to store notes 
  if (notes == null) {
    notesObj = [];                                                 //Created an array to get the all notes in form of array 
  } else {
    notesObj = JSON.parse(notes);                                  //parsed all notes to array
  }
  let myobj = {
    title : addTitle.value,
    text : addTxt.value
  }
  notesObj.push(myobj);                                    //pushing the new note to array 
  localStorage.setItem("notes", JSON.stringify(notesObj));        //stored notes to local storage
  addTxt.value = "";
  addTitle.value = "" ;
  showNotes();
});

//Function to display notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ``;
  notesObj.forEach(function (element, index) {                      //Creating cards for each notes 
    html += `
        <div class="noteCard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index + 1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>   
                </div>
            </div>`;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Please add a note`;                        //If there is no notes
  }
}

//function to delete node

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));              //Updating local storage
  showNotes();
}

//Function to search notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function (e) {
  let inputVal = search.value.toLowerCase();                          //getting input from user typed in search box
  let notesCards = document.getElementsByClassName("noteCard");
  Array.from(notesCards).forEach(function (element) {                  //Traversing through all the notes
    let cardText = element.getElementsByTagName('p')[0].innerText;
    if (cardText.includes(inputVal)) {                                     //Checking if typed input is matched by any of notes
      element.style.display = "block";                                      //Showing only if it matches with the typed text
    }
    else {
      element.style.display = "none";                                       //not showing if it failed to match the texts 
    }
  })
})
