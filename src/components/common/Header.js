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
 * - Logo-Klick führt zur Startseite
 *
 * UPDATE: Logout-Funktion hinzugefügt
 */

import React from 'react';

/**
 * Header-Komponente mit Bootstrap-Navigation
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {string} props.currentView - Aktuelle Ansicht
 * @param {Function} props.setCurrentView - Funktion zum Ändern der Ansicht
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onLogout - UPDATE: Logout-Funktion
 */
function Header({ currentView, setCurrentView, user, onLogout }) {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* Logo und Titel - Klick führt zur Startseite */}
          <a
              className="navbar-brand"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView('home');
              }}
              style={{ cursor: 'pointer' }}
          >
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
                    className={`nav-link btn btn-link ${currentView === 'home' ? 'active' : ''}`}
                    onClick={() => setCurrentView('home')}
                >
                  <i className="fas fa-home me-1"></i>
                  Home
                </button>
              </li>
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
                    className={`nav-link btn btn-link ${currentView === 'cards' ? 'active' : ''}`}
                    onClick={() => setCurrentView('cards')}
                >
                  <i className="fas fa-layer-group me-1"></i>
                  Kartenverwaltung
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

            {/* UPDATE: Benutzerinfo mit Logout-Button */}
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                <i className="fas fa-user-circle me-1"></i>
                Willkommen, {user.name}
              </span>
              <button
                  className="btn btn-outline-light btn-sm"
                  onClick={onLogout}
                  title="Abmelden"
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default Header;