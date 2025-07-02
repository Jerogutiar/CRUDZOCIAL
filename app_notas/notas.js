if (!sessionStorage.getItem("usuarioActivo")) {
  sessionStorage.setItem("usuarioActivo", JSON.stringify({
    email: "yo@correo.com",
    rol: "comun"
  }));
}

// Get the active user from sessionStorage
const user = JSON.parse(sessionStorage.getItem("usuarioActivo"));

// DOM elements
const textarea = document.getElementById("note");
const btnToSave = document.getElementById("btnToSave");
const notesContainer = document.getElementById("notes");

// Load notes on startup
showNotes();

// Event to save a new note
btnToSave.addEventListener("click", () => {
  const text = textarea.value.trim();
  if (text === "") return;

  const newNote = {
    id: Date.now(), // Unique ID
    email: user.email,
    content: text,
    date: new Date().toLocaleString()
  };

  const notes = getNotes();
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));

  textarea.value = "";
  showNotes();
});

// Get notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

//Show notes on screen with inline editing
function showNotes() {
  notesContainer.innerHTML = "";

  const notes = getNotes();
  notes.forEach(note => {
    if (user.rol === "admin" || note.email === user.email) {
      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <p class="note-content">${note.content}</p>
        <small>${note.email} | ${note.date}</small>
        <button class="btn-edit">Editar</button>
        <button class="btn-remove">Eliminar</button>
      `;

      const btnEdit = div.querySelector(".btn-edit");
      const btnRemove = div.querySelector(".btn-remove");
      const pContent = div.querySelector(".note-content");

      btnEdit.addEventListener("click", () => {
        if (btnEdit.textContent === "Editar") {
          // Editing mode
          const textarea = document.createElement("textarea");
          textarea.value = pContent.textContent;
          textarea.style.width = "100%";
          textarea.style.height = "80px";

          div.insertBefore(textarea, pContent);
          div.removeChild(pContent);

          btnEdit.textContent = "Guardar";

          // Cancel button
          const btnToCancel = document.createElement("button");
          btnToCancel.textContent = "Cancelar";
          btnToCancel.className = "btn-cancel";
          btnToCancel.style.marginLeft = "5px";
          btnEdit.insertAdjacentElement('afterend', btnToCancel);

          btnToCancel.addEventListener("click", () => {
            div.insertBefore(pContent, textarea);
            div.removeChild(textarea);
            btnEdit.textContent = "Editar";
            btnToCancel.remove();
          });
        } else {
          //Save changes
          const textarea = div.querySelector("textarea");
          const newText = textarea.value.trim();
          if (newText === "") {
            alert("La nota no puede quedar vacía.");
            return;
          }

          const notes = getNotes();
          const updateNote = notes.find(n => n.id === note.id);
          if (updateNote) {
            if (user.rol !== "admin" && updateNote.email !== user.email) {
              alert("No puedes editar esta nota.");
              return;
            }
            updateNote.content = newText;
            updateNote.date = new Date().toLocaleString();
            localStorage.setItem("notes", JSON.stringify(notes));

            pContent.textContent = newText;
            div.insertBefore(pContent, textarea);
            div.removeChild(textarea);
            btnEdit.textContent = "Editar";

            const btnToCalcel = div.querySelector(".btn-cancel");
            if (btnToCalcel) btnToCalcel.remove();

            div.querySelector("small").textContent = `${updateNote.email} | ${updateNote.date}`;
          }
        }
      });

      btnRemove.addEventListener("click", () => deleteNote(note.id));

      notesContainer.appendChild(div);
    }
  });
}

// Delete a note
function deleteNote(id) {
  let notes = getNotes();
  notes = notes.filter(note => {
    return user.rol === "admin" || note.email === user.email
      ? note.id !== id
      : true;
  });

  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}