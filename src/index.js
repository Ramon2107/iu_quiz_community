/**
 * Haupteinstiegspunkt der React-Anwendung
 *
 * Diese Datei ist der zentrale Startpunkt der Anwendung und mountet die
 * App-Komponente in das DOM-Element mit der ID 'root'.
 *
 * Verwendete Technologien:
 * - React 19.1.0 für die Komponentenarchitektur
 * - React DOM für das Rendern in den Browser
 * - Bootstrap für responsives Design
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

/**
 * Erstellt den React Root und rendert die Hauptanwendung
 *
 * Das createRoot API ist die moderne Art, React-Anwendungen zu starten
 * und bietet bessere Performance als das alte render() API.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);