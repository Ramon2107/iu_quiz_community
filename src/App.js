/**
 * Hauptanwendungskomponente mit Authentifizierung und Navigation.
 * @namespace App
 * @author Projektteam IU Community Quiz
 * @version 1.0.0
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
import Community from './components/community/Community';
import dataManager from './data/dataManager';

/**
 * App - Hauptanwendungskomponente mit Login-Schutz und Session-Management
 *
 * Diese Komponente steuert den gesamten Anwendungsfluss und implementiert:
 * - Benutzerauthentifizierung mit sicherer Input-Validierung
 * - Session-Management über localStorage
 * - Navigation zwischen verschiedenen Ansichten (Home, Quiz, Community, Admin, Profil)
 * - Zentrale Datenverwaltung und -initialisierung über den dataManager
 * - Responsive Layout-Struktur mit Header, Hauptinhaltsbereich und Footer
 * - Community-Funktionalität mit Kooperationsmodus
 *
 * Das Layout verwendet eine Flexbox-Struktur, bei der der Inhaltsbereich (.main-content)
 * sich automatisch ausdehnt und den Footer nach unten drückt, sodass dieser außerhalb des
 * initialen Sichtbereichs liegt.
 *
 * @function App
 * @memberof App
 * @returns {React.ReactElement} Die gerenderte App-Komponente
 * @example
 * <App />
 */
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Initialisierungs-Effect beim App-Start
     *
     * Prüft ob eine bestehende Benutzer-Session im localStorage existiert
     * und stellt diese wieder her. Zusätzlich wird sichergestellt, dass
     * Mock-Daten geladen sind, falls die Datenbank leer ist.
     *
     * @function useEffect
     * @memberof App
     * @inner
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
     * Handler für erfolgreiche Benutzeranmeldung
     *
     * Speichert die Benutzerdaten im State und localStorage,
     * um die Session über Seitenneuladungen hinweg zu persistieren.
     *
     * @function handleLogin
     * @memberof App
     * @inner
     * @param {Object} userData - Benutzerdaten-Objekt (name, email, role, etc.)
     * @returns {void}
     */
    const handleLogin = (userData) => {
        console.log('App: Benutzer angemeldet:', userData.name);
        setUser(userData);
        setIsAuthenticated(true);

        // Speichere Session lokal (in echter App würde dies sicherer erfolgen)
        localStorage.setItem('iu_quiz_user', JSON.stringify(userData));
    };

    /**
     * Handler für Benutzerabmeldung
     *
     * Entfernt die Benutzerdaten aus dem State und localStorage,
     * setzt den Auth-Status zurück und navigiert zur Home-Seite.
     *
     * @function handleLogout
     * @memberof App
     * @inner
     * @returns {void}
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
     * @memberof App
     */
    const handleQuestionAdded = (question) => {
        console.log('App: Neue Frage hinzugefügt:', question);
    };

    /**
     * Behandelt Kategorie-Events
     * @memberof App
     */
    const handleCategoryAdded = (category) => {
        console.log('App: Neue Kategorie hinzugefügt:', category);
    };

    /**
     * Rendert die aktuelle Ansicht
     * 
     * Die gerenderte Ansicht wird innerhalb des main-content Bereichs angezeigt,
     * welcher sich automatisch ausdehnt, um den verfügbaren Platz zu füllen.
     * Dies sorgt dafür, dass der Footer außerhalb des sichtbaren Bereichs bleibt,
     * bis der Benutzer nach unten scrollt.
     * @memberof App
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
            case 'community':
                return <Community user={user} />;
            default:
                return <HomePage user={user} onNavigate={setCurrentView} />;
        }
    };

    // Zeige Login-Formular für nicht authentifizierte Benutzer
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
            {/* 
              Der Hauptinhaltsbereich verwendet die main-content Klasse,
              die mit flex: 1 0 auto konfiguriert ist, um sich automatisch
              auszudehnen und den verfügbaren Platz zu füllen. Dies sorgt dafür,
              dass der Footer außerhalb des sichtbaren Bereichs bleibt, bis der
              Benutzer nach unten scrollt.
            */}
            <main className="main-content">
                {renderCurrentView()}
            </main>
            <Footer />
        </div>
    );
}

export default App;