/**
 * Startseite mit Übersicht über Funktionen und Statistiken.
 * @namespace home_Hompepage
 * @author Projektteam IU Community Quiz
 * @version 1.2.0
 */

import React, { useState, useEffect } from 'react';
import dataManager from '../../data/dataManager';

/**
 * HomePage - Startseite der Anwendung
 *
 * Diese Komponente stellt die Startseite der IU Community Quiz App bereit
 * und bietet eine Übersicht über die verfügbaren Funktionen, Statistiken
 * und Navigationsmöglichkeiten. Sie dient als zentraler Einstiegspunkt
 * für Benutzer nach der Anmeldung.
 *
 * Hauptfunktionen:
 * - Hero-Bereich mit Willkommensnachricht und Schnellzugriff
 * - Statistik-Karten mit Kategorien-, Karten- und Beitragsanzahl
 * - Funktions-Übersicht für Quiz, Kartenverwaltung und Profil
 * - Projekt-Dokumentation mit Technologie-Stack und NPM-Skripten
 * - Aktuelle Benutzerinformationen und Profil-Zugang
 * - Responsive Design für alle Endgeräte
 *
 * @function HomePage
 * @memberOf home_Hompepage
 * @param {Object} props - Component properties
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onNavigate - Callback für Navigation
 * @returns {React.ReactElement} Die gerenderte HomePage-Komponente
 * @example
 * <HomePage user={currentUser} onNavigate={handleNavigate} />
 */
function HomePage({ user, onNavigate }) {
    const [stats, setStats] = useState({
        totalCategories: 0,
        totalCards: 0,
        userCards: 0
    });

    // Lade Statistiken beim Component-Mount
    useEffect(() => {
        const categories = dataManager.getAllCategories();
        const cards = dataManager.getAllCards();
        const userCards = cards.filter(card => card.author === user.name);

        setStats({
            totalCategories: categories.length,
            totalCards: cards.length,
            userCards: userCards.length
        });
    }, [user.name]);

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Willkommen-Bereich - Icon entfernt und Inhalte mittig ausgerichtet */}
                <div className="col-12">
                    <div className="hero-section bg-primary text-white rounded p-5 mb-4">
                        <div className="row align-items-center">
                            <div className="col-12 text-center">
                                <h1 className="display-4">
                                    <i className="fas fa-graduation-cap me-3"></i>
                                    Willkommen beim IU Community Quiz
                                </h1>
                                <p className="lead mb-4">
                                    Testen Sie Ihr Wissen, lernen Sie gemeinsam mit anderen Studierenden
                                    und erstellen Sie eigene Lernkarten für Ihr Studium.
                                </p>
                                <button
                                    className="btn btn-light btn-lg me-3"
                                    onClick={() => onNavigate('quiz')}
                                >
                                    <i className="fas fa-play me-2"></i>
                                    Quiz starten
                                </button>
                                <button
                                    className="btn btn-outline-light btn-lg"
                                    onClick={() => onNavigate('cards')}
                                >
                                    <i className="fas fa-layer-group me-2"></i>
                                    Karten verwalten
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiken */}
                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-layer-group fa-3x text-primary mb-3"></i>
                            <h3 className="card-title">{stats.totalCategories}</h3>
                            <p className="card-text">Verfügbare Kategorien</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-clone fa-3x text-success mb-3"></i>
                            <h3 className="card-title">{stats.totalCards}</h3>
                            <p className="card-text">Gesamt Lernkarten</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-user-edit fa-3x text-warning mb-3"></i>
                            <h3 className="card-title">{stats.userCards}</h3>
                            <p className="card-text">Meine Beiträge</p>
                        </div>
                    </div>
                </div>

                {/* Funktionen-Übersicht */}
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">
                                        <i className="fas fa-play me-2"></i>
                                        Quiz spielen
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        Wählen Sie aus verschiedenen Spielmodi: Single-Player für individuelles Lernen,
                                        Kooperativ für Teamarbeit oder Kompetitiv für den Wettbewerb.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li><i className="fas fa-check text-success me-2"></i>Verschiedene Kategorien</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Konfigurierbare Fragenanzahl</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Detaillierte Erklärungen</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => onNavigate('quiz')}
                                    >
                                        <i className="fas fa-arrow-right me-2"></i>
                                        Zum Quiz
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-0">
                                        <i className="fas fa-layer-group me-2"></i>
                                        Kartenverwaltung
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        Erstellen Sie eigene Lernkarten, verwalten Sie Kategorien und
                                        teilen Sie Ihr Wissen mit der Community.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li><i className="fas fa-check text-success me-2"></i>Eigene Fragen erstellen</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Kategorien verwalten</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Community-Beiträge</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() => onNavigate('cards')}
                                    >
                                        <i className="fas fa-arrow-right me-2"></i>
                                        Karten verwalten
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-header bg-info text-white">
                                    <h5 className="mb-0">
                                        <i className="fas fa-user me-2"></i>
                                        Profil
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        Verwalten Sie Ihr Profil, sehen Sie Ihre Statistiken und
                                        verfolgen Sie Ihren Lernfortschritt.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li><i className="fas fa-check text-success me-2"></i>Persönliche Statistiken</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Lernfortschritt</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Profil-Einstellungen</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-info w-100"
                                        onClick={() => onNavigate('profile')}
                                    >
                                        <i className="fas fa-arrow-right me-2"></i>
                                        Zum Profil
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projekt-Dokumentation */}
                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h5 className="mb-0">
                                <i className="fas fa-book me-2"></i>
                                Projekt-Dokumentation & Informationen
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <h6><i className="fas fa-info-circle me-2 text-primary"></i>Über das Projekt</h6>
                                    <p>
                                        Das <strong>IU Community Quiz</strong> ist eine moderne, responsive Webanwendung
                                        für kooperatives und kollaboratives Online-Lernen. Die Anwendung wurde speziell
                                        für Studierende des Fernstudiums der IUBH entwickelt.
                                    </p>
                                    <h6 className="mt-3"><i className="fas fa-bullseye me-2 text-success"></i>Projektziel</h6>
                                    <p>
                                        Konzeption und prototypische Umsetzung eines Online-Quizsystems, das Studierende
                                        bei der Festigung der Lerninhalte zur Vorbereitung auf Klausuren unterstützt.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6><i className="fas fa-cogs me-2 text-warning"></i>Technologie-Stack</h6>
                                    <ul className="list-unstyled">
                                        <li><i className="fab fa-react me-2 text-info"></i><strong>React</strong> - Moderne Komponentenarchitektur</li>
                                        <li><i className="fab fa-bootstrap me-2 text-primary"></i><strong>Bootstrap 5.3</strong> - Responsive Design</li>
                                        <li><i className="fas fa-icons me-2 text-danger"></i><strong>Font Awesome 6.7</strong> - Icons und Symbole</li>
                                        <li><i className="fas fa-vial me-2 text-success"></i><strong>Cypress & Jest</strong> - Testing Framework</li>
                                    </ul>
                                    <h6 className="mt-3"><i className="fas fa-shield-alt me-2 text-danger"></i>Sicherheitsfeatures</h6>
                                    <ul className="list-unstyled">
                                        <li><i className="fas fa-check text-success me-2"></i>XSS-Schutz für alle Eingaben</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Input-Validierung gegen SQL-Injection</li>
                                        <li><i className="fas fa-check text-success me-2"></i>Sicheres Session-Management</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <h6><i className="fas fa-code me-2 text-info"></i>Verfügbare NPM-Skripte</h6>
                                    <div className="row g-2">
                                        <div className="col-12">
                                            <div className="d-flex align-items-center p-2 bg-light rounded">
                                                <code className="text-primary me-2">npm start</code>
                                                <span className="text-muted small">Entwicklungsserver starten</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center p-2 bg-light rounded">
                                                <code className="text-primary me-2">npm test</code>
                                                <span className="text-muted small">Tests ausführen</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center p-2 bg-light rounded">
                                                <code className="text-primary me-2">npm run docs:serve</code>
                                                <span className="text-muted small">Dokumentation öffnen</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h6><i className="fas fa-book-open me-2 text-primary"></i>Dokumentation</h6>
                                    <p className="mb-3">Die vollständige JSDoc-Dokumentation mit Details zu allen Komponenten und Services:</p>
                                    <a
                                        href="/docs/index.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        <i className="fas fa-external-link-alt me-2"></i>
                                        JSDoc Dokumentation öffnen
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aktueller Benutzer */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="fas fa-user-circle me-2"></i>
                                Ihr Profil
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-3 text-center mb-3 mb-md-0">
                                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '100px', height: '100px'}}>
                                        <i className="fas fa-user fa-3x text-primary"></i>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row g-2">
                                        <div className="col-sm-6">
                                            <small className="text-muted d-block">Name</small>
                                            <strong>{user.name}</strong>
                                        </div>
                                        <div className="col-sm-6">
                                            <small className="text-muted d-block">E-Mail</small>
                                            <strong>{user.email}</strong>
                                        </div>
                                        <div className="col-sm-6">
                                            <small className="text-muted d-block">Studiengang</small>
                                            <strong>{user.studyProgram}</strong>
                                        </div>
                                        <div className="col-sm-6">
                                            <small className="text-muted d-block">Semester</small>
                                            <strong>{user.semester}</strong>
                                        </div>
                                        <div className="col-12">
                                            <small className="text-muted d-block">Dabei seit</small>
                                            <strong>{new Date(user.joinDate).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 text-center text-md-end mt-3 mt-md-0">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => onNavigate('profile')}
                                    >
                                        <i className="fas fa-edit me-2"></i>
                                        Profil bearbeiten
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;