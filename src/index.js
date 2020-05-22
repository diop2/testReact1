import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import context from "./context";

import "./styles.css";

// Composant en fin de chaine
// Il reçoit dans ses props le thème et la fonction qui permet de le changer
function ThemeChoice(props) {
  const { theme, updateTheme } = useContext(context);
  const handleChange = event => {
    const value = event.currentTarget.value;
    updateTheme(value);
  };

  return (
    <select name="theme" defaultValue={theme} onChange={handleChange}>
      <option value="dark">Sombre</option>
      <option value="light">Clair</option>
    </select>
  );
}

// Composant en deuxième ligne
// Il reçoit dans ses props le thème et la fonction qui permet de le changer
// Notons qu'en vrai il en a rien à foutre il s'en sert pas lui même
// C'est uniquement pour pouvoir le passer au composant ThemeChoice ...
function ToolBar(props) {
  return (
    <div>
      <button>Zoomer</button>
      <button>Dezoomer</button>
      <ThemeChoice />
    </div>
  );
}

function App() {
  // Le thème est en fait une classe CSS qui englobera notre app
  // Ca change juste le couleur de la typo ...
  const [theme, setTheme] = useState("light");

  const contextValue = {
    theme,
    updateTheme: setTheme
  };

  return (
    <context.Provider value={contextValue}>
      <div className={theme}>
        <ToolBar />
        <p>Theme utilisé : {theme}</p>
      </div>
    </context.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
