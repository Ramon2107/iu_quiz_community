/**
 * QuizCategorySelector-Komponente
 *
 * Diese Komponente ermöglicht es Benutzern, eine Fragensammlung (Kategorie)
 * für das Quiz auszuwählen.
 *
 * ERWEITERT: Single-Player-Modus hinzugefügt
 *
 * Unterstützte Spielmodi:
 * - 'cooperative': Kooperatives Lernen
 * - 'competitive': Kompetitiver Modus mit Zeitdruck
 * - 'single-player': Individuelles Lernen
 */

import React, { useState } from 'react';
import { getCategories, getMockQuestions } from '../../data/mockData';

function QuizCategorySelector({ gameMode, onCategorySelect, onBackToModeSelection }) {
  // State für verfügbare Kategorien und Fragenstatistiken
  const [categories] = useState(getCategories());
  const [questionsPerCategory] = useState(() => {
    // Berechne die Anzahl der Fragen pro Kategorie beim ersten Laden
    const allQuestions = getMockQuestions();
    const questionStats = {};

    getCategories().forEach(category => {
      questionStats[category.name] = allQuestions.filter(
          question => question.category === category.name
      ).length;
    });

    return questionStats;
  });

  /**
   * Behandelt die Auswahl einer Kategorie
   *
   * @param {Object} category - Ausgewählte Kategorie
   */
  const handleCategorySelect = (category) => {
    console.log('Kategorie ausgewählt:', category.name, 'für Spielmodus:', gameMode);

    // Filtere Fragen nach ausgewählter Kategorie
    const allQuestions = getMockQuestions();
    const filteredQuestions = allQuestions.filter(
        question => question.category === category.name
    );

    // Gebe die gefilterten Fragen an die übergeordnete Komponente weiter
    onCategorySelect(category, filteredQuestions);
  };

  /**
   * Gibt die CSS-Klasse für die Kategorie-Karte zurück
   */
  const getCardClass = (category) => {
    return `card h-100 border-${category.color} category-card`;
  };

  /**
   * Gibt die CSS-Klasse für den Kategorie-Header zurück
   */
  const getHeaderClass = (category) => {
    return `card-header bg-${category.color} text-white`;
  };

  /**
   * Gibt die CSS-Klasse für den Auswahl-Button zurück
   */
  const getButtonClass = (category) => {
    return `btn btn-${category.color} w-100`;
  };

  /**
   * Gibt den Spielmodus-Text für die Anzeige zurück
   */
  const getGameModeText = () => {
    switch (gameMode) {
      case 'single-player':
        return 'Single-Player';
      case 'cooperative':
        return 'Kooperativer';
      case 'competitive':
        return 'Kompetitiver';
      default:
        return 'Unbekannter';
    }
  };

  /**
   * Gibt die Icon-Klasse für den Spielmodus zurück
   */
  const getGameModeIcon = () => {
    switch (gameMode) {
      case 'single-player':
        return 'fas fa-user';
      case 'cooperative':
        return 'fas fa-users';
      case 'competitive':
        return 'fas fa-trophy';
      default:
        return 'fas fa-question';
    }
  };

  /**
   * Gibt die Farbe für den Spielmodus zurück
   */
  const getGameModeColor = () => {
    switch (gameMode) {
      case 'single-player':
        return 'primary';
      case 'cooperative':
        return 'success';
      case 'competitive':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  /**
   * Gibt die Beschreibung für den Spielmodus zurück
   */
  const getGameModeDescription = () => {
    switch (gameMode) {
      case 'single-player':
        return 'Lernen Sie in Ihrem eigenen Tempo ohne Zeitdruck. Perfekt für individuelles Studium.';
      case 'cooperative':
        return 'Arbeiten Sie mit anderen zusammen und diskutieren Sie Lösungsansätze.';
      case 'competitive':
        return 'Messen Sie sich mit anderen unter Zeitdruck. Schnelligkeit und Genauigkeit zählen.';
      default:
        return 'Wählen Sie eine Kategorie für Ihr Quiz aus.';
    }
  };

  return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {/* Header mit Spielmodus-Anzeige */}
            <div className="card mb-4">
              <div className={`card-header bg-${getGameModeColor()} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">
                    <i className="fas fa-layer-group me-2"></i>
                    Fragensammlung auswählen
                  </h2>
                  <div className="d-flex align-items-center">
                    <i className={`${getGameModeIcon()} me-2`}></i>
                    <span className="badge bg-light text-dark">
                    {getGameModeText()} Modus
                  </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>{getGameModeDescription()}</strong>
                </p>
                <p className="card-text">
                  Wählen Sie eine Fragensammlung für Ihr <strong>{getGameModeText().toLowerCase()}es</strong> Quiz aus.
                  Jede Kategorie enthält spezifische Fragen zu verschiedenen Themengebieten.
                </p>

                {/* Spielmodus-spezifische Hinweise */}
                {gameMode === 'single-player' && (
                    <div className="alert alert-primary">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Single-Player-Tipp:</strong> Nehmen Sie sich die Zeit, die Sie brauchen.
                      Konzentrieren Sie sich auf das Verstehen der Inhalte.
                    </div>
                )}

                {gameMode === 'cooperative' && (
                    <div className="alert alert-success">
                      <i className="fas fa-users me-2"></i>
                      <strong>Kooperativ-Tipp:</strong> Diskutieren Sie mit anderen Studierenden über
                      schwierige Fragen und lernen Sie voneinander.
                    </div>
                )}

                {gameMode === 'competitive' && (
                    <div className="alert alert-warning">
                      <i className="fas fa-stopwatch me-2"></i>
                      <strong>Kompetitiv-Tipp:</strong> Sie haben nur 30 Sekunden pro Frage!
                      Bereiten Sie sich gut vor und antworten Sie schnell.
                    </div>
                )}

                {/* Zurück-Button */}
                <button
                    className="btn btn-outline-secondary"
                    onClick={onBackToModeSelection}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Zurück zur Modus-Auswahl
                </button>
              </div>
            </div>

            {/* Kategorie-Auswahl */}
            <div className="row">
              {categories.map(category => (
                  <div key={category.id} className="col-md-6 col-lg-4 mb-4">
                    <div className={getCardClass(category)}>
                      <div className={getHeaderClass(category)}>
                        <h5 className="mb-0">
                          <i className={`fas fa-${category.icon} me-2`}></i>
                          {category.name}
                        </h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          {category.description}
                        </p>

                        {/* Fragenstatistiken */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">
                          <i className="fas fa-question-circle me-1"></i>
                          Verfügbare Fragen:
                        </span>
                            <span className={`badge bg-${category.color}`}>
                          {questionsPerCategory[category.name] || 0}
                        </span>
                          </div>
                        </div>

                        {/* Schwierigkeitsverteilung (simuliert) */}
                        <div className="mb-3">
                          <small className="text-muted">Schwierigkeitsverteilung:</small>
                          <div className="progress mt-1" style={{ height: '6px' }}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: '40%' }}
                                title="Leicht"
                            ></div>
                            <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: '35%' }}
                                title="Mittel"
                            ></div>
                            <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: '25%' }}
                                title="Schwer"
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between mt-1">
                            <small className="text-success">Leicht</small>
                            <small className="text-warning">Mittel</small>
                            <small className="text-danger">Schwer</small>
                          </div>
                        </div>

                        {/* Spielmodus-spezifische Kategorie-Informationen */}
                        {gameMode === 'single-player' && (
                            <div className="mb-2">
                              <small className="text-primary">
                                <i className="fas fa-clock me-1"></i>
                                Kein Zeitlimit - Lernen Sie in Ruhe
                              </small>
                            </div>
                        )}

                        {gameMode === 'competitive' && (
                            <div className="mb-2">
                              <small className="text-warning">
                                <i className="fas fa-stopwatch me-1"></i>
                                30 Sekunden pro Frage
                              </small>
                            </div>
                        )}
                      </div>

                      {/* Auswahl-Button */}
                      <div className="card-footer">
                        <button
                            className={getButtonClass(category)}
                            onClick={() => handleCategorySelect(category)}
                            disabled={questionsPerCategory[category.name] === 0}
                        >
                          {questionsPerCategory[category.name] > 0 ? (
                              <>
                                <i className="fas fa-play me-2"></i>
                                Quiz starten
                              </>
                          ) : (
                              <>
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                Keine Fragen verfügbar
                              </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {/* Zusätzliche Informationen */}
            <div className="card bg-light">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-info-circle me-2"></i>
                  Hinweise zur Fragensammlung - {getGameModeText()} Modus
                </h6>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-0">
                      <li><i className="fas fa-check text-success me-2"></i>Alle Fragen sind fachlich geprüft</li>
                      <li><i className="fas fa-check text-success me-2"></i>Verschiedene Schwierigkeitsgrade</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-0">
                      <li><i className="fas fa-check text-success me-2"></i>Regelmäßige Aktualisierungen</li>
                      <li><i className="fas fa-check text-success me-2"></i>Erklärungen zu jeder Frage</li>
                    </ul>
                  </div>
                </div>

                {/* Spielmodus-spezifische Zusatzinformationen */}
                {gameMode === 'single-player' && (
                    <div className="mt-3">
                      <div className="alert alert-primary mb-0">
                        <i className="fas fa-user me-2"></i>
                        <strong>Single-Player-Vorteile:</strong> Lernen Sie in Ihrem eigenen Tempo,
                        wiederholen Sie schwierige Fragen und fokussieren Sie sich auf das Verstehen.
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default QuizCategorySelector;