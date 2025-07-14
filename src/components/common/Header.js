/**
 * Header-Komponente für die Navigation
 * 
 * Diese Komponente stellt die Hauptnavigation der Anwendung bereit
 * und ist vollständig responsiv für alle Endgeräte optimiert.
 * 
 * Features:
 * - Responsive Bootstrap-Navigation
 * - Aktive Menüpunkte-Hervorhebung
 * - Benutzerinformationen in der Navigation
 * - Mobilfreundliches Hamburger-Menü
 */

import React from 'react';

/**
 * Header-Komponente mit Bootstrap-Navigation
 * 
 * @param {Object} props - Komponenteneigenschaften
 * @param {string} props.currentView - Aktuelle Ansicht
 * @param {Function} props.setCurrentView - Funktion zum Ändern der Ansicht
 * @param {Object} props.user - Benutzerdaten
 */
function Header({ currentView, setCurrentView, user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Logo und Titel */}
        <a className="navbar-brand" href="#" onClick={(e) => e.preventDefault()}>
          <i className="fas fa-graduation-cap me-2"></i>
          IU Community Quiz
        </a>

        {/* Mobile Navigation Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentView === 'quiz' ? 'active' : ''}`}
                onClick={() => setCurrentView('quiz')}
              >
                <i className="fas fa-play me-1"></i>
                Quiz spielen
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentView === 'editor' ? 'active' : ''}`}
                onClick={() => setCurrentView('editor')}
              >
                <i className="fas fa-edit me-1"></i>
                Fragen erstellen
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentView === 'profile' ? 'active' : ''}`}
                onClick={() => setCurrentView('profile')}
              >
                <i className="fas fa-user me-1"></i>
                Profil
              </button>
            </li>
          </ul>

          {/* Benutzerinfo */}
          <div className="navbar-text">
            <i className="fas fa-user-circle me-1"></i>
            Willkommen, {user.name}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
