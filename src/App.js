/**
 * Hauptkomponente der IUBH Quiz-Anwendung
 *
 * UPDATE: Home-Seite als Entry-Point hinzugefügt
 */

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Komponenten-Imports
import Header from './components/common/Header';
import HomePage from './components/home/HomePage';
import QuizMain from './components/quiz/QuizMain';
import CardManager from './components/admin/CardManager';
import UserProfile from './components/user/UserProfile';
import dataManager from './data/dataManager';

function App() {
    const [currentView, setCurrentView] = useState('home'); // GEÄNDERT: 'home' als Standard
    const [user] = useState({
        id: 'user123',
        name: 'Max Mustermann',
        email: 'max.mustermann@iu-study.org',
        studyProgram: 'Informatik',
        semester: 3,
        joinDate: '2024-01-15'
    });

    // Initialisiere Daten beim App-Start
    useEffect(() => {
        console.log('App: Initialisiere Daten...');
        // DataManager wird automatisch beim Import initialisiert
    }, []);

    const handleQuestionAdded = (question) => {
        console.log('App: Neue Frage hinzugefügt:', question);
        // Hier könnte weitere Logik für neue Fragen stehen
    };

    const handleCategoryAdded = (category) => {
        console.log('App: Neue Kategorie hinzugefügt:', category);
        // Hier könnte weitere Logik für neue Kategorien stehen
    };

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
                return <UserProfile user={user} />;
            default:
                return <HomePage user={user} onNavigate={setCurrentView} />;
        }
    };

    return (
        <div className="App">
            <Header
                currentView={currentView}
                setCurrentView={setCurrentView}
                user={user}
            />
            <main className="main-content">
                {renderCurrentView()}
            </main>
        </div>
    );
}

export default App;