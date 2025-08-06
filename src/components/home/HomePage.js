/**
 * Home-Seite - Startseite der Anwendung
 *
 * Diese Komponente stellt die Startseite der IU Community Quiz App bereit
 * und bietet eine Übersicht über die verfügbaren Funktionen.
 *
 * @author Projektteam IU Community Quiz
 * @version 1.2.0
 * @since 2025-07-15
 *
 */

import React, { useState, useEffect } from 'react';
import dataManager from '../../data/dataManager';

/**
 * HomePage-Komponente - Startseite der Anwendung
 * 
 * Diese Komponente zeigt die Startseite mit einer Übersicht der verfügbaren Funktionen,
 * Statistiken und Navigationsmöglichkeiten. Sie dient als zentraler Einstiegspunkt
 * für Benutzer nach der Anmeldung.
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.user - Benutzerdaten des angemeldeten Benutzers
 * @param {Function} props.onNavigate - Callback-Funktion für die Navigation zu anderen Ansichten
 * @returns {JSX.Element} Die gerenderte HomePage-Komponente
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
                {/* Willkommen-Bereich - KORRIGIERT: Icon entfernt und Inhalte mittig ausgerichtet */}
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
                            <i className="fas fa-cards-blank fa-3x text-success mb-3"></i>
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

                {/* Aktueller Benutzer */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-user-circle me-2"></i>
                                Ihr Profil
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>E-Mail:</strong> {user.email}</p>
                                    <p><strong>Studiengang:</strong> {user.studyProgram}</p>
                                    <p><strong>Semester:</strong> {user.semester}</p>
                                    <p className="mb-0"><strong>Dabei seit:</strong> {new Date(user.joinDate).toLocaleDateString('de-DE')}</p>
                                </div>
                                <div className="col-md-4 text-end">
                                    <button
                                        className="btn btn-outline-primary"
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