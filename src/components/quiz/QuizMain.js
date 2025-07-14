/**
 * Hauptquiz-Komponente
 *
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt
 * verschiedene Spielmodi bereit (kooperativ, kompetitiv und single-player).
 *
 * UPDATE: Konfigurierbare Anzahl von Fragen (4-20)
 * UPDATE: Verbesserte Benutzeroberfläche für Kartenanzahl-Auswahl
 * UPDATE: "Andere Kategorie wählen" Funktion implementiert
 * UPDATE: Integration mit DataManager statt direktem Import von mockData
 * UPDATE: Simulation von Mitspielern für kooperative und kompetitive Modi
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
import dataManager from '../../data/dataManager';
import simulatedPlayersService from '../../services/SimulatedPlayersService'; // UPDATE: Import für Multiplayer-Simulation

function QuizMain({ user }) {
  // Zustandsverwaltung für Quiz-Navigation
  const [currentStep, setCurrentStep] = useState('mode');
  const [gameMode, setGameMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);

  // Zustandsverwaltung für Quiz-Durchführung
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // UPDATE: Zustandsverwaltung für Multiplayer-Simulation
  const [multiplayerData, setMultiplayerData] = useState({
    players: [],
    currentPlayerAnswers: [],
    isMultiplayer: false
  });

  /**
   * UPDATE: Lädt Daten über DataManager beim Component-Mount
   */
  useEffect(() => {
    const categories = dataManager.getAllCategories();
    const cards = dataManager.getAllCards();

    console.log('QuizMain: Geladene Kategorien:', categories.length);
    console.log('QuizMain: Geladene Karten:', cards.length);

    if (categories.length === 0 || cards.length === 0) {
      console.log('QuizMain: Lade Mock-Daten neu...');
      dataManager.reloadMockData();
    }
  }, []);

  /**
   * UPDATE: Startet die Modus-Auswahl - Schritt 1
   * Initialisiert Multiplayer-Simulation falls erforderlich
   */
  const startModeSelection = (mode) => {
    console.log('Modus ausgewählt:', mode);
    setGameMode(mode);

    // UPDATE: Initialisiere Multiplayer-Simulation für kooperative/kompetitive Modi
    if (mode === 'cooperative' || mode === 'competitive') {
      setMultiplayerData({
        players: [],
        currentPlayerAnswers: [],
        isMultiplayer: true
      });
    } else {
      setMultiplayerData({
        players: [],
        currentPlayerAnswers: [],
        isMultiplayer: false
      });
    }

    setCurrentStep('category');
  };

  /**
   * UPDATE: Behandelt die Kategorieauswahl - Schritt 2
   * Initialisiert simulierte Spieler für Multiplayer-Modi
   */
  const handleCategorySelect = (category) => {
    console.log('Kategorie ausgewählt:', category.name);
    setSelectedCategory(category);

    // Fragen über DataManager laden
    const allQuestions = dataManager.getQuestionsForQuiz().filter(
        question => question.category === category.name
    );

    const selectedQuestions = allQuestions.slice(0, questionCount);

    console.log('Verfügbare Fragen:', allQuestions.length);
    console.log('Ausgewählte Fragen:', selectedQuestions.length);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);

    // UPDATE: Initialisiere simulierte Spieler für Multiplayer-Modi
    if (multiplayerData.isMultiplayer) {
      const players = simulatedPlayersService.initializePlayers(
          gameMode,
          category.name,
          3 // 3 Mitspieler
      );
      setMultiplayerData(prev => ({
        ...prev,
        players
      }));
      console.log('Simulierte Spieler initialisiert:', players.map(p => p.name));
    }

    setCurrentStep('quiz');
  };

  /**
   * Behandelt die Rückkehr zur Modus-Auswahl
   */
  const handleBackToModeSelection = () => {
    setCurrentStep('mode');
    setGameMode(null);
    setSelectedCategory(null);
    setQuestionCount(10);
    resetQuizState();

    // UPDATE: Reset Multiplayer-Daten
    simulatedPlayersService.reset();
    setMultiplayerData({
      players: [],
      currentPlayerAnswers: [],
      isMultiplayer: false
    });
  };

  /**
   * Behandelt die Rückkehr zur Kategorie-Auswahl
   */
  const handleBackToCategorySelection = () => {
    setCurrentStep('category');
    resetQuizState();

    // UPDATE: Reset Multiplayer-Daten
    simulatedPlayersService.reset();
    setMultiplayerData(prev => ({
      ...prev,
      players: [],
      currentPlayerAnswers: []
    }));
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
   * UPDATE: Verarbeitet eine Antwort - Unterstützt alle Spielmodi
   * Simuliert Mitspieler-Antworten für Multiplayer-Modi
   */
  const handleAnswer = async (answer) => {
    console.log('Antwort erhalten:', answer);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // UPDATE: Simuliere Mitspieler-Antworten für Multiplayer-Modi
    if (multiplayerData.isMultiplayer && questions[currentQuestionIndex]) {
      try {
        const playerAnswers = await simulatedPlayersService.simulatePlayerAnswers(
            questions[currentQuestionIndex],
            currentQuestionIndex
        );

        setMultiplayerData(prev => ({
          ...prev,
          currentPlayerAnswers: playerAnswers
        }));

        console.log('Simulierte Spieler-Antworten:', playerAnswers.map(a => ({
          name: a.playerName,
          correct: a.isCorrect,
          time: a.timeTaken
        })));
      } catch (error) {
        console.error('Fehler bei Simulation der Spieler-Antworten:', error);
      }
    }

    // Verzögerung für bessere UX
    const delay = gameMode === 'single-player' ? 2000 : 1500;

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        console.log('Weiterleitung zur nächsten Frage:', currentQuestionIndex + 1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        // UPDATE: Reset aktuelle Spieler-Antworten für nächste Frage
        if (multiplayerData.isMultiplayer) {
          setMultiplayerData(prev => ({
            ...prev,
            currentPlayerAnswers: []
          }));
        }
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
    setQuestionCount(10);
    resetQuizState();

    // UPDATE: Reset Multiplayer-Daten
    simulatedPlayersService.reset();
    setMultiplayerData({
      players: [],
      currentPlayerAnswers: [],
      isMultiplayer: false
    });
  };

  /**
   * UPDATE: Startet ein neues Quiz mit der gleichen Kategorie
   * Initialisiert simulierte Spieler neu
   */
  const restartWithSameCategory = () => {
    if (selectedCategory) {
      console.log('Quiz wird mit gleicher Kategorie neu gestartet');

      const allQuestions = dataManager.getQuestionsForQuiz().filter(
          question => question.category === selectedCategory.name
      );

      const selectedQuestions = allQuestions.slice(0, questionCount);

      setQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowResults(false);
      setCurrentStep('quiz');

      // UPDATE: Initialisiere simulierte Spieler neu für Multiplayer-Modi
      if (multiplayerData.isMultiplayer) {
        const players = simulatedPlayersService.initializePlayers(
            gameMode,
            selectedCategory.name,
            3
        );
        setMultiplayerData(prev => ({
          ...prev,
          players,
          currentPlayerAnswers: []
        }));
      }
    }
  };

  /**
   * Gibt den angezeigten Spielmodus-Text zurück
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
                            Kooperativer Modus
                          </h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            Arbeiten Sie mit anderen Studierenden zusammen.
                            Diskutieren Sie Antworten und lernen Sie gemeinsam.
                            Fokus auf Teamarbeit und gegenseitige Unterstützung.
                          </p>
                          <ul className="list-unstyled">
                            <li><i className="fas fa-check text-success me-2"></i>Teamarbeit</li>
                            <li><i className="fas fa-check text-success me-2"></i>Diskussion</li>
                            <li><i className="fas fa-check text-success me-2"></i>Gemeinsames Lernen</li>
                            <li><i className="fas fa-check text-success me-2"></i>Kooperation</li>
                          </ul>
                        </div>
                        <div className="card-footer">
                          <button
                              className="btn btn-success w-100"
                              onClick={() => startModeSelection('cooperative')}
                          >
                            <i className="fas fa-arrow-right me-2"></i>
                            Zusammen lernen
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
                            Kompetitiver Modus
                          </h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            Treten Sie gegen andere Studierende an.
                            Schnelligkeit und Genauigkeit sind entscheidend.
                            Perfekt für Prüfungsvorbereitung unter Zeitdruck.
                          </p>
                          <ul className="list-unstyled">
                            <li><i className="fas fa-check text-warning me-2"></i>Wettbewerb</li>
                            <li><i className="fas fa-check text-warning me-2"></i>Zeitdruck</li>
                            <li><i className="fas fa-check text-warning me-2"></i>Ranglisten</li>
                            <li><i className="fas fa-check text-warning me-2"></i>Prüfungssimulation</li>
                          </ul>
                        </div>
                        <div className="card-footer">
                          <button
                              className="btn btn-warning w-100"
                              onClick={() => startModeSelection('competitive')}
                          >
                            <i className="fas fa-arrow-right me-2"></i>
                            Wettbewerb starten
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

  // Schritt 2: Kategorie-Auswahl mit Fragenanzahl-Konfiguration
  if (currentStep === 'category') {
    return (
        <QuizCategorySelector
            gameMode={gameMode}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            onCategorySelect={handleCategorySelect}
            onBackToModeSelection={handleBackToModeSelection}
        />
    );
  }

  // Schritt 3: Quiz-Durchführung
  if (currentStep === 'quiz' && !showResults) {
    return (
        <QuizQuestion
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            gameMode={gameMode}
            onAnswer={handleAnswer}
            onBackToCategorySelection={handleBackToCategorySelection}
            user={user}
            multiplayerData={multiplayerData} // UPDATE: Übergabe der Multiplayer-Daten
        />
    );
  }

  // Schritt 4: Ergebnisse anzeigen
  if (currentStep === 'results') {
    return (
        <QuizResults
            questions={questions}
            answers={answers}
            gameMode={gameMode}
            category={selectedCategory}
            user={user}
            onRestart={resetQuiz}
            onRestartSameCategory={restartWithSameCategory}
            onBackToCategorySelection={handleBackToCategorySelection}
            multiplayerData={multiplayerData} // UPDATE: Übergabe der Multiplayer-Daten
        />
    );
  }

  // Fallback-Anzeige
  return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.
        </div>
      </div>
  );
}

export default QuizMain;