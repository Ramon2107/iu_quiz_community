/**
 * QuizResults-Komponente
 *
 * Diese Komponente zeigt die Ergebnisse eines abgeschlossenen Quiz an
 * und bietet verschiedene Optionen für weitere Aktionen.
 *
 * Erweitert um:
 * - Anzeige der ausgewählten Kategorie
 * - Zusätzliche Navigationsoptionen
 * - Kategorie-spezifische Statistiken
 */

import React from 'react';

/**
 * QuizResults-Komponente für die Anzeige der Quiz-Ergebnisse
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Array} props.answers - Benutzerantworten
 * @param {Array} props.questions - Quiz-Fragen
 * @param {string} props.gameMode - Spielmodus
 * @param {Object} props.category - Ausgewählte Kategorie (neu)
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onRestart - Callback für kompletten Neustart
 * @param {Function} props.onRestartSameCategory - Callback für Neustart mit gleicher Kategorie (neu)
 * @param {Function} props.onBackToCategories - Callback für Rückkehr zur Kategorie-Auswahl (neu)
 */
function QuizResults({
                       answers,
                       questions,
                       gameMode,
                       category,
                       user,
                       onRestart,
                       onRestartSameCategory,
                       onBackToCategories
                     }) {
  /**
   * Berechnet die Ergebnisstatistiken
   *
   * @returns {Object} Statistikobjekt mit Ergebnissen
   */
  const calculateStats = () => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Berechne Durchschnittszeit pro Frage
    const totalTime = answers.reduce((sum, answer) => sum + answer.timeTaken, 0);
    const averageTime = Math.round(totalTime / totalQuestions);

    // Bestimme Leistungslevel
    let performanceLevel = 'Schlecht';
    let performanceColor = 'danger';
    if (percentage >= 80) {
      performanceLevel = 'Exzellent';
      performanceColor = 'success';
    } else if (percentage >= 60) {
      performanceLevel = 'Gut';
      performanceColor = 'primary';
    } else if (percentage >= 40) {
      performanceLevel = 'Befriedigend';
      performanceColor = 'warning';
    }

    return {
      correctAnswers,
      totalQuestions,
      percentage,
      totalTime,
      averageTime,
      performanceLevel,
      performanceColor
    };
  };

  /**
   * Gibt die Farbe für die Antwort zurück
   *
   * @param {boolean} isCorrect - Ob die Antwort richtig war
   * @returns {string} CSS-Klasse für die Farbe
   */
  const getAnswerColor = (isCorrect) => {
    return isCorrect ? 'text-success' : 'text-danger';
  };

  /**
   * Gibt das Icon für die Antwort zurück
   *
   * @param {boolean} isCorrect - Ob die Antwort richtig war
   * @returns {string} CSS-Klasse für das Icon
   */
  const getAnswerIcon = (isCorrect) => {
    return isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle';
  };

  /**
   * Formatiert die Zeit
   *
   * @param {number} seconds - Zeit in Sekunden
   * @returns {string} Formatierte Zeit
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = calculateStats();

  return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {/* Ergebnis-Header */}
            <div className="card mb-4">
              <div className={`card-header bg-${stats.performanceColor} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">
                    <i className="fas fa-trophy me-2"></i>
                    Quiz beendet!
                  </h2>
                  <div className="d-flex align-items-center">
                    {/* Kategorie-Info */}
                    {category && (
                        <span className="badge bg-light text-dark me-2">
                      <i className={`fas fa-${category.icon} me-1`}></i>
                          {category.name}
                    </span>
                    )}
                    {/* Spielmodus */}
                    <span className="badge bg-light text-dark">
                    <i className={`fas fa-${gameMode === 'cooperative' ? 'users' : 'trophy'} me-1`}></i>
                      {gameMode === 'cooperative' ? 'Kooperativ' : 'Kompetitiv'}
                  </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-3">
                    <h3 className={`text-${stats.performanceColor}`}>
                      {stats.correctAnswers}/{stats.totalQuestions}
                    </h3>
                    <p className="text-muted">Richtige Antworten</p>
                  </div>
                  <div className="col-md-3">
                    <h3 className={`text-${stats.performanceColor}`}>
                      {stats.percentage}%
                    </h3>
                    <p className="text-muted">Erfolgsquote</p>
                  </div>
                  <div className="col-md-3">
                    <h3 className="text-info">
                      {formatTime(stats.totalTime)}
                    </h3>
                    <p className="text-muted">Gesamtzeit</p>
                  </div>
                  <div className="col-md-3">
                    <h3 className="text-secondary">
                      {formatTime(stats.averageTime)}
                    </h3>
                    <p className="text-muted">Ø Zeit/Frage</p>
                  </div>
                </div>

                {/* Leistungsbewertung */}
                <div className="text-center mt-3">
                  <h4 className={`text-${stats.performanceColor}`}>
                    <i className="fas fa-star me-2"></i>
                    {stats.performanceLevel}
                  </h4>
                  {category && (
                      <p className="text-muted">
                        in der Kategorie <strong>{category.name}</strong>
                      </p>
                  )}
                </div>
              </div>
            </div>

            {/* Detaillierte Antworten */}
            <div className="card mb-4">
              <div className="card-header">
                <h3 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  Detaillierte Auswertung
                </h3>
              </div>
              <div className="card-body">
                {answers.map((answer, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h6 className="mb-1">
                            <span className="badge bg-secondary me-2">#{index + 1}</span>
                            {questions[index]?.question}
                          </h6>
                          <p className="mb-1">
                            <strong>Ihre Antwort:</strong>
                            <span className={`ms-2 ${getAnswerColor(answer.isCorrect)}`}>
                          <i className={`${getAnswerIcon(answer.isCorrect)} me-1`}></i>
                              {answer.selectedAnswer !== null
                                  ? questions[index]?.answers[answer.selectedAnswer]
                                  : 'Keine Antwort (Zeit abgelaufen)'}
                        </span>
                          </p>
                          {!answer.isCorrect && (
                              <p className="mb-1">
                                <strong>Richtige Antwort:</strong>
                                <span className="ms-2 text-success">
                            <i className="fas fa-check-circle me-1"></i>
                                  {questions[index]?.answers[questions[index]?.correctAnswer]}
                          </span>
                              </p>
                          )}
                        </div>
                        <div className="text-end">
                          <small className="text-muted">
                            <i className="fas fa-clock me-1"></i>
                            {formatTime(answer.timeTaken)}
                          </small>
                        </div>
                      </div>
                      {index < answers.length - 1 && <hr />}
                    </div>
                ))}
              </div>
            </div>

            {/* Aktions-Buttons */}
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <button
                        className="btn btn-primary w-100"
                        onClick={onRestartSameCategory}
                    >
                      <i className="fas fa-redo me-2"></i>
                      Gleiche Kategorie nochmal
                    </button>
                  </div>
                  <div className="col-md-4 mb-2">
                    <button
                        className="btn btn-info w-100"
                        onClick={onBackToCategories}
                    >
                      <i className="fas fa-layer-group me-2"></i>
                      Andere Kategorie wählen
                    </button>
                  </div>
                  <div className="col-md-4 mb-2">
                    <button
                        className="btn btn-secondary w-100"
                        onClick={onRestart}
                    >
                      <i className="fas fa-home me-2"></i>
                      Zurück zum Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default QuizResults;