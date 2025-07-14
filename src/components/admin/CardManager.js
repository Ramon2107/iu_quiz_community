/**
 * CardManager-Komponente
 *
 * Diese Komponente verwaltet alle Karten (Fragen) und Kategorien im System.
 * Sie bietet erweiterte Such-, Filter- und Verwaltungsfunktionen.
 *
 * NEU: Kategorien-basierte Navigation - Karten werden in Kategorien organisiert
 * NEU: Drill-Down-Funktionalität - Klick auf Kategorie zeigt zugehörige Karten
 * NEU: Erweiterte Mock-Daten mit 10-20 Karten pro Kategorie
 * NEU: Bessere Suchfunktion mit Kategorie-Anzeige
 *
 * Hauptfunktionen:
 * - Hierarchische Übersicht (Kategorien → Karten)
 * - Drill-Down Navigation in Kategorien
 * - Erweiterte Such- und Filterfunktionen
 * - Erstellen neuer Karten und Kategorien
 * - Bearbeiten bestehender Einträge
 * - Löschen von Karten und Kategorien
 * - Kollaborative Features
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

  // NEU: Zustand für Kategorie-Navigation
  const [viewMode, setViewMode] = useState('categories'); // 'categories' oder 'category-detail'
  const [currentCategoryView, setCurrentCategoryView] = useState(null);

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
   * NEU: Erweiterte Filterlogik mit Kategorie-Berücksichtigung
   */
  useEffect(() => {
    console.log('CardManager: Filtere Karten...', {
      searchTerm,
      authorFilter,
      difficultyFilter,
      totalCards: cards.length,
      currentCategoryView: currentCategoryView?.name
    });

    let filtered = cards;

    // Filtere nach aktueller Kategorie-Ansicht
    if (currentCategoryView) {
      filtered = filtered.filter(card => card.categoryId === currentCategoryView.id);
    }

    // Suchfilter
    if (searchTerm) {
      filtered = filtered.filter(card =>
          card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (card.tags && card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Autor-Filter
    if (authorFilter !== 'all') {
      filtered = filtered.filter(card => card.author === authorFilter);
    }

    // Schwierigkeits-Filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(card => card.difficulty === difficultyFilter);
    }

    console.log('CardManager: Gefilterte Karten:', filtered.length);
    setFilteredCards(filtered);
  }, [searchTerm, authorFilter, difficultyFilter, cards, currentCategoryView]);

  /**
   * Lädt alle Daten über den DataManager
   */
  const loadData = () => {
    console.log('CardManager: Lade Daten...');

    // Prüfe ob Mock-Daten geladen werden müssen
    const existingCategories = localStorage.getItem('quiz-categories');
    const existingCards = localStorage.getItem('quiz-cards');

    console.log('CardManager: localStorage Check:', {
      hasCategories: !!existingCategories,
      hasCards: !!existingCards,
      categoriesLength: existingCategories ? JSON.parse(existingCategories).length : 0,
      cardsLength: existingCards ? JSON.parse(existingCards).length : 0
    });

    // Erzwinge Mock-Daten Reload wenn nichts vorhanden ist
    if (!existingCategories || !existingCards ||
        JSON.parse(existingCategories || '[]').length === 0 ||
        JSON.parse(existingCards || '[]').length === 0) {
      console.log('CardManager: Erzwinge Mock-Daten Reload...');
      dataManager.reloadMockData();
    }

    // Daten über DataManager laden
    const loadedCategories = dataManager.getAllCategories();
    const loadedCards = dataManager.getAllCards();

    console.log('CardManager: Geladene Daten:', {
      categories: loadedCategories.length,
      cards: loadedCards.length
    });

    // Debug-Ausgabe für die ersten paar Einträge
    if (loadedCategories.length > 0) {
      console.log('CardManager: Erste Kategorie:', loadedCategories[0]);
    }
    if (loadedCards.length > 0) {
      console.log('CardManager: Erste Karte:', loadedCards[0]);
    }

    setCategories(loadedCategories);
    setCards(loadedCards);
  };

  /**
   * NEU: Wechselt zur Kategorie-Detail-Ansicht
   */
  const enterCategoryView = (category) => {
    setCurrentCategoryView(category);
    setViewMode('category-detail');
    setSearchTerm(''); // Reset search when entering category
  };

  /**
   * NEU: Kehrt zur Kategorien-Übersicht zurück
   */
  const exitCategoryView = () => {
    setCurrentCategoryView(null);
    setViewMode('categories');
    setSearchTerm(''); // Reset search when exiting category
  };

  /**
   * NEU: Gibt die Anzahl der Karten für eine Kategorie zurück
   */
  const getCardCountForCategory = (categoryId) => {
    return cards.filter(card => card.categoryId === categoryId).length;
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
    console.log('CardManager: Neue Kategorie erstellt:', savedCategory);

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
    console.log('CardManager: Neue Karte erstellt:', savedCard);

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
      console.log('CardManager: Karte gelöscht:', cardId);
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
        console.log('CardManager: Kategorie gelöscht:', categoryId);
        loadData();
        alert('Kategorie wurde gelöscht.');
      }
    } catch (error) {
      console.error('CardManager: Fehler beim Löschen der Kategorie:', error);
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
    console.log('CardManager: Karte aktualisiert:', editingCard.id);
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
   * NEU: Rendert die Kategorien-Übersicht
   */
  const renderCategoriesOverview = () => (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="fas fa-layer-group me-2"></i>
            Kategorien-Übersicht
          </h2>
          <div className="d-flex gap-2">
            <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  console.log('Mock-Daten werden neu geladen...');
                  dataManager.reloadMockData();
                  loadData();
                }}
                title="Mock-Daten neu laden"
            >
              <i className="fas fa-sync me-1"></i>
              Mock-Daten laden
            </button>
            <button
                className="btn btn-success"
                onClick={() => setCurrentView('add-category')}
            >
              <i className="fas fa-plus me-2"></i>
              Neue Kategorie
            </button>
          </div>
        </div>

        {/* Statusanzeige */}
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>
            <i className="fas fa-info-circle me-2"></i>
            <strong>Status:</strong> {categories.length} Kategorien, {cards.length} Karten insgesamt
          </div>
          <small className="text-muted">
            Klicken Sie auf eine Kategorie, um die zugehörigen Karten zu sehen
          </small>
        </div>

        {/* Kategorien-Grid */}
        <div className="row">
          {categories.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-warning">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Keine Kategorien vorhanden. Erstellen Sie eine neue Kategorie, um zu beginnen.
                </div>
              </div>
          ) : (
              categories.map(category => (
                  <div key={category.id} className="col-lg-4 col-md-6 mb-4">
                    <div
                        className={`card border-${category.color} h-100 category-card`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => enterCategoryView(category)}
                    >
                      <div className={`card-header bg-${category.color} text-white`}>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            <i className={`${category.icon} me-2`}></i>
                            {category.name}
                          </h5>
                          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="btn btn-sm btn-outline-light dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => deleteCategory(category.id)}
                                >
                                  <i className="fas fa-trash me-2"></i>
                                  Löschen
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{category.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">
                      <i className="fas fa-cards me-1"></i>
                      {getCardCountForCategory(category.id)} Karten
                    </span>
                          <small className="text-muted">
                            <i className="fas fa-user me-1"></i>
                            {category.author}
                          </small>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            Erstellt: {new Date(category.created).toLocaleDateString()}
                          </small>
                          <div className="btn-group btn-group-sm">
                            <button
                                className="btn btn-outline-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  enterCategoryView(category);
                                }}
                            >
                              <i className="fas fa-eye me-1"></i>
                              Anzeigen
                            </button>
                            <button
                                className="btn btn-outline-success"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNewCard(prev => ({ ...prev, categoryId: category.id }));
                                  setCurrentView('add-card');
                                }}
                            >
                              <i className="fas fa-plus me-1"></i>
                              Karte hinzufügen
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
          )}
        </div>
      </div>
  );

  /**
   * NEU: Rendert die Karten einer bestimmten Kategorie
   */
  const renderCategoryDetail = () => (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>
              <i className={`${currentCategoryView.icon} me-2`}></i>
              {currentCategoryView.name}
            </h2>
            <p className="text-muted mb-0">{currentCategoryView.description}</p>
          </div>
          <div className="d-flex gap-2">
            <button
                className="btn btn-outline-secondary"
                onClick={exitCategoryView}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Zurück zu Kategorien
            </button>
            <button
                className="btn btn-primary"
                onClick={() => {
                  setNewCard(prev => ({ ...prev, categoryId: currentCategoryView.id }));
                  setCurrentView('add-card');
                }}
            >
              <i className="fas fa-plus me-2"></i>
              Neue Karte
            </button>
          </div>
        </div>

        {/* Erweiterte Such- und Filterbereich */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-search me-2"></i>
              Suche und Filter
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="searchTerm" className="form-label">
                  Suchbegriff
                </label>
                <input
                    type="text"
                    id="searchTerm"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Suche in Fragen und Tags..."
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="authorFilter" className="form-label">
                  Autor
                </label>
                <select
                    id="authorFilter"
                    className="form-select"
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                >
                  <option value="all">Alle Autoren</option>
                  {getUniqueAuthors().map(author => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="difficultyFilter" className="form-label">
                  Schwierigkeit
                </label>
                <select
                    id="difficultyFilter"
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
          </div>
        </div>

        {/* Statusanzeige */}
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>
            <i className="fas fa-info-circle me-2"></i>
            <strong>Karten in {currentCategoryView.name}:</strong> {filteredCards.length} von {getCardCountForCategory(currentCategoryView.id)} angezeigt
          </div>
          <small className="text-muted">
            Kategorie: {currentCategoryView.name} • Autor: {currentCategoryView.author}
          </small>
        </div>

        {/* Karten-Grid */}
        <div className="row">
          {filteredCards.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-warning">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {getCardCountForCategory(currentCategoryView.id) === 0 ?
                      'Keine Karten in dieser Kategorie vorhanden. Erstellen Sie eine neue Karte.' :
                      'Keine Karten entsprechen den aktuellen Filterkriterien.'
                  }
                </div>
              </div>
          ) : (
              filteredCards.map(card => (
                  <div key={card.id} className="col-lg-6 col-md-12 mb-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{card.question}</h6>
                            <small className="text-muted">
                              <i className="fas fa-tag me-1"></i>
                              {card.tags && card.tags.length > 0 ? card.tags.join(', ') : 'Keine Tags'}
                            </small>
                          </div>
                          <div className="dropdown">
                            <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => startEditCard(card)}
                                >
                                  <i className="fas fa-edit me-2"></i>
                                  Bearbeiten
                                </button>
                              </li>
                              <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => deleteCard(card.id)}
                                >
                                  <i className="fas fa-trash me-2"></i>
                                  Löschen
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          {card.answers.map((answer, index) => (
                              <div key={index} className={`form-check ${card.correctAnswer === index ? 'bg-success bg-opacity-10' : ''}`}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    disabled
                                    checked={card.correctAnswer === index}
                                />
                                <label className="form-check-label">
                                  <strong>{String.fromCharCode(65 + index)}:</strong> {answer}
                                  {card.correctAnswer === index && (
                                      <i className="fas fa-check text-success ms-2"></i>
                                  )}
                                </label>
                              </div>
                          ))}
                        </div>
                        {card.explanation && (
                            <div className="alert alert-info">
                              <strong>Erklärung:</strong> {card.explanation}
                            </div>
                        )}
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex gap-2">
                      <span className={`badge bg-${card.difficulty === 'Leicht' ? 'success' : card.difficulty === 'Mittel' ? 'warning' : 'danger'}`}>
                        <i className="fas fa-signal me-1"></i>
                        {card.difficulty}
                      </span>
                            <small className="text-muted">
                              <i className="fas fa-user me-1"></i>
                              {card.author}
                            </small>
                          </div>
                          <small className="text-muted">
                            {new Date(card.created).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
          )}
        </div>
      </div>
  );

  /**
   * Rendert die Übersicht basierend auf dem aktuellen Anzeigemodus
   */
  const renderOverview = () => {
    if (viewMode === 'categories') {
      return renderCategoriesOverview();
    } else if (viewMode === 'category-detail') {
      return renderCategoryDetail();
    }
    return renderCategoriesOverview(); // Fallback
  };

  /**
   * Rendert das Formular zum Erstellen einer neuen Kategorie
   */
  const renderAddCategory = () => (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <i className="fas fa-plus me-2"></i>
              Neue Kategorie erstellen
            </h3>
            <button
                className="btn btn-outline-secondary"
                onClick={() => setCurrentView('overview')}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Zurück
            </button>
          </div>
        </div>
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
                  placeholder="Name der Kategorie"
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
                  placeholder="Beschreibung der Kategorie"
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
                    type="checkbox"
                    id="categoryPublic"
                    className="form-check-input"
                    checked={newCategory.isPublic}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                <label htmlFor="categoryPublic" className="form-check-label">
                  Öffentlich (andere Benutzer können Fragen hinzufügen)
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
                  className="btn btn-secondary"
                  onClick={() => setCurrentView('overview')}
              >
                <i className="fas fa-times me-2"></i>
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
  );

  /**
   * Rendert das Formular zum Erstellen einer neuen Karte
   */
  const renderAddCard = () => (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <i className="fas fa-plus me-2"></i>
              Neue Karte erstellen
            </h3>
            <button
                className="btn btn-outline-secondary"
                onClick={() => setCurrentView('overview')}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Zurück
            </button>
          </div>
        </div>
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

            <div className="row mb-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
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
              <div className="form-check">
                <input
                    type="checkbox"
                    id="cardPublic"
                    className="form-check-input"
                    checked={newCard.isPublic}
                    onChange={(e) => setNewCard(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                <label htmlFor="cardPublic" className="form-check-label">
                  Öffentlich (andere Benutzer können diese Karte verwenden)
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
                  className="btn btn-secondary"
                  onClick={() => setCurrentView('overview')}
              >
                <i className="fas fa-times me-2"></i>
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
  );

  /**
   * Rendert das Formular zum Bearbeiten einer Karte
   */
  const renderEditCard = () => (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <i className="fas fa-edit me-2"></i>
              Karte bearbeiten
            </h3>
            <button
                className="btn btn-outline-secondary"
                onClick={() => setCurrentView('overview')}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Zurück
            </button>
          </div>
        </div>
        <div className="card-body">
          {editingCard && (
              <form>
                <div className="mb-3">
                  <label htmlFor="editCardCategory" className="form-label">
                    Kategorie
                  </label>
                  <select
                      id="editCardCategory"
                      className="form-select"
                      value={editingCard.categoryId}
                      onChange={(e) => setEditingCard(prev => ({ ...prev, categoryId: e.target.value }))}
                  >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="editCardQuestion" className="form-label">
                    Frage
                  </label>
                  <textarea
                      id="editCardQuestion"
                      className="form-control"
                      rows="3"
                      value={editingCard.question}
                      onChange={(e) => setEditingCard(prev => ({ ...prev, question: e.target.value }))}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Antwortmöglichkeiten</label>
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
                        />
                        <div className="input-group-text">
                          <input
                              type="radio"
                              name="editCorrectAnswer"
                              checked={editingCard.correctAnswer === index}
                              onChange={() => setEditingCard(prev => ({ ...prev, correctAnswer: index }))}
                          />
                        </div>
                      </div>
                  ))}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <label htmlFor="editCardTags" className="form-label">
                      Tags
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
                </div>

                <div className="mb-3">
                  <label htmlFor="editCardExplanation" className="form-label">
                    Erklärung
                  </label>
                  <textarea
                      id="editCardExplanation"
                      className="form-control"
                      rows="2"
                      value={editingCard.explanation}
                      onChange={(e) => setEditingCard(prev => ({ ...prev, explanation: e.target.value }))}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={saveEditedCard}
                  >
                    <i className="fas fa-save me-2"></i>
                    Änderungen speichern
                  </button>
                  <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setCurrentView('overview')}
                  >
                    <i className="fas fa-times me-2"></i>
                    Abbrechen
                  </button>
                </div>
              </form>
          )}
        </div>
      </div>
  );

  // Hauptrender-Logik
  return (
      <div className="container mt-4">
        {currentView === 'overview' && renderOverview()}
        {currentView === 'add-category' && renderAddCategory()}
        {currentView === 'add-card' && renderAddCard()}
        {currentView === 'edit-card' && renderEditCard()}
      </div>
  );
}

export default CardManager;