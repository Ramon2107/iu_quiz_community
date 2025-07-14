/**
 * QuizResults-Komponente
 * 
 * Diese Komponente zeigt die Ergebnisse eines abgeschlossenen Quiz an
 * und bietet detaillierte Statistiken sowie Verbesserungsvorschläge.
 * 
 * Features:
 * - Detaillierte Statistiken
 * - Grafische Darstellung der Ergebnisse
 * - Kategorieanalyse
 * - Empfehlungen für weiteres Lernen
 * - Responsive Design
 */

import React from 'react';

/**
 * QuizResults-Komponente
 * 
 * @param {Object} props - Komponenteneigenschaften
 * @param {Array} props.answers - Alle gegebenen Antworten
 * @param {Array} props.questions - Alle gestellten Fragen
 * @param {string} props.gameMode - Spielmodus
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onRestart - Callback für Neustart
 */
function QuizResults({ answers, questions, gameMode, user, onRestart }) {
  // Statistiken berechnen
  const totalQuestions = questions.length;
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Durchschnittliche Zeit (nur für kompetitiven Modus)
  const averageTime = gameMode === 'competitive' 
    ? Math.round(answers.reduce((sum, answer) => sum + (answer.timeTaken || 0), 0) / answers.length)
    : null;

  // Kategorieanalyse
  const categoryStats = {};
  questions.forEach((question, index) => {
    const category = question.category;
    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, correct: 0 };
    }
    categoryStats[category].total++;
    if (answers[index].isCorrect) {
      categoryStats[category].correct++;
    }
  });

  /**
   * Bestimmt die Bewertung basierend auf dem Prozentsatz
   * 
   * @param {number} percent - Prozentsatz der richtigen Antworten
   * @returns {Object} Bewertungsobjekt mit Titel, Farbe und Icon
   */
  const getGrade = (percent) => {
    if (percent >= 90) return { title: 'Exzellent', color: 'success', icon: 'trophy' };
    if (percent >= 80) return { title: 'Sehr gut', color: 'success', icon: 'star' };
    if (percent >= 70) return { title: 'Gut', color: 'warning', icon: 'thumbs-up' };
    if (percent >= 60) return { title: 'Befriedigend', color: 'warning', icon: 'check' };
    if (percent >= 50) return { title: 'Ausreichend', color: 'danger', icon: 'exclamation-triangle' };
    return { title: 'Ungenügend', color: 'danger', icon: 'times' };
  };

  const grade = getGrade(percentage);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Hauptergebnis */}
          <div className="card mb-4">
            <div className={`card-header bg-${grade.color} text-white`}>
              <h2 className="mb-0">
                <i className={`fas fa-${grade.icon} me-2`}></i>
                Quiz beendet - {grade.title}
              </h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="display-4 text-primary mb-2">{percentage}%</div>
                  <p className="text-muted">Richtige Antworten</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="display-4 text-success mb-2">{correctAnswers}</div>
                  <p className="text-muted">von {totalQuestions} Fragen</p>
                </div>
                <div className="col-md-4 text-center">
                  {gameMode === 'competitive' && averageTime && (
                    <>
                      <div className="display-4 text-info mb-2">{averageTime}s</div>
                      <p className="text-muted">Durchschnittliche Zeit</p>
                    </>
                  )}
                  {gameMode === 'cooperative' && (
                    <>
                      <div className="display-4 text-warning mb-2">
                        <i className="fas fa-users"></i>
                      </div>
                      <p className="text-muted">Kooperativ gespielt</p>
                    </>
                  )}
                </div>
              </div>

              {/* Fortschrittsbalken */}
              <div className="progress mt-3" style={{ height: '20px' }}>
                <div 
                  className={`progress-bar bg-${grade.color}`}
                  role="progressbar" 
                  style={{ width: `${percentage}%` }}
                >
                  {percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Kategorieanalyse */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                Analyse nach Kategorien
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {Object.entries(categoryStats).map(([category, stats]) => {
                  const categoryPercent = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={category} className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-title">{category}</h6>
                          <div className="d-flex justify-content-between">
                            <span>{stats.correct} von {stats.total}</span>
                            <span className={`badge bg-${getGrade(categoryPercent).color}`}>
                              {categoryPercent}%
                            </span>
                          </div>
                          <div className="progress mt-2">
                            <div 
                              className={`progress-bar bg-${getGrade(categoryPercent).color}`}
                              style={{ width: `${categoryPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detaillierte Antworten */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Detaillierte Antworten
              </h5>
            </div>
            <div className="card-body">
              {questions.map((question, index) => (
                <div key={question.id} className="mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">
                        <span className="badge bg-secondary me-2">{index + 1}</span>
                        {question.question}
                      </h6>
                      <div className="text-muted small">
                        <strong>Richtige Antwort:</strong> {question.answers[question.correctAnswer]}
                      </div>
                      {answers[index].selectedAnswer !== null && (
                        <div className="text-muted small">
                          <strong>Ihre Antwort:</strong> {question.answers[answers[index].selectedAnswer]}
                        </div>
                      )}
                    </div>
                    <div className="ms-3">
                      {answers[index].isCorrect ? (
                        <i className="fas fa-check-circle text-success"></i>
                      ) : (
                        <i className="fas fa-times-circle text-danger"></i>
                      )}
                    </div>
                  </div>
                  {index < questions.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>

          {/* Empfehlungen */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2"></i>
                Empfehlungen
              </h5>
            </div>
            <div className="card-body">
              {percentage >= 80 ? (
                <div className="alert alert-success">
                  <h6 className="alert-heading">Ausgezeichnet!</h6>
                  <p className="mb-0">
                    Sie haben ein sehr gutes Verständnis des Themas gezeigt. 
                    Versuchen Sie nun schwierigere Fragen oder helfen Sie anderen 
                    Studierenden beim Lernen.
                  </p>
                </div>
              ) : percentage >= 60 ? (
                <div className="alert alert-warning">
                  <h6 className="alert-heading">Gut gemacht!</h6>
                  <p className="mb-0">
                    Sie sind auf dem richtigen Weg. Üben Sie weiter und 
                    konzentrieren Sie sich auf die Bereiche, in denen Sie 
                    weniger Punkte erreicht haben.
                  </p>
                </div>
              ) : (
                <div className="alert alert-danger">
                  <h6 className="alert-heading">Mehr Übung erforderlich</h6>
                  <p className="mb-0">
                    Keine Sorge! Lernen ist ein Prozess. Wiederholen Sie 
                    die Grundlagen und versuchen Sie es im kooperativen 
                    Modus, um von anderen zu lernen.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Aktionen */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-center gap-3">
                <button 
                  className="btn btn-primary"
                  onClick={onRestart}
                >
                  <i className="fas fa-redo me-2"></i>
                  Neues Quiz starten
                </button>
                <button 
                  className="btn btn-success"
                  onClick={() => window.print()}
                >
                  <i className="fas fa-print me-2"></i>
                  Ergebnisse drucken
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
