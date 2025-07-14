/**
 * Hauptquiz-Komponente
 * 
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt
 * verschiedene Spielmodi bereit (kooperativ und kompetitiv).
 * 
 * Features:
 * - Kooperativer und kompetitiver Spielmodus
 * - Responsive Design für alle Endgeräte
 * - Echtzeitfeedback bei Antworten
 * - Fortschrittsanzeige
 * - Ergebnisauswertung
 */

import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { getMockQuestions } from '../../data/mockData';

/**
 * QuizMain-Komponente - Zentrale Quiz-Verwaltung
 * 
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.user - Benutzerdaten
 */
function QuizMain({ user }) {
  // Zustandsverwaltung für Quiz
  const [gameMode, setGameMode] = useState(null); // 'cooperative' oder 'competitive'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Lädt die Fragen beim Start einer neuen Runde
   */
  useEffect(() => {
    if (gameMode) {
      loadQuestions();
    }
  }, [gameMode]);

  /**
   * Lädt Mock-Fragen für das Quiz
   */
  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      // Simulation einer API-Anfrage
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockQuestions = getMockQuestions();
      setQuestions(mockQuestions);
    } catch (error) {
      console.error('Fehler beim Laden der Fragen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Startet ein neues Quiz
   * 
   * @param {string} mode - Spielmodus ('cooperative' oder 'competitive')
   */
  const startQuiz = (mode) => {
    setGameMode(mode);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  /**
   * Verarbeitet eine Antwort
   * 
   * @param {Object} answer - Antwortdaten
   */
  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  /**
   * Setzt das Quiz zurück
   */
  const resetQuiz = () => {
    setGameMode(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  // Spielmodus-Auswahl anzeigen
  if (!gameMode) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">
                  <i className="fas fa-play me-2"></i>
                  Quiz-Modus auswählen
                </h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Kooperativer Modus */}
                  <div className="col-md-6 mb-3">
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
                        </ul>
                      </div>
                      <div className="card-footer">
                        <button 
                          className="btn btn-success w-100"
                          onClick={() => startQuiz('cooperative')}
                        >
                          Kooperativ spielen
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Kompetitiver Modus */}
                  <div className="col-md-6 mb-3">
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
                        </ul>
                      </div>
                      <div className="card-footer">
                        <button 
                          className="btn btn-warning w-100"
                          onClick={() => startQuiz('competitive')}
                        >
                          Kompetitiv spielen
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

  // Ladeanzeige
  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Laden...</span>
                </div>
                <h5>Fragen werden geladen...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ergebnisse anzeigen
  if (showResults) {
    return (
      <QuizResults
        answers={answers}
        questions={questions}
        gameMode={gameMode}
        user={user}
        onRestart={resetQuiz}
      />
    );
  }

  // Quiz-Frage anzeigen
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Fortschrittsanzeige */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <i className="fas fa-gamepad me-2"></i>
                  {gameMode === 'cooperative' ? 'Kooperativer' : 'Kompetitiver'} Modus
                </h6>
                <span className="badge bg-primary">
                  Frage {currentQuestionIndex + 1} von {questions.length}
                </span>
              </div>
              <div className="progress mt-2">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quiz-Frage */}
          <QuizQuestion
            question={questions[currentQuestionIndex]}
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

export default QuizMain;
