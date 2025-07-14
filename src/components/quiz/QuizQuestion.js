/**
 * QuizQuestion-Komponente - Einzelne Frage mit Antwortmöglichkeiten
 *
 * Diese Komponente zeigt eine einzelne Quiz-Frage mit allen Antwortmöglichkeiten an
 * und behandelt die Benutzerinteraktion für verschiedene Spielmodi.
 *
 * Features:
 * - Unterstützung für alle Spielmodi (single-player, cooperative, competitive)
 * - Zeitmessung und Fortschrittsanzeige
 * - Responsive Design mit Bootstrap
 * - Benutzerfreundliche Antwort-Auswahl
 * - Sofortiges Feedback nach Antwort
 *
 * UPDATE: Multiplayer-Simulation für kooperative und kompetitive Modi
 * UPDATE: Live-Updates und Mitspieler-Antworten anzeigen
 */

import React, { useState, useEffect } from 'react';
import simulatedPlayersService from '../../services/SimulatedPlayersService'; // UPDATE: Import für Multiplayer-Simulation

/**
 * QuizQuestion-Komponente
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.question - Die aktuelle Frage
 * @param {number} props.questionNumber - Fragenummer (1-basiert)
 * @param {number} props.totalQuestions - Gesamtanzahl der Fragen
 * @param {string} props.gameMode - Spielmodus ('single-player', 'cooperative', 'competitive')
 * @param {Function} props.onAnswer - Callback-Funktion für Antwort
 * @param {Function} props.onBackToCategorySelection - Callback für Rückkehr zur Kategorieauswahl
 * @param {Object} props.user - Benutzerdaten
 * @param {Object} props.multiplayerData - UPDATE: Multiplayer-Daten mit simulierten Spielern
 */
function QuizQuestion({
                        question,
                        questionNumber,
                        totalQuestions,
                        gameMode,
                        onAnswer,
                        onBackToCategorySelection,
                        user,
                        multiplayerData // UPDATE: Neue Prop für Multiplayer-Daten
                      }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // UPDATE: Zustand für Multiplayer-Funktionen
  const [cooperativeMessages, setCooperativeMessages] = useState([]);
  const [competitiveUpdates, setCompetitiveUpdates] = useState([]);
  const [showMultiplayerInfo, setShowMultiplayerInfo] = useState(false);

  // Zeitmessung und Timer-Setup
  useEffect(() => {
    setStartTime(Date.now());
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsAnswered(false);

    // UPDATE: Reset Multiplayer-Daten für neue Frage
    setCooperativeMessages([]);
    setCompetitiveUpdates([]);
    setShowMultiplayerInfo(false);

    // Timer nur für competitive Mode
    if (gameMode === 'competitive') {
      setTimeLeft(30); // 30 Sekunden für competitive Mode
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (!isAnswered) {
              handleTimeUp();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [question, gameMode]);

  // UPDATE: Effekt für Multiplayer-Nachrichten und Updates
  useEffect(() => {
    if (multiplayerData?.isMultiplayer && multiplayerData.currentPlayerAnswers.length > 0) {
      if (gameMode === 'cooperative') {
        const messages = simulatedPlayersService.generateCooperativeMessages(
            question,
            multiplayerData.currentPlayerAnswers
        );
        setCooperativeMessages(messages);
      } else if (gameMode === 'competitive') {
        const updates = simulatedPlayersService.generateCompetitiveUpdates(
            multiplayerData.currentPlayerAnswers
        );
        setCompetitiveUpdates(updates);
      }

      // Zeige Multiplayer-Info nach kurzer Verzögerung
      setTimeout(() => {
        setShowMultiplayerInfo(true);
      }, 1000);
    }
  }, [multiplayerData?.currentPlayerAnswers, gameMode, question]);

  /**
   * Behandelt Zeit-Ablauf im competitive Mode
   */
  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setShowExplanation(true);

      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      onAnswer({
        selectedAnswer: null,
        isCorrect: false,
        timeTaken,
        questionId: question.id,
        timedOut: true
      });
    }
  };

  /**
   * Behandelt Antwort-Auswahl
   */
  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);

    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const isCorrect = answerIndex === question.correctAnswer;

    onAnswer({
      selectedAnswer: answerIndex,
      isCorrect,
      timeTaken,
      questionId: question.id,
      timedOut: false
    });
  };

  /**
   * Gibt CSS-Klasse für Antwort-Button zurück
   */
  const getAnswerButtonClass = (index) => {
    if (!showExplanation) {
      return 'btn btn-outline-primary btn-lg w-100 mb-2';
    }

    if (index === question.correctAnswer) {
      return 'btn btn-success btn-lg w-100 mb-2';
    }

    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'btn btn-danger btn-lg w-100 mb-2';
    }

    return 'btn btn-outline-secondary btn-lg w-100 mb-2';
  };

  /**
   * Berechnet Fortschritt in Prozent
   */
  const getProgressPercentage = () => {
    return Math.round((questionNumber / totalQuestions) * 100);
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

  if (!question) {
    return (
        <div className="container mt-4">
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Keine Frage verfügbar. Bitte kehren Sie zur Kategorieauswahl zurück.
          </div>
        </div>
    );
  }

  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {/* Hauptfrage-Bereich */}
            <div className="card shadow-lg">
              <div className={`card-header ${getGameModeClass()} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">
                    <i className={`${getGameModeIcon()} me-2`}></i>
                    Frage {questionNumber} von {totalQuestions}
                  </h3>
                  {timeLeft !== null && (
                      <div className="d-flex align-items-center">
                        <i className="fas fa-clock me-2"></i>
                        <span className="badge bg-light text-dark fs-6">
                      {timeLeft}s
                    </span>
                      </div>
                  )}
                </div>
              </div>

              <div className="card-body">
                {/* Fortschrittsbalken */}
                <div className="progress mb-4">
                  <div
                      className={`progress-bar ${getGameModeClass()}`}
                      role="progressbar"
                      style={{ width: `${getProgressPercentage()}%` }}
                      aria-valuenow={getProgressPercentage()}
                      aria-valuemin="0"
                      aria-valuemax="100"
                  >
                    {getProgressPercentage()}%
                  </div>
                </div>

                {/* Frage */}
                <div className="mb-4">
                  <h4 className="question-text">{question.question}</h4>
                  {question.category && (
                      <small className="text-muted">
                        <i className="fas fa-tag me-1"></i>
                        Kategorie: {question.category}
                      </small>
                  )}
                </div>

                {/* Antwortmöglichkeiten */}
                <div className="answers-container">
                  {question.answers.map((answer, index) => (
                      <button
                          key={index}
                          className={getAnswerButtonClass(index)}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={isAnswered}
                      >
                        <div className="d-flex align-items-center">
                      <span className="me-3 fw-bold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                          <span className="text-start flex-grow-1">{answer}</span>
                          {showExplanation && index === question.correctAnswer && (
                              <i className="fas fa-check text-white ms-2"></i>
                          )}
                          {showExplanation && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                              <i className="fas fa-times text-white ms-2"></i>
                          )}
                        </div>
                      </button>
                  ))}
                </div>

                {/* Erklärung */}
                {showExplanation && question.explanation && (
                    <div className="mt-4 p-3 bg-light rounded">
                      <h6>
                        <i className="fas fa-lightbulb me-2 text-warning"></i>
                        Erklärung:
                      </h6>
                      <p className="mb-0">{question.explanation}</p>
                    </div>
                )}
              </div>

              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                      className="btn btn-secondary"
                      onClick={onBackToCategorySelection}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Andere Kategorie wählen
                  </button>

                  <div className="d-flex align-items-center">
                    <i className="fas fa-user-circle me-2"></i>
                    <span>{user.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPDATE: Multiplayer-Sidebar */}
          <div className="col-md-4">
            {multiplayerData?.isMultiplayer && (
                <div className="card">
                  <div className={`card-header ${getGameModeClass()} text-white`}>
                    <h5 className="mb-0">
                      <i className="fas fa-users me-2"></i>
                      Mitspieler
                    </h5>
                  </div>
                  <div className="card-body">
                    {/* Spieler-Liste */}
                    <div className="mb-3">
                      <h6>Teilnehmer:</h6>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <i className="fas fa-user-circle me-2 text-primary"></i>
                        {user.name} <small className="text-muted">(Sie)</small>
                      </span>
                          <span className="badge bg-primary rounded-pill">Mensch</span>
                        </div>
                        {multiplayerData.players.map(player => (
                            <div key={player.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                          <i className={`${player.avatar} me-2 text-${player.color}`}></i>
                          {player.name}
                        </span>
                              <span className={`badge bg-${player.color} rounded-pill`}>
                          {player.semester}. Sem
                        </span>
                            </div>
                        ))}
                      </div>
                    </div>

                    {/* Kooperative Nachrichten */}
                    {gameMode === 'cooperative' && cooperativeMessages.length > 0 && showMultiplayerInfo && (
                        <div className="mb-3">
                          <h6>
                            <i className="fas fa-comments me-2"></i>
                            Diskussion:
                          </h6>
                          <div className="alert alert-info">
                            {cooperativeMessages.map((msg, index) => (
                                <div key={index} className="mb-2">
                                  <strong>{msg.playerName}:</strong>
                                  <br />
                                  <small className={msg.isHelpful ? 'text-success' : 'text-muted'}>
                                    {msg.message}
                                  </small>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}

                    {/* Kompetitive Updates */}
                    {gameMode === 'competitive' && competitiveUpdates.length > 0 && showMultiplayerInfo && (
                        <div className="mb-3">
                          <h6>
                            <i className="fas fa-tachometer-alt me-2"></i>
                            Live-Updates:
                          </h6>
                          <div className="alert alert-warning">
                            {competitiveUpdates.map((update, index) => (
                                <div key={index} className="mb-2">
                                  <div className="d-flex justify-content-between">
                                    <strong>{update.playerName}:</strong>
                                    <small>{update.time}s</small>
                                  </div>
                                  <small className={update.isCorrect ? 'text-success' : 'text-danger'}>
                                    {update.status}
                                  </small>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}

                    {/* Aktuelle Punkte */}
                    {multiplayerData.isMultiplayer && (
                        <div>
                          <h6>
                            <i className="fas fa-chart-bar me-2"></i>
                            Aktuelle Punkte:
                          </h6>
                          <div className="list-group list-group-flush">
                            {simulatedPlayersService.getPlayerStats().map((stat, index) => (
                                <div key={stat.id} className="list-group-item d-flex justify-content-between">
                                  <span>{stat.name}</span>
                                  <span className="badge bg-secondary rounded-pill">{stat.score}</span>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default QuizQuestion;