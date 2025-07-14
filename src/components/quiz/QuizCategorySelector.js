/**
 * QuizCategorySelector-Komponente
 * 
 * Diese Komponente ermöglicht es Benutzern, eine Fragensammlung (Kategorie)
 * für das Quiz auszuwählen. Sie zeigt alle verfügbaren Kategorien mit
 * Beschreibungen und der Anzahl verfügbarer Fragen an.
 * 
 * Funktionalitäten:
 * - Anzeige aller verfügbaren Kategorien
 * - Anzahl der verfügbaren Fragen pro Kategorie
 * - Filterung der Fragen nach ausgewählter Kategorie
 * - Responsive Design für alle Bildschirmgrößen
 * - Zurück-Navigation zur Spielmodus-Auswahl
 */

import React, { useState, useEffect } from 'react';
import { getCategories, getMockQuestions } from '../../data/mockData';

/**
 * QuizCategorySelector-Komponente für die Auswahl der Fragensammlung
 * 
 * @param {Object} props - Komponenteneigenschaften
 * @param {string} props.gameMode - Gewählter Spielmodus ('cooperative' oder 'competitive')
 * @param {Function} props.onCategorySelect - Callback-Funktion bei Kategorieauswahl
 * @param {Function} props.onBackToModeSelection - Callback-Funktion für Zurück-Navigation
 */
function QuizCategorySelector({ gameMode, onCategorySelect, onBackToModeSelection }) {
  // State für verfügbare Kategorien und Fragenstatistiken
  const [categories, setCategories] = useState([]);
  const [questionsPerCategory, setQuestionsPerCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Lädt Kategorien und berechnet Fragenstatistiken beim Component Mount
   */
  useEffect(() => {
    loadCategoriesAndStats();
  }, []);

  /**
   * Lädt alle verfügbaren Kategorien und berechnet die Anzahl der Fragen pro Kategorie
   */
  const loadCategoriesAndStats = () => {
    // Lade alle verfügbaren Kategorien
    const availableCategories = getCategories();
    
    // Lade alle Fragen für Statistiken
    const allQuestions = getMockQuestions();
    
    // Berechne die Anzahl der Fragen pro Kategorie
    const questionStats = {};
    availableCategories.forEach(category => {
      questionStats[category.name] = allQuestions.filter(
        question => question.category === category.name
      ).length;
    });
    
    setCategories(availableCategories);
    setQuestionsPerCategory(questionStats);
  };

  /**
   * Behandelt die Auswahl einer Kategorie
   * 
   * @param {Object} category - Die ausgewählte Kategorie
   */
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
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
   * 
   * @param {Object} category - Kategorie-Objekt
   * @returns {string} CSS-Klasse für die Karte
   */
  const getCardClass = (category) => {
    return `card h-100 border-${category.color} category-card`;
  };

  /**
   * Gibt die CSS-Klasse für den Kategorie-Header zurück
   * 
   * @param {Object} category - Kategorie-Objekt
   * @returns {string} CSS-Klasse für den Header
   */
  const getHeaderClass = (category) => {
    return `card-header bg-${category.color} text-white`;
  };

  /**
   * Gibt die CSS-Klasse für den Auswahl-Button zurück
   * 
   * @param {Object} category - Kategorie-Objekt
   * @returns {string} CSS-Klasse für den Button
   */
  const getButtonClass = (category) => {
    return `btn btn-${category.color} w-100`;
  };

  /**
   * Gibt den Spielmodus-Text für die Anzeige zurück
   * 
   * @returns {string} Formatierter Spielmodus-Text
   */
  const getGameModeText = () => {
    return gameMode === 'cooperative' ? 'Kooperativer' : 'Kompetitiver';
  };

  /**
   * Gibt die Icon-Klasse für den Spielmodus zurück
   * 
   * @returns {string} CSS-Klasse für das Icon
   */
  const getGameModeIcon = () => {
    return gameMode === 'cooperative' ? 'fas fa-users' : 'fas fa-trophy';
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Header mit Spielmodus-Anzeige */}
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
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
                Wählen Sie eine Fragensammlung für Ihr <strong>{getGameModeText().toLowerCase()}es</strong> Quiz aus. 
                Jede Kategorie enthält spezifische Fragen zu verschiedenen Themengebieten.
              </p>
              
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
                Hinweise zur Fragensammlung
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizCategorySelector;
