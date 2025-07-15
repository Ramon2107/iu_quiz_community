/**
 * QuizCategorySelector-Komponente - Kategorieauswahl für Quiz
 *
 * Diese Komponente ermöglicht es Benutzern, eine Kategorie für ihr Quiz auszuwählen.
 * Sie zeigt verfügbare Kategorien mit Anzahl der Fragen und Beschreibungen an.
 *
 * Features:
 * - Anzeige aller verfügbaren Kategorien
 * - Fragenanzahl pro Kategorie
 * - Responsive Karten-Design
 * - Suchfunktion für Kategorien
 * - Rückkehr zur Modus-Auswahl
 * - Unterstützung für alle Spielmodi
 *
 * UPDATE: Erweiterte Anzeige mit Fragenanzahl
 * UPDATE: Suchfunktion für Kategorien
 * UPDATE: Spielmodus-spezifische Anzeige
 *
 * @author IU Quiz Community
 * @version 1.3.0
 * @since 2025-07-15
 */

import React, { useState, useMemo } from 'react';
import dataManager from '../../data/dataManager';

/**
 * QuizCategorySelector-Komponente
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Array} props.categories - Verfügbare Kategorien
 * @param {Function} props.onCategorySelect - Callback für Kategorieauswahl
 * @param {Function} props.onBack - Callback für Rückkehr
 * @param {string} props.gameMode - Aktueller Spielmodus
 * @param {number} props.questionCount - Gewünschte Fragenanzahl
 * @param {Object} props.user - Benutzerdaten
 * @returns {JSX.Element} Die gerenderte QuizCategorySelector-Komponente
 */
function QuizCategorySelector({
                                categories,
                                onCategorySelect,
                                onBack,
                                gameMode,
                                questionCount,
                                user
                              }) {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Berechnet die Anzahl verfügbarer Fragen pro Kategorie
   */
  const categoriesWithQuestionCount = useMemo(() => {
    const allQuestions = dataManager.getQuestionsForQuiz();

    return categories.map(category => {
      const questionsInCategory = allQuestions.filter(q => q.category === category.name);
      return {
        ...category,
        questionCount: questionsInCategory.length,
        hasEnoughQuestions: questionsInCategory.length >= questionCount
      };
    });
  }, [categories, questionCount]);

  /**
   * Filtert Kategorien basierend auf Suchbegriff
   */
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categoriesWithQuestionCount;

    return categoriesWithQuestionCount.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoriesWithQuestionCount, searchTerm]);

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
   * Gibt Spielmodus-Namen zurück
   */
  const getGameModeName = () => {
    switch (gameMode) {
      case 'cooperative':
        return 'Kooperativ';
      case 'competitive':
        return 'Kompetitiv';
      default:
        return 'Single Player';
    }
  };

  /**
   * Behandelt Kategorieauswahl
   */
  const handleCategorySelect = (category) => {
    if (category.hasEnoughQuestions) {
      onCategorySelect(category);
    }
  };

  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-lg">
              <div className={`card-header ${getGameModeClass()} text-white`}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h2 className="mb-0">
                      <i className={`${getGameModeIcon()} me-2`}></i>
                      Kategorie auswählen
                    </h2>
                  </div>
                  <div className="col-md-6 text-md-end">
                  <span className="badge bg-light text-dark fs-6">
                    {getGameModeName()} • {questionCount} Fragen
                  </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {/* Suchleiste */}
                <div className="row mb-4">
                  <div className="col-md-8 mx-auto">
                    <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Kategorie suchen..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                          <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => setSearchTerm('')}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Kategorien-Übersicht */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="alert alert-info">
                      <div className="row text-center">
                        <div className="col-md-3">
                          <i className="fas fa-layer-group fa-2x mb-2"></i>
                          <div><strong>{categories.length}</strong></div>
                          <small>Kategorien verfügbar</small>
                        </div>
                        <div className="col-md-3">
                          <i className="fas fa-question-circle fa-2x mb-2"></i>
                          <div><strong>{questionCount}</strong></div>
                          <small>Fragen gewählt</small>
                        </div>
                        <div className="col-md-3">
                          <i className="fas fa-clock fa-2x mb-2"></i>
                          <div><strong>{getEstimatedTime()}</strong></div>
                          <small>Geschätzte Dauer</small>
                        </div>
                        <div className="col-md-3">
                          <i className="fas fa-user fa-2x mb-2"></i>
                          <div><strong>{user.name}</strong></div>
                          <small>Spieler</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kategorien-Karten */}
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-search fa-3x text-muted mb-3"></i>
                      <h4 className="text-muted">Keine Kategorien gefunden</h4>
                      <p className="text-muted">
                        Versuchen Sie einen anderen Suchbegriff oder
                        <button
                            className="btn btn-link p-0 ms-1"
                            onClick={() => setSearchTerm('')}
                        >
                          alle Kategorien anzeigen
                        </button>
                      </p>
                    </div>
                ) : (
                    <div className="row g-4">
                      {filteredCategories.map((category) => (
                          <div key={category.id} className="col-md-6 col-lg-4">
                            <div
                                className={`card h-100 ${
                                    category.hasEnoughQuestions
                                        ? 'border-primary category-card'
                                        : 'border-secondary'
                                }`}
                                style={{
                                  cursor: category.hasEnoughQuestions ? 'pointer' : 'not-allowed',
                                  opacity: category.hasEnoughQuestions ? 1 : 0.6
                                }}
                                onClick={() => handleCategorySelect(category)}
                            >
                              <div className="card-body">
                                <div className="text-center mb-3">
                                  <i className={`fas fa-${category.icon} fa-3x text-${category.color}`}></i>
                                </div>
                                <h5 className="card-title text-center">{category.name}</h5>
                                <p className="card-text text-muted small">
                                  {category.description}
                                </p>

                                {/* Fragen-Statistik */}
                                <div className="mt-3">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Verfügbare Fragen:</small>
                                    <span className={`badge ${
                                        category.hasEnoughQuestions
                                            ? 'bg-success'
                                            : 'bg-warning text-dark'
                                    }`}>
                                {category.questionCount}
                              </span>
                                  </div>

                                  {!category.hasEnoughQuestions && (
                                      <div className="text-center mt-2">
                                        <small className="text-warning">
                                          <i className="fas fa-exclamation-triangle me-1"></i>
                                          Nicht genug Fragen für {questionCount} Auswahl
                                        </small>
                                      </div>
                                  )}
                                </div>
                              </div>

                              {category.hasEnoughQuestions && (
                                  <div className="card-footer bg-transparent border-top-0">
                                    <div className="d-grid">
                                      <button className="btn btn-primary btn-sm">
                                        <i className="fas fa-play me-2"></i>
                                        Auswählen
                                      </button>
                                    </div>
                                  </div>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </div>

              {/* Footer mit Navigation */}
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                      className="btn btn-secondary"
                      onClick={onBack}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Zurück zur Fragenanzahl
                  </button>

                  <div className="text-muted">
                    <small>
                      {filteredCategories.filter(c => c.hasEnoughQuestions).length} von {filteredCategories.length} Kategorien verfügbar
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS für Hover-Effekte */}
        <style jsx>{`
        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }
      `}</style>
      </div>
  );

  /**
   * Berechnet die geschätzte Dauer basierend auf Spielmodus und Fragenanzahl
   */
  function getEstimatedTime() {
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
    const totalMinutes = Math.round(questionCount * timePerQuestion);
    return `${totalMinutes} Min`;
  }
}

export default QuizCategorySelector;