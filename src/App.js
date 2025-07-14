/**
 * Hauptanwendung der IU Quiz Community
 *
 * ERWEITERT: CardManager für kollaborative Kartenverwaltung hinzugefügt
 */

import React, { useState } from 'react';
import QuizMain from './components/quiz/QuizMain';
import UserProfile from './components/user/UserProfile';
import QuestionEditor from './components/admin/QuestionEditor';
import CardManager from './components/admin/CardManager';
import './styles/App.css';

function App() {
    // Zustandsverwaltung für Navigation
    const [currentView, setCurrentView] = useState('home');

    // Mock-Benutzerdaten (in echter App aus Authentication)
    const [user] = useState({
        id: 1,
        name: 'Max Mustermann',
        email: 'max.mustermann@iu-study.org',
        role: 'student',
        courses: ['Informatik', 'BWL'],
        avatar: 'https://via.placeholder.com/40'
    });

    /**
     * Rendert die Hauptnavigation
     */
    const renderNavigation = () => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="#" onClick={() => setCurrentView('home')}>
                    <i className="fas fa-graduation-cap me-2"></i>
                    IU Quiz Community
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                                href="#"
                                onClick={() => setCurrentView('home')}
                            >
                                <i className="fas fa-home me-2"></i>
                                Startseite
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentView === 'quiz' ? 'active' : ''}`}
                                href="#"
                                onClick={() => setCurrentView('quiz')}
                            >
                                <i className="fas fa-play me-2"></i>
                                Quiz spielen
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentView === 'card-manager' ? 'active' : ''}`}
                                href="#"
                                onClick={() => setCurrentView('card-manager')}
                            >
                                <i className="fas fa-layer-group me-2"></i>
                                Kartenverwaltung
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentView === 'editor' ? 'active' : ''}`}
                                href="#"
                                onClick={() => setCurrentView('editor')}
                            >
                                <i className="fas fa-edit me-2"></i>
                                Fragen erstellen
                            </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="rounded-circle me-2"
                                    width="30"
                                    height="30"
                                />
                                {user.name}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => setCurrentView('profile')}
                                    >
                                        <i className="fas fa-user me-2"></i>
                                        Profil
                                    </a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Abmelden
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

    /**
     * Rendert die Startseite
     */
    const renderHome = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="hero-section text-center bg-primary text-white p-5 rounded mb-4">
                        <h1 className="display-4">
                            <i className="fas fa-graduation-cap me-3"></i>
                            IU Quiz Community
                        </h1>
                        <p className="lead">
                            Kollaboratives Lernen durch gemeinsame Quizzes und Kartenverwaltung
                        </p>
                        <div className="mt-4">
                            <button
                                className="btn btn-light btn-lg me-3"
                                onClick={() => setCurrentView('quiz')}
                            >
                                <i className="fas fa-play me-2"></i>
                                Quiz starten
                            </button>
                            <button
                                className="btn btn-outline-light btn-lg me-3"
                                onClick={() => setCurrentView('card-manager')}
                            >
                                <i className="fas fa-layer-group me-2"></i>
                                Karten verwalten
                            </button>
                            <button
                                className="btn btn-outline-light btn-lg"
                                onClick={() => setCurrentView('editor')}
                            >
                                <i className="fas fa-plus me-2"></i>
                                Fragen erstellen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-users fa-3x text-primary mb-3"></i>
                            <h5 className="card-title">Kollaboratives Lernen</h5>
                            <p className="card-text">
                                Arbeiten Sie mit anderen Studierenden zusammen und erstellen Sie
                                gemeinsam Fragenkataloge für verschiedene Fächer.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-layer-group fa-3x text-success mb-3"></i>
                            <h5 className="card-title">Kartenverwaltung</h5>
                            <p className="card-text">
                                Erstellen Sie neue Kategorien und Karten, verwalten Sie bestehende
                                Sammlungen und arbeiten Sie transparent mit anderen zusammen.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-trophy fa-3x text-warning mb-3"></i>
                            <h5 className="card-title">Verschiedene Modi</h5>
                            <p className="card-text">
                                Wählen Sie zwischen Single-Player, kooperativem und kompetitivem
                                Modus je nach Ihren Lernzielen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    /**
     * Rendert den Hauptinhalt basierend auf der aktuellen Ansicht
     */
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return renderHome();
            case 'quiz':
                return <QuizMain user={user} />;
            case 'card-manager':
                return <CardManager user={user} />;
            case 'editor':
                return <QuestionEditor user={user} />;
            case 'profile':
                return <UserProfile user={user} />;
            default:
                return renderHome();
        }
    };

    return (
        <div className="App">
            {renderNavigation()}
            <main>
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <div className="container">
                    <p className="mb-0">
                        © 2024 IU Quiz Community - Kollaboratives Lernen für Studierende
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;