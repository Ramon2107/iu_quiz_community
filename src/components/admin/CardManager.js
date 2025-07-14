/**
 * CardManager-Komponente für kollaborative Kartenverwaltung
 *
 *
 */

import React, { useState, useEffect } from 'react';
import dataManager from '../../data/dataManager';

function CardManager({ user, onQuestionAdded, onCategoryAdded }) {
  // Zustandsverwaltung für Kategorien und Karten
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentView, setCurrentView] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Zustandsverwaltung für Bearbeitung
  const [editingCard, setEditingCard] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Zustandsverwaltung für neue Kategorie
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'fas fa-folder',
    color: 'primary',
    isPublic: true,
    collaborators: []
  });

  // Zustandsverwaltung für neue Karte
  const [newCard, setNewCard] = useState({
    categoryId: '',
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: null,
    difficulty: 'Mittel',
    explanation: '',
    tags: '',
    isPublic: true
  });

  const [errors, setErrors] = useState({});

  // Verfügbare Icons und Farben
  const categoryIcons = [
    { value: 'fas fa-code', label: 'Programmierung' },
    { value: 'fas fa-laptop-code', label: 'Informatik' },
    { value: 'fas fa-database', label: 'Datenbank' },
    { value: 'fas fa-network-wired', label: 'Netzwerk' },
    { value: 'fas fa-calculator', label: 'Mathematik' },
    { value: 'fas fa-chart-line', label: 'Wirtschaft' },
    { value: 'fas fa-tasks', label: 'Projektmanagement' },
    { value: 'fas fa-shield-alt', label: 'Sicherheit' },
    { value: 'fas fa-cogs', label: 'Technik' },
    { value: 'fas fa-brain', label: 'Logik' },
    { value: 'fas fa-graduation-cap', label: 'Studium' },
    { value: 'fas fa-folder', label: 'Allgemein' }
  ];

  const categoryColors = [
    { value: 'primary', label: 'Blau', class: 'text-primary' },
    { value: 'success', label: 'Grün', class: 'text-success' },
    { value: 'warning', label: 'Gelb', class: 'text-warning' },
    { value: 'danger', label: 'Rot', class: 'text-danger' },
    { value: 'info', label: 'Türkis', class: 'text-info' },
    { value: 'secondary', label: 'Grau', class: 'text-secondary' }
  ];

  /**
   * Lädt Daten beim Component Mount
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Filtert Karten basierend auf Suchbegriff und Filtern
   */
  useEffect(() => {
    let filtered = dataManager.searchCards(searchTerm, authorFilter);

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(card => card.difficulty === difficultyFilter);
    }

    setFilteredCards(filtered);
  }, [searchTerm, authorFilter, difficultyFilter, cards]);

  /**
   * Lädt alle Daten über den DataManager
   */
  const loadData = () => {
    const loadedCategories = dataManager.getAllCategories();
    const loadedCards = dataManager.getAllCards();

    setCategories(loadedCategories);
    setCards(loadedCards);
  };

  /**
   * Validiert die neue Kategorie
   */
  const validateCategory = () => {
    const newErrors = {};

    if (!newCategory.name.trim()) {
      newErrors.categoryName = 'Kategoriename ist erforderlich';
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
      newErrors.categoryName = 'Kategorie existiert bereits';
    }

    if (!newCategory.description.trim()) {
      newErrors.categoryDescription = 'Beschreibung ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validiert die neue Karte
   */
  const validateCard = () => {
    const newErrors = {};

    if (!newCard.question.trim()) {
      newErrors.question = 'Frage ist erforderlich';
    }

    if (!newCard.categoryId) {
      newErrors.categoryId = 'Kategorie muss ausgewählt werden';
    }

    const filledAnswers = newCard.answers.filter(answer => answer.trim());
    if (filledAnswers.length < 2) {
      newErrors.answers = 'Mindestens 2 Antworten sind erforderlich';
    }

    if (newCard.correctAnswer === null) {
      newErrors.correctAnswer = 'Richtige Antwort muss ausgewählt werden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Erstellt eine neue Kategorie
   */
  const createCategory = () => {
    if (!validateCategory()) return;

    const categoryData = {
      ...newCategory,
      author: user.name,
      authorEmail: user.email
    };

    const savedCategory = dataManager.saveCategory(categoryData);

    // Daten neu laden
    loadData();

    // Callback für Parent-Komponente
    if (onCategoryAdded) {
      onCategoryAdded(savedCategory);
    }

    // Formular zurücksetzen
    setNewCategory({
      name: '',
      description: '',
      icon: 'fas fa-folder',
      color: 'primary',
      isPublic: true,
      collaborators: []
    });

    setCurrentView('overview');
    setErrors({});

    alert(`Kategorie "${savedCategory.name}" wurde erfolgreich erstellt!`);
  };

  /**
   * Erstellt eine neue Karte
   */
  const createCard = () => {
    if (!validateCard()) return;

    const cardData = {
      ...newCard,
      author: user.name,
      authorEmail: user.email
    };

    const savedCard = dataManager.saveCard(cardData);

    // Daten neu laden
    loadData();

    // Callback für Parent-Komponente
    if (onQuestionAdded) {
      onQuestionAdded(savedCard);
    }

    // Formular zurücksetzen
    setNewCard({
      categoryId: '',
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: null,
      difficulty: 'Mittel',
      explanation: '',
      tags: '',
      isPublic: true
    });

    setCurrentView('overview');
    setErrors({});

    alert('Karte wurde erfolgreich erstellt!');
  };

  /**
   * Löscht eine Karte
   */
  const deleteCard = (cardId) => {
    if (window.confirm('Möchten Sie diese Karte wirklich löschen?')) {
      dataManager.deleteCard(cardId);
      loadData();
      alert('Karte wurde gelöscht.');
    }
  };

  /**
   * Löscht eine Kategorie
   */
  const deleteCategory = (categoryId) => {
    try {
      if (window.confirm('Möchten Sie diese Kategorie wirklich löschen? Dies ist nur möglich, wenn keine Karten vorhanden sind.')) {
        dataManager.deleteCategory(categoryId);
        loadData();
        alert('Kategorie wurde gelöscht.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  /**
   * Startet die Bearbeitung einer Karte
   */
  const startEditCard = (card) => {
    setEditingCard({
      ...card,
      tags: Array.isArray(card.tags) ? card.tags.join(', ') : card.tags
    });
    setCurrentView('edit-card');
  };

  /**
   * Speichert die bearbeitete Karte
   */
  const saveEditedCard = () => {
    if (!editingCard.question.trim()) {
      alert('Frage ist erforderlich');
      return;
    }

    const updatedCard = {
      ...editingCard,
      tags: typeof editingCard.tags === 'string' ?
          editingCard.tags.split(',').map(t => t.trim()).filter(t => t) :
          editingCard.tags
    };

    dataManager.updateCard(editingCard.id, updatedCard);
    loadData();
    setEditingCard(null);
    setCurrentView('overview');
    alert('Karte wurde aktualisiert.');
  };

  /**
   * Aktualisiert eine Antwort der neuen Karte
   */
  const updateCardAnswer = (index, value) => {
    const newAnswers = [...newCard.answers];
    newAnswers[index] = value;
    setNewCard(prev => ({ ...prev, answers: newAnswers }));
  };

  /**
   * Aktualisiert eine Antwort der bearbeiteten Karte
   */
  const updateEditCardAnswer = (index, value) => {
    const newAnswers = [...editingCard.answers];
    newAnswers[index] = value;
    setEditingCard(prev => ({ ...prev, answers: newAnswers }));
  };

  /**
   * Gibt eindeutige Autoren zurück
   */
  const getUniqueAuthors = () => {
    return dataManager.getUniqueAuthors();
  };

  /**
   * Rendert die Übersicht mit erweiterten Such- und Filterfunktionen
   */
  const renderOverview = () => (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="fas fa-layer-group me-2"></i>
            Kartenverwaltung
          </h2>
          <div className="d-flex gap-2">
            <button
                className="btn btn-success"
                onClick={() => setCurrentView('add-category')}
            >
              <i className="fas fa-plus me-2"></i>
              Neue Kategorie
            </button>
            <button
                className="btn btn-primary"
                onClick={() => setCurrentView('add-card')}
            >
              <i className="fas fa-plus me-2"></i>
              Neue Karte
            </button>
          </div>
        </div>

        {/* Erweiterte Such- und Filterbereich */}
        <div className="card search-container">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Suche nach Fragen, Tags oder Kategorien..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                    className="form-select"
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                >
                  <option value="all">Alle Autoren</option>
                  {getUniqueAuthors().map(author => (
                      <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select
                    className="form-select"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="all">Alle Schwierigkeiten</option>
                  <option value="Leicht">Leicht</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Schwer">Schwer</option>
                </select>
              </div>
            </div>

            {/* Suchstatistiken */}
            <div className="row">
              <div className="col-12">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Zeige {filteredCards.length} von {cards.length} Karten
                  {searchTerm && ` für "${searchTerm}"`}
                  {authorFilter !== 'all' && ` von ${authorFilter}`}
                  {difficultyFilter !== 'all' && ` (${difficultyFilter})`}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Kategorien-Übersicht */}
        <div className="row">
          <div className="col-12">
            <h3>Verfügbare Kategorien ({categories.length})</h3>
            <div className="row">
              {categories.map(category => (
                  <div key={category.id} className="col-md-4 mb-3">
                    <div className="card h-100 category-card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">
                          <i className={`${category.icon} text-${category.color} me-2 category-icon`}></i>
                          {category.name}
                        </h6>
                        <small className="text-muted">
                          {category.cardCount || 0} Karten
                        </small>
                      </div>
                      <div className="card-body">
                        <p className="card-text small">{category.description}</p>
                        <div className="author-info">
                          <small className="text-muted">
                            <i className="fas fa-user me-1"></i>
                            Erstellt von: {category.author}
                          </small>
                          <br />
                          <small className="text-muted">
                            <i className="fas fa-calendar me-1"></i>
                            {new Date(category.created).toLocaleDateString('de-DE')}
                          </small>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex gap-2">
                          <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                setSelectedCategory(category);
                                setCurrentView('add-card');
                                setNewCard(prev => ({ ...prev, categoryId: category.id }));
                              }}
                          >
                            <i className="fas fa-plus me-1"></i>
                            Karte hinzufügen
                          </button>
                          <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteCategory(category.id)}
                              disabled={category.cardCount > 0}
                          >
                            <i className="fas fa-trash me-1"></i>
                            Löschen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Karten-Übersicht mit erweiterten Funktionen */}
        <div className="row mt-4">
          <div className="col-12">
            <h3>
              Karten-Übersicht
              <span className="badge bg-secondary ms-2">{filteredCards.length}</span>
            </h3>

            {filteredCards.length === 0 ? (
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  {searchTerm || authorFilter !== 'all' || difficultyFilter !== 'all'
                      ? 'Keine Karten gefunden, die den Filterkriterien entsprechen.'
                      : 'Noch keine Karten vorhanden. Erstellen Sie die erste Karte!'}
                </div>
            ) : (
                <div className="card-grid">
                  {filteredCards.map(card => {
                    const category = categories.find(cat => cat.id === card.categoryId);
                    return (
                        <div key={card.id} className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title">{card.question}</h6>
                              <span className={`badge difficulty-${card.difficulty.toLowerCase()}`}>
                          {card.difficulty}
                        </span>
                            </div>

                            <div className="card-preview">
                              <small className="text-muted">
                                <strong>Antworten:</strong> {card.answers.filter(a => a.trim()).length} Optionen
                              </small>
                              <br />
                              <small className="text-muted">
                                <strong>Richtige Antwort:</strong> {String.fromCharCode(65 + card.correctAnswer)} - {card.answers[card.correctAnswer]}
                              </small>
                              {card.explanation && (
                                  <>
                                    <br />
                                    <small className="text-muted">
                                      <strong>Erklärung:</strong> {card.explanation.substring(0, 100)}...
                                    </small>
                                  </>
                              )}
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                <small className="text-muted">
                                  <i className="fas fa-folder me-1"></i>
                                  {category?.name || 'Unbekannte Kategorie'}
                                </small>
                                <br />
                                <small className="text-muted">
                                  <i className="fas fa-user me-1"></i>
                                  {card.author}
                                </small>
                              </div>

                              <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => startEditCard(card)}
                                >
                                  <i className="fas fa-edit me-1"></i>
                                  Bearbeiten
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deleteCard(card.id)}
                                >
                                  <i className="fas fa-trash me-1"></i>
                                  Löschen
                                </button>
                              </div>
                            </div>

                            {card.tags && card.tags.length > 0 && (
                                <div className="mt-2">
                                  {card.tags.map(tag => (
                                      <span key={tag} className="filter-tag">
                              {tag}
                            </span>
                                  ))}
                                </div>
                            )}
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}
          </div>
        </div>
      </div>
  );

  // Andere Render-Methoden bleiben gleich wie zuvor, aber ich füge die Bearbeitung hinzu
  const renderEditCard = () => (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="fas fa-edit me-2"></i>
            Karte bearbeiten
          </h2>
          <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentView('overview')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Zurück zur Übersicht
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="editCardCategory" className="form-label">
                  Kategorie *
                </label>
                <select
                    id="editCardCategory"
                    className="form-select"
                    value={editingCard.categoryId}
                    onChange={(e) => setEditingCard(prev => ({ ...prev, categoryId: e.target.value }))}
                >
                  <option value="">Kategorie auswählen</option>
                  {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="editCardQuestion" className="form-label">
                  Frage *
                </label>
                <textarea
                    id="editCardQuestion"
                    className="form-control"
                    rows="3"
                    value={editingCard.question}
                    onChange={(e) => setEditingCard(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Geben Sie hier Ihre Frage ein..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Antwortmöglichkeiten *</label>
                {editingCard.answers.map((answer, index) => (
                    <div key={index} className="input-group mb-2">
                  <span className="input-group-text">
                    {String.fromCharCode(65 + index)}
                  </span>
                      <input
                          type="text"
                          className="form-control"
                          value={answer}
                          onChange={(e) => updateEditCardAnswer(index, e.target.value)}
                          placeholder={`Antwort ${String.fromCharCode(65 + index)}`}
                      />
                      <div className="input-group-text">
                        <input
                            type="radio"
                            name="editCorrectAnswer"
                            checked={editingCard.correctAnswer === index}
                            onChange={() => setEditingCard(prev => ({ ...prev, correctAnswer: index }))}
                            disabled={!answer.trim()}
                        />
                      </div>
                    </div>
                ))}
              </div>

              <div className="mb-3">
                <label htmlFor="editCardDifficulty" className="form-label">
                  Schwierigkeit
                </label>
                <select
                    id="editCardDifficulty"
                    className="form-select"
                    value={editingCard.difficulty}
                    onChange={(e) => setEditingCard(prev => ({ ...prev, difficulty: e.target.value }))}
                >
                  <option value="Leicht">Leicht</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Schwer">Schwer</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="editCardExplanation" className="form-label">
                  Erklärung (optional)
                </label>
                <textarea
                    id="editCardExplanation"
                    className="form-control"
                    rows="2"
                    value={editingCard.explanation}
                    onChange={(e) => setEditingCard(prev => ({ ...prev, explanation: e.target.value }))}
                    placeholder="Erklärung der richtigen Antwort..."
                />
              </div>

              <div className="mb-3">
                <label htmlFor="editCardTags" className="form-label">
                  Tags (optional)
                </label>
                <input
                    type="text"
                    id="editCardTags"
                    className="form-control"
                    value={editingCard.tags}
                    onChange={(e) => setEditingCard(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Tag1, Tag2, Tag3..."
                />
              </div>

              <div className="d-flex gap-2">
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={saveEditedCard}
                >
                  <i className="fas fa-save me-2"></i>
                  Änderungen speichern
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentView('overview')}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );

  // Andere Render-Methoden bleiben unverändert von der vorherigen Version
  const renderAddCategory = () => (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="fas fa-plus-circle me-2"></i>
            Neue Kategorie erstellen
          </h2>
          <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentView('overview')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Zurück zur Übersicht
          </button>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">
                      Kategoriename *
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="z.B. Datenbanken, Algorithmen, ..."
                    />
                    {errors.categoryName && (
                        <div className="invalid-feedback">{errors.categoryName}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="categoryDescription" className="form-label">
                      Beschreibung *
                    </label>
                    <textarea
                        id="categoryDescription"
                        className={`form-control ${errors.categoryDescription ? 'is-invalid' : ''}`}
                        rows="3"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Kurze Beschreibung der Kategorie..."
                    />
                    {errors.categoryDescription && (
                        <div className="invalid-feedback">{errors.categoryDescription}</div>
                    )}
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="categoryIcon" className="form-label">
                        Icon
                      </label>
                      <select
                          id="categoryIcon"
                          className="form-select"
                          value={newCategory.icon}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                      >
                        {categoryIcons.map(icon => (
                            <option key={icon.value} value={icon.value}>
                              {icon.label}
                            </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="categoryColor" className="form-label">
                        Farbe
                      </label>
                      <select
                          id="categoryColor"
                          className="form-select"
                          value={newCategory.color}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                      >
                        {categoryColors.map(color => (
                            <option key={color.value} value={color.value}>
                              {color.label}
                            </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                          className="form-check-input"
                          type="checkbox"
                          id="categoryPublic"
                          checked={newCategory.isPublic}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, isPublic: e.target.checked }))}
                      />
                      <label className="form-check-label" htmlFor="categoryPublic">
                        Öffentlich verfügbar für alle Nutzer
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={createCategory}
                    >
                      <i className="fas fa-save me-2"></i>
                      Kategorie erstellen
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setCurrentView('overview')}
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Vorschau</h5>
              </div>
              <div className="card-body">
                <div className="card h-100">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      <i className={`${newCategory.icon} text-${newCategory.color} me-2`}></i>
                      {newCategory.name || 'Kategoriename'}
                    </h6>
                    <small className="text-muted">0 Karten</small>
                  </div>
                  <div className="card-body">
                    <p className="card-text small">
                      {newCategory.description || 'Beschreibung der Kategorie...'}
                    </p>
                    <div className="mt-2">
                      <small className="text-muted">
                        <i className="fas fa-user me-1"></i>
                        Erstellt von: {user.name}
                      </small>
                      <br />
                      <small className="text-muted">
                        <i className="fas fa-calendar me-1"></i>
                        {new Date().toLocaleDateString('de-DE')}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  const renderAddCard = () => (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="fas fa-plus-circle me-2"></i>
            Neue Karte erstellen
          </h2>
          <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentView('overview')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Zurück zur Übersicht
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="cardCategory" className="form-label">
                  Kategorie *
                </label>
                <select
                    id="cardCategory"
                    className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                    value={newCard.categoryId}
                    onChange={(e) => setNewCard(prev => ({ ...prev, categoryId: e.target.value }))}
                >
                  <option value="">Kategorie auswählen</option>
                  {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                  ))}
                </select>
                {errors.categoryId && (
                    <div className="invalid-feedback">{errors.categoryId}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="cardQuestion" className="form-label">
                  Frage *
                </label>
                <textarea
                    id="cardQuestion"
                    className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                    rows="3"
                    value={newCard.question}
                    onChange={(e) => setNewCard(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Geben Sie hier Ihre Frage ein..."
                />
                {errors.question && (
                    <div className="invalid-feedback">{errors.question}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Antwortmöglichkeiten *</label>
                {newCard.answers.map((answer, index) => (
                    <div key={index} className="input-group mb-2">
                  <span className="input-group-text">
                    {String.fromCharCode(65 + index)}
                  </span>
                      <input
                          type="text"
                          className="form-control"
                          value={answer}
                          onChange={(e) => updateCardAnswer(index, e.target.value)}
                          placeholder={`Antwort ${String.fromCharCode(65 + index)}`}
                      />
                      <div className="input-group-text">
                        <input
                            type="radio"
                            name="correctAnswer"
                            checked={newCard.correctAnswer === index}
                            onChange={() => setNewCard(prev => ({ ...prev, correctAnswer: index }))}
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

              <div className="mb-3">
                <label htmlFor="cardDifficulty" className="form-label">
                  Schwierigkeit
                </label>
                <select
                    id="cardDifficulty"
                    className="form-select"
                    value={newCard.difficulty}
                    onChange={(e) => setNewCard(prev => ({ ...prev, difficulty: e.target.value }))}
                >
                  <option value="Leicht">Leicht</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Schwer">Schwer</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="cardExplanation" className="form-label">
                  Erklärung (optional)
                </label>
                <textarea
                    id="cardExplanation"
                    className="form-control"
                    rows="2"
                    value={newCard.explanation}
                    onChange={(e) => setNewCard(prev => ({ ...prev, explanation: e.target.value }))}
                    placeholder="Erklärung der richtigen Antwort..."
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cardTags" className="form-label">
                  Tags (optional)
                </label>
                <input
                    type="text"
                    id="cardTags"
                    className="form-control"
                    value={newCard.tags}
                    onChange={(e) => setNewCard(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Tag1, Tag2, Tag3..."
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                      className="form-check-input"
                      type="checkbox"
                      id="cardPublic"
                      checked={newCard.isPublic}
                      onChange={(e) => setNewCard(prev => ({ ...prev, isPublic: e.target.checked }))}
                  />
                  <label className="form-check-label" htmlFor="cardPublic">
                    Öffentlich verfügbar für alle Nutzer
                  </label>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createCard}
                >
                  <i className="fas fa-save me-2"></i>
                  Karte erstellen
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentView('overview')}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );

  return (
      <div className="container mt-4">
        {currentView === 'overview' && renderOverview()}
        {currentView === 'add-category' && renderAddCategory()}
        {currentView === 'add-card' && renderAddCard()}
        {currentView === 'edit-card' && editingCard && renderEditCard()}
      </div>
  );
}

export default CardManager;