/**
 * Hauptquiz-Komponente
 *
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt
 * verschiedene Spielmodi bereit (kooperativ und kompetitiv).
 *
 * KORRIGIERT: Entfernung unnötiger useEffect-Imports
 */

import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import QuizCategorySelector from './QuizCategorySelector';
import { getMockQuestions } from '../../data/mockData';

function QuizMain({ user }) {
  // Zustandsverwaltung für Quiz-Navigation
  const [currentStep, setCurrentStep] = useState('mode');
  const [gameMode, setGameMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Zustandsverwaltung für Quiz-Durchführung
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Startet die Modus-Auswahl - Schritt 1
   */
  const startModeSelection = (mode) => {
    console.log('Modus ausgewählt:', mode);
    setGameMode(mode);
    setCurrentStep('category');
  };

  /**
   * Behandelt die Kategorieauswahl - Schritt 2
   */
  const handleCategorySelect = (category, filteredQuestions) => {
    console.log('Kategorie ausgewählt:', category.name, 'Anzahl Fragen:', filteredQuestions.length);
    setSelectedCategory(category);
    setQuestions(filteredQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setCurrentStep('quiz');
  };

  /**
   * Behandelt die Rückkehr zur Modus-Auswahl
   */
  const handleBackToModeSelection = () => {
    setCurrentStep('mode');
    setGameMode(null);
    setSelectedCategory(null);
    resetQuizState();
  };

  /**
   * Behandelt die Rückkehr zur Kategorie-Auswahl
   */
  const handleBackToCategorySelection = () => {
    setCurrentStep('category');
    resetQuizState();
  };

  /**
   * Setzt den Quiz-Zustand zurück
   */
  const resetQuizState = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setIsLoading(false);
  };

  /**
   * Verarbeitet eine Antwort - KORRIGIERT mit setTimeout
   */
  const handleAnswer = (answer) => {
    console.log('Antwort erhalten:', answer);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Verzögerung für bessere UX (Zeit für Erklärung zu lesen)
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        console.log('Weiterleitung zur nächsten Frage:', currentQuestionIndex + 1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log('Quiz beendet - zeige Ergebnisse');
        setShowResults(true);
        setCurrentStep('results');
      }
    }, 1500); // 1.5 Sekunden Verzögerung
  };

  /**
   * Setzt das komplette Quiz zurück
   */
  const resetQuiz = () => {
    setCurrentStep('mode');
    setGameMode(null);
    setSelectedCategory(null);
    resetQuizState();
  };

  /**
   * Startet ein neues Quiz mit der gleichen Kategorie
   */
  const restartWithSameCategory = () => {
    if (selectedCategory) {
      console.log('Quiz wird mit gleicher Kategorie neu gestartet');
      const allQuestions = getMockQuestions();
      const filteredQuestions = allQuestions.filter(
          question => question.category === selectedCategory.name
      );

      setQuestions(filteredQuestions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowResults(false);
      setCurrentStep('quiz');
    }
  };

  // Schritt 1: Spielmodus-Auswahl anzeigen
  if (currentStep === 'mode') {
    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h2 className="mb-0">
                    <i className="fas fa-play me-2"></i>
                    Quiz-Modus auswählen
                  </h2>
                </div>
                <div className="card-body">
                  <p className="card-text mb-4">
                    Wählen Sie Ihren bevorzugten Spielmodus aus. Im nächsten Schritt können Sie
                    dann die gewünschte Fragensammlung auswählen.
                  </p>

                  <div className="row">
                    {/* Kooperativer Modus */}
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-success">
                        <div className="card-header bg-success text-white">
                          <h5 className="mb-0">
                            <i className="fas fa-users me-2"></i>
                            Kooperativ
                          </h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            Arbeiten Sie zusammen mit anderen Studierenden,
                            um gemeinsam die richtige Antwort zu finden.
                            Diskutieren Sie Lösungsansätze und lernen Sie voneinander.
                          </p>
                          <ul className="list-unstyled">
                            <li><i className="fas fa-check text-success me-2"></i>Gemeinsames Lernen</li>
                            <li><i className="fas fa-check text-success me-2"></i>Diskussion möglich</li>
                            <li><i className="fas fa-check text-success me-2"></i>Weniger Zeitdruck</li>
                          </ul>
                        </div>
                        <div className="card-footer">
                          <button
                              className="btn btn-success w-100"
                              onClick={() => startModeSelection('cooperative')}
                          >
                            <i className="fas fa-arrow-right me-2"></i>
                            Kooperativ spielen
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Kompetitiver Modus */}
                    <div className="col-md-6 mb-3">
                      <div className="card h-100 border-warning">
                        <div className="card-header bg-warning text-dark">
                          <h5 className="mb-0">
                            <i className="fas fa-trophy me-2"></i>
                            Kompetitiv
                          </h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            Treten Sie gegen andere Studierende an und
                            messen Sie Ihr Wissen. Schnelligkeit und
                            Genauigkeit entscheiden über den Sieg.
                          </p>
                          <ul className="list-unstyled">
                            <li><i className="fas fa-check text-warning me-2"></i>Direkter Wettkampf</li>
                            <li><i className="fas fa-check text-warning me-2"></i>Zeitdruck</li>
                            <li><i className="fas fa-check text-warning me-2"></i>Rangliste</li>
                          </ul>
                        </div>
                        <div className="card-footer">
                          <button
                              className="btn btn-warning w-100"
                              onClick={() => startModeSelection('competitive')}
                          >
                            <i className="fas fa-arrow-right me-2"></i>
                            Kompetitiv spielen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Schritt 2: Kategorie-Auswahl anzeigen
  if (currentStep === 'category') {
    return (
        <QuizCategorySelector
            gameMode={gameMode}
            onCategorySelect={handleCategorySelect}
            onBackToModeSelection={handleBackToModeSelection}
        />
    );
  }

  // Ladeanzeige
  if (isLoading) {
    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Laden...</span>
                  </div>
                  <h5>Fragen werden geladen...</h5>
                  <p className="text-muted">
                    Kategorie: {selectedCategory?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Schritt 4: Ergebnisse anzeigen
  if (showResults || currentStep === 'results') {
    return (
        <QuizResults
            answers={answers}
            questions={questions}
            gameMode={gameMode}
            category={selectedCategory}
            user={user}
            onRestart={resetQuiz}
            onRestartSameCategory={restartWithSameCategory}
            onBackToCategories={handleBackToCategorySelection}
        />
    );
  }

  // Schritt 3: Quiz-Frage anzeigen
  if (currentStep === 'quiz' && questions.length > 0) {
    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10">
              {/* Erweiterte Fortschrittsanzeige mit Kategorie-Info */}
              <div className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">
                      <i className="fas fa-gamepad me-2"></i>
                      {gameMode === 'cooperative' ? 'Kooperativer' : 'Kompetitiver'} Modus
                    </h6>
                    <div className="d-flex align-items-center">
                      {/* Kategorie-Info */}
                      <span className={`badge bg-${selectedCategory?.color || 'secondary'} me-2`}>
                      <i className={`fas fa-${selectedCategory?.icon || 'folder'} me-1`}></i>
                        {selectedCategory?.name || 'Alle Kategorien'}
                    </span>
                      {/* Fortschritt */}
                      <span className="badge bg-primary">
                      Frage {currentQuestionIndex + 1} von {questions.length}
                    </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={handleBackToCategorySelection}
                    >
                      <i className="fas fa-arrow-left me-1"></i>
                      Andere Kategorie
                    </button>
                    <small className="text-muted">
                      {selectedCategory?.description}
                    </small>
                  </div>

                  {/* Fortschrittsbalken */}
                  <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                        }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quiz-Frage */}
              <QuizQuestion
                  question={questions[currentQuestionIndex]}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                  gameMode={gameMode}
              />
            </div>
          </div>
        </div>
    );
  }

  // Fallback für den Fall, dass keine Fragen vorhanden sind
  return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="alert alert-warning">
                  <h5>Keine Fragen verfügbar</h5>
                  <p>Für die ausgewählte Kategorie sind keine Fragen verfügbar.</p>
                  <button
                      className="btn btn-primary"
                      onClick={handleBackToCategorySelection}
                  >
                    Zurück zur Kategorieauswahl
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default QuizMain;