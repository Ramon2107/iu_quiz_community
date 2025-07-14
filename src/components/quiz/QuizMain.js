/**
 * Hauptquiz-Komponente
 *
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt
 * verschiedene Spielmodi bereit (kooperativ, kompetitiv und single-player).
 *
 * UPDATE: Konfigurierbare Anzahl von Fragen (4-20)
 * UPDATE: Verbesserte Benutzeroberfläche für Kartenanzahl-Auswahl
 * UPDATE: "Andere Kategorie wählen" Funktion implementiert
 *
 * UPDATE: Integration mit DataManager statt direktem Import von mockData
 *
 * WICHTIGE ÄNDERUNG: Diese Komponente verwendet jetzt den zentralen DataManager,
 * um konsistente Datenverwendung in der gesamten Anwendung zu gewährleisten.
 * Mock-Daten werden automatisch geladen, wenn localStorage leer ist.
 *
 * Spielmodi:
 * - 'cooperative': Kooperatives Lernen mit anderen Studierenden
 * - 'competitive': Wettbewerbsmodus mit Zeitdruck
 * - 'single-player': Individuelles Lernen ohne Zeitdruck
 */

import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import QuizCategorySelector from './QuizCategorySelector';
import dataManager from '../../data/dataManager'; // KORRIGIERT: Verwendet DataManager statt direkten Import

function QuizMain({ user }) {
  // Zustandsverwaltung für Quiz-Navigation
  const [currentStep, setCurrentStep] = useState('mode');
  const [gameMode, setGameMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10); // NEU: Konfigurierbare Anzahl

  // Zustandsverwaltung für Quiz-Durchführung
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * UPDATE: Lädt Daten über DataManager beim Component-Mount
   *
   * Der DataManager stellt automatisch sicher, dass Mock-Daten geladen werden,
   * wenn localStorage leer ist. Dies gewährleistet eine konsistente Datenquelle.
   */
  useEffect(() => {
    // Force Mock-Daten laden falls localStorage leer ist
    const categories = dataManager.getAllCategories();
    const cards = dataManager.getAllCards();

    console.log('QuizMain: Geladene Kategorien:', categories.length);
    console.log('QuizMain: Geladene Karten:', cards.length);

    // Falls keine Daten vorhanden sind, Mock-Daten neu laden
    if (categories.length === 0 || cards.length === 0) {
      console.log('QuizMain: Lade Mock-Daten neu...');
      dataManager.reloadMockData();
    }
  }, []);

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
   * UPDATE: Verwendet DataManager für Fragenfilterung
   * UPDATE: Berücksichtigt konfigurierbare Anzahl von Fragen
   *
   * @param {Object} category - Ausgewählte Kategorie
   */
  const handleCategorySelect = (category) => {
    console.log('Kategorie ausgewählt:', category.name);
    setSelectedCategory(category);

    // Fragen über DataManager laden
    const allQuestions = dataManager.getQuestionsForQuiz().filter(
        question => question.category === category.name
    );

    // Begrenze die Anzahl der Fragen basierend auf Benutzerauswahl
    const selectedQuestions = allQuestions.slice(0, questionCount);

    console.log('Verfügbare Fragen:', allQuestions.length);
    console.log('Ausgewählte Fragen:', selectedQuestions.length);
    setQuestions(selectedQuestions);
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
    setQuestionCount(10); // Reset question count
    resetQuizState();
  };

  /**
   * Behandelt die Rückkehr zur Kategorie-Auswahl
   * Funktion für "Andere Kategorie wählen" Button
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
    setQuestionCount(10); // Reset question count
    resetQuizState();
  };

  /**
   * Startet ein neues Quiz mit der gleichen Kategorie
   *
   * UPDATE: Verwendet DataManager für Fragenfilterung
   * UPDATE: Berücksichtigt konfigurierbare Anzahl von Fragen
   */
  const restartWithSameCategory = () => {
    if (selectedCategory) {
      console.log('Quiz wird mit gleicher Kategorie neu gestartet');

      // Fragen über DataManager laden
      const allQuestions = dataManager.getQuestionsForQuiz().filter(
          question => question.category === selectedCategory.name
      );

      // Begrenze die Anzahl der Fragen basierend auf Benutzerauswahl
      const selectedQuestions = allQuestions.slice(0, questionCount);

      setQuestions(selectedQuestions);
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
                    dann die gewünschte Fragensammlung und Anzahl der Fragen auswählen.
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
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">
                      <i className="fas fa-layer-group me-2"></i>
                      Kategorie und Einstellungen auswählen
                    </h3>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleBackToModeSelection}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Zurück
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <QuizCategorySelector
                          gameMode={gameMode}
                          onCategorySelect={handleCategorySelect}
                          onBackToModeSelection={handleBackToModeSelection}
                      />
                    </div>
                    <div className="col-md-4">
                      {/* Kartenanzahl-Konfiguration */}
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0">
                            <i className="fas fa-cogs me-2"></i>
                            Quiz-Einstellungen
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label htmlFor="questionCount" className="form-label">
                              Anzahl der Fragen: <strong>{questionCount}</strong>
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id="questionCount"
                                min="4"
                                max="20"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                            />
                            <div className="d-flex justify-content-between">
                              <small className="text-muted">4</small>
                              <small className="text-muted">20</small>
                            </div>
                          </div>

                          {/* Modus-spezifische Einstellungen */}
                          <div className="alert alert-info">
                            <h6>
                              <i className="fas fa-info-circle me-2"></i>
                              {getGameModeDisplayName()} Modus
                            </h6>
                            {gameMode === 'single-player' && (
                                <small>
                                  • Keine Zeitbegrenzung<br/>
                                  • Entspanntes Lernen<br/>
                                  • Fokus auf Verstehen
                                </small>
                            )}
                            {gameMode === 'cooperative' && (
                                <small>
                                  • Teamarbeit möglich<br/>
                                  • Diskussion erlaubt<br/>
                                  • Weniger Zeitdruck
                                </small>
                            )}
                            {gameMode === 'competitive' && (
                                <small>
                                  • Zeitdruck vorhanden<br/>
                                  • Direkter Wettkampf<br/>
                                  • Schnelligkeit zählt
                                </small>
                            )}
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

  // Schritt 3: Quiz-Durchführung
  if (currentStep === 'quiz' && !showResults) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-10">
              {/* Header mit Fortschrittsanzeige */}
              <div className="card mb-4">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="mb-0">
                        <i className="fas fa-gamepad me-2"></i>
                        {getGameModeDisplayName()} Quiz
                      </h3>
                      <small className="text-muted">
                        Kategorie: {selectedCategory?.name} • {questions.length} Fragen
                      </small>
                    </div>
                    <div>
                      <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={handleBackToCategorySelection}
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Zurück zur Auswahl
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="progress mb-2">
                    <div
                        className="progress-bar"
                        style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Frage {currentQuestionIndex + 1} von {questions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Aktuelle Frage */}
              <QuizQuestion
                  question={currentQuestion}
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

  // Schritt 4: Ergebnisse anzeigen
  if (currentStep === 'results') {
    return (
        <QuizResults
            answers={answers}
            questions={questions}
            gameMode={gameMode}
            categoryName={selectedCategory?.name}
            onRestart={resetQuiz}
            onRestartSameCategory={restartWithSameCategory}
            onBackToCategories={handleBackToCategorySelection}
        />
    );
  }

  // Fallback: Ladezustand
  return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Laden...</span>
                </div>
                <p className="mt-3">Quiz wird geladen...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default QuizMain;