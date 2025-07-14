/**
 * Zentraler Datenmanager für die gesamte Anwendung
 *
 * KORRIGIERT: Mock-Daten werden jetzt garantiert geladen
 */

import { getMockQuestions, getCategories } from './mockData';

/**
 * Zentraler Datenmanager
 */
class DataManager {
  constructor() {
    this.initializeData();
  }

  /**
   * Initialisiert die Daten beim ersten Start
   * KORRIGIERT: Erzwingt das Laden der Mock-Daten wenn localStorage leer ist
   */
  initializeData() {
    const existingCategories = localStorage.getItem('quiz-categories');
    const existingCards = localStorage.getItem('quiz-cards');

    // Lade Mock-Daten wenn keine Kategorien vorhanden sind
    if (!existingCategories || JSON.parse(existingCategories).length === 0) {
      console.log('Lade Mock-Kategorien...');
      this.loadMockCategories();
    }

    // Lade Mock-Daten wenn keine Karten vorhanden sind
    if (!existingCards || JSON.parse(existingCards).length === 0) {
      console.log('Lade Mock-Fragen...');
      this.loadMockQuestions();
    }
  }

  /**
   * Lädt die Mock-Kategorien
   */
  loadMockCategories() {
    const mockCategories = getCategories();
    const convertedCategories = mockCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: `fas fa-${cat.icon}`,
      color: cat.color,
      author: 'System',
      created: new Date().toISOString(),
      isPublic: true,
      collaborators: [],
      cardCount: 0
    }));

    localStorage.setItem('quiz-categories', JSON.stringify(convertedCategories));
    console.log('Mock-Kategorien geladen:', convertedCategories.length);
  }

  /**
   * Lädt die Mock-Fragen
   */
  loadMockQuestions() {
    const mockQuestions = getMockQuestions();
    const categories = this.getAllCategories();

    const convertedQuestions = mockQuestions.map(q => ({
      id: q.id,
      categoryId: this.getCategoryIdByName(q.category, categories),
      question: q.question,
      answers: q.answers,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
      explanation: q.explanation || '',
      tags: this.extractTagsFromQuestion(q.question),
      author: 'System',
      authorEmail: 'system@iu-study.org',
      created: new Date().toISOString(),
      isPublic: true
    }));

    localStorage.setItem('quiz-cards', JSON.stringify(convertedQuestions));
    console.log('Mock-Fragen geladen:', convertedQuestions.length);

    // Aktualisiere Kartenanzahl in Kategorien
    this.updateCategoryCardCounts();
  }

  /**
   * Hilfsfunktion: Extrahiert Tags aus einer Frage
   */
  extractTagsFromQuestion(question) {
    const keywords = ['OOP', 'SQL', 'HTTP', 'HTTPS', 'Algorithmus', 'Datenbank', 'Netzwerk', 'agile', 'Klasse', 'Objekt', 'LIFO', 'Stack', 'Zeitkomplexität', 'Primärschlüssel', 'Topologie', 'Softwareentwicklung'];
    const tags = [];

    keywords.forEach(keyword => {
      if (question.toLowerCase().includes(keyword.toLowerCase())) {
        tags.push(keyword);
      }
    });

    return tags;
  }

  /**
   * Hilfsfunktion: Findet Kategorie-ID basierend auf Name
   */
  getCategoryIdByName(categoryName, categories) {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.id : 'informatik'; // Fallback
  }

  /**
   * Aktualisiert die Kartenanzahl in allen Kategorien
   */
  updateCategoryCardCounts() {
    const categories = this.getAllCategories();
    const cards = this.getAllCards();

    const updatedCategories = categories.map(category => {
      const cardCount = cards.filter(card => card.categoryId === category.id).length;
      return { ...category, cardCount };
    });

    localStorage.setItem('quiz-categories', JSON.stringify(updatedCategories));
  }

  /**
   * Gibt alle Kategorien zurück
   */
  getAllCategories() {
    const storedCategories = localStorage.getItem('quiz-categories');
    return storedCategories ? JSON.parse(storedCategories) : [];
  }

  /**
   * Gibt alle Karten zurück
   */
  getAllCards() {
    const storedCards = localStorage.getItem('quiz-cards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  /**
   * Gibt Karten einer bestimmten Kategorie zurück
   */
  getCardsByCategory(categoryId) {
    const allCards = this.getAllCards();
    return allCards.filter(card => card.categoryId === categoryId);
  }

  /**
   * Gibt Karten einer bestimmten Kategorie nach Namen zurück (für Kompatibilität)
   */
  getCardsByCategoryName(categoryName) {
    const allCards = this.getAllCards();
    const categories = this.getAllCategories();
    const category = categories.find(cat => cat.name === categoryName);

    if (!category) return [];

    return allCards.filter(card => card.categoryId === category.id);
  }

  /**
   * Speichert eine neue Kategorie
   */
  saveCategory(category) {
    const categories = this.getAllCategories();
    const newCategory = {
      id: category.id || `cat-${Date.now()}`,
      ...category,
      cardCount: 0,
      created: new Date().toISOString()
    };

    const updatedCategories = [...categories, newCategory];
    localStorage.setItem('quiz-categories', JSON.stringify(updatedCategories));

    return newCategory;
  }

  /**
   * Speichert eine neue Karte
   */
  saveCard(card) {
    const cards = this.getAllCards();
    const newCard = {
      id: card.id || `card-${Date.now()}`,
      ...card,
      created: new Date().toISOString(),
      tags: Array.isArray(card.tags) ? card.tags :
          (typeof card.tags === 'string' ? card.tags.split(',').map(t => t.trim()).filter(t => t) : [])
    };

    const updatedCards = [...cards, newCard];
    localStorage.setItem('quiz-cards', JSON.stringify(updatedCards));

    // Aktualisiere Kartenanzahl in Kategorien
    this.updateCategoryCardCounts();

    return newCard;
  }

  /**
   * Konvertiert Daten für QuizMain-Kompatibilität
   */
  getQuestionsForQuiz() {
    const cards = this.getAllCards();
    const categories = this.getAllCategories();

    return cards.map(card => {
      const category = categories.find(cat => cat.id === card.categoryId);
      return {
        id: card.id,
        question: card.question,
        answers: card.answers,
        correctAnswer: card.correctAnswer,
        category: category ? category.name : 'Unbekannt',
        difficulty: card.difficulty,
        explanation: card.explanation
      };
    });
  }

  /**
   * Konvertiert Kategorien für QuizMain-Kompatibilität
   */
  getCategoriesForQuiz() {
    const categories = this.getAllCategories();
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon.replace('fas fa-', ''),
      color: cat.color
    }));
  }

  /**
   * Gibt eindeutige Autoren zurück
   */
  getUniqueAuthors() {
    const cards = this.getAllCards();
    const categories = this.getAllCategories();

    const cardAuthors = cards.map(card => card.author);
    const categoryAuthors = categories.map(cat => cat.author);

    return [...new Set([...cardAuthors, ...categoryAuthors])];
  }

  /**
   * Sucht nach Karten basierend auf Suchbegriff
   */
  searchCards(searchTerm, authorFilter = 'all') {
    const cards = this.getAllCards();

    return cards.filter(card => {
      const matchesSearch = searchTerm === '' ||
          card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesAuthor = authorFilter === 'all' || card.author === authorFilter;
      return matchesSearch && matchesAuthor;
    });
  }

  /**
   * Aktualisiert eine bestehende Kategorie
   */
  updateCategory(categoryId, updates) {
    const categories = this.getAllCategories();
    const updatedCategories = categories.map(cat =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
    );

    localStorage.setItem('quiz-categories', JSON.stringify(updatedCategories));
    return updatedCategories.find(cat => cat.id === categoryId);
  }

  /**
   * Aktualisiert eine bestehende Karte
   */
  updateCard(cardId, updates) {
    const cards = this.getAllCards();
    const updatedCards = cards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
    );

    localStorage.setItem('quiz-cards', JSON.stringify(updatedCards));

    // Aktualisiere Kartenanzahl falls Kategorie geändert wurde
    if (updates.categoryId) {
      this.updateCategoryCardCounts();
    }

    return updatedCards.find(card => card.id === cardId);
  }

  /**
   * Löscht eine Kategorie (nur wenn keine Karten vorhanden)
   */
  deleteCategory(categoryId) {
    const cards = this.getCardsByCategory(categoryId);
    if (cards.length > 0) {
      throw new Error('Kategorie kann nicht gelöscht werden, da noch Karten vorhanden sind.');
    }

    const categories = this.getAllCategories();
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);

    localStorage.setItem('quiz-categories', JSON.stringify(updatedCategories));
    return true;
  }

  /**
   * Löscht eine Karte
   */
  deleteCard(cardId) {
    const cards = this.getAllCards();
    const updatedCards = cards.filter(card => card.id !== cardId);

    localStorage.setItem('quiz-cards', JSON.stringify(updatedCards));

    // Aktualisiere Kartenanzahl in Kategorien
    this.updateCategoryCardCounts();

    return true;
  }

  /**
   * Erzwingt das Neuladen der Mock-Daten (für Debug-Zwecke)
   */
  reloadMockData() {
    console.log('Mock-Daten werden neu geladen...');
    this.loadMockCategories();
    this.loadMockQuestions();
  }

  /**
   * Exportiert alle Daten
   */
  exportData() {
    return {
      categories: this.getAllCategories(),
      cards: this.getAllCards(),
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Importiert Daten (überschreibt bestehende Daten)
   */
  importData(data) {
    if (data.categories) {
      localStorage.setItem('quiz-categories', JSON.stringify(data.categories));
    }

    if (data.cards) {
      localStorage.setItem('quiz-cards', JSON.stringify(data.cards));
    }

    this.updateCategoryCardCounts();
    return true;
  }

  /**
   * Setzt alle Daten zurück und lädt Mock-Daten neu
   */
  resetData() {
    localStorage.removeItem('quiz-categories');
    localStorage.removeItem('quiz-cards');
    this.initializeData();
  }
}

// Singleton-Instanz
const dataManager = new DataManager();
export default dataManager;