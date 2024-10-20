import './App.css';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 
import { ClickCounter } from "./hooksExercise";
import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './ThemeContext';

export const StickyNotes = () => {

    const [favorites, setFavorites] = useState<string[]>([]);
    const [currentTheme, setCurrentTheme] = useState(themes.light);
    const [notes, setNotes] = useState(dummyNotesList);
    
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    
    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
    
        if (selectedNote.id === -1) {
        // Create a new note
        const newNote = { ...createNote, id: notes.length + 1 };
        setNotes([newNote, ...notes]);
        } else {
        // Update the selected note
        const updatedNotes = notes.map(note =>
            note.id === selectedNote.id ? { ...createNote } : note
        );
        setNotes(updatedNotes);
        }
    
        // Reset the form states after create/update
        setCreateNote(initialNote);
        setSelectedNote(initialNote);
    };
    
    const editNoteHandler = (note: Note) => {
        setSelectedNote(note);
        setCreateNote(note); // Load note into form for editing
    };
    
    const deleteNoteHandler = (noteId: number) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };
    
    const toggleFavorite = (title: string) => {
        if (favorites.includes(title)) {
        setFavorites(favorites.filter(fav => fav !== title)); // remove from favorites
        } else {
        setFavorites([...favorites, title]); // addd to favorites
        }
    };
    
    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
    
    useEffect(() => {
        console.log("Favorites updated:", favorites);
        document.body.style.backgroundColor = currentTheme.background;
    }, [favorites, currentTheme]);
    
    return (
        <ThemeContext.Provider value={currentTheme}>
        <div className='app-container' style={{background: currentTheme.background, color: currentTheme.foreground}} >
            <form className="note-form" onSubmit={createNoteHandler}>
            <div><input placeholder="Note Title" value={createNote.title}
                onChange={(event) =>
                setCreateNote({...createNote, title: event.target.value})
                }required></input>
            </div>
            <div><textarea placeholder="Note Content" value={createNote.content}
                onChange={(event) =>
                setCreateNote({...createNote, content: event.target.value})}
                required></textarea>
            </div>
            <div>
                <select value={createNote.label} onChange={(event) =>
                setCreateNote({...createNote, label: event.target.value as Label})
                } required>
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
                </select>
            </div>
            <div><button type="submit">
                {selectedNote.id === -1 ? 'Create Note' : 'Update Note'}
            </button></div>
            </form>
    
            <div className="notes-grid">
            {notes.map((note) => (
                <div key={note.id} className="note-item" style= {{ background: currentTheme.background, color: currentTheme.foreground}}>
                <div className="notes-header">
                    <button onClick={() => toggleFavorite(note.title)}>
                    {favorites.includes(note.title) ? '❤️' : '♡'}
                    </button>
                    <button onClick={() => deleteNoteHandler(note.id)}>x</button>
                </div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <p>{note.label}</p>
                <div><button className="edit-button" onClick={() => editNoteHandler(note)}>Edit</button> {/* Edit button */}</div>
                </div>
            ))}
            </div>
            <div>
            <button className="toggle-button" onClick={toggleTheme}>Toggle Theme</button>
            </div>
            <div>
            <h3>List of favorites:</h3>
            <ul>
                {favorites.map((title, index) => (
                <li key={index}>{title}</li>
                ))}
            </ul>
            </div>
        </div>
        </ThemeContext.Provider>
    );
}