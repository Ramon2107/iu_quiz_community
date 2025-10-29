/**
 * Erweiterte Komponente zur Erstellung und Bearbeitung von Quiz-Fragen mit XSS-Schutz.
 * @namespace admin_QuestionEditor
 * @author Projektteam IU Community Quiz
 * @version 1.5.0
 */

import React, { useState, useEffect } from 'react';
import CardManager from './CardManager';
import { sanitizeInput } from '../../utils/xssUtils';

/**
 * QuestionEditor - Erweiterte Komponente zur Erstellung und Bearbeitung von Quiz-Fragen
 *
 * **Sicherheitsfeatures:**
 * - XSS-Schutz für alle Eingabefelder
 * - Bereinigung aller Benutzereingaben
 * - Sichere Speicherung von Fragen und Antworten
 *
 * **Hauptfunktionen:**
 * - Intuitive Formularerstellung mit Validierung
 * - Vorschau der Fragen vor dem Speichern
 * - Dynamische Kategorisierung
 * - Schwierigkeitsgrade (Leicht, Mittel, Schwer)
 * - Erklärungen für korrekte Antworten
 *
 * **Kollaborative Features:**
 * - Integration mit CardManager-Komponente
 * - Autorenzuordnung bei Fragenerstellung
 * - Verwaltung von Karten und Kategorien
 * - Unterstützung für Mehrfachautoren
 *
 * Diese Komponente bietet umfassenden XSS-Schutz für alle Eingabefelder,
 * indem sie Benutzereingaben bereinigt und potenziell gefährliche Zeichen
 * in sichere HTML-Entitäten umwandelt, ohne die Funktionalität zu beeinträchtigen.
 *
 * @function QuestionEditor
 * @memberOf admin_QuestionEditor
 * @param {Object} props - Component properties
 * @param {Object} props.user - Aktueller Benutzer
 * @returns {React.ReactElement} Die gerenderte QuestionEditor-Komponente
 * @example
 * <QuestionEditor user={currentUser} />
 */
function QuestionEditor({ user }) {
  // Zustandsverwaltung für aktuelle Ansicht
  const [currentView, setCurrentView] = useState('card-manager'); // 'card-manager' oder 'question-form'

  // Zustandsverwaltung für Formular (Legacy-Support)
  const [formData, setFormData] = useState({
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: null,
    category: '',
    difficulty: 'Mittel',
    explanation: '',
    tags: ''
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [categories, setCategories] = useState([]);

  /**
   * Lädt verfügbare Kategorien beim Component Mount
   * @memberOf admin_QuestionEditor
   */
  useEffect(() => {
    loadCategories();
  }, []);

  /**
   * Lädt Kategorien aus localStorage
   * @memberOf admin_QuestionEditor
   */
  const loadCategories = () => {
    const storedCategories = JSON.parse(localStorage.getItem('quiz-categories') || '[]');
    setCategories(storedCategories);
  };

  /**
   * Callback-Funktion für neue Fragen aus CardManager
   * @memberOf admin_QuestionEditor
   */
  const handleQuestionAdded = (newQuestion) => {
    console.log('Neue Frage hinzugefügt:', newQuestion);
    setSavedQuestions(prev => [...prev, newQuestion]);
  };

  /**
   * Callback-Funktion für neue Kategorien aus CardManager
   * @memberOf admin_QuestionEditor
   */
  const handleCategoryAdded = (newCategory) => {
    console.log('Neue Kategorie hinzugefügt:', newCategory);
    setCategories(prev => [...prev, newCategory]);
  };

  /**
   * Aktualisiert die Formulardaten (Legacy-Support)
   * 
   * Diese Funktion bereinigt alle Texteingaben mit XSS-Schutz,
   * bevor sie im Formular-Zustand gespeichert werden.
   *
   * @param {string} field - Feldname
   * @param {any} value - Neuer Wert
   * @memberOf admin_QuestionEditor
   */
  const updateFormData = (field, value) => {
    // XSS-Schutz für Texteingaben
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    // Fehler für dieses Feld entfernen
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  /**
   * Aktualisiert eine Antwort (Legacy-Support)
   * 
   * Diese Funktion bereinigt die Antwort-Eingabe mit XSS-Schutz,
   * bevor sie im Formular-Zustand gespeichert wird.
   *
   * @param {number} index - Index der Antwort
   * @param {string} value - Neuer Wert
   * @memberOf admin_QuestionEditor
   */
  const updateAnswer = (index, value) => {
    // XSS-Schutz für Antwort-Eingabe
    const sanitizedValue = sanitizeInput(value);
    
    const newAnswers = [...formData.answers];
    newAnswers[index] = sanitizedValue;
    updateFormData('answers', newAnswers);
  };

  /**
   * Validiert das Formular (Legacy-Support)
   *
   * @returns {boolean} True wenn valide, false wenn Fehler vorhanden
   * @memberOf admin_QuestionEditor
   */
  const validateForm = () => {
    const newErrors = {};

    // Frage validieren
    if (!formData.question.trim()) {
      newErrors.question = 'Frage ist erforderlich';
    }

    // Antworten validieren
    const filledAnswers = formData.answers.filter(answer => answer.trim());
    if (filledAnswers.length < 2) {
      newErrors.answers = 'Mindestens 2 Antworten sind erforderlich';
    }

    // Richtige Antwort validieren
    if (formData.correctAnswer === null) {
      newErrors.correctAnswer = 'Richtige Antwort muss ausgewählt werden';
    }

    // Kategorie validieren
    if (!formData.category) {
      newErrors.category = 'Kategorie ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Speichert die Frage (Legacy-Support)
   * @memberOf admin_QuestionEditor
   */
  const saveQuestion = () => {
    if (!validateForm()) {
      return;
    }

    const newQuestion = {
      id: Date.now(),
      ...formData,
      author: user.name,
      authorEmail: user.email,
      created: new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setSavedQuestions(prev => [...prev, newQuestion]);

    // Auch zu localStorage hinzufügen
    const existingCards = JSON.parse(localStorage.getItem('quiz-cards') || '[]');
    const updatedCards = [...existingCards, newQuestion];
    localStorage.setItem('quiz-cards', JSON.stringify(updatedCards));

    // Formular zurücksetzen
    setFormData({
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: null,
      category: '',
      difficulty: 'Mittel',
      explanation: '',
      tags: ''
    });

    setShowPreview(false);

    // Erfolgsmeldung
    alert('Frage erfolgreich gespeichert!');
  };

  /**
   * Rendert das Legacy-Formular (als Fallback)
   * @memberOf admin_QuestionEditor
   */
  const renderLegacyForm = () => (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <i className="fas fa-plus-circle me-2"></i>
              Neue Frage erstellen (Legacy)
            </h3>
            <button
                className="btn btn-outline-primary"
                onClick={() => setCurrentView('card-manager')}
            >
              <i className="fas fa-layer-group me-2"></i>
              Zur Kartenverwaltung
            </button>
          </div>
        </div>
        <div className="card-body">
          <form>
            {/* Frage */}
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Frage *
              </label>
              <textarea
                  id="question"
                  className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                  rows="3"
                  value={formData.question}
                  onChange={(e) => updateFormData('question', e.target.value)}
                  placeholder="Geben Sie hier Ihre Frage ein..."
              />
              {errors.question && (
                  <div className="invalid-feedback">{errors.question}</div>
              )}
            </div>

            {/* Antworten */}
            <div className="mb-3">
              <label className="form-label">Antwortmöglichkeiten *</label>
              {formData.answers.map((answer, index) => (
                  <div key={index} className="input-group mb-2">
                <span className="input-group-text">
                  {String.fromCharCode(65 + index)}
                </span>
                    <input
                        type="text"
                        className="form-control"
                        value={answer}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                        placeholder={`Antwort ${String.fromCharCode(65 + index)}`}
                    />
                    <div className="input-group-text">
                      <input
                          type="radio"
                          name="correctAnswer"
                          checked={formData.correctAnswer === index}
                          onChange={() => updateFormData('correctAnswer', index)}
                          disabled={!answer.trim()}
                      />
                    </div>
                  </div>
              ))}
              {errors.answers && (
                  <div className="text-danger small">{errors.answers}</div>
              )}
              {errors.correctAnswer && (
                  <div className="text-danger small">{errors.correctAnswer}</div>
              )}
            </div>

            {/* Kategorie und Schwierigkeit */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="category" className="form-label">
                  Kategorie *
                </label>
                <select
                    id="category"
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                >
                  <option value="">Kategorie auswählen</option>
                  {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                  ))}
                </select>
                {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="difficulty" className="form-label">
                  Schwierigkeit
                </label>
                <select
                    id="difficulty"
                    className="form-select"
                    value={formData.difficulty}
                    onChange={(e) => updateFormData('difficulty', e.target.value)}
                >
                  <option value="Leicht">Leicht</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Schwer">Schwer</option>
                </select>
              </div>
            </div>

            {/* Erklärung */}
            <div className="mb-3">
              <label htmlFor="explanation" className="form-label">
                Erklärung (optional)
              </label>
              <textarea
                  id="explanation"
                  className="form-control"
                  rows="2"
                  value={formData.explanation}
                  onChange={(e) => updateFormData('explanation', e.target.value)}
                  placeholder="Erklärung der richtigen Antwort..."
              />
            </div>

            {/* Tags */}
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (optional)
              </label>
              <input
                  type="text"
                  id="tags"
                  className="form-control"
                  value={formData.tags}
                  onChange={(e) => updateFormData('tags', e.target.value)}
                  placeholder="Tag1, Tag2, Tag3..."
              />
            </div>

            {/* Aktionen */}
            <div className="d-flex gap-2">
              <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveQuestion}
              >
                <i className="fas fa-save me-2"></i>
                Frage speichern
              </button>
              <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPreview(!showPreview)}
              >
                <i className="fas fa-eye me-2"></i>
                {showPreview ? 'Vorschau ausblenden' : 'Vorschau anzeigen'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );

  /**
   * Rendert die Statistiken
   * @memberOf admin_QuestionEditor
   */
  const renderStats = () => (
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-chart-bar me-2"></i>
                Ihre Statistiken
              </h5>
              <div className="row">
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="text-primary">{savedQuestions.length}</h3>
                    <p className="text-muted">Erstellte Fragen</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="text-success">{categories.length}</h3>
                    <p className="text-muted">Verfügbare Kategorien</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-info-circle me-2"></i>
                Kollaborative Features
              </h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-check text-success me-2"></i>Gemeinsame Kategorien erstellen</li>
                <li><i className="fas fa-check text-success me-2"></i>Fragen zu bestehenden Kategorien hinzufügen</li>
                <li><i className="fas fa-check text-success me-2"></i>Autorenzuordnung für Transparenz</li>
                <li><i className="fas fa-check text-success me-2"></i>Öffentliche und private Sammlungen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );

  // Hauptrender-Logik
  return (
      <div className="container mt-4">
        {currentView === 'card-manager' && (
            <div>
              <CardManager
                  user={user}
                  onQuestionAdded={handleQuestionAdded}
                  onCategoryAdded={handleCategoryAdded}
              />

              {/* Schnellzugriff auf Legacy-Formular */}
              <div className="mt-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">Legacy-Formular</h5>
                        <p className="text-muted mb-0">
                          Verwenden Sie das klassische Formular, falls Sie es bevorzugen.
                        </p>
                      </div>
                      <button
                          className="btn btn-outline-primary"
                          onClick={() => setCurrentView('question-form')}
                      >
                        <i className="fas fa-edit me-2"></i>
                        Klassisches Formular
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {renderStats()}
            </div>
        )}

        {currentView === 'question-form' && (
            <div>
              {renderLegacyForm()}
              {renderStats()}
            </div>
        )}

        {/* Vorschau (wenn aktiviert) */}
        {showPreview && formData.question && (
            <div className="card mt-4">
              <div className="card-header">
                <h5>Vorschau</h5>
              </div>
              <div className="card-body">
                <h6>{formData.question}</h6>
                <div className="mt-3">
                  {formData.answers.map((answer, index) => (
                      answer.trim() && (
                          <div key={index} className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="previewAnswer"
                                disabled
                                checked={formData.correctAnswer === index}
                            />
                            <label className="form-check-label">
                              {String.fromCharCode(65 + index)}: {answer}
                            </label>
                          </div>
                      )
                  ))}
                </div>
                {formData.explanation && (
                    <div className="mt-3">
                      <small className="text-muted">
                        <strong>Erklärung:</strong> {formData.explanation}
                      </small>
                    </div>
                )}
                <div className="mt-3">
                  <small className="text-muted">
                    <strong>Kategorie:</strong> {formData.category || 'Nicht ausgewählt'} |
                    <strong> Schwierigkeit:</strong> {formData.difficulty} |
                    <strong> Autor:</strong> {user.name}
                  </small>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default QuestionEditor;