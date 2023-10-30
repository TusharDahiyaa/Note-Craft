const notesContent = document.querySelector("#notes-container");
const createButton = document.querySelector(".add-note-btn");
let notes = document.querySelectorAll(".input-box");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const noNotes = document.querySelector("#noNotes");

function showNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContent.innerHTML = storedNotes;
  } else {
    notesContent.style.display = "none";
    noNotes.style.display = "block";
  }
}

showNotes();

function updateStorage() {
  const nonEmptyNotes = [];
  notes = document.querySelectorAll(".input-container");
  notes.forEach((note) => {
    if (note.textContent.trim() !== "") {
      nonEmptyNotes.push(note.outerHTML);
    }
  });
  localStorage.setItem("notes", nonEmptyNotes.join(""));
}

function updateNotes() {
  notes = document.querySelectorAll(".input-container");
}

function updateNoNotesMessage() {
  notes = document.querySelectorAll(".input-container");
  if (notes.length === 0) {
    noNotes.style.display = "block"; // Show the message
  } else {
    noNotes.style.display = "none"; // Hide the message
  }
}

notesContent.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const noteDiv = e.target.parentElement; // Get the parent note container
    noteDiv.remove(); // Remove the entire note container
    updateStorage();
    updateNotes();
    updateNoNotesMessage();
  }
});

notesContent.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-box")) {
    e.target.contentEditable = "true"; // Make it editable
    e.target.focus(); // Focus on the editable content
  }
  updateStorage();
  updateNotes();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

createButton.addEventListener("click", () => {
  notesContent.style.display = "grid";
  noNotes.style.display = "none";

  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  let inputTitle = document.createElement("h5");
  inputTitle.className = "input-title";
  inputTitle.setAttribute("contenteditable", "true");
  inputTitle.setAttribute("dataPlaceholder", "Title...");
  inputTitle.addEventListener("focus", function () {
    if (this.textContent === this.getAttribute("dataPlaceholder")) {
      this.textContent = "";
    }
  });

  inputTitle.addEventListener("blur", function () {
    if (this.textContent === "") {
      this.textContent = this.getAttribute("dataPlaceholder");
    }
  });

  let inputBox = document.createElement("p");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  inputBox.setAttribute("dataPlaceholder", "Text here...");
  inputBox.addEventListener("focus", function () {
    if (this.textContent === this.getAttribute("dataPlaceholder")) {
      this.textContent = "";
    }
  });

  inputBox.addEventListener("blur", function () {
    if (this.textContent === "") {
      this.textContent = this.getAttribute("dataPlaceholder");
    }
  });

  let img = document.createElement("img");
  img.src = "./images/delete.png";
  img.setAttribute("contenteditable", "false");

  inputContainer.appendChild(inputTitle);
  inputContainer.appendChild(inputBox);
  inputContainer.appendChild(img);
  notesContent.appendChild(inputContainer);
  inputBox.focus();
  updateNotes();
  updateStorage();
  updateNoNotesMessage();
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  performSearch();
});
updateNotes();

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent the form submission
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  notes.forEach((note) => {
    const noteText = note.textContent.toLowerCase();
    if (noteText.includes(searchTerm)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}
updateNotes();
