/**
 * Footer-Komponente
 * 
 * Diese Komponente stellt den Fußbereich der Anwendung bereit
 * mit wichtigen Links und Informationen.
 * 
 * Features:
 * - Responsive Design
 * - Wichtige Links
 * - Kontaktinformationen
 * - Copyright-Informationen
 */

import React from 'react';

/**
 * Footer-Komponente
 */
function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row">
          {/* Über das System */}
          <div className="col-md-4 mb-3">
            <h5>IU Community Quiz</h5>
            <p className="text-muted">
              Ein kooperatives und kollaboratives Online-Quizsystem 
              zur Unterstützung des Fernstudiums an der IU Internationale Hochschule.
            </p>
          </div>

          {/* Schnelllinks */}
          <div className="col-md-4 mb-3">
            <h5>Schnelllinks</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">Hilfe & Support</a></li>
              <li><a href="#" className="text-muted">Datenschutz</a></li>
              <li><a href="#" className="text-muted">Nutzungsbedingungen</a></li>
              <li><a href="#" className="text-muted">Impressum</a></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="col-md-4 mb-3">
            <h5>Kontakt</h5>
            <p className="text-muted">
              <i className="fas fa-envelope me-2"></i>
              support@iubh-quiz.de
            </p>
            <p className="text-muted">
              <i className="fas fa-phone me-2"></i>
              +49 (0) 2151 822-0
            </p>
            <div className="social-links">
              <a href="#" className="text-muted me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Copyright */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              &copy; 2025 IU Quiz Community. Alle Rechte vorbehalten.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0">
              Entwickelt mit <i className="fas fa-heart text-danger"></i> für Studierende
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
