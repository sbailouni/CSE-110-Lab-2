import './App.css';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 
import { ClickCounter } from "./hooksExercise";
import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './ThemeContext';


function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

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
        <form className="note-form">
          <div><input placeholder="Note Title"></input></div>
          <div><textarea></textarea></div>
          <div>
            <select name="labels" id="note-label">
              <option value="">--Please choose an option--</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div><button type="submit">Create Note</button></div>
        </form>

        <div className="notes-grid">
          {dummyNotesList.map((note) => (
            <div key={note.id} className="note-item" style= {{ background: currentTheme.background, color: currentTheme.foreground}}>
              <div className="notes-header">
                <button onClick={() => toggleFavorite(note.title)}>
                  {favorites.includes(note.title) ? '❤️' : '♡'}
                </button>
                <button>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.label}</p>
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

export default App;
