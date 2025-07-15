/**
 * Hauptkomponente der IU Quiz-Anwendung
 *
 * UPDATE: Login-System implementiert - Zugriff nur für authentifizierte Benutzer
 * UPDATE: Sichere Authentifizierung mit Input-Validierung
 * UPDATE: Benutzer-Session-Management
 */

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Komponenten-Imports
import LoginForm from './components/auth/LoginForm';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import QuizMain from './components/quiz/QuizMain';
import CardManager from './components/admin/CardManager';
import UserProfile from './components/user/UserProfile';
import dataManager from './data/dataManager';

/**
 * Hauptanwendungskomponente mit Login-Schutz
 */
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [user, setUser] = useState(null); // UPDATE: Benutzer-Zustand für Authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false); // UPDATE: Authentication-Status

    /**
     * UPDATE: Überprüft beim App-Start, ob Benutzer bereits angemeldet ist
     */
    useEffect(() => {
        console.log('App: Initialisiere Anwendung...');

        // Überprüfe lokale Session (localStorage)
        const storedUser = localStorage.getItem('iu_quiz_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log('App: Benutzer-Session gefunden:', parsedUser.name);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('App: Fehler beim Laden der Benutzer-Session:', error);
                localStorage.removeItem('iu_quiz_user');
            }
        }

        // Initialisiere Daten
        const categories = dataManager.getAllCategories();
        const cards = dataManager.getAllCards();
        console.log('App: Geladene Kategorien:', categories.length);
        console.log('App: Geladene Karten:', cards.length);

        if (categories.length === 0 || cards.length === 0) {
            console.log('App: Lade Mock-Daten neu...');
            dataManager.reloadMockData();
        }
    }, []);

    /**
     * UPDATE: Behandelt erfolgreiche Anmeldung
     * @param {Object} userData - Benutzerdaten
     */
    const handleLogin = (userData) => {
        console.log('App: Benutzer angemeldet:', userData.name);
        setUser(userData);
        setIsAuthenticated(true);

        // Speichere Session lokal (in echter App würde dies sicherer erfolgen)
        localStorage.setItem('iu_quiz_user', JSON.stringify(userData));
    };

    /**
     * UPDATE: Behandelt Abmeldung
     */
    const handleLogout = () => {
        console.log('App: Benutzer abgemeldet');
        setUser(null);
        setIsAuthenticated(false);
        setCurrentView('home');

        // Entferne lokale Session
        localStorage.removeItem('iu_quiz_user');
    };

    /**
     * Behandelt Fragen-Events
     */
    const handleQuestionAdded = (question) => {
        console.log('App: Neue Frage hinzugefügt:', question);
    };

    /**
     * Behandelt Kategorie-Events
     */
    const handleCategoryAdded = (category) => {
        console.log('App: Neue Kategorie hinzugefügt:', category);
    };

    /**
     * Rendert die aktuelle Ansicht
     */
    const renderCurrentView = () => {
        switch (currentView) {
            case 'home':
                return <HomePage user={user} onNavigate={setCurrentView} />;
            case 'quiz':
                return <QuizMain user={user} />;
            case 'cards':
                return (
                    <CardManager
                        user={user}
                        onQuestionAdded={handleQuestionAdded}
                        onCategoryAdded={handleCategoryAdded}
                    />
                );
            case 'profile':
                return <UserProfile user={user} onLogout={handleLogout} />;
            default:
                return <HomePage user={user} onNavigate={setCurrentView} />;
        }
    };

    // UPDATE: Zeige Login-Formular für nicht authentifizierte Benutzer
    if (!isAuthenticated || !user) {
        return <LoginForm onLogin={handleLogin} />;
    }

    // Hauptanwendung für authentifizierte Benutzer
    return (
        <div className="App">
            <Header
                currentView={currentView}
                setCurrentView={setCurrentView}
                user={user}
                onLogout={handleLogout}
            />
            <main className="main-content">
                {renderCurrentView()}
            </main>
            <Footer />
        </div>
    );
}

export default App;