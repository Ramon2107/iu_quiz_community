/**
 * Hauptquiz-Komponente
 *
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt
 * verschiedene Spielmodi bereit (kooperativ, kompetitiv und single-player).
 *
 * UPDATE: Konfigurierbare Anzahl von Fragen (1-20)
 * UPDATE: Fragenanzahl-Auswahl für alle Modi
 * UPDATE: Kategorien-Auswahl für alle Modi
 * UPDATE: Verbesserte Benutzeroberfläche für Auswahl
 * UPDATE: "Andere Kategorie wählen" Funktion implementiert
 * UPDATE: Integration mit DataManager statt direktem Import von mockData
 * UPDATE: Simulation von Mitspielern für kooperative und kompetitive Modi
 * UPDATE: Vollständige Multiplayer-Unterstützung mit Live-Updates
 * UPDATE: Live-Chat Integration mit persistenten Nachrichten
 * UPDATE: Punkte-System für alle Spieler
 * UPDATE: Timer-Fix für erste Frage
 * UPDATE: Kein Chat für Competitive Mode
 *
 * WICHTIGE ÄNDERUNG: Diese Komponente verwendet jetzt den zentralen DataManager,
 * um konsistente Datenverwendung in der gesamten Anwendung zu gewährleisten.
 * Mock-Daten werden automatisch geladen, wenn localStorage leer ist.
 *
 * Spielmodi:
 * - 'cooperative': Kooperatives Lernen mit anderen Studierenden
 * - 'competitive': Wettbewerbsmodus mit Zeitdruck
 * - 'single-player': Individuelles Lernen ohne Zeitdruck
 *
 * @author IU Quiz Community
 * @version 1.7.0
 * @since 2025-07-15
 */

import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import QuizCategorySelector from './QuizCategorySelector';
import dataManager from '../../data/dataManager';
import simulatedPlayersService from '../../services/SimulatedPlayersService';

/**
 * QuizMain-Komponente - Hauptsteuerung des Quiz-Systems
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.user - Benutzerdaten
 * @returns {JSX.Element} Die gerenderte QuizMain-Komponente
 */
function QuizMain({ user }) {
  // Zustandsverwaltung für Quiz-Navigation
  const [currentStep, setCurrentStep] = useState('mode');
  const [gameMode, setGameMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [availableCategories, setAvailableCategories] = useState([]);

  // Zustandsverwaltung für Quiz-Durchführung
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Zustandsverwaltung für Multiplayer-Simulation
  const [multiplayerData, setMultiplayerData] = useState({
    players: [],
    currentPlayerAnswers: [],
    isMultiplayer: false
  });

  // Zustandsverwaltung für Live-Chat
  const [chatMessages, setChatMessages] = useState([]);

  /**
   * Lädt Daten über DataManager beim Component-Mount
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

    // Lade verfügbare Kategorien
    setAvailableCategories(dataManager.getCategoriesForQuiz());
  }, []);

  /**
   * Rendert die Modus-Auswahl
   */
  const renderModeSelection = () => (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0 text-center">
                  <i className="fas fa-play-circle me-2"></i>
                  Spielmodus auswählen
                </h2>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  {/* Single Player */}
                  <div className="col-md-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="fas fa-user fa-3x text-primary"></i>
                        </div>
                        <h5 className="card-title">Single Player</h5>
                        <p className="card-text">
                          Lernen Sie in Ihrem eigenen Tempo ohne Zeitdruck.
                          Perfekt für konzentriertes Lernen.
                        </p>
                        <div className="mb-3">
                          <span className="badge bg-primary me-2">Kein Zeitlimit</span>
                          <span className="badge bg-success">Erklärungen</span>
                        </div>
                        <button
                            className="btn btn-primary btn-lg w-100"
                            onClick={() => startModeSelection('single-player')}
                        >
                          <i className="fas fa-play me-2"></i>
                          Starten
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cooperative */}
                  <div className="col-md-4">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="fas fa-users fa-3x text-success"></i>
                        </div>
                        <h5 className="card-title">Kooperativ</h5>
                        <p className="card-text">
                          Lernen Sie gemeinsam mit anderen Studierenden.
                          Chat und Diskussion möglich.
                        </p>
                        <div className="mb-3">
                          <span className="badge bg-success me-2">60s pro Frage</span>
                          <span className="badge bg-info">Live-Chat</span>
                        </div>
                        <button
                            className="btn btn-success btn-lg w-100"
                            onClick={() => startModeSelection('cooperative')}
                        >
                          <i className="fas fa-play me-2"></i>
                          Starten
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Competitive */}
                  <div className="col-md-4">
                    <div className="card h-100 border-warning">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="fas fa-trophy fa-3x text-warning"></i>
                        </div>
                        <h5 className="card-title">Kompetitiv</h5>
                        <p className="card-text">
                          Treten Sie gegen andere Studierende an.
                          Schnelligkeit und Genauigkeit zählen.
                        </p>
                        <div className="mb-3">
                          <span className="badge bg-warning text-dark me-2">30s pro Frage</span>
                          <span className="badge bg-danger">Rangliste</span>
                        </div>
                        <button
                            className="btn btn-warning btn-lg w-100"
                            onClick={() => startModeSelection('competitive')}
                        >
                          <i className="fas fa-play me-2"></i>
                          Starten
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

  /**
   * Rendert die Fragenanzahl-Auswahl
   */
  const renderQuestionCountSelection = () => (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className={`card-header ${getGameModeClass()} text-white`}>
                <h2 className="mb-0 text-center">
                  <i className={`${getGameModeIcon()} me-2`}></i>
                  Fragenanzahl auswählen
                </h2>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <p className="lead">
                    Wählen Sie die Anzahl der Fragen für Ihr Quiz ({gameMode === 'cooperative' ? 'Kooperativ' : gameMode === 'competitive' ? 'Kompetitiv' : 'Single Player'}).
                  </p>
                </div>

                {/* Fragenanzahl-Slider */}
                <div className="mb-4">
                  <label htmlFor="questionCountRange" className="form-label">
                    <strong>Anzahl der Fragen: {questionCount}</strong>
                  </label>
                  <input
                      type="range"
                      className="form-range"
                      id="questionCountRange"
                      min="1"
                      max="20"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">1 Frage</small>
                    <small className="text-muted">20 Fragen</small>
                  </div>
                </div>

                {/* Schnellauswahl-Buttons */}
                <div className="mb-4">
                  <p className="fw-bold mb-2">Schnellauswahl:</p>
                  <div className="btn-group w-100" role="group">
                    <button
                        type="button"
                        className={`btn ${questionCount === 5 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setQuestionCount(5)}
                    >
                      5 Fragen
                    </button>
                    <button
                        type="button"
                        className={`btn ${questionCount === 10 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setQuestionCount(10)}
                    >
                      10 Fragen
                    </button>
                    <button
                        type="button"
                        className={`btn ${questionCount === 15 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setQuestionCount(15)}
                    >
                      15 Fragen
                    </button>
                    <button
                        type="button"
                        className={`btn ${questionCount === 20 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setQuestionCount(20)}
                    >
                      20 Fragen
                    </button>
                  </div>
                </div>

                {/* Geschätzte Dauer */}
                <div className="alert alert-info">
                  <i className="fas fa-clock me-2"></i>
                  <strong>Geschätzte Dauer:</strong> {calculateEstimatedTime()} Minuten
                </div>

                {/* Navigation */}
                <div className="d-flex justify-content-between">
                  <button
                      className="btn btn-secondary"
                      onClick={handleBackToModeSelection}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Zurück
                  </button>
                  <button
                      className={`btn ${getGameModeClass().replace('bg-', 'btn-')} btn-lg`}
                      onClick={() => setCurrentStep('category')}
                  >
                    <i className="fas fa-arrow-right me-2"></i>
                    Kategorie wählen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  /**
   * Berechnet die geschätzte Dauer basierend auf Spielmodus und Fragenanzahl
   */
  const calculateEstimatedTime = () => {
    let timePerQuestion = 0;
    switch (gameMode) {
      case 'single-player':
        timePerQuestion = 2; // 2 Minuten pro Frage
        break;
      case 'cooperative':
        timePerQuestion = 1; // 1 Minute pro Frage
        break;
      case 'competitive':
        timePerQuestion = 0.5; // 30 Sekunden pro Frage
        break;
    }
    return Math.round(questionCount * timePerQuestion);
  };

  /**
   * Startet die Modus-Auswahl - Schritt 1
   * Initialisiert Multiplayer-Simulation falls erforderlich
   *
   * @param {string} mode - Ausgewählter Spielmodus
   */
  const startModeSelection = (mode) => {
    console.log('Modus ausgewählt:', mode);
    setGameMode(mode);

    // Initialisiere Multiplayer-Simulation für kooperative/kompetitive Modi
    if (mode === 'cooperative' || mode === 'competitive') {
      setMultiplayerData({
        players: [],
        currentPlayerAnswers: [],
        isMultiplayer: true
      });
      // Reset Chat-Nachrichten
      setChatMessages([]);
    } else {
      setMultiplayerData({
        players: [],
        currentPlayerAnswers: [],
        isMultiplayer: false
      });
      setChatMessages([]);
    }

    setCurrentStep('question-count');
  };

  /**
   * Behandelt die Kategorieauswahl - Schritt 3
   * Initialisiert simulierte Spieler für Multiplayer-Modi
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

    // Mische die Fragen und wähle die gewünschte Anzahl
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, questionCount);

    console.log('Verfügbare Fragen:', allQuestions.length);
    console.log('Ausgewählte Fragen:', selectedQuestions.length);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);

    // Initialisiere simulierte Spieler für Multiplayer-Modi
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

      // Begrüßungsnachrichten generieren (nur für cooperative Mode)
      if (gameMode === 'cooperative') {
        generateWelcomeMessages(players);
      }

      console.log('Simulierte Spieler initialisiert:', players.map(p => p.name));
    }

    setCurrentStep('quiz');
  };

  /**
   * Generiert Begrüßungsnachrichten für den Chat (nur cooperative Mode)
   * @param {Array} players - Liste der Spieler
   */
  const generateWelcomeMessages = (players) => {
    const welcomeMessages = [
      {
        id: Date.now(),
        playerId: 'system',
        playerName: 'System',
        message: 'Willkommen im kooperativen Quiz!',
        timestamp: new Date().toISOString(),
        isHuman: false,
        color: 'info'
      }
    ];

    // Simuliere Begrüßungen der KI-Spieler
    players.forEach((player, index) => {
      setTimeout(() => {
        const greetings = [
          'Hallo zusammen! Viel Erfolg beim Quiz!',
          'Hey! Freue mich aufs gemeinsame Lernen.',
          'Hi! Lasst uns unser Bestes geben!',
          'Hallo! Bin bereit für das Quiz.',
          'Hey Leute! Auf geht\'s!'
        ];

        const greeting = greetings[Math.floor(Math.random() * greetings.length)];

        setChatMessages(prev => [...prev, {
          id: Date.now() + index,
          playerId: player.id,
          playerName: player.name,
          message: greeting,
          timestamp: new Date().toISOString(),
          isHuman: false,
          color: player.color
        }]);
      }, (index + 1) * 1000);
    });

    setChatMessages(welcomeMessages);
  };

  /**
   * Behandelt neue Chat-Nachrichten (nur cooperative Mode)
   * @param {Object} message - Chat-Nachricht
   */
  const handleSendChatMessage = (message) => {
    if (gameMode !== 'cooperative') return;

    setChatMessages(prev => [...prev, message]);

    // Simuliere KI-Antworten (manchmal)
    if (Math.random() < 0.3 && multiplayerData.players.length > 0) {
      setTimeout(() => {
        const randomPlayer = multiplayerData.players[Math.floor(Math.random() * multiplayerData.players.length)];
        const responses = [
          'Gute Frage!',
          'Stimme zu!',
          'Interessant...',
          'Das hilft mir auch!',
          'Danke für den Tipp!',
          'Sehe ich genauso.',
          'Hmm, da bin ich mir nicht sicher.',
          'Guter Punkt!'
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        setChatMessages(prev => [...prev, {
          id: Date.now() + Math.random(),
          playerId: randomPlayer.id,
          playerName: randomPlayer.name,
          message: response,
          timestamp: new Date().toISOString(),
          isHuman: false,
          color: randomPlayer.color
        }]);
      }, 1000 + Math.random() * 3000);
    }
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

    // Reset Multiplayer-Daten
    simulatedPlayersService.reset();
    setMultiplayerData({
      players: [],
      currentPlayerAnswers: [],
      isMultiplayer: false
    });
    setChatMessages([]);
  };

  /**
   * Behandelt die Rückkehr zur Kategorie-Auswahl
   */
  const handleBackToCategorySelection = () => {
    setCurrentStep('category');
    setSelectedCategory(null);
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
   * Behandelt eine Benutzerantwort
   *
   * @param {Object} answerData - Antwortdaten
   */
  const handleAnswer = async (answerData) => {
    console.log('Antwort erhalten:', answerData);

    const newAnswers = [...answers, answerData];
    setAnswers(newAnswers);

    // Simuliere Mitspieler-Antworten für Multiplayer-Modi
    if (multiplayerData.isMultiplayer) {
      try {
        const playerAnswers = await simulatedPlayersService.simulatePlayerAnswers(
            questions[currentQuestionIndex],
            currentQuestionIndex
        );

        setMultiplayerData(prev => ({
          ...prev,
          currentPlayerAnswers: playerAnswers
        }));

        console.log('Simulierte Spieler-Antworten:', playerAnswers);
      } catch (error) {
        console.error('Fehler beim Simulieren der Spieler-Antworten:', error);
      }
    }

    // Warte kurz, damit Benutzer die Erklärung lesen kann
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 3000);
  };

  /**
   * Gibt Spielmodus-spezifische CSS-Klasse zurück
   */
  const getGameModeClass = () => {
    switch (gameMode) {
      case 'cooperative':
        return 'bg-success';
      case 'competitive':
        return 'bg-warning';
      default:
        return 'bg-primary';
    }
  };

  /**
   * Gibt Spielmodus-spezifisches Icon zurück
   */
  const getGameModeIcon = () => {
    switch (gameMode) {
      case 'cooperative':
        return 'fas fa-users';
      case 'competitive':
        return 'fas fa-trophy';
      default:
        return 'fas fa-user';
    }
  };

  /**
   * Neustart des Quiz
   */
  const handleRestart = () => {
    handleBackToModeSelection();
  };

  /**
   * Neustart mit gleicher Kategorie
   */
  const handleRestartSameCategory = () => {
    if (selectedCategory) {
      handleCategorySelect(selectedCategory);
    }
  };

  // Lade-Zustand
  if (isLoading) {
    return (
        <div className="container mt-5">
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

  // Zeige Ergebnisse
  if (showResults) {
    return (
        <QuizResults
            questions={questions}
            answers={answers}
            gameMode={gameMode}
            category={selectedCategory}
            user={user}
            onRestart={handleRestart}
            onRestartSameCategory={handleRestartSameCategory}
            onBackToCategorySelection={handleBackToCategorySelection}
            multiplayerData={multiplayerData}
        />
    );
  }

  // Zeige aktuelle Frage
  if (currentStep === 'quiz' && questions.length > 0) {
    return (
        <QuizQuestion
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            gameMode={gameMode}
            onAnswer={handleAnswer}
            onBackToCategorySelection={handleBackToCategorySelection}
            user={user}
            multiplayerData={multiplayerData}
            chatMessages={chatMessages}
            onSendChatMessage={handleSendChatMessage}
            allAnswers={answers}
        />
    );
  }

  // Zeige Kategorieauswahl
  if (currentStep === 'category') {
    return (
        <QuizCategorySelector
            categories={availableCategories}
            onCategorySelect={handleCategorySelect}
            onBack={() => setCurrentStep('question-count')}
            gameMode={gameMode}
            questionCount={questionCount}
            user={user}
        />
    );
  }

  // Zeige Fragenanzahl-Auswahl
  if (currentStep === 'question-count') {
    return renderQuestionCountSelection();
  }

  // Zeige Modus-Auswahl
  return renderModeSelection();
}

export default QuizMain;