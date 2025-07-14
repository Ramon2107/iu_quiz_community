/**
 * QuizQuestion-Komponente
 *
 * Diese Komponente zeigt eine einzelne Quiz-Frage mit ihren Antwortmöglichkeiten
 * an und verwaltet die Benutzerinteraktion.
 */

import React, { useState, useEffect } from 'react';

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

  // Timer-Effekt für kompetitiven Modus
  useEffect(() => {
    if (gameMode === 'competitive' && !isAnswered) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameMode, isAnswered]);

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      onAnswer({
        selectedAnswer: null,
        isCorrect: false,
        timeTaken: timeTaken,
        questionId: question.id
      });
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || isAnswered) return;

    setIsAnswered(true);
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const isCorrect = selectedAnswer === question.correctAnswer;

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
                      {selectedAnswer === index && (
                          <i className="fas fa-check text-white"></i>
                      )}
                    </div>
                  </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            {gameMode === 'cooperative' && (
                <div className="alert alert-info">
                  <i className="fas fa-users me-2"></i>
                  <strong>Kooperativer Modus:</strong> Nehmen Sie sich die Zeit, die Sie benötigen.
                </div>
            )}

            {gameMode === 'competitive' && (
                <div className="alert alert-warning">
                  <i className="fas fa-stopwatch me-2"></i>
                  <strong>Kompetitiver Modus:</strong> Sie haben {timeLeft} Sekunden Zeit!
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
              <div className="alert alert-info mb-0">
                <h6 className="alert-heading">
                  <i className="fas fa-lightbulb me-2"></i>
                  Erklärung
                </h6>
                <p className="mb-0">{question.explanation}</p>
              </div>
            </div>
        )}
      </div>
  );
}

export default QuizQuestion;