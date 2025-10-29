/**
 * Anzeige der Quiz-Ergebnisse mit Statistiken und Rangliste.
 * @namespace quiz_Results
 * @author Projektteam IU Community Quiz
 * @version 1.2.0
 */

import React, { useState, useEffect } from 'react';
import simulatedPlayersService from '../../services/SimulatedPlayersService'; // Import für Multiplayer-Auswertung

/**
 * QuizResults - Anzeige der Quiz-Ergebnisse
 *
 * Diese Komponente zeigt die Ergebnisse des abgeschlossenen Quiz an,
 * einschließlich Statistiken, Antworten und Bewertungen.
 *
 * Features:
 * - Detaillierte Ergebnisübersicht mit Punkten und Genauigkeit
 * - Antworten-Review mit ausführlichen Erklärungen
 * - Statistiken und Leistungsmetriken für Spieler
 * - Responsive Design für alle Endgeräte
 * - Optionen für Wiederholung (gleiche oder neue Kategorie)
 * - Multiplayer-Rangliste für kooperative und kompetitive Modi
 * - Gewinner-Ermittlung und Gleichstands-Behandlung
 * - Farbcodierte Performance-Bewertung
 *
 * @function QuizResults
 * @memberOf quiz_Results
 * @param {Object} props - Component properties
 * @param {Array} props.questions - Alle Quiz-Fragen
 * @param {Array} props.answers - Alle gegebenen Antworten
 * @param {string} props.gameMode - Spielmodus
 * @param {Object} props.category - Ausgewählte Kategorie
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onRestart - Callback für Neustart
 * @param {Function} props.onRestartSameCategory - Callback für Wiederholung
 * @param {Function} props.onBackToCategorySelection - Callback für Kategorieauswahl
 * @param {Object} props.multiplayerData - Multiplayer-Daten
 * @returns {React.ReactElement} Die gerenderte QuizResults-Komponente
 * @example
 * <QuizResults
 *   questions={quizQuestions}
 *   answers={userAnswers}
 *   gameMode="cooperative"
 *   category={selectedCategory}
 *   user={currentUser}
 *   onRestart={handleRestart}
 * />
 */
function QuizResults({
                       questions,
                       answers,
                       gameMode,
                       category,
                       user,
                       onRestart,
                       onRestartSameCategory,
                       onBackToCategorySelection,
                       multiplayerData // Neue Prop für Multiplayer-Daten
                     }) {
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [multiplayerRanking, setMultiplayerRanking] = useState([]); // Rangliste für Multiplayer
  const [gameResults, setGameResults] = useState(null); // Spielergebnisse

  // Berechne Basis-Statistiken
  // Prüfe, ob answer definiert ist, bevor auf isCorrect zugegriffen wird, um Fehler zu vermeiden
  const correctAnswers = answers.filter(answer => answer && answer.isCorrect).length;
  const totalQuestions = questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  // Prüfe, ob answer definiert ist, bevor auf timeTaken zugegriffen wird, um Fehler zu vermeiden
  const totalTime = answers.reduce((sum, answer) => sum + (answer && answer.timeTaken ? answer.timeTaken : 0), 0);
  const averageTime = Math.round(totalTime / totalQuestions);

  // Berechne Multiplayer-Rangliste beim Component-Mount
  useEffect(() => {
    if (multiplayerData?.isMultiplayer) {
      const playerTotalScore = answers.reduce((acc, answer) => {
        if (!answer || !answer.isCorrect) return acc;
        const speedBonus = Math.max(0, 30 - (answer.timeTaken || 0));
        return acc + 100 + speedBonus;
      }, 0);

      const humanPlayerStats = {
        name: user.name,
        score: playerTotalScore,
        correctAnswers,
        averageTime,
        isHuman: true
      };

      const ranking = simulatedPlayersService.calculateFinalRanking(humanPlayerStats);
      setMultiplayerRanking(ranking);

      // Bestimme Gewinner und Spielergebnisse
      const results = analyzeGameResults(ranking);
      setGameResults(results);

      console.log('Multiplayer-Rangliste:', ranking);
      console.log('Spielergebnisse:', results);
    }
  }, [multiplayerData, correctAnswers, averageTime, user.name, answers]);

  /**
   * Analysiert Spielergebnisse für Multiplayer-Modi
   * @memberOf quiz_Results
   */
  const analyzeGameResults = (ranking) => {
    if (!ranking || ranking.length === 0) return null;

    // Finde Position des menschlichen Spielers
    const humanPosition = ranking.findIndex(p => p.isHuman) + 1;
    const winner = ranking[0];
    const isHumanWinner = winner.isHuman;

    // Prüfe auf Gleichstand
    const winnerScore = winner.score;
    const winners = ranking.filter(p => p.score === winnerScore);
    const isTie = winners.length > 1;

    // Variablen für Ergebnistyp, Nachricht und Farbe
    let resultType, resultMessage, resultColor;

    if (isTie) {
      if (winners.some(w => w.isHuman)) {
        resultType = 'tie_win';
        resultMessage = `Gleichstand! Sie teilen sich den ${winners.length > 2 ? 'Platz' : 'ersten Platz'} mit ${winners.length - 1} anderen Spielern.`;
        resultColor = 'warning';
      } else {
        resultType = 'tie_lose';
        resultMessage = `Gleichstand zwischen anderen Spielern. Sie erreichten Platz ${humanPosition}.`;
        resultColor = 'info';
      }
    } else {
      if (isHumanWinner) {
        resultType = 'win';
        resultMessage = 'Herzlichen Glückwunsch! Sie haben gewonnen!';
        resultColor = 'success';
      } else {
        resultType = 'lose';
        resultMessage = `Sie erreichten Platz ${humanPosition} von ${ranking.length} Spielern.`;
        resultColor = humanPosition <= 2 ? 'info' : 'secondary';
      }
    }

    return {
      type: resultType,
      message: resultMessage,
      color: resultColor,
      humanPosition,
      winner: winner.name,
      isHumanWinner,
      isTie,
      winners,
      totalPlayers: ranking.length
    };
  };

  /**
   * Gibt CSS-Klasse für Punktzahl zurück
   * @memberOf quiz_Results
   */
  const getScoreClass = () => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  /**
   * Gibt Performance-Bewertung zurück
   * @memberOf quiz_Results
   */
  const getPerformanceRating = () => {
    if (score >= 90) return { text: 'Hervorragend', icon: 'fas fa-star', color: 'success' };
    if (score >= 80) return { text: 'Sehr gut', icon: 'fas fa-thumbs-up', color: 'success' };
    if (score >= 70) return { text: 'Gut', icon: 'fas fa-smile', color: 'warning' };
    if (score >= 60) return { text: 'Befriedigend', icon: 'fas fa-meh', color: 'warning' };
    if (score >= 50) return { text: 'Ausreichend', icon: 'fas fa-frown', color: 'danger' };
    return { text: 'Nicht ausreichend', icon: 'fas fa-sad-tear', color: 'danger' };
  };

  /**
   * Gibt Spielmodus-spezifische CSS-Klasse zurück
   * @memberOf quiz_Results
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
   * @memberOf quiz_Results
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

  const performance = getPerformanceRating();

  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {/* Hauptergebnisse */}
            <div className="card shadow-lg">
              <div className={`card-header ${getGameModeClass()} text-white`}>
                <h2 className="mb-0">
                  <i className={`${getGameModeIcon()} me-2`}></i>
                  Quiz-Ergebnisse
                </h2>
              </div>
              <div className="card-body">
                {/* Multiplayer-Ergebnisse */}
                {multiplayerData?.isMultiplayer && gameResults && (
                    <div className={`alert alert-${gameResults.color} mb-4`}>
                      <div className="d-flex align-items-center">
                        <i className={`fas fa-${gameResults.type === 'win' ? 'trophy' : gameResults.type === 'tie_win' ? 'handshake' : 'medal'} fa-2x me-3`}></i>
                        <div>
                          <h4 className="mb-1">
                            {gameResults.type === 'win' ? 'Gewonnen!' :
                                gameResults.type === 'tie_win' ? 'Gleichstand!' :
                                    'Spiel beendet'}
                          </h4>
                          <p className="mb-0">{gameResults.message}</p>
                        </div>
                      </div>
                    </div>
                )}

                {/* Performance-Übersicht */}
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className={`${performance.icon} fa-2x text-${performance.color} mb-2`}></i>
                        <h4 className={getScoreClass()}>{score}%</h4>
                        <p className="mb-0">Gesamtpunktzahl</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
                        <h4>{correctAnswers}</h4>
                        <p className="mb-0">Richtige Antworten</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-times-circle fa-2x text-danger mb-2"></i>
                        <h4>{totalQuestions - correctAnswers}</h4>
                        <p className="mb-0">Falsche Antworten</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-clock fa-2x text-info mb-2"></i>
                        <h4>{averageTime}s</h4>
                        <p className="mb-0">Ø Zeit/Frage</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance-Bewertung */}
                <div className="text-center mb-4">
                  <h4 className={`text-${performance.color}`}>
                    <i className={`${performance.icon} me-2`}></i>
                    {performance.text}
                  </h4>
                  <p className="text-muted">
                    Sie haben {correctAnswers} von {totalQuestions} Fragen richtig beantwortet
                    {gameMode !== 'single-player' && ` im ${gameMode === 'cooperative' ? 'kooperativen' : 'kompetitiven'} Modus`}.
                  </p>
                </div>

                {/* Detaillierte Ergebnisse Toggle */}
                <div className="text-center mb-4">
                  <button
                      className="btn btn-outline-primary"
                      onClick={() => setShowDetailedResults(!showDetailedResults)}
                  >
                    <i className={`fas fa-chevron-${showDetailedResults ? 'up' : 'down'} me-2`}></i>
                    {showDetailedResults ? 'Detaillierte Ergebnisse ausblenden' : 'Detaillierte Ergebnisse anzeigen'}
                  </button>
                </div>

                {/* Detaillierte Ergebnisse */}
                {showDetailedResults && (
                    <div className="mt-4">
                      <h5>Detaillierte Antworten:</h5>
                      {questions.map((question, index) => {
                        const answer = answers[index];
                        // Prüfe, ob answer definiert ist, bevor auf isCorrect zugegriffen wird, um Fehler zu vermeiden
                        const isCorrect = answer && answer.isCorrect;
                        return (
                            <div key={index} className="card mb-3">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <h6>Frage {index + 1}:</h6>
                                  <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                              {isCorrect ? 'Richtig' : 'Falsch'}
                            </span>
                                </div>
                                <p className="mb-2">{question.question}</p>
                                <div className="row">
                                  <div className="col-md-6">
                                    <small className="text-muted">Ihre Antwort:</small>
                                    <p className={isCorrect ? 'text-success' : 'text-danger'}>
                                      {answer && answer.selectedAnswer !== null && question.answers 
                                        ? question.answers[answer.selectedAnswer] 
                                        : 'Nicht beantwortet'}
                                    </p>
                                  </div>
                                  <div className="col-md-6">
                                    <small className="text-muted">Richtige Antwort:</small>
                                    <p className="text-success">
                                      {question.answers && question.correctAnswer !== undefined 
                                        ? question.answers[question.correctAnswer] 
                                        : 'Nicht verfügbar'}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between text-muted">
                                  <small>Zeit: {answer && answer.timeTaken ? answer.timeTaken : '0'}s</small>
                                  <small>Kategorie: {question.category || 'Unbekannt'}</small>
                                </div>
                                {question.explanation && (
                                    <div className="mt-2 p-2 bg-light rounded">
                                      <small>
                                        <i className="fas fa-lightbulb me-1 text-warning"></i>
                                        <strong>Erklärung:</strong> {question.explanation}
                                      </small>
                                    </div>
                                )}
                              </div>
                            </div>
                        );
                      })}
                    </div>
                )}

                {/* Aktionen */}
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <button
                      className="btn btn-primary"
                      onClick={onRestartSameCategory}
                  >
                    <i className="fas fa-redo me-2"></i>
                    Gleiche Kategorie wiederholen
                  </button>
                  <button
                      className="btn btn-success"
                      onClick={onBackToCategorySelection}
                  >
                    <i className="fas fa-layer-group me-2"></i>
                    Andere Kategorie wählen
                  </button>
                  <button
                      className="btn btn-secondary"
                      onClick={onRestart}
                  >
                    <i className="fas fa-home me-2"></i>
                    Neuen Modus wählen
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* Quiz-Informationen */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  Quiz-Informationen
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <strong>Kategorie:</strong> {category?.name || 'Unbekannt'}
                </div>
                <div className="mb-2">
                  <strong>Spielmodus:</strong> {gameMode === 'cooperative' ? 'Kooperativ' : gameMode === 'competitive' ? 'Kompetitiv' : 'Single-Player'}
                </div>
                <div className="mb-2">
                  <strong>Gesamtzeit:</strong> {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')} Min
                </div>
                <div className="mb-2">
                  <strong>Gespielt von:</strong> {user.name}
                </div>
                <div>
                  <strong>Datum:</strong> {new Date().toLocaleDateString('de-DE')}
                </div>
              </div>
            </div>

            {/* Multiplayer-Rangliste */}
            {multiplayerData?.isMultiplayer && multiplayerRanking.length > 0 && (
                <div className="card">
                  <div className={`card-header ${getGameModeClass()} text-white py-1`}>
                    <h5 className="mb-0">
                      <i className="fas fa-trophy me-2"></i>
                      Rangliste
                    </h5>
                  </div>
                  <div className="card-body py-1">
                    <div className="list-group list-group-flush">
                      {multiplayerRanking.map((player, index) => (
                          <div key={player.id || index} className={`list-group-item ${player.isHuman ? 'bg-light' : ''}`}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold fs-5">
                            {index + 1}.
                          </span>
                                <div>
                                  <div className="d-flex align-items-center">
                                    <i className={`fas fa-${player.isHuman ? 'user-circle' : 'robot'} me-2 text-${player.isHuman ? 'primary' : player.color}`}></i>
                                    <span className={player.isHuman ? 'fw-bold' : ''}>
                                {player.name}
                                      {player.isHuman && <small className="text-muted ms-1">(Sie)</small>}
                              </span>
                                  </div>
                                  <small className="text-muted">
                                    {player.correctAnswers} richtige Antworten • Ø {player.averageTime}s
                                  </small>
                                </div>
                              </div>
                              <div className="text-end">
                          <span className="badge bg-primary fs-6">
                            {player.score} Punkte
                          </span>
                                {index === 0 && (
                                    <div>
                                      <i className="fas fa-crown text-warning"></i>
                                    </div>
                                )}
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>

                    {gameResults && (
                        <div className="mt-3 text-center">
                          <small className="text-muted">
                            {gameResults.type === 'win' ? 'Herzlichen Glückwunsch zum Sieg!' :
                                gameResults.type === 'tie_win' ? 'Geteilter Sieg - Gut gemacht!' :
                                    `Platz ${gameResults.humanPosition} von ${gameResults.totalPlayers} - Weiter so!`}
                          </small>
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

export default QuizResults;