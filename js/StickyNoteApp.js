export default class StickyNotesApp {
  constructor(root) {
    this.root = root;
    root.innerHTML = StickyNotesApp.getHTML();

    this.elements = {
      btnAddNote : root.querySelector(".btn-add-note")
    };

    this.elements.btnAddNote.addEventListener("click", () => {
      this.addNote();
    });

    const notes = this.getNotes();
    for (const note of notes) {
      const noteElement = this.createNote(note.id, note.content);
      root.insertBefore(noteElement, this.elements.btnAddNote);
    }
  }

  getNotes() {
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
  }

  saveNotes(notes) {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }

  createNote(id, content) {
    const newNote = document.createElement("textarea");
    newNote.classList.add("note");
    newNote.value = content;
    newNote.placeholder = "Empty Sticky Note";

    newNote.addEventListener("change", () => {
      this.updateNote(id, newNote.value);
    });

    newNote.addEventListener("dblclick", () => {
      const doDelete = confirm("Are you sure you want to delete this note?");

      if (doDelete) {
        this.deleteNote(id, newNote);
      }
    });

    return newNote;
  }

  addNote() {
    const allNotes = this.getNotes();
    const newNote = {
      id: Math.floor(Math.random() * 10000000),
      content: ""
    };

    const noteElement = this.createNote(newNote.id, newNote.content);
    this.root.insertBefore(noteElement, this.elements.btnAddNote);

    allNotes.push(newNote);
    this.saveNotes(allNotes);
  }

  updateNote(id, newContent) {
    const notes = this.getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    this.saveNotes(notes);
  }

  deleteNote(id, note) {
    const notes = this.getNotes().filter(note => note.id != id);

    this.saveNotes(notes);
    this.root.removeChild(note);
  }

  static getHTML() {
    return `<button class="btn-add-note" type="button">+</button>`;
  }
}