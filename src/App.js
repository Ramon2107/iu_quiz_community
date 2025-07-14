/**
 * Hauptkomponente der Quiz-Anwendung
 *
 * Diese Komponente orchestriert die gesamte Anwendung und verwaltet
 * den globalen Zustand sowie die Navigation zwischen verschiedenen
 * Ansichten des Quiz-Systems.
 *
 * Funktionalitäten:
 * - Verwaltung des aktuellen Ansichtszustands
 * - Navigation zwischen Quiz, Frageneditor und Benutzeroberfläche
 * - Responsive Design für alle Endgeräte
 */

import React, { useState } from 'react';
import Header from './components/common/Header';
import QuizMain from './components/quiz/QuizMain';
import QuestionEditor from './components/admin/QuestionEditor';
import UserProfile from './components/user/UserProfile';
import Footer from './components/common/Footer';
import './styles/App.css';

/**
 * App-Komponente - Zentrale Steuerungskomponente
 *
 * State:
 * - currentView: Steuert welche Hauptansicht angezeigt wird
 * - user: Benutzerdaten (Mock-Daten für Prototyp)
 */
function App() {
  // Zustandsverwaltung für aktuelle Ansicht
  const [currentView, setCurrentView] = useState('quiz');

  // Mock-Benutzerdaten für Prototyp
  const [user] = useState({
    name: 'Max Mustermann',
    email: 'max.mustermann@iubh.de',
    studiengang: 'Informatik',
    semester: 3
  });

  /**
   * Rendert die entsprechende Komponente basierend auf currentView
   *
   * @returns {JSX.Element} Die zu rendernde Komponente
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case 'quiz':
        return <QuizMain user={user} />;
      case 'editor':
        return <QuestionEditor user={user} />;
      case 'profile':
        return <UserProfile user={user} />;
      default:
        return <QuizMain user={user} />;
    }
  };

  return (
      <div className="App">
        {/* Kopfbereich mit Navigation */}
        <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            user={user}
        />

        {/* Hauptinhalt - dynamisch basierend auf currentView */}
        <main className="main-content">
          {renderCurrentView()}
        </main>

        {/* Fußbereich */}
        <Footer />
      </div>
  );
}

export default App;