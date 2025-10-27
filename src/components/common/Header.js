/**
 * Responsive Hauptnavigation mit Bootstrap-Integration.
 *
 * @author Projektteam IU Community Quiz
 * @version 1.2.1
 */

import React from 'react';

/**
 * Header - Responsive Hauptnavigation der Anwendung
 *
 * Diese Komponente stellt die Hauptnavigation mit vollständiger
 * Bootstrap-Integration und Responsive-Design für alle Endgeräte bereit.
 *
 * Features:
 * - Responsive Bootstrap-Navigation mit Hamburger-Menü
 * - Aktive Menüpunkte-Hervorhebung zur besseren Orientierung
 * - Benutzerinformationen und Profil-Zugang in der Navigation
 * - Logout-Funktion mit Session-Verwaltung
 * - Community-Zugang für kollaboratives Lernen
 * - Logo-Klick für schnelle Rückkehr zur Startseite
 *
 * @function Header
 * @param {Object} props - Component properties
 * @param {string} props.currentView - Aktuelle Ansicht
 * @param {Function} props.setCurrentView - Funktion zum Ändern der Ansicht
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onLogout - Callback bei Abmeldung
 * @returns {React.ReactElement} Die gerenderte Header-Komponente
 * @example
 * <Header
 *   currentView="home"
 *   setCurrentView={setCurrentView}
 *   user={currentUser}
 *   onLogout={handleLogout}
 * />
 */
function Header({ currentView, setCurrentView, user, onLogout }) {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* Logo und Titel - Klick führt zur Startseite */}
          <button
              className="navbar-brand btn btn-link p-0"
              type="button"
              onClick={() => {
                setCurrentView('home');
              }}
              aria-label="Zur Startseite"
              style={{ cursor: 'pointer' }}
          >
            <i className="fas fa-graduation-cap me-2" aria-hidden="true"></i>
            IU Community Quiz
          </button>

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
                    className={`nav-link btn btn-link ${currentView === 'community' ? 'active' : ''}`}
                    onClick={() => setCurrentView('community')}
                >
                  <i className="fas fa-users me-1"></i>
                  Community
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

            {/* Benutzerinfo mit Logout-Button */}
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