/**
 * QuestionEditor-Komponente
 * 
 * Diese Komponente ermöglicht es Benutzern, neue Quiz-Fragen zu erstellen
 * und bestehende Fragen zu bearbeiten. Sie unterstützt kollaboratives
 * Erstellen von Fragenkatalogen.
 * 
 * Features:
 * - Intuitive Formularerstellung
 * - Validierung der Eingaben
 * - Vorschau der Fragen
 * - Kategorisierung
 * - Schwierigkeitsgrade
 * - Erklärungen für Antworten
 */

import React, { useState } from 'react';

/**
 * QuestionEditor-Komponente
 * 
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.user - Benutzerdaten
 */
function QuestionEditor({ user }) {
  // Zustandsverwaltung für Formular
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

  // Verfügbare Kategorien
  const categories = [
    'Informatik',
    'Mathematik',
    'Betriebswirtschaft',
    'Projektmanagement',
    'Softwareentwicklung',
    'Datenbanken',
    'Netzwerke',
    'Sicherheit'
  ];

  /**
   * Aktualisiert die Formulardaten
   * 
   * @param {string} field - Feldname
   * @param {any} value - Neuer Wert
   */
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
   * Aktualisiert eine Antwort
   * 
   * @param {number} index - Index der Antwort
   * @param {string} value - Neuer Wert
   */
  const updateAnswer = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    updateFormData('answers', newAnswers);
  };

  /**
   * Validiert das Formular
   * 
   * @returns {boolean} True wenn valide, false wenn Fehler vorhanden
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
   * Speichert die Frage
   */
  const saveQuestion = () => {
    if (!validateForm()) {
      return;
    }

    const newQuestion = {
      id: Date.now(),
      ...formData,
      author: user.name,
      created: new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setSavedQuestions(prev => [...prev, newQuestion]);
    
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
    
    // Erfolgsmeldung (könnte durch Toast-Notification ersetzt werden)
    alert('Frage erfolgreich gespeichert!');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Formular */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">
                <i className="fas fa-plus-circle me-2"></i>
                Neue Frage erstellen
              </h3>
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
                  <small className="form-text text-muted">
                    Wählen Sie die richtige Antwort durch Klicken auf den entsprechenden Radio-Button aus.
                  </small>
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
                        <option key={category} value={category}>
                          {category}
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
                  <small className="form-text text-muted">
                    Diese Erklärung wird nach der Beantwortung der Frage angezeigt.
                  </small>
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
                  <small className="form-text text-muted">
                    Trennen Sie Tags durch Kommas. Beispiel: Java, OOP, Vererbung
                  </small>
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
        </div>

        {/* Seitenleiste */}
        <div className="col-md-4">
          {/* Vorschau */}
          {showPreview && (
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-eye me-2"></i>
                  Vorschau
                </h5>
              </div>
              <div className="card-body">
                {formData.question && (
                  <>
                    <h6 className="card-title">{formData.question}</h6>
                    <div className="mb-3">
                      <span className="badge bg-secondary me-2">
                        {formData.category || 'Keine Kategorie'}
                      </span>
                      <span className={`badge ${
                        formData.difficulty === 'Leicht' ? 'bg-success' :
                        formData.difficulty === 'Mittel' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {formData.difficulty}
                      </span>
                    </div>
                    <div className="mb-3">
                      {formData.answers.map((answer, index) => (
                        answer && (
                          <div key={index} className="form-check">
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
                      <div className="alert alert-info">
                        <small><strong>Erklärung:</strong> {formData.explanation}</small>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Hilfetexte */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Tipps
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Formulieren Sie Fragen klar und eindeutig
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Vermeiden Sie doppelte Verneinungen
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Fügen Sie hilfreiche Erklärungen hinzu
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Verwenden Sie passende Tags für bessere Suche
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gespeicherte Fragen */}
      {savedQuestions.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  Ihre erstellten Fragen ({savedQuestions.length})
                </h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Frage</th>
                        <th>Kategorie</th>
                        <th>Schwierigkeit</th>
                        <th>Erstellt</th>
                        <th>Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedQuestions.map((question) => (
                        <tr key={question.id}>
                          <td>{question.question.substring(0, 50)}...</td>
                          <td>
                            <span className="badge bg-secondary">
                              {question.category}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${
                              question.difficulty === 'Leicht' ? 'bg-success' :
                              question.difficulty === 'Mittel' ? 'bg-warning' : 'bg-danger'
                            }`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td>{new Date(question.created).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionEditor;
