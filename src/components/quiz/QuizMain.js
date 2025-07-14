/**
 * Hauptquiz-Komponente
 *
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt
 * verschiedene Spielmodi bereit (kooperativ, kompetitiv und single-player).
 *
 * ERWEITERT: Single-Player-Modus für individuelles Lernen hinzugefügt
 *
 * Spielmodi:
 * - 'cooperative': Kooperatives Lernen mit anderen Studierenden
 * - 'competitive': Wettbewerbsmodus mit Zeitdruck
 * - 'single-player': Individuelles Lernen ohne Zeitdruck
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
   *
   * @param {string} mode - Spielmodus ('cooperative', 'competitive', 'single-player')
   */
  const startModeSelection = (mode) => {
    console.log('Modus ausgewählt:', mode);
    setGameMode(mode);
    setCurrentStep('category');
  };

  /**
   * Behandelt die Kategorieauswahl - Schritt 2
   *
   * @param {Object} category - Ausgewählte Kategorie
   * @param {Array} filteredQuestions - Gefilterte Fragen für diese Kategorie
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
   * Verarbeitet eine Antwort - Unterstützt alle Spielmodi
   *
   * @param {Object} answer - Antwortdaten mit selectedAnswer, isCorrect, timeTaken, questionId
   */
  const handleAnswer = (answer) => {
    console.log('Antwort erhalten:', answer);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Verzögerung für bessere UX (Zeit für Erklärung zu lesen)
    // Single-Player-Modus hat längere Verzögerung für entspanntes Lernen
    const delay = gameMode === 'single-player' ? 2000 : 1500;

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        console.log('Weiterleitung zur nächsten Frage:', currentQuestionIndex + 1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log('Quiz beendet - zeige Ergebnisse');
        setShowResults(true);
        setCurrentStep('results');
      }
    }, delay);
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

  /**
   * Gibt den angezeigten Spielmodus-Text zurück
   *
   * @returns {string} Anzeigename des Spielmodus
   */
  const getGameModeDisplayName = () => {
    switch (gameMode) {
      case 'cooperative':
        return 'Kooperativer';
      case 'competitive':
        return 'Kompetitiver';
      case 'single-player':
        return 'Single-Player';
      default:
        return 'Unbekannter';
    }
  };

  // Schritt 1: Spielmodus-Auswahl anzeigen
  if (currentStep === 'mode') {
    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10">
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
                    {/* Single-Player-Modus */}
                    <div className="col-md-4 mb-3">
                      <div className="card h-100 border-primary">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">
                            <i className="fas fa-user me-2"></i>
                            Single-Player
                          </h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            Lernen Sie in Ihrem eigenen Tempo. Perfekt für
                            individuelles Studium und Wiederholung von Lernstoff.
                            Keine Zeitbegrenzung, kein Wettbewerb.
                          </p>
                          <ul className="list-unstyled">
                            <li><i className="fas fa-check text-primary me-2"></i>Individuelles Lernen</li>
                            <li><i className="fas fa-check text-primary me-2"></i>Kein Zeitdruck</li>
                            <li><i className="fas fa-check text-primary me-2"></i>Entspanntes Tempo</li>
                            <li><i className="fas fa-check text-primary me-2"></i>Fokus auf Verstehen</li>
                          </ul>
                        </div>
                        <div className="card-footer">
                          <button
                              className="btn btn-primary w-100"
                              onClick={() => startModeSelection('single-player')}
                          >
                            <i className="fas fa-arrow-right me-2"></i>
                            Alleine spielen
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Kooperativer Modus */}
                    <div className="col-md-4 mb-3">
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
                            <li><i className="fas fa-check text-success me-2"></i>Teamarbeit</li>
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
                    <div className="col-md-4 mb-3">
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
                            <li><i className="fas fa-check text-warning me-2"></i>Schnelligkeit</li>
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

                  {/* Informationsbereich für Spielmodi */}
                  <div className="card bg-light mt-4">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="fas fa-info-circle me-2"></i>
                        Spielmodi im Überblick
                      </h6>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="text-center">
                            <i className="fas fa-user fa-2x text-primary mb-2"></i>
                            <h6>Single-Player</h6>
                            <small className="text-muted">
                              Ideal für Prüfungsvorbereitung und Selbststudium
                            </small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <i className="fas fa-users fa-2x text-success mb-2"></i>
                            <h6>Kooperativ</h6>
                            <small className="text-muted">
                              Perfekt für Lerngruppen und gemeinsames Verstehen
                            </small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <i className="fas fa-trophy fa-2x text-warning mb-2"></i>
                            <h6>Kompetitiv</h6>
                            <small className="text-muted">
                              Für Wettkampf und Leistungsvergleich
                            </small>
                          </div>
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
                      {getGameModeDisplayName()} Modus
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