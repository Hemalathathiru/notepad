import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (currentNote.id) {
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
    } else {
      const newNote = { ...currentNote, id: Date.now() };
      setNotes([...notes, newNote]);
    }
    setCurrentNote({ id: null, title: '', content: '' });
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleNewNote = () => {
    setCurrentNote({ id: null, title: '', content: '' });
  };

  return (
    <div className="App">
      <header>
        <h1>Notepad App</h1>
        <button onClick={handleNewNote}>New Note</button>
      </header>
      <div className="container">
        <div className="note-list">
          <h2>Notes</h2>
          <ul>
            {notes.map(note => (
              <li key={note.id} onClick={() => handleEditNote(note)}>
                <h3>{note.title || 'Untitled'}</h3>
                <p>{note.content.substring(0, 50)}...</p>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="note-editor">
          <h2>{currentNote.id ? 'Edit Note' : 'New Note'}</h2>
          <input
            type="text"
            placeholder="Note Title"
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          />
          <textarea
            placeholder="Write your note here..."
            value={currentNote.content}
            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
          />
          <button onClick={handleSaveNote}>{currentNote.id ? 'Update' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
