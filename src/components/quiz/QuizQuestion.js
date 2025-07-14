/**
 * QuizQuestion-Komponente
 *
 * Diese Komponente zeigt eine einzelne Quiz-Frage mit ihren Antwortmöglichkeiten
 * an und verwaltet die Benutzerinteraktion.
 *
 * BUGFIX: Korrigierte useEffect-Abhängigkeiten und automatische Weiterleitung
 */

import React, { useState, useEffect, useCallback } from 'react';

function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer, gameMode }) {
  // WICHTIG: Sicherheitsprüfung für undefined question
  if (!question) {
    return (
        <div className="card">
          <div className="card-body">
            <div className="alert alert-danger">
              <h5>Fehler beim Laden der Frage</h5>
              <p>Die Frage konnte nicht geladen werden. Bitte versuchen Sie es erneut.</p>
            </div>
          </div>
        </div>
    );
  }

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime] = useState(Date.now());
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState(null);

  // useCallback für stabile Referenz der handleTimeUp Funktion
  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      console.log('Zeit ist abgelaufen - automatische Weiterleitung');
      setIsAnswered(true);
      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      // Antwort senden
      onAnswer({
        selectedAnswer: null,
        isCorrect: false,
        timeTaken: timeTaken,
        questionId: question.id
      });
    }
  }, [isAnswered, startTime, onAnswer, question.id]);

  // Effekt zum Zurücksetzen des Zustands bei neuer Frage
  useEffect(() => {
    console.log('Neue Frage geladen:', question.id);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setIsAnswered(false);

    // Timer für automatischen Fortschritt zurücksetzen
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
    }
  }, [question.id, autoAdvanceTimer]);

  // Timer-Effekt für kompetitiven Modus
  useEffect(() => {
    if (gameMode === 'competitive' && !isAnswered) {
      console.log('Timer gestartet für kompetitiven Modus');
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        console.log('Timer gestoppt');
        clearInterval(timer);
      };
    }
  }, [gameMode, isAnswered, handleTimeUp]);

  // Effekt für automatische Weiterleitung nach Antwort
  useEffect(() => {
    if (isAnswered && question.explanation) {
      console.log('Antwort gegeben - starte automatische Weiterleitung in 3 Sekunden');
      const timer = setTimeout(() => {
        console.log('Automatische Weiterleitung zur nächsten Frage');
        // Hier wird nicht nochmal onAnswer aufgerufen, da das bereits geschehen ist
      }, 3000);

      setAutoAdvanceTimer(timer);

      return () => clearTimeout(timer);
    }
  }, [isAnswered, question.explanation]);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    console.log('Antwort ausgewählt:', answerIndex);
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || isAnswered) return;

    console.log('Antwort wird gesendet:', selectedAnswer);
    setIsAnswered(true);
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Antwort an übergeordnete Komponente senden
    onAnswer({
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect,
      timeTaken: timeTaken,
      questionId: question.id
    });
  };

  const getAnswerClass = (index) => {
    let baseClass = 'list-group-item list-group-item-action';
    if (selectedAnswer === index) {
      baseClass += ' active';
    }
    if (isAnswered && index === question.correctAnswer) {
      baseClass += ' list-group-item-success';
    }
    if (isAnswered && index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      baseClass += ' list-group-item-danger';
    }
    return baseClass;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="fas fa-question-circle me-2"></i>
              Frage {questionNumber} von {totalQuestions}
            </h5>

            {gameMode === 'competitive' && (
                <div className="d-flex align-items-center">
                  <i className="fas fa-clock me-2"></i>
                  <span className={`badge ${timeLeft <= 10 ? 'bg-danger' : 'bg-primary'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
            )}
          </div>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <span className="badge bg-secondary me-2">
              <i className="fas fa-tag me-1"></i>
              {question.category}
            </span>
            <span className={`badge ${
                question.difficulty === 'Leicht' ? 'bg-success' :
                    question.difficulty === 'Mittel' ? 'bg-warning' : 'bg-danger'
            }`}>
              <i className="fas fa-chart-line me-1"></i>
              {question.difficulty}
            </span>
          </div>

          <h4 className="card-title mb-4">{question.question}</h4>

          <div className="mb-4">
            <div className="list-group">
              {question.answers.map((answer, index) => (
                  <button
                      key={index}
                      type="button"
                      className={getAnswerClass(index)}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      style={{ cursor: isAnswered ? 'not-allowed' : 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="badge bg-light text-dark me-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-grow-1 text-start">{answer}</span>
                      {selectedAnswer === index && !isAnswered && (
                          <i className="fas fa-check text-white"></i>
                      )}
                      {isAnswered && index === question.correctAnswer && (
                          <i className="fas fa-check-circle text-success"></i>
                      )}
                      {isAnswered && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                          <i className="fas fa-times-circle text-danger"></i>
                      )}
                    </div>
                  </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            {gameMode === 'cooperative' && !isAnswered && (
                <div className="alert alert-info">
                  <i className="fas fa-users me-2"></i>
                  <strong>Kooperativer Modus:</strong> Nehmen Sie sich die Zeit, die Sie benötigen.
                </div>
            )}

            {gameMode === 'competitive' && !isAnswered && (
                <div className="alert alert-warning">
                  <i className="fas fa-stopwatch me-2"></i>
                  <strong>Kompetitiver Modus:</strong> Sie haben {timeLeft} Sekunden Zeit!
                </div>
            )}

            {isAnswered && (
                <div className={`alert ${selectedAnswer === question.correctAnswer ? 'alert-success' : 'alert-danger'}`}>
                  <i className={`fas ${selectedAnswer === question.correctAnswer ? 'fa-check-circle' : 'fa-times-circle'} me-2`}></i>
                  <strong>
                    {selectedAnswer === question.correctAnswer ? 'Richtig!' : 'Falsch!'}
                  </strong>
                  {selectedAnswer !== question.correctAnswer && (
                      <span> Die richtige Antwort war: {question.answers[question.correctAnswer]}</span>
                  )}
                </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              {selectedAnswer !== null && !isAnswered && (
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    Antwort {String.fromCharCode(65 + selectedAnswer)} ausgewählt
                  </small>
              )}
              {isAnswered && (
                  <small className="text-muted">
                    <i className="fas fa-clock me-1"></i>
                    Benötigte Zeit: {formatTime(Math.round((Date.now() - startTime) / 1000))}
                  </small>
              )}
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null || isAnswered}
            >
              {isAnswered ? (
                  <>
                    <i className="fas fa-check me-2"></i>
                    Antwort gesendet
                  </>
              ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>
                    Antwort bestätigen
                  </>
              )}
            </button>
          </div>
        </div>

        {isAnswered && question.explanation && (
            <div className="card-footer">
              <div className="alert alert-info mb-3">
                <h6 className="alert-heading">
                  <i className="fas fa-lightbulb me-2"></i>
                  Erklärung
                </h6>
                <p className="mb-0">{question.explanation}</p>
              </div>

              <div className="text-center">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Laden...</span>
                </div>
                <small className="text-muted">
                  Nächste Frage wird automatisch geladen...
                </small>
              </div>
            </div>
        )}
      </div>
  );
}

export default QuizQuestion;