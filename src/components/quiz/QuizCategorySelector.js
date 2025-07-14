/**
 * QuizCategorySelector-Komponente
 *
 * Diese Komponente zeigt verfügbare Quiz-Kategorien an und ermöglicht
 * die Auswahl einer Kategorie für das Quiz.
 *
 * UPDATE: Integration mit DataManager für konsistente Datenverwendung
 * UPDATE: Verbesserte Card-Darstellung für gleichmäßige Proportionen
 *
 * UPDATE: Verwendet jetzt den zentralen DataManager statt
 * direktem Import von mockData für konsistente Datenverwendung.
 */

import React, { useState, useEffect } from 'react';
import dataManager from '../../data/dataManager'; // KORRIGIERT: Verwendet DataManager

function QuizCategorySelector({ gameMode, onCategorySelect, onBackToModeSelection }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * UPDATE: Lädt Kategorien über DataManager
   *
   * Der DataManager stellt sicher, dass Mock-Daten verfügbar sind
   * und bietet eine konsistente Schnittstelle für alle Komponenten.
   */
  useEffect(() => {
    loadCategories();
  }, []);

  /**
   * Lädt alle verfügbaren Kategorien über DataManager
   *
   * UPDATE: Verwendet DataManager.getCategoriesForQuiz() für
   * Quiz-kompatible Kategorienobjekte
   */
  const loadCategories = () => {
    setIsLoading(true);

    try {
      // Verwendet DataManager statt direkten Import
      const loadedCategories = dataManager.getCategoriesForQuiz();
      console.log('QuizCategorySelector: Geladene Kategorien:', loadedCategories);

      // Kategorien mit Fragenanzahl anreichern
      const categoriesWithQuestionCount = loadedCategories.map(category => {
        const questions = dataManager.getQuestionsForQuiz();
        const questionCount = questions.filter(q => q.category === category.name).length;

        return {
          ...category,
          questionCount
        };
      });

      setCategories(categoriesWithQuestionCount);
    } catch (error) {
      console.error('Fehler beim Laden der Kategorien:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Behandelt die Kategorieauswahl
   *
   * KORRIGIERT: Übergibt nur die Kategorie, QuizMain filtert die Fragen
   *
   * @param {Object} category - Ausgewählte Kategorie
   */
  const handleCategorySelect = (category) => {
    if (category.questionCount === 0) {
      alert('Diese Kategorie enthält keine Fragen.');
      return;
    }

    // Nur Kategorie übergeben, QuizMain filtert die Fragen
    onCategorySelect(category);
  };

  /**
   * Gibt die Spielmodus-spezifische Beschreibung zurück
   *
   * @returns {Object} Spielmodus-Informationen
   */
  const getGameModeInfo = () => {
    switch (gameMode) {
      case 'single-player':
        return {
          icon: 'fas fa-user',
          color: 'primary',
          title: 'Single-Player-Modus',
          description: 'Lernen Sie in Ihrem eigenen Tempo ohne Zeitdruck.'
        };
      case 'cooperative':
        return {
          icon: 'fas fa-users',
          color: 'success',
          title: 'Kooperativer Modus',
          description: 'Arbeiten Sie zusammen mit anderen Studierenden.'
        };
      case 'competitive':
        return {
          icon: 'fas fa-trophy',
          color: 'warning',
          title: 'Kompetitiver Modus',
          description: 'Treten Sie im Wettkampf gegen andere an.'
        };
      default:
        return {
          icon: 'fas fa-question',
          color: 'secondary',
          title: 'Quiz-Modus',
          description: 'Wählen Sie eine Kategorie für Ihr Quiz.'
        };
    }
  };

  const modeInfo = getGameModeInfo();

  // Ladezustand
  if (isLoading) {
    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Laden...</span>
                  </div>
                  <p className="mt-3">Kategorien werden geladen...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="mb-0">
                      <i className={`${modeInfo.icon} me-2`}></i>
                      Kategorie auswählen
                    </h2>
                    <small className="text-muted">{modeInfo.title}</small>
                  </div>
                  <button
                      className="btn btn-outline-secondary"
                      onClick={onBackToModeSelection}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Zurück zur Modus-Auswahl
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className={`alert alert-${modeInfo.color}`}>
                  <i className={`${modeInfo.icon} me-2`}></i>
                  <strong>{modeInfo.title}:</strong> {modeInfo.description}
                </div>

                {categories.length === 0 ? (
                    <div className="alert alert-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      Keine Kategorien verfügbar. Bitte erstellen Sie zuerst Kategorien und Fragen
                      über den Frageneditor.
                    </div>
                ) : (
                    // Verbesserte Card-Darstellung für gleichmäßige Proportionen
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      {categories.map((category) => (
                          <div key={category.id} className="col">
                            <div className={`card h-100 ${category.questionCount === 0 ? 'border-secondary' : `border-${category.color}`}`}>
                              <div className={`card-header ${category.questionCount === 0 ? 'bg-secondary' : `bg-${category.color}`} text-white`}>
                                <h5 className="mb-0">
                                  <i className={`fas fa-${category.icon} me-2`}></i>
                                  {category.name}
                                </h5>
                              </div>
                              <div className="card-body d-flex flex-column">
                                <p className="card-text flex-grow-1">{category.description}</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                  <div>
                                    <small className="text-muted">
                                      <i className="fas fa-question-circle me-1"></i>
                                      {category.questionCount} Fragen
                                    </small>
                                  </div>
                                  <div>
                                    {category.questionCount > 0 && (
                                        <span className={`badge bg-${category.color}`}>
                                          Verfügbar
                                        </span>
                                    )}
                                    {category.questionCount === 0 && (
                                        <span className="badge bg-secondary">
                                          Keine Fragen
                                        </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <button
                                    className={`btn w-100 ${
                                        category.questionCount > 0
                                            ? `btn-${category.color}`
                                            : 'btn-secondary'
                                    }`}
                                    onClick={() => handleCategorySelect(category)}
                                    disabled={category.questionCount === 0}
                                >
                                  {category.questionCount > 0 ? (
                                      <>
                                        <i className="fas fa-play me-2"></i>
                                        Quiz starten
                                      </>
                                  ) : (
                                      <>
                                        <i className="fas fa-ban me-2"></i>
                                        Keine Fragen
                                      </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}

                {/* Hinweis für Benutzer */}
                <div className="card bg-light mt-4">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="fas fa-info-circle me-2"></i>
                      Hinweis
                    </h6>
                    <p className="mb-2">
                      Sie können neue Kategorien und Fragen über den <strong>Frageneditor</strong> erstellen.
                      Alle Kategorien mit verfügbaren Fragen werden hier angezeigt.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <small className="text-muted">
                          <i className="fas fa-lightbulb me-1"></i>
                          <strong>Tipp:</strong> Erstellen Sie eigene Fragen, um Ihr Wissen zu vertiefen.
                        </small>
                      </div>
                      <div className="col-md-6">
                        <small className="text-muted">
                          <i className="fas fa-users me-1"></i>
                          <strong>Community:</strong> Teilen Sie Ihr Wissen mit anderen Studierenden.
                        </small>
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

export default QuizCategorySelector;