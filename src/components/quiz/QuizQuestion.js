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
 * UPDATE: Vollständige Multiplayer-Sidebar mit Ranglisten
 * UPDATE: Live-Chat Integration (nur für cooperative Mode)
 * UPDATE: Punkte-Anzeige für alle Spieler
 * UPDATE: Zeit-Anzeige für kooperativen Modus
 * UPDATE: Lobby-Anzeige
 * UPDATE: Separate Chat- und Ranking-Fenster integriert
 * UPDATE: Dynamische Punkte-Erhöhung je nach Antwort
 * UPDATE: Timer-Fix für erste Frage
 * UPDATE: Kein Chat für Competitive Mode
 *
 * @author IU Quiz Community
 * @version 1.6.0
 * @since 2025-07-15
 */

import React, { useState, useEffect, useRef } from 'react';
import simulatedPlayersService from '../../services/SimulatedPlayersService';

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
 * @param {Object} props.multiplayerData - Multiplayer-Daten mit simulierten Spielern
 * @param {Array} props.chatMessages - Chat-Nachrichten
 * @param {Function} props.onSendChatMessage - Callback für Chat-Nachrichten
 * @param {Array} props.allAnswers - Alle bisherigen Antworten für Punkte-Berechnung
 * @returns {JSX.Element} Die gerenderte QuizQuestion-Komponente
 */
function QuizQuestion({
                        question,
                        questionNumber,
                        totalQuestions,
                        gameMode,
                        onAnswer,
                        onBackToCategorySelection,
                        user,
                        multiplayerData,
                        chatMessages = [],
                        onSendChatMessage,
                        allAnswers = []
                      }) {
  // Basis-Zustand für Fragen-Handling
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Multiplayer-Zustand
  const [cooperativeMessages, setCooperativeMessages] = useState([]);
  const [competitiveUpdates, setCompetitiveUpdates] = useState([]);
  const [liveComments, setLiveComments] = useState([]);
  const [showMultiplayerInfo, setShowMultiplayerInfo] = useState(false);

  // Chat-Zustand (nur für cooperative Mode)
  const [chatInputMessage, setChatInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Ranking-Zustand
  const [animatedScores, setAnimatedScores] = useState({});

  // Dynamische Punkte-Anzeige
  const [currentScore, setCurrentScore] = useState(0);
  const [scoreAnimation, setScoreAnimation] = useState(false);

  // Timer-Referenz für korrektes Cleanup
  const timerRef = useRef(null);

  /**
   * Berechnet die aktuellen Punkte des Spielers
   * @returns {number} Aktuelle Punkte
   */
  const calculateCurrentScore = () => {
    return allAnswers.reduce((total, answer) => {
      if (answer.isCorrect) {
        const speedBonus = Math.max(0, 30 - answer.timeTaken);
        return total + 100 + speedBonus;
      }
      return total;
    }, 0);
  };

  /**
   * Berechnet die Genauigkeit des menschlichen Spielers
   * @returns {number} Genauigkeit in Prozent
   */
  const calculateHumanAccuracy = () => {
    if (allAnswers.length === 0) return 0;
    const correctAnswers = allAnswers.filter(a => a.isCorrect).length;
    return Math.round((correctAnswers / allAnswers.length) * 100);
  };

  /**
   * Berechnet die durchschnittliche Antwortzeit des menschlichen Spielers
   * @returns {number} Durchschnittliche Zeit in Sekunden
   */
  const calculateAverageTime = () => {
    if (allAnswers.length === 0) return 0;
    const totalTime = allAnswers.reduce((sum, answer) => sum + answer.timeTaken, 0);
    return Math.round(totalTime / allAnswers.length);
  };

  /**
   * Erstellt die vollständige Rangliste mit menschlichem Spieler
   * @returns {Array} Sortierte Rangliste
   */
  const createFullRanking = () => {
    const humanScore = calculateCurrentScore();
    const humanAccuracy = calculateHumanAccuracy();
    const averageTime = calculateAverageTime();

    const humanPlayer = {
      id: 'human_player',
      name: user.name,
      score: humanScore,
      accuracy: humanAccuracy,
      averageTime: averageTime,
      isHuman: true,
      color: 'primary',
      avatar: 'fas fa-user',
      answeredQuestions: allAnswers.length,
      correctAnswers: allAnswers.filter(a => a.isCorrect).length,
      status: 'Online'
    };

    // Kombiniere menschlichen Spieler mit KI-Spielern
    const allPlayers = [humanPlayer, ...multiplayerData.players];

    // Sortiere nach Punktzahl (höchste zuerst)
    return allPlayers.sort((a, b) => b.score - a.score);
  };

  /**
   * Gibt die Positions-Farbe zurück
   * @param {number} position - Position in der Rangliste
   * @returns {string} Bootstrap-Farben-Klasse
   */
  const getPositionColor = (position) => {
    switch (position) {
      case 1: return 'warning'; // Gold
      case 2: return 'secondary'; // Silber
      case 3: return 'primary'; // Bronze
      default: return 'light';
    }
  };

  /**
   * Gibt das Positions-Icon zurück
   * @param {number} position - Position in der Rangliste
   * @returns {string} Icon-Klasse
   */
  const getPositionIcon = (position) => {
    switch (position) {
      case 1: return 'fas fa-crown';
      case 2: return 'fas fa-medal';
      case 3: return 'fas fa-award';
      default: return 'fas fa-user';
    }
  };

  /**
   * Aktualisiert die Punkte-Anzeige dynamisch
   */
  useEffect(() => {
    const newScore = calculateCurrentScore();
    if (newScore !== currentScore) {
      setScoreAnimation(true);
      setCurrentScore(newScore);
      setTimeout(() => setScoreAnimation(false), 1000);
    }
  }, [allAnswers]);

  /**
   * Zeitmessung und Timer-Setup - KORRIGIERT
   */
  useEffect(() => {
    // Cleanup vorheriger Timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset Zustand für neue Frage
    setStartTime(Date.now());
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsAnswered(false);

    // Reset Multiplayer-Daten für neue Frage
    setCooperativeMessages([]);
    setCompetitiveUpdates([]);
    setLiveComments([]);
    setShowMultiplayerInfo(false);

    // Timer für competitive UND cooperative Mode
    let initialTime = null;
    if (gameMode === 'competitive') {
      initialTime = 30; // 30 Sekunden für competitive Mode
    } else if (gameMode === 'cooperative') {
      initialTime = 60; // 60 Sekunden für cooperative Mode
    }

    if (initialTime !== null) {
      setTimeLeft(initialTime);

      // Starte Timer sofort
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Verwende setTimeout um Race-Condition zu vermeiden
            setTimeout(() => {
              setIsAnswered(current => {
                if (!current) {
                  handleTimeUp();
                  return true;
                }
                return current;
              });
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup beim Unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [question, gameMode]);

  /**
   * Effekt für Multiplayer-Nachrichten und Updates
   */
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

        // Generiere Live-Kommentare
        const comments = simulatedPlayersService.generateLiveComments(
            multiplayerData.currentPlayerAnswers
        );
        setLiveComments(comments);
      }

      // Zeige Multiplayer-Info nach kurzer Verzögerung
      setTimeout(() => {
        setShowMultiplayerInfo(true);
      }, 1000);
    }
  }, [multiplayerData?.currentPlayerAnswers, gameMode, question]);

  /**
   * Behandelt Zeit-Ablauf im competitive/cooperative Mode
   */
  const handleTimeUp = () => {
    setShowExplanation(true);

    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    onAnswer({
      selectedAnswer: null,
      isCorrect: false,
      timeTaken,
      questionId: question.id,
      timedOut: true
    });
  };

  /**
   * Behandelt Antwort-Auswahl
   *
   * @param {number} answerIndex - Index der ausgewählten Antwort
   */
  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;

    // Stoppe Timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

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
   * Chat-Nachricht senden (nur für cooperative Mode)
   */
  const handleSendMessage = () => {
    if (chatInputMessage.trim() && onSendChatMessage) {
      const message = {
        id: Date.now(),
        playerId: 'human_player',
        playerName: user.name,
        message: chatInputMessage.trim(),
        timestamp: new Date().toISOString(),
        isHuman: true,
        color: 'primary'
      };

      onSendChatMessage(message);
      setChatInputMessage('');
    }
  };

  /**
   * Behandelt Enter-Taste im Chat
   */
  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  /**
   * Gibt CSS-Klasse für Antwort-Button zurück
   *
   * @param {number} index - Index der Antwort
   * @returns {string} CSS-Klassen-String
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
   *
   * @returns {number} Fortschritt in Prozent
   */
  const getProgressPercentage = () => {
    return Math.round((questionNumber / totalQuestions) * 100);
  };

  /**
   * Gibt Spielmodus-spezifische CSS-Klasse zurück
   *
   * @returns {string} CSS-Klassen-String
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
   *
   * @returns {string} Icon-Klassen-String
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
   * Rendert die Lobby-Übersicht
   */
  const renderLobby = () => {
    const humanAccuracy = calculateHumanAccuracy();

    return (
        <div className="mb-3">
          <h6 className="mb-3">
            <i className="fas fa-users me-2"></i>
            Spieler-Lobby
          </h6>

          {/* Menschlicher Spieler */}
          <div className="card mb-2 border-primary">
            <div className="card-body p-2">
              <div className="d-flex align-items-center">
                <i className="fas fa-user text-primary me-2"></i>
                <div className="flex-grow-1">
                  <div className="fw-bold">{user.name} (Du)</div>
                  <small className="text-muted">Online</small>
                </div>
                <div className="text-end">
                  <div className={`badge bg-primary ${scoreAnimation ? 'animate-pulse' : ''}`}>
                    <i className="fas fa-star me-1"></i>
                    {currentScore} Punkte
                  </div>
                  <div className="small text-muted">{humanAccuracy}% richtig</div>
                </div>
              </div>
            </div>
          </div>

          {/* Simulierte Spieler */}
          {multiplayerData.players.map((player, index) => (
              <div key={player.id} className="card mb-2">
                <div className="card-body p-2">
                  <div className="d-flex align-items-center">
                    <i className={`${player.avatar} text-${player.color} me-2`}></i>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{player.name}</div>
                      <small className="text-muted">{player.studyProgram} • {player.semester}. Sem</small>
                    </div>
                    <div className="text-end">
                      <div className="badge bg-secondary">
                        <i className="fas fa-star me-1"></i>
                        {player.score || 0} Punkte
                      </div>
                      <div className="small text-muted">
                        {player.answeredQuestions > 0 ?
                            Math.round((player.correctAnswers / player.answeredQuestions) * 100) : 0
                        }% richtig
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
    );
  };

  /**
   * Rendert das integrierte Chat-Fenster (nur für cooperative Mode)
   */
  const renderChatWindow = () => {
    if (gameMode !== 'cooperative') return null;

    return (
        <div className="card h-100">
          <div className={`card-header ${getGameModeClass()} text-white`}>
            <h6 className="mb-0">
              <i className="fas fa-comments me-2"></i>
              Live-Chat
              {chatMessages.length > 0 && (
                  <span className="badge bg-light text-dark ms-2">{chatMessages.length}</span>
              )}
            </h6>
          </div>

          <div className="card-body p-2" style={{ height: '300px', overflowY: 'auto' }}>
            {chatMessages.length === 0 ? (
                <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                  <div>
                    <i className="fas fa-comments fa-2x mb-2"></i>
                    <p>Noch keine Nachrichten...</p>
                    <small>Starten Sie eine Unterhaltung!</small>
                  </div>
                </div>
            ) : (
                <div className="chat-messages">
                  {chatMessages.map((msg, index) => (
                      <div key={msg.id} className={`mb-2 ${msg.isHuman ? 'text-end' : 'text-start'}`}>
                        <div className={`d-inline-block p-2 rounded ${
                            msg.isHuman
                                ? 'bg-primary text-white'
                                : `bg-${msg.color === 'info' ? 'info' : 'light'} text-dark`
                        }`} style={{ maxWidth: '80%' }}>
                          <div className="fw-bold small">{msg.playerName}</div>
                          <div>{msg.message}</div>
                          <small className="text-muted">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>

          <div className="card-footer p-2">
            <div className="input-group">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Nachricht eingeben..."
                  value={chatInputMessage}
                  onChange={(e) => setChatInputMessage(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  maxLength={200}
              />
              <button
                  className="btn btn-primary"
                  onClick={handleSendMessage}
                  disabled={!chatInputMessage.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
    );
  };

  /**
   * Rendert das integrierte Ranking-Fenster
   */
  const renderRankingWindow = () => {
    const ranking = createFullRanking();

    return (
        <div className="card h-100">
          <div className={`card-header ${getGameModeClass()} text-white`}>
            <h6 className="mb-0">
              <i className="fas fa-trophy me-2"></i>
              Live-Rangliste
              {ranking.length > 0 && (
                  <span className="badge bg-light text-dark ms-2">{ranking.length} Spieler</span>
              )}
            </h6>
          </div>

          <div className="card-body p-2" style={{ height: '300px', overflowY: 'auto' }}>
            {ranking.length === 0 ? (
                <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                  <div>
                    <i className="fas fa-trophy fa-2x mb-2"></i>
                    <p>Noch keine Ergebnisse...</p>
                    <small>Beantworten Sie Fragen für die Rangliste!</small>
                  </div>
                </div>
            ) : (
                <div className="ranking-list">
                  {ranking.map((player, index) => {
                    const position = index + 1;
                    const isCurrentUser = player.isHuman;

                    return (
                        <div
                            key={player.id}
                            className={`mb-2 p-2 border rounded ${isCurrentUser ? 'border-primary bg-light' : ''}`}
                            style={{
                              animation: isCurrentUser ? 'pulse 2s infinite' : 'none'
                            }}
                        >
                          <div className="d-flex align-items-center">
                            {/* Position und Icon */}
                            <div className="me-2 text-center" style={{ minWidth: '30px' }}>
                              <div className={`badge bg-${getPositionColor(position)} text-dark`}>
                                #{position}
                              </div>
                            </div>

                            {/* Spieler-Avatar */}
                            <div className="me-2">
                              <i className={`${player.avatar} text-${player.color}`}></i>
                            </div>

                            {/* Spieler-Info */}
                            <div className="flex-grow-1">
                              <div className="fw-bold small">
                                {player.name}
                                {isCurrentUser && (
                                    <span className="badge bg-primary ms-1">Du</span>
                                )}
                              </div>
                              <small className="text-muted">
                                {player.accuracy}% richtig
                              </small>
                            </div>

                            {/* Punkte */}
                            <div className="text-end">
                              <div className={`badge bg-${isCurrentUser ? 'primary' : 'secondary'}`}>
                                <i className="fas fa-star me-1"></i>
                                {player.score}
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}
          </div>

          {/* Statistiken Footer */}
          <div className="card-footer p-2">
            <div className="row text-center">
              <div className="col-6">
                <small className="text-muted d-block">Deine Position</small>
                <strong className="small">
                  #{ranking.findIndex(p => p.isHuman) + 1}
                </strong>
              </div>
              <div className="col-6">
                <small className="text-muted d-block">Deine Punkte</small>
                <strong className="small">
                  {currentScore}
                </strong>
              </div>
            </div>
          </div>
        </div>
    );
  };

  // Frage-Validierung
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

  // Berechne Spalten-Layout basierend auf Spielmodus
  const getColumnLayout = () => {
    if (!multiplayerData?.isMultiplayer) {
      return { main: "col-12", sidebar: null };
    }

    if (gameMode === 'cooperative') {
      return { main: "col-lg-6", chat: "col-lg-3", ranking: "col-lg-3" };
    } else if (gameMode === 'competitive') {
      return { main: "col-lg-8", ranking: "col-lg-4" };
    }

    return { main: "col-12", sidebar: null };
  };

  const layout = getColumnLayout();

  return (
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Hauptfrage-Bereich */}
          <div className={layout.main}>
            <div className="card shadow-lg">
              <div className={`card-header ${getGameModeClass()} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">
                    <i className={`${getGameModeIcon()} me-2`}></i>
                    Frage {questionNumber} von {totalQuestions}
                  </h3>
                  <div className="d-flex align-items-center">
                    {/* Punkte-Anzeige */}
                    {multiplayerData?.isMultiplayer && (
                        <span className={`badge bg-light text-dark me-3 ${scoreAnimation ? 'animate-pulse' : ''}`}>
                        <i className="fas fa-star me-1"></i>
                          {currentScore} Punkte
                      </span>
                    )}

                    {/* Zeit-Anzeige */}
                    {timeLeft !== null && (
                        <div className="d-flex align-items-center">
                          <i className="fas fa-clock me-2"></i>
                          <span className={`badge ${timeLeft <= 10 ? 'bg-danger' : 'bg-light'} text-dark fs-6`}>
                          {timeLeft}s
                        </span>
                        </div>
                    )}
                  </div>
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
                  {question.difficulty && (
                      <small className="text-muted ms-3">
                        <i className="fas fa-signal me-1"></i>
                        Schwierigkeit: {question.difficulty}
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

                {/* Timeout-Meldung */}
                {showExplanation && selectedAnswer === null && (
                    <div className="mt-4 p-3 bg-warning rounded">
                      <h6>
                        <i className="fas fa-clock me-2"></i>
                        Zeit abgelaufen!
                      </h6>
                      <p className="mb-0">
                        Die Zeit ist abgelaufen. Die richtige Antwort war: <strong>{question.answers[question.correctAnswer]}</strong>
                      </p>
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
                    {gameMode !== 'single-player' && (
                        <span className="badge bg-secondary ms-2">
                      {gameMode === 'cooperative' ? 'Kooperativ' : 'Kompetitiv'}
                    </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat-Bereich (nur für cooperative Mode) */}
          {layout.chat && (
              <div className={layout.chat + " mb-4"}>
                {renderChatWindow()}
              </div>
          )}

          {/* Ranking-Bereich (für beide Multiplayer-Modi) */}
          {layout.ranking && (
              <div className={layout.ranking + " mb-4"}>
                {renderRankingWindow()}
              </div>
          )}
        </div>
      </div>
  );
}

export default QuizQuestion;