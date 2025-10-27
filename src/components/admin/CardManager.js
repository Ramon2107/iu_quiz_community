/**
 * Verwaltungsoberfläche für Fragen und Kategorien mit rollenbasierter Zugriffskontrolle.
 * @author Projektteam IU Community Quiz
 * @version 1.5.0
 */

import React, { useState, useEffect } from 'react';
import dataManager from '../../data/dataManager';

/**
 * CardManager - Komponente zur Verwaltung von Fragen und Kategorien
 *
 * Diese Komponente bietet eine umfassende Verwaltungsoberfläche für das Quizsystem:
 *
 * **Kategorien-Management:**
 * - Hierarchische Navigation durch Kategorien
 * - Erstellen, Bearbeiten und Löschen von Kategorien
 * - Drill-Down-Funktionalität für detaillierte Ansichten
 *
 * **Karten-Management:**
 * - Erstellen neuer Fragenkarten
 * - Bearbeiten bestehender Karten
 * - Löschen von Karten mit Berechtigungsprüfung
 * - Zuordnung zu Kategorien
 *
 * **Such- und Filterfunktionen:**
 * - Volltextsuche über Fragen
 * - Filterung nach Autor, Schwierigkeitsgrad, Status
 * - Anzeige gemeldeter Inhalte
 *
 * **Kollaborative Features:**
 * - Rollenbasierte Zugriffskontrolle (Admin, Moderator, Editor)
 * - Kollaborator-Verwaltung für Kategorien
 * - Öffentliche/Private Inhalte
 *
 * @function CardManager
 * @param {Object} props - Component properties
 * @param {Object} props.user - Aktueller Benutzer
 * @param {Function} props.onQuestionAdded - Callback bei neuer Frage
 * @param {Function} props.onCategoryAdded - Callback bei neuer Kategorie
 * @returns {React.ReactElement} Die gerenderte CardManager-Komponente
 * @example
 * <CardManager
 *   user={currentUser}
 *   onQuestionAdded={handleQuestionAdded}
 *   onCategoryAdded={handleCategoryAdded}
 * />
 */
function CardManager({ user, onQuestionAdded, onCategoryAdded }) {
    // Zustandsverwaltung für Kategorien und Karten
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [currentView, setCurrentView] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [authorFilter, setAuthorFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [reportedFilter, setReportedFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Rollenbasierte Zustandsverwaltung
    const [currentRole, setCurrentRole] = useState(dataManager.getCurrentUserRole());

    // Zustand für Kategorie-Navigation
    const [viewMode, setViewMode] = useState('categories'); // 'categories' oder 'category-detail'
    const [currentCategoryView, setCurrentCategoryView] = useState(null);

    // Zustandsverwaltung für Bearbeitung
    /**
     * @type {null|CardState}
     */
    const [editingCard, setEditingCard] = useState(null);

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
    /**
     * @typedef {Object} CardState
     * @property {string} categoryId - ID der Kategorie, zu der diese Karte gehört
     * @property {string} question - Fragetext
     * @property {string[]} answers - Array mit möglichen Antworten
     * @property {null|number} correctAnswer - Index der richtigen Antwort oder null, wenn keine ausgewählt wurde
     * @property {string} difficulty - Schwierigkeitsgrad der Frage
     * @property {string} explanation - Erklärung zur richtigen Antwort
     * @property {string} tags - Mit der Karte verknüpfte Schlagwörter
     * @property {boolean} isPublic - Gibt an, ob die Karte öffentlich verfügbar ist
     */

    /**
     * @type {CardState}
     */
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

    // Verfügbare Icons und Farben für Kategorien
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
     * Lädt Daten beim Component Mount - Initialisierung der Anwendungsdaten
     */
    useEffect(() => {
        loadData();
    }, []);

    /**
     * Filtert Karten basierend auf Suchbegriff und Filtern
     * Erweiterte Filterlogik mit Kategorie-Berücksichtigung und gemeldete Fragen
     * Diese Funktion wird bei jeder Änderung der Filter automatisch ausgeführt
     */
    useEffect(() => {
        let filtered = cards;

        // Filtere nach aktueller Kategorie-Ansicht, wenn eine ausgewählt ist
        if (currentCategoryView) {
            filtered = filtered.filter(card => card.categoryId === currentCategoryView.id);
        }

        // Suchfilter - durchsucht Fragen und Tags nach Suchbegriff
        if (searchTerm) {
            filtered = filtered.filter(card =>
                card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (card.tags && Array.isArray(card.tags) && card.tags.some(tag =>
                    typeof tag === 'string' && tag.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            );
        }

        // Autor-Filter - zeigt nur Karten des ausgewählten Autors
        if (authorFilter !== 'all') {
            filtered = filtered.filter(card => card.author === authorFilter);
        }

        // Schwierigkeitsgrad - filtert nach gewählter Schwierigkeitsstufe
        if (difficultyFilter !== 'all') {
            filtered = filtered.filter(card => card.difficulty === difficultyFilter);
        }

        // Gemeldet-Filter - filtert nach gemeldeten Fragen
        if (reportedFilter !== 'all') {
            const reportedQuestions = JSON.parse(localStorage.getItem('reported-questions') || '[]');
            if (reportedFilter === 'reported') {
                filtered = filtered.filter(card => reportedQuestions.includes(card.id));
            } else if (reportedFilter === 'not-reported') {
                filtered = filtered.filter(card => !reportedQuestions.includes(card.id));
            }
        }

        // Status-Filter - filtert nach Housekeeping-Status (aktiv, zu prüfen, archiviert)
        if (statusFilter !== 'all') {
            filtered = filtered.filter(card => {
                const status = dataManager.getCardStatus(card.id);
                return status === statusFilter;
            });
        }

        setFilteredCards(filtered);
    }, [searchTerm, authorFilter, difficultyFilter, reportedFilter, statusFilter, cards, currentCategoryView]);

    /**
     * Lädt alle Daten über den DataManager
     */
    const loadData = () => {
        // Prüfe ob Mock-Daten geladen werden müssen für initiale Demonstration
        const existingCategories = localStorage.getItem('quiz-categories');
        const existingCards = localStorage.getItem('quiz-cards');

        // Erzwinge Mock-Daten Reload wenn nichts vorhanden ist
        if (!existingCategories || !existingCards ||
            JSON.parse(existingCategories || '[]').length === 0 ||
            JSON.parse(existingCards || '[]').length === 0) {
            dataManager.reloadMockData();
        }

        // Daten über DataManager laden - zentrale Datenquelle
        const loadedCategories = dataManager.getAllCategories();
        const loadedCards = dataManager.getAllCards();

        setCategories(loadedCategories);
        setCards(loadedCards);
    };

    /**
     * Wechselt zur Kategorie-Detail-Ansicht - Navigation in spezifische Kategorie
     */
    const enterCategoryView = (category) => {
        setCurrentCategoryView(category);
        setViewMode('category-detail');
        setSearchTerm('');
    };

    /**
     * Kehrt zur Kategorien-Übersicht zurück - Navigation zurück zur Hauptansicht
     */
    const exitCategoryView = () => {
        setCurrentCategoryView(null);
        setViewMode('categories');
        setSearchTerm('');
    };

    /**
     * Gibt die Anzahl der Karten für eine Kategorie zurück - Statistik-Funktion
     */
    const getCardCountForCategory = (categoryId) => {
        if (!categoryId || !Array.isArray(cards)) return 0;
        return cards.filter(card => card && card.categoryId === categoryId).length;
    };

    /**
     * Validiert die neue Kategorie - Überprüfung der Eingabedaten
     */
    const validateCategory = () => {
        const newErrors = {};

        // Überprüfung des Kategorienamens auf Vorhandensein
        if (!newCategory || !newCategory.name || !newCategory.name.trim()) {
            newErrors.categoryName = 'Kategoriename ist erforderlich';
        }

        // Prüfung auf doppelte Kategorienamen
        if (Array.isArray(categories) && newCategory && newCategory.name &&
            categories.some(cat => cat && cat.name &&
                cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
            newErrors.categoryName = 'Kategorie existiert bereits';
        }

        // Überprüfung der Beschreibung
        if (!newCategory || !newCategory.description || !newCategory.description.trim()) {
            newErrors.categoryDescription = 'Beschreibung ist erforderlich';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Validiert die neue Karte - Vollständige Validierung aller Kartendaten
     */
    const validateCard = () => {
        const newErrors = {};

        // Überprüfung der Frage
        if (!newCard || !newCard.question || !newCard.question.trim()) {
            newErrors.question = 'Frage ist erforderlich';
        }

        // Überprüfung der Kategoriezuordnung
        if (!newCard || !newCard.categoryId) {
            newErrors.categoryId = 'Kategorie muss ausgewählt werden';
        }

        // Validierung der Antworten - mindestens 2 müssen ausgefüllt sein
        if (newCard && Array.isArray(newCard.answers)) {
            const filledAnswers = newCard.answers.filter(answer =>
                typeof answer === 'string' && answer.trim()
            );
            if (filledAnswers.length < 2) {
                newErrors.answers = 'Mindestens 2 Antworten sind erforderlich';
            }
        } else {
            newErrors.answers = 'Antworten müssen angegeben werden';
        }

        // Überprüfung der korrekten Antwort
        if (!newCard || newCard.correctAnswer === null || newCard.correctAnswer === undefined) {
            newErrors.correctAnswer = 'Richtige Antwort muss ausgewählt werden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Erstellt eine neue Kategorie - Speicherung und Aktualisierung der Daten
     */
    const createCategory = () => {
        if (!validateCategory()) return;

        // Kategorie-Daten mit Benutzerdaten erweitern
        const categoryData = {
            ...newCategory,
            author: user.name,
            authorEmail: user.email
        };

        const savedCategory = dataManager.saveCategory(categoryData);

        // Daten neu laden nach Speicherung
        loadData();

        // Callback für Parent-Komponente ausführen
        if (onCategoryAdded) {
            onCategoryAdded(savedCategory);
        }

        // Formular zurücksetzen für nächste Eingabe
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
     * Erstellt eine neue Karte - Vollständige Karten-Erstellung mit Validierung
     */
    const createCard = () => {
        if (!validateCard()) return;

        // Karten-Daten mit Benutzerdaten erweitern
        const cardData = {
            ...newCard,
            author: user.name,
            authorEmail: user.email
        };

        const savedCard = dataManager.saveCard(cardData);

        // Daten neu laden nach Speicherung
        loadData();

        // Callback für Parent-Komponente ausführen
        if (onQuestionAdded) {
            onQuestionAdded(savedCard);
        }

        // Formular zurücksetzen für nächste Eingabe
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
     * Löscht eine Karte - Mit Bestätigungsdialog für Sicherheit
     */
    const deleteCard = (cardId) => {
        if (window.confirm('Möchten Sie diese Karte wirklich löschen?')) {
            dataManager.deleteCard(cardId);
            loadData();
            alert('Karte wurde gelöscht.');
        }
    };

    /**
     * Löscht eine Kategorie - Mit Validierung und Bestätigung
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
     * Startet die Bearbeitung einer Kategorie - Neu hinzugefügt
     */
    const startEditCategory = (category) => {
        setNewCategory({
            id: category.id,
            name: category.name,
            description: category.description,
            icon: category.icon || 'fas fa-folder',
            color: category.color || 'primary',
            isPublic: category.isPublic || true,
            collaborators: category.collaborators || []
        });
        setCurrentView('edit-category');
    };

    /**
     * Speichert die bearbeitete Kategorie - Neu hinzugefügt
     */
    const saveEditedCategory = () => {
        if (!validateCategory()) return;

        const updatedCategory = {
            ...newCategory,
            author: user.name,
            authorEmail: user.email
        };

        dataManager.updateCategory(newCategory.id, updatedCategory);
        loadData();

        // Zurücksetzen des Formulars
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
        alert('Kategorie wurde aktualisiert.');
    };

    /**
     * Startet die Bearbeitung einer Karte - Vorbereitung der Edit-Ansicht
     */
    const startEditCard = (card) => {
        setEditingCard({
            ...card,
            tags: Array.isArray(card.tags) ? card.tags.join(', ') : card.tags
        });
        setCurrentView('edit-card');
    };

    /**
     * Speichert die bearbeitete Karte - Aktualisierung bestehender Karte
     */
    const saveEditedCard = () => {
        if (!editingCard.question.trim()) {
            alert('Frage ist erforderlich');
            return;
        }

        // Tags von String zu Array konvertieren, falls nötig
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
     * Aktualisiert eine Antwort der neuen Karte - JavaScript-kompatible Implementierung
     */
    const updateCardAnswer = (index, value) => {
        if (!newCard || !Array.isArray(newCard.answers)) return;

        const newAnswers = [...newCard.answers];
        newAnswers[index] = value || '';

        // JavaScript-kompatible State-Update-Syntax
        setNewCard({
            ...newCard,
            answers: newAnswers
        });
    };

    /**
     * Aktualisiert eine Antwort der bearbeiteten Karte - JavaScript-kompatible Implementierung
     */
    const updateEditCardAnswer = (index, value) => {
        if (!editingCard || !Array.isArray(editingCard.answers)) return;

        const newAnswers = [...editingCard.answers];
        newAnswers[index] = value || '';

        // JavaScript-kompatible State-Update-Syntax
        setEditingCard({
            ...editingCard,
            answers: newAnswers
        });
    };

    /**
     * Gibt eindeutige Autoren zurück - Für Filter-Dropdown
     */
    const getUniqueAuthors = () => {
        try {
            const authors = dataManager.getUniqueAuthors();
            return Array.isArray(authors) ? authors : [];
        } catch (error) {
            console.error('Fehler beim Abrufen der Autoren:', error);
            return [];
        }
    };

    /**
     * Ändert die Rolle des aktuellen Nutzers (Mockup für Demo)
     * In Produktion würde die Rolle durch Backend-Authentifizierung gesetzt
     */
    const handleRoleChange = (newRole) => {
        dataManager.setCurrentUserRole(newRole);
        setCurrentRole(newRole);
        alert(`Rolle wurde auf "${dataManager.getRoleInfo(newRole).label}" geändert.\n\nHINWEIS: Dies ist ein Mockup. In Produktion würde die Rolle durch Backend-Authentifizierung erfolgen.`);
    };

    /**
     * Rendert die Kategorien-Übersicht - Hauptansicht mit allen Kategorien
     */
    const renderCategoriesOverview = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>
                            <i className="fas fa-layer-group me-2"></i>
                            Kategorien-Übersicht
                        </h2>
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => {
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

                    {/* Statusanzeige - Übersicht über vorhandene Daten */}
                    <div className="alert alert-info d-flex justify-content-between align-items-center mx-auto" style={{ maxWidth: '800px' }}>
                        <div>
                            <i className="fas fa-info-circle me-2"></i>
                            <strong>Status:</strong> {categories.length} Kategorien, {cards.length} Karten insgesamt
                        </div>
                        <small className="text-muted">
                            Klicken Sie auf eine Kategorie, um die zugehörigen Karten zu sehen
                        </small>
                    </div>

                    {/* Kategorien-Grid - Responsive Darstellung aller Kategorien */}
                    <div className="row">
                        {categories.length === 0 ? (
                            <div className="col-12">
                                <div className="alert alert-warning">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    Keine Kategorien vorhanden. Erstellen Sie eine neue Kategorie, um zu beginnen.
                                </div>
                            </div>
                        ) : (
                            Array.isArray(categories) && categories.map((category, index) => category && (
                                <div key={category.id || `category-${index}`} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                                    <div
                                        className={`card border-${category && category.color ? category.color : 'primary'} h-100 category-card`}
                                        style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '8px' }}
                                        onClick={() => category && enterCategoryView(category)}
                                    >
                                        <div className={`card-header bg-${category && category.color ? category.color : 'primary'} text-white`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">
                                                    <i className={`${category && category.icon ? category.icon : 'fas fa-folder'} me-2`}></i>
                                                    {category && category.name ? category.name : 'Unbenannte Kategorie'}
                                                </h5>
                                                {/* FIX: Einfachere Button-Implementierung ohne Bootstrap Dropdown */}
                                                <button
                                                    className="btn btn-sm btn-outline-light"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const shouldEdit = window.confirm('Möchten Sie diese Kategorie bearbeiten?');
                                                        if (shouldEdit) {
                                                            startEditCategory(category);
                                                        } else if (window.confirm('Möchten Sie diese Kategorie stattdessen löschen?')) {
                                                            deleteCategory(category.id);
                                                        }
                                                    }}
                                                    title="Kategorie verwalten"
                                                >
                                                    <i className="fas fa-cog"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{category && category.description ? category.description : 'Keine Beschreibung verfügbar'}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary">
                          <i className="fas fa-cards me-1"></i>
                            {category && category.id ? getCardCountForCategory(category.id) : 0} Karten
                        </span>
                                                <small className="text-muted">
                                                    <i className="fas fa-user me-1"></i>
                                                    {category && category.author ? category.author : 'Unbekannt'}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">
                                                    Erstellt: {category && category.created ? new Date(category.created).toLocaleDateString() : 'Unbekannt'}
                                                </small>
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (category) {
                                                                enterCategoryView(category);
                                                            }
                                                        }}
                                                    >
                                                        <i className="fas fa-eye me-1"></i>
                                                        Anzeigen
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-success"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (category && category.id) {
                                                                // JavaScript-kompatible State-Update-Syntax
                                                                setNewCard({
                                                                    ...newCard,
                                                                    categoryId: category.id
                                                                });
                                                                setCurrentView('add-card');
                                                            }
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
            </div>
        </div>
    );

    /**
     * Rendert die Karten einer bestimmten Kategorie - Detailansicht für spezifische Kategorie
     */
    const renderCategoryDetail = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2>
                                <i className={`${currentCategoryView && currentCategoryView.icon ? currentCategoryView.icon : 'fas fa-folder'} me-2`}></i>
                                {currentCategoryView && currentCategoryView.name ? currentCategoryView.name : 'Kategorie'}
                            </h2>
                            <p className="text-muted mb-0">{currentCategoryView && currentCategoryView.description ? currentCategoryView.description : 'Keine Beschreibung verfügbar'}</p>
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
                                    if (currentCategoryView && currentCategoryView.id) {
                                        // JavaScript-kompatible State-Update-Syntax
                                        setNewCard({
                                            ...newCard,
                                            categoryId: currentCategoryView.id
                                        });
                                        setCurrentView('add-card');
                                    }
                                }}
                            >
                                <i className="fas fa-plus me-2"></i>
                                Neue Karte
                            </button>
                        </div>
                    </div>

                    {/* Rollenauswahl-Box - Mockup für Demo */}
                    <div className="alert alert-warning mb-4">
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <h6 className="mb-1">
                                    <i className={`${dataManager.getRoleInfo(currentRole).icon} me-2`}></i>
                                    Aktuelle Rolle: {dataManager.getRoleInfo(currentRole).label}
                                </h6>
                                <small className="text-muted">
                                    {dataManager.getRoleInfo(currentRole).description}
                                </small>
                                <p className="mb-0 mt-2">
                                    <small>
                                        <strong>DEMO-MODUS:</strong> Ändern Sie Ihre Rolle, um die rollenbasierten Funktionen zu testen.
                                        In Produktion wird die Rolle durch Backend-Authentifizierung bestimmt.
                                    </small>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="roleSelector" className="form-label">
                                    <i className="fas fa-user-cog me-1"></i>
                                    Rolle wechseln (Demo)
                                </label>
                                <select
                                    id="roleSelector"
                                    className="form-select"
                                    value={currentRole}
                                    onChange={(e) => handleRoleChange(e.target.value)}
                                >
                                    {dataManager.getAvailableRoles().map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Erweiterte Such- und Filterbereich - Verbesserte Suche für bessere Usability */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-search me-2"></i>
                                Suche und Filter
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-3">
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
                                <div className="col-md-3">
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
                                        {getUniqueAuthors().map((author, index) => (
                                            <option key={`author-${index}`} value={String(author)}>
                                                {author}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3">
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
                                <div className="col-md-3">
                                    <label htmlFor="reportedFilter" className="form-label">
                                        Meldungen
                                    </label>
                                    <select
                                        id="reportedFilter"
                                        className="form-select"
                                        value={reportedFilter}
                                        onChange={(e) => setReportedFilter(e.target.value)}
                                    >
                                        <option value="all">Alle Fragen</option>
                                        <option value="reported">Nur gemeldete</option>
                                        <option value="not-reported">Nicht gemeldete</option>
                                    </select>
                                </div>
                            </div>
                            {/* Housekeeping-Filter nur für Tutor/Moderator */}
                            {dataManager.hasPermission('moderate') && (
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="statusFilter" className="form-label">
                                            <i className="fas fa-tasks me-2"></i>
                                            Housekeeping-Status
                                        </label>
                                        <select
                                            id="statusFilter"
                                            className="form-select"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="all">Alle Status</option>
                                            <option value="active">Aktiv</option>
                                            <option value="review">Zu prüfen</option>
                                            <option value="archived">Archiviert</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Statusanzeige - Informationen über gefilterte Ergebnisse */}
                    <div className="alert alert-info d-flex justify-content-between align-items-center mx-auto" style={{ maxWidth: '800px' }}>
                        <div>
                            <i className="fas fa-info-circle me-2"></i>
                            <strong>Karten in {currentCategoryView && currentCategoryView.name ? currentCategoryView.name : 'Kategorie'}:</strong> {Array.isArray(filteredCards) ? filteredCards.length : 0} von {currentCategoryView && currentCategoryView.id ? getCardCountForCategory(currentCategoryView.id) : 0} angezeigt
                            {(() => {
                                const reportedQuestions = JSON.parse(localStorage.getItem('reported-questions') || '[]');
                                const reportedInCategory = cards.filter(card =>
                                    reportedQuestions.includes(card.id) &&
                                    (!currentCategoryView || card.categoryId === currentCategoryView.id)
                                ).length;
                                return reportedInCategory > 0 ? (
                                    <span className="badge bg-warning text-dark ms-2">
                                        <i className="fas fa-flag me-1"></i>
                                        {reportedInCategory} gemeldet
                                    </span>
                                ) : null;
                            })()}
                        </div>
                        <small className="text-muted">
                            Kategorie: {currentCategoryView && currentCategoryView.name ? currentCategoryView.name : 'Unbekannt'} •
                            Autor: {currentCategoryView && currentCategoryView.author ? currentCategoryView.author : 'Unbekannt'}
                        </small>
                    </div>

                    {/* Karten-Grid - Darstellung aller Karten in der aktuellen Kategorie */}
                    <div className="row">
                        {!Array.isArray(filteredCards) || filteredCards.length === 0 ? (
                            <div className="col-12">
                                <div className="alert alert-warning">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    {!currentCategoryView || !currentCategoryView.id || getCardCountForCategory(currentCategoryView.id) === 0 ?
                                        'Keine Karten in dieser Kategorie vorhanden. Erstellen Sie eine neue Karte.' :
                                        'Keine Karten entsprechen den aktuellen Filterkriterien.'
                                    }
                                </div>
                            </div>
                        ) : (
                            Array.isArray(filteredCards) && filteredCards.map((card, index) => card && (
                                <div key={card.id || `card-${index}`} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
                                    <div className="card h-100" style={{ maxWidth: '100%', borderRadius: '8px' }}>
                                        <div className="card-header">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">
                                                        {card.question || 'Keine Frage'}
                                                        {(() => {
                                                            const reportedQuestions = JSON.parse(localStorage.getItem('reported-questions') || '[]');
                                                            return reportedQuestions.includes(card.id) ? (
                                                                <span className="badge bg-warning text-dark ms-2" title="Diese Frage wurde gemeldet">
                                                                    <i className="fas fa-flag me-1"></i>
                                                                    Gemeldet
                                                                </span>
                                                            ) : null;
                                                        })()}
                                                        {(() => {
                                                            const cardStatus = dataManager.getCardStatus(card.id);
                                                            if (cardStatus === 'review') {
                                                                return (
                                                                    <span className="badge bg-info text-white ms-2" title="Frage muss überprüft werden">
                                                                        <i className="fas fa-exclamation-circle me-1"></i>
                                                                        Zu prüfen
                                                                    </span>
                                                                );
                                                            } else if (cardStatus === 'archived') {
                                                                return (
                                                                    <span className="badge bg-secondary text-white ms-2" title="Frage wurde archiviert">
                                                                        <i className="fas fa-archive me-1"></i>
                                                                        Archiviert
                                                                    </span>
                                                                );
                                                            }
                                                            return null;
                                                        })()}
                                                    </h6>
                                                    <small className="text-muted">
                                                        <i className="fas fa-tag me-1"></i>
                                                        {card.tags && Array.isArray(card.tags) && card.tags.length > 0 ?
                                                            card.tags.join(', ') : 'Keine Tags'}
                                                    </small>
                                                </div>
                                                <div className="btn-group btn-group-sm">
                                                    {/* Rollenbasierte Bearbeitungs-/Lösch-Buttons */}
                                                    {(dataManager.hasPermission('moderate') || card.author === user.name) && (
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                startEditCard(card);
                                                            }}
                                                            title="Karte bearbeiten"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                    )}
                                                    {(dataManager.isModerator() || card.author === user.name) && (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteCard(card.id);
                                                            }}
                                                            title="Karte löschen"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const reportedQuestions = JSON.parse(localStorage.getItem('reported-questions') || '[]');
                                                            if (!reportedQuestions.includes(card.id)) {
                                                                if (window.confirm('Möchten Sie diese Frage als fehlerhaft oder unpassend melden?')) {
                                                                    reportedQuestions.push(card.id);
                                                                    localStorage.setItem('reported-questions', JSON.stringify(reportedQuestions));
                                                                    alert('Frage wurde gemeldet.');
                                                                    loadData();
                                                                }
                                                            } else {
                                                                alert('Diese Frage wurde bereits gemeldet.');
                                                            }
                                                        }}
                                                        title="Frage melden"
                                                    >
                                                        <i className="fas fa-flag"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                {card && card.answers && Array.isArray(card.answers) ?
                                                    card.answers.map((answer, answerIndex) => (
                                                        <div key={answerIndex} className={`form-check ${card.correctAnswer === answerIndex ? 'bg-success bg-opacity-10' : ''}`}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                disabled
                                                                checked={card.correctAnswer === answerIndex}
                                                                readOnly
                                                            />
                                                            <label className="form-check-label">
                                                                {answer}
                                                                {card.correctAnswer === answerIndex && (
                                                                    <i className="fas fa-check text-success ms-2"></i>
                                                                )}
                                                            </label>
                                                        </div>
                                                    )) : (
                                                        <p className="text-muted">Keine Antworten verfügbar</p>
                                                    )}
                                            </div>
                                            {card.explanation && (
                                                <div className="alert alert-info">
                                                    <small>
                                                        <strong>Erklärung:</strong> {card.explanation}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="text-muted">
                                                    <i className="fas fa-user me-1"></i>
                                                    {card.author || 'Unbekannt'}
                                                </small>
                                                <span className={`badge ${
                                                    card.difficulty === 'Leicht' ? 'bg-success' :
                                                        card.difficulty === 'Mittel' ? 'bg-warning text-dark' :
                                                            'bg-danger'
                                                }`}>
                          {card.difficulty || 'Unbekannt'}
                        </span>
                                            </div>
                                            {/* Rollenbasierte Moderation-Buttons */}
                                            {dataManager.hasPermission('moderate') ? (
                                                <div className="btn-group w-100" role="group">
                                                    {(() => {
                                                        const cardStatus = dataManager.getCardStatus(card.id);
                                                        return (
                                                            <>
                                                                <button
                                                                    className={`btn btn-sm ${cardStatus === 'active' ? 'btn-success' : 'btn-outline-success'}`}
                                                                    onClick={() => {
                                                                        dataManager.reactivateCard(card.id);
                                                                        loadData();
                                                                    }}
                                                                    title="Als aktiv markieren"
                                                                >
                                                                    <i className="fas fa-check me-1"></i>
                                                                    Aktiv
                                                                </button>
                                                                <button
                                                                    className={`btn btn-sm ${cardStatus === 'review' ? 'btn-info' : 'btn-outline-info'}`}
                                                                    onClick={() => {
                                                                        const reason = prompt('Grund für die Überprüfung (optional):');
                                                                        dataManager.markCardForReview(card.id, reason || 'Zur Überprüfung markiert');
                                                                        loadData();
                                                                    }}
                                                                    title="Zur Überprüfung markieren"
                                                                >
                                                                    <i className="fas fa-exclamation-circle me-1"></i>
                                                                    Prüfen
                                                                </button>
                                                                <button
                                                                    className={`btn btn-sm ${cardStatus === 'archived' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                                                    onClick={() => {
                                                                        const reason = prompt('Grund für die Archivierung (optional):');
                                                                        dataManager.archiveCard(card.id, reason || 'Archiviert');
                                                                        loadData();
                                                                    }}
                                                                    title="Archivieren"
                                                                >
                                                                    <i className="fas fa-archive me-1"></i>
                                                                    Archiv
                                                                </button>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            ) : (
                                                <div className="alert alert-secondary mb-0 py-2">
                                                    <small className="text-muted">
                                                        <i className="fas fa-lock me-1"></i>
                                                        Moderationsfunktionen nur für Tutoren und Moderatoren
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    /**
     * Rendert das Formular zum Hinzufügen einer neuen Kategorie - Vollständiges Eingabeformular
     */
    const renderAddCategory = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
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
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        placeholder="z.B. Programmierung"
                                    />
                                    {errors.categoryName && (
                                        <div className="invalid-feedback">
                                            {errors.categoryName}
                                        </div>
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
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        placeholder="Beschreibung der Kategorie..."
                                    />
                                    {errors.categoryDescription && (
                                        <div className="invalid-feedback">
                                            {errors.categoryDescription}
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="categoryIcon" className="form-label">
                                                Icon
                                            </label>
                                            <select
                                                id="categoryIcon"
                                                className="form-select"
                                                value={newCategory.icon}
                                                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                                            >
                                                {categoryIcons.map((icon, index) => (
                                                    <option key={`icon-${index}`} value={icon.value}>
                                                        {icon.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="categoryColor" className="form-label">
                                                Farbe
                                            </label>
                                            <select
                                                id="categoryColor"
                                                className="form-select"
                                                value={newCategory.color}
                                                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                                            >
                                                {categoryColors.map((color, index) => (
                                                    <option key={`color-${index}`} value={color.value}>
                                                        {color.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        id="categoryPublic"
                                        className="form-check-input"
                                        checked={newCategory.isPublic}
                                        onChange={(e) => setNewCategory({ ...newCategory, isPublic: e.target.checked })}
                                    />
                                    <label htmlFor="categoryPublic" className="form-check-label">
                                        Öffentlich verfügbar
                                    </label>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-md-2"
                                        onClick={() => setCurrentView('overview')}
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={createCategory}
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        Kategorie erstellen
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    /**
     * Rendert das Formular zum Bearbeiten einer Kategorie
     */
    const renderEditCategory = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="mb-0">
                                    <i className="fas fa-edit me-2"></i>
                                    Kategorie bearbeiten
                                </h3>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setNewCategory({
                                            name: '',
                                            description: '',
                                            icon: 'fas fa-folder',
                                            color: 'primary',
                                            isPublic: true,
                                            collaborators: []
                                        });
                                        setCurrentView('overview');
                                    }}
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Zurück
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editCategoryName" className="form-label">
                                        Kategoriename *
                                    </label>
                                    <input
                                        type="text"
                                        id="editCategoryName"
                                        className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        placeholder="z.B. Programmierung"
                                    />
                                    {errors.categoryName && (
                                        <div className="invalid-feedback">
                                            {errors.categoryName}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="editCategoryDescription" className="form-label">
                                        Beschreibung *
                                    </label>
                                    <textarea
                                        id="editCategoryDescription"
                                        className={`form-control ${errors.categoryDescription ? 'is-invalid' : ''}`}
                                        rows="3"
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        placeholder="Beschreibung der Kategorie..."
                                    />
                                    {errors.categoryDescription && (
                                        <div className="invalid-feedback">
                                            {errors.categoryDescription}
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="editCategoryIcon" className="form-label">
                                                Icon
                                            </label>
                                            <select
                                                id="editCategoryIcon"
                                                className="form-select"
                                                value={newCategory.icon}
                                                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                                            >
                                                {categoryIcons.map((icon, index) => (
                                                    <option key={`icon-${index}`} value={icon.value}>
                                                        {icon.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="editCategoryColor" className="form-label">
                                                Farbe
                                            </label>
                                            <select
                                                id="editCategoryColor"
                                                className="form-select"
                                                value={newCategory.color}
                                                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                                            >
                                                {categoryColors.map((color, index) => (
                                                    <option key={`color-${index}`} value={color.value}>
                                                        {color.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        id="editCategoryPublic"
                                        className="form-check-input"
                                        checked={newCategory.isPublic}
                                        onChange={(e) => setNewCategory({ ...newCategory, isPublic: e.target.checked })}
                                    />
                                    <label htmlFor="editCategoryPublic" className="form-check-label">
                                        Öffentlich verfügbar
                                    </label>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-md-2"
                                        onClick={() => {
                                            setNewCategory({
                                                name: '',
                                                description: '',
                                                icon: 'fas fa-folder',
                                                color: 'primary',
                                                isPublic: true,
                                                collaborators: []
                                            });
                                            setCurrentView('overview');
                                        }}
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={saveEditedCategory}
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        Änderungen speichern
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    /**
     * Rendert das Formular zum Hinzufügen einer neuen Karte
     */
    const renderAddCard = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
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
                                        onChange={(e) => setNewCard({ ...newCard, categoryId: e.target.value })}
                                    >
                                        <option value="">Kategorie auswählen...</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && (
                                        <div className="invalid-feedback">
                                            {errors.categoryId}
                                        </div>
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
                                        onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                                        placeholder="Geben Sie hier Ihre Frage ein..."
                                    />
                                    {errors.question && (
                                        <div className="invalid-feedback">
                                            {errors.question}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Antwortmöglichkeiten
                                    </label>
                                    {newCard.answers.map((answer, index) => (
                                        <div key={index} className="input-group mb-2">
                          <span className="input-group-text">
                              <input
                                  className="form-check-input"
                                  type="radio"
                                  name="correctAnswer"
                                  checked={newCard.correctAnswer === index}
                                  onChange={() => {
                                      setNewCard(prevCard => ({
                                          ...prevCard,
                                          correctAnswer: index
                                      }));
                                  }}
                              />
                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={answer}
                                                onChange={(e) => updateCardAnswer(index, e.target.value)}
                                                placeholder={`Antwort ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                    {errors.answers && (
                                        <div className="text-danger small">
                                            {errors.answers}
                                        </div>
                                    )}
                                    {errors.correctAnswer && (
                                        <div className="text-danger small">
                                            {errors.correctAnswer}
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="cardDifficulty" className="form-label">
                                                Schwierigkeit
                                            </label>
                                            <select
                                                id="cardDifficulty"
                                                className="form-select"
                                                value={newCard.difficulty}
                                                onChange={(e) => setNewCard({ ...newCard, difficulty: e.target.value })}
                                            >
                                                <option value="Leicht">Leicht</option>
                                                <option value="Mittel">Mittel</option>
                                                <option value="Schwer">Schwer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="cardTags" className="form-label">
                                                Tags (kommagetrennt)
                                            </label>
                                            <input
                                                type="text"
                                                id="cardTags"
                                                className="form-control"
                                                value={newCard.tags}
                                                onChange={(e) => setNewCard({ ...newCard, tags: e.target.value })}
                                                placeholder="z.B. JavaScript, React, Frontend"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="cardExplanation" className="form-label">
                                        Erklärung (optional)
                                    </label>
                                    <textarea
                                        id="cardExplanation"
                                        className="form-control"
                                        rows="3"
                                        value={newCard.explanation}
                                        onChange={(e) => setNewCard({ ...newCard, explanation: e.target.value })}
                                        placeholder="Erklärung der korrekten Antwort..."
                                    />
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        id="cardPublic"
                                        className="form-check-input"
                                        checked={newCard.isPublic}
                                        onChange={(e) => setNewCard({ ...newCard, isPublic: e.target.checked })}
                                    />
                                    <label htmlFor="cardPublic" className="form-check-label">
                                        Öffentlich verfügbar
                                    </label>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-md-2"
                                        onClick={() => setCurrentView('overview')}
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={createCard}
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        Karte erstellen
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    /**
     * Rendert das Formular zum Bearbeiten einer Karte
     */
    const renderEditCard = () => (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="mb-0">
                                    <i className="fas fa-edit me-2"></i>
                                    Karte bearbeiten
                                </h3>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setEditingCard(null);
                                        setCurrentView('overview');
                                    }}
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
                                        <label htmlFor="editCardQuestion" className="form-label">
                                            Frage *
                                        </label>
                                        <textarea
                                            id="editCardQuestion"
                                            className="form-control"
                                            rows="3"
                                            value={editingCard.question}
                                            onChange={(e) => setEditingCard({ ...editingCard, question: e.target.value })}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Antwortmöglichkeiten *
                                        </label>
                                        {editingCard.answers.map((answer, index) => (
                                            <div key={index} className="input-group mb-2">
                              <span className="input-group-text">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      name="editCorrectAnswer"
                                      checked={editingCard.correctAnswer === index}
                                      onChange={() => {
                                          // Aktualisiert correctAnswer als Zahl entsprechend dem CardState-Typ
                                          const updatedCard = {
                                              ...editingCard,
                                              correctAnswer: index // Index ist eine Zahl, kompatibel mit null|number Typ
                                          };
                                          setEditingCard(updatedCard);
                                      }}
                                  />
                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={answer}
                                                    onChange={(e) => updateEditCardAnswer(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="editCardDifficulty" className="form-label">
                                                    Schwierigkeit
                                                </label>
                                                <select
                                                    id="editCardDifficulty"
                                                    className="form-select"
                                                    value={editingCard.difficulty}
                                                    onChange={(e) => setEditingCard({ ...editingCard, difficulty: e.target.value })}
                                                >
                                                    <option value="Leicht">Leicht</option>
                                                    <option value="Mittel">Mittel</option>
                                                    <option value="Schwer">Schwer</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="editCardTags" className="form-label">
                                                    Tags (kommagetrennt)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="editCardTags"
                                                    className="form-control"
                                                    value={editingCard.tags}
                                                    onChange={(e) => setEditingCard({ ...editingCard, tags: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="editCardExplanation" className="form-label">
                                            Erklärung (optional)
                                        </label>
                                        <textarea
                                            id="editCardExplanation"
                                            className="form-control"
                                            rows="3"
                                            value={editingCard.explanation || ''}
                                            onChange={(e) => setEditingCard({ ...editingCard, explanation: e.target.value })}
                                        />
                                    </div>

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-md-2"
                                            onClick={() => {
                                                setEditingCard(null);
                                                setCurrentView('overview');
                                            }}
                                        >
                                            Abbrechen
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={saveEditedCard}
                                        >
                                            <i className="fas fa-save me-2"></i>
                                            Speichern
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Hauptrender-Logik
    switch (currentView) {
        case 'add-category':
            return renderAddCategory();
        case 'edit-category':
            return renderEditCategory();
        case 'add-card':
            return renderAddCard();
        case 'edit-card':
            return renderEditCard();
        default:
            return viewMode === 'category-detail' ? renderCategoryDetail() : renderCategoriesOverview();
    }
}

export default CardManager;