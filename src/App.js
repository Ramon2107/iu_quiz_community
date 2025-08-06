/**
 * Hauptkomponente der IU Quiz-Anwendung
 *
 * UPDATE: Login-System implementiert - Zugriff nur für authentifizierte Benutzer
 * UPDATE: Sichere Authentifizierung mit Input-Validierung
 * UPDATE: Benutzer-Session-Management
 * UPDATE: Community-Funktionalität hinzugefügt (Demo-Prototyp)
 * UPDATE: Verbesserte Layout-Struktur mit automatischer Anpassung des Inhaltsbereichs
 * 
 * Das Layout verwendet eine Flexbox-Struktur, um sicherzustellen, dass der Footer
 * außerhalb des sichtbaren Bereichs bleibt, bis der Benutzer nach unten scrollt.
 * Der Inhaltsbereich (.main-content) dehnt sich automatisch aus, um den verfügbaren
 * Platz zu füllen und den Footer nach unten zu drücken.
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
 * Hauptanwendungskomponente mit Login-Schutz
 * 
 * Diese Komponente steuert den gesamten Anwendungsfluss und verwaltet:
 * - Benutzerauthentifizierung und Session-Management
 * - Navigation zwischen verschiedenen Ansichten
 * - Zentrale Datenverwaltung und -initialisierung
 * - Responsive Layout-Struktur mit Header, Inhaltsbereich und Footer
 *
 * @returns {JSX.Element} Die gerenderte App-Komponente mit entsprechender Ansicht
 * basierend auf dem Authentifizierungsstatus
 */
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Überprüft beim App-Start, ob Benutzer bereits angemeldet ist
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
     * Behandelt erfolgreiche Anmeldung
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
     * Behandelt Abmeldung
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
     * 
     * Die gerenderte Ansicht wird innerhalb des main-content Bereichs angezeigt,
     * welcher sich automatisch ausdehnt, um den verfügbaren Platz zu füllen.
     * Dies sorgt dafür, dass der Footer außerhalb des sichtbaren Bereichs bleibt,
     * bis der Benutzer nach unten scrollt.
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