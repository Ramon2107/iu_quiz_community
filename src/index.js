/**
 * Haupteinstiegspunkt der React-Anwendung
 *
 * @description Zentrale Startdatei der IU Community Quiz Anwendung
 *
 * Diese Datei ist der zentrale Startpunkt der Anwendung und mountet die
 * App-Komponente in das DOM-Element mit der ID 'root'. Sie lädt alle
 * globalen Styles und initialisiert die React-Anwendung im StrictMode
 * für verbesserte Entwicklererfahrung und Fehlererkennung.
 *
 * Verwendete Technologien:
 * - React 19.1.0 für die Komponentenarchitektur
 * - React DOM 19.1.0 mit createRoot API für optimales Rendering
 * - Bootstrap 5.3 für responsives Design
 * - Font Awesome 6 für Icons
 *
 * StrictMode-Vorteile:
 * - Erkennung unsicherer Lifecycles
 * - Warnung bei veralteten APIs
 * - Erkennung unerwarteter Seiteneffekte
 * - Warnung bei veralteter Context API
 *
 * @author Projektteam IU Community Quiz
 * @version 1.0.0
 * @since 2025-07-15
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
// Font Awesome 6 vollständiges CSS für Icons
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';

/**
 * React Root Container
 *
 * Erstellt den React Root Container und rendert die Hauptanwendung.
 * Das createRoot API ist die moderne Methode (React 18+) für das Rendering
 * und bietet bessere Performance, automatisches Batching und verbesserte
 * Concurrent Features im Vergleich zum veralteten ReactDOM.render().
 *
 * Die Anwendung wird im StrictMode gerendert, um potenzielle Probleme
 * während der Entwicklung frühzeitig zu erkennen.
 *
 * @const {ReactDOMRoot} root

 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Rendert die Haupt-App-Komponente
 *
 * Mountet die App-Komponente im StrictMode in den Root-Container.
 * StrictMode aktiviert zusätzliche Prüfungen und Warnungen nur während
 * der Entwicklung und hat keine Auswirkungen auf die Produktionsversion.
 *
 * @function render
 */
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);