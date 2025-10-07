/**
 * Zentraler Datenmanager für die gesamte Anwendung
 *
 * KORRIGIERT: Mock-Daten werden jetzt garantiert geladen
 * UPDATE: Kleine Änderungen für sofortige Funktionalität
 *
 * @author Projektteam IU Community Quiz
 * @version 1.1.1
 * @since 2025-07-15
 *
 *  *
 */

import { mockCategories, mockQuestions } from './mockData';

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

    // KORRIGIERT: Sofortiges Laden der Mock-Daten bei fehlenden Daten
    if (!existingCategories || JSON.parse(existingCategories || '[]').length === 0) {
      console.log('DataManager: Lade Mock-Kategorien...');
      this.loadMockCategories();
    }

    if (!existingCards || JSON.parse(existingCards || '[]').length === 0) {
      console.log('DataManager: Lade Mock-Fragen...');
      this.loadMockQuestions();
    }

    // KORRIGIERT: Daten nach dem Laden nochmal prüfen
    const finalCategories = this.getAllCategories();
    const finalCards = this.getAllCards();
    console.log('DataManager: Finale Kategorien:', finalCategories.length);
    console.log('DataManager: Finale Karten:', finalCards.length);
  }

  /**
   * Lädt die Mock-Kategorien
   * KORRIGIERT: Bessere Fehlerbehandlung
   */
  loadMockCategories() {
    try {
      console.log('DataManager: Mock-Kategorien erhalten:', mockCategories.length);

      const convertedCategories = mockCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon.startsWith('fas fa-') ? cat.icon : `fas fa-${cat.icon}`,
        color: cat.color,
        author: 'System',
        created: new Date().toISOString(),
        isPublic: true,
        collaborators: [],
        cardCount: 0
      }));

      localStorage.setItem('quiz-categories', JSON.stringify(convertedCategories));
      console.log('DataManager: Mock-Kategorien gespeichert:', convertedCategories.length);
      return convertedCategories;
    } catch (error) {
      console.error('DataManager: Fehler beim Laden der Mock-Kategorien:', error);
      return [];
    }
  }

  /**
   * Lädt die Mock-Fragen
   * KORRIGIERT: Bessere Fehlerbehandlung und Kategorie-Zuordnung
   */
  loadMockQuestions() {
    try {
      console.log('DataManager: Mock-Fragen erhalten:', mockQuestions.length);

      const categories = this.getAllCategories();
      console.log('DataManager: Verfügbare Kategorien:', categories.map(c => c.name));

      const convertedQuestions = mockQuestions.map(q => {
        const categoryId = this.getCategoryIdByName(q.category, categories);
        return {
          id: q.id,
          categoryId: categoryId,
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
        };
      });

      localStorage.setItem('quiz-cards', JSON.stringify(convertedQuestions));
      console.log('DataManager: Mock-Fragen gespeichert:', convertedQuestions.length);

      // Aktualisiere Kartenanzahl in Kategorien
      this.updateCategoryCardCounts();
      return convertedQuestions;
    } catch (error) {
      console.error('DataManager: Fehler beim Laden der Mock-Fragen:', error);
      return [];
    }
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
   * KORRIGIERT: Bessere Kategorie-Zuordnung
   */
  getCategoryIdByName(categoryName, categories) {
    const category = categories.find(cat =>
        cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (category) {
      console.log(`DataManager: Kategorie "${categoryName}" gefunden als ID: ${category.id}`);
      return category.id;
    }

    console.warn(`DataManager: Kategorie "${categoryName}" nicht gefunden, verwende Fallback`);
    return categories.length > 0 ? categories[0].id : 'default';
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
    console.log('DataManager: Kartenanzahl aktualisiert');
  }

  /**
   * Gibt alle Kategorien aus der Datenbank zurück
   * 
   * Diese Methode liest alle gespeicherten Kategorien aus dem localStorage
   * und gibt sie als Array zurück. Falls keine Kategorien gefunden werden,
   * wird ein leeres Array zurückgegeben.
   *
   * @returns {Array<Object>} Array mit allen Kategorien oder leeres Array, wenn keine vorhanden sind
   */
  getAllCategories() {
    const storedCategories = localStorage.getItem('quiz-categories');
    return storedCategories ? JSON.parse(storedCategories) : [];
  }

  /**
   * Gibt alle Karten (Fragen) aus der Datenbank zurück
   * 
   * Diese Methode liest alle gespeicherten Karten aus dem localStorage
   * und gibt sie als Array zurück. Falls keine Karten gefunden werden,
   * wird ein leeres Array zurückgegeben.
   *
   * @returns {Array<Object>} Array mit allen Karten oder leeres Array, wenn keine vorhanden sind
   */
  getAllCards() {
    const storedCards = localStorage.getItem('quiz-cards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  /**
   * Gibt alle Karten einer bestimmten Kategorie zurück
   * 
   * Diese Methode filtert alle Karten nach der angegebenen Kategorie-ID
   * und gibt nur die Karten zurück, die zu dieser Kategorie gehören.
   * Dies ist nützlich für die kategoriebasierte Navigation und Anzeige.
   *
   * @param {string} categoryId - ID der Kategorie, deren Karten zurückgegeben werden sollen
   * @returns {Array<Object>} Array mit allen Karten der angegebenen Kategorie oder leeres Array, wenn keine gefunden wurden
   */
  getCardsByCategory(categoryId) {
    const allCards = this.getAllCards();
    return allCards.filter(card => card.categoryId === categoryId);
  }

  /**
   * Gibt alle Karten einer bestimmten Kategorie anhand des Kategorienamens zurück
   * 
   * Diese Methode sucht zunächst die Kategorie anhand ihres Namens und filtert dann
   * alle Karten nach der gefundenen Kategorie-ID. Dies ist eine Hilfsmethode für
   * ältere Komponenten, die noch mit Kategorienamen statt IDs arbeiten.
   *
   * @param {string} categoryName - Name der Kategorie, deren Karten zurückgegeben werden sollen
   * @returns {Array<Object>} Array mit allen Karten der angegebenen Kategorie oder leeres Array, 
   * wenn keine Kategorie mit diesem Namen gefunden wurde oder keine Karten vorhanden sind
   */
  getCardsByCategoryName(categoryName) {
    const allCards = this.getAllCards();
    const categories = this.getAllCategories();
    const category = categories.find(cat => cat.name === categoryName);

    if (!category) return [];

    return allCards.filter(card => card.categoryId === category.id);
  }

  /**
   * Speichert eine neue Kategorie in der Datenbank
   * 
   * Diese Methode erstellt eine neue Kategorie mit einer eindeutigen ID,
   * fügt sie zur Liste der vorhandenen Kategorien hinzu und speichert
   * die aktualisierte Liste im localStorage.
   *
   * @param {Object} category - Die zu speichernde Kategorie
   * @param {string} [category.id] - Optionale ID (wird generiert, falls nicht vorhanden)
   * @param {string} category.name - Name der Kategorie
   * @param {string} category.description - Beschreibung der Kategorie
   * @param {string} category.icon - Icon der Kategorie (FontAwesome-Klasse)
   * @param {string} category.color - Farbschema der Kategorie
   * @param {boolean} [category.isPublic=true] - Gibt an, ob die Kategorie öffentlich ist
   * @param {Array} [category.collaborators=[]] - Liste der Mitarbeiter
   * @returns {Object} Die neu erstellte Kategorie mit generierter ID und Zeitstempel
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
   * Speichert eine neue Karte (Frage) in der Datenbank
   * 
   * Diese Methode erstellt eine neue Karte mit einer eindeutigen ID,
   * fügt sie zur Liste der vorhandenen Karten hinzu und speichert
   * die aktualisierte Liste im localStorage. Außerdem wird die
   * Kartenanzahl in den zugehörigen Kategorien aktualisiert.
   *
   * @param {Object} card - Die zu speichernde Karte
   * @param {string} [card.id] - Optionale ID (wird generiert, falls nicht vorhanden)
   * @param {string} card.categoryId - ID der Kategorie, zu der die Karte gehört
   * @param {string} card.question - Fragetext der Karte
   * @param {string[]} card.answers - Array mit Antwortmöglichkeiten
   * @param {number} card.correctAnswer - Index der richtigen Antwort
   * @param {string} card.difficulty - Schwierigkeitsgrad der Frage
   * @param {string} [card.explanation=''] - Erklärung zur richtigen Antwort
   * @param {string|string[]} [card.tags=[]] - Tags für die Karte (als String oder Array)
   * @param {string} [card.author] - Autor der Karte
   * @param {boolean} [card.isPublic=true] - Gibt an, ob die Karte öffentlich ist
   * @returns {Object} Die neu erstellte Karte mit generierter ID und Zeitstempel
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
   * KORRIGIERT: Bessere Fehlerbehandlung
   */
  getQuestionsForQuiz() {
    const cards = this.getAllCards();
    const categories = this.getAllCategories();

    console.log('DataManager: getQuestionsForQuiz - Karten:', cards.length, 'Kategorien:', categories.length);

    return cards.map(card => {
      const category = categories.find(cat => cat.id === card.categoryId);
      const result = {
        id: card.id,
        question: card.question,
        answers: card.answers,
        correctAnswer: card.correctAnswer,
        category: category ? category.name : 'Unbekannt',
        difficulty: card.difficulty,
        explanation: card.explanation
      };
      console.log('DataManager: Konvertierte Frage:', result.question, 'Kategorie:', result.category);
      return result;
    });
  }

  /**
   * Konvertiert Kategorien für QuizMain-Kompatibilität
   * KORRIGIERT: Bessere Icon-Behandlung
   */
  getCategoriesForQuiz() {
    const categories = this.getAllCategories();
    console.log('DataManager: getCategoriesForQuiz - Kategorien:', categories.length);

    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon.replace('fas fa-', ''),
      color: cat.color
    }));
  }

  /**
   * Gibt eine Liste aller eindeutigen Autoren im System zurück
   * 
   * Diese Methode sammelt alle Autoren aus Karten und Kategorien,
   * entfernt Duplikate und gibt eine Liste mit eindeutigen Autorennamen zurück.
   * Dies ist nützlich für Filteroptionen in der Benutzeroberfläche.
   *
   * @returns {Array<string>} Array mit eindeutigen Autorennamen
   */
  getUniqueAuthors() {
    const cards = this.getAllCards();
    const categories = this.getAllCategories();

    const cardAuthors = cards.map(card => card.author);
    const categoryAuthors = categories.map(cat => cat.author);

    return [...new Set([...cardAuthors, ...categoryAuthors])];
  }

  /**
   * Sucht nach Karten basierend auf Suchbegriff und optionalem Autorfilter
   * 
   * Diese Methode durchsucht alle Karten nach dem angegebenen Suchbegriff
   * in Fragen und Tags. Zusätzlich kann nach einem bestimmten Autor gefiltert werden.
   * Die Suche ist unabhängig von Groß- und Kleinschreibung.
   *
   * @param {string} searchTerm - Suchbegriff für die Filterung (leerer String gibt alle Karten zurück)
   * @param {string} [authorFilter='all'] - Optionaler Filter für den Autor ('all' für alle Autoren)
   * @returns {Array<Object>} Array mit den gefilterten Karten, die den Suchkriterien entsprechen
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
   * Aktualisiert eine bestehende Kategorie in der Datenbank
   * 
   * Diese Methode sucht eine Kategorie anhand ihrer ID und aktualisiert
   * ihre Eigenschaften mit den übergebenen Werten. Die aktualisierte
   * Kategorienliste wird dann im localStorage gespeichert.
   *
   * @param {string} categoryId - ID der zu aktualisierenden Kategorie
   * @param {Object} updates - Objekt mit den zu aktualisierenden Eigenschaften
   * @param {string} [updates.name] - Neuer Name der Kategorie
   * @param {string} [updates.description] - Neue Beschreibung der Kategorie
   * @param {string} [updates.icon] - Neues Icon der Kategorie
   * @param {string} [updates.color] - Neues Farbschema der Kategorie
   * @param {boolean} [updates.isPublic] - Neuer Wert für die Öffentlichkeit
   * @param {Array} [updates.collaborators] - Neue Liste der Mitarbeiter
   * @returns {Object|undefined} Die aktualisierte Kategorie oder undefined, wenn keine Kategorie mit der ID gefunden wurde
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
   * Aktualisiert eine bestehende Karte (Frage) in der Datenbank
   * 
   * Diese Methode sucht eine Karte anhand ihrer ID und aktualisiert
   * ihre Eigenschaften mit den übergebenen Werten. Die aktualisierte
   * Kartenliste wird dann im localStorage gespeichert. Zusätzlich wird
   * die Kartenanzahl in den Kategorien aktualisiert, falls sich die
   * Kategorie-Zuordnung geändert hat.
   *
   * @param {string} cardId - ID der zu aktualisierenden Karte
   * @param {Object} updates - Objekt mit den zu aktualisierenden Eigenschaften
   * @param {string} [updates.categoryId] - Neue Kategorie-ID
   * @param {string} [updates.question] - Neuer Fragetext
   * @param {string[]} [updates.answers] - Neue Antwortmöglichkeiten
   * @param {number} [updates.correctAnswer] - Neuer Index der richtigen Antwort
   * @param {string} [updates.difficulty] - Neuer Schwierigkeitsgrad
   * @param {string} [updates.explanation] - Neue Erklärung
   * @param {string|string[]} [updates.tags] - Neue Tags
   * @param {boolean} [updates.isPublic] - Neuer Wert für die Öffentlichkeit
   * @returns {Object|undefined} Die aktualisierte Karte oder undefined, wenn keine Karte mit der ID gefunden wurde
   */
  updateCard(cardId, updates) {
    const cards = this.getAllCards();
    const updatedCards = cards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
    );

    localStorage.setItem('quiz-cards', JSON.stringify(updatedCards));
    this.updateCategoryCardCounts();
    return updatedCards.find(card => card.id === cardId);
  }

  /**
   * Löscht eine Kategorie und alle zugehörigen Karten aus der Datenbank
   * 
   * Diese Methode entfernt eine Kategorie anhand ihrer ID aus der Datenbank.
   * Zusätzlich werden alle Karten, die dieser Kategorie zugeordnet sind,
   * ebenfalls gelöscht, um Konsistenz zu gewährleisten und verwaiste
   * Karten zu vermeiden.
   *
   * @param {string} categoryId - ID der zu löschenden Kategorie
   * @returns {boolean} true, wenn die Löschung erfolgreich war
   */
  deleteCategory(categoryId) {
    const categories = this.getAllCategories();
    const cards = this.getAllCards();

    // Lösche alle Karten dieser Kategorie
    const filteredCards = cards.filter(card => card.categoryId !== categoryId);
    localStorage.setItem('quiz-cards', JSON.stringify(filteredCards));

    // Lösche die Kategorie
    const filteredCategories = categories.filter(cat => cat.id !== categoryId);
    localStorage.setItem('quiz-categories', JSON.stringify(filteredCategories));

    return true;
  }

  /**
   * Löscht eine Karte (Frage) aus der Datenbank
   * 
   * Diese Methode entfernt eine Karte anhand ihrer ID aus der Datenbank.
   * Nach dem Löschen wird die Kartenanzahl in den Kategorien aktualisiert,
   * um die Konsistenz der Daten zu gewährleisten.
   *
   * @param {string} cardId - ID der zu löschenden Karte
   * @returns {boolean} true, wenn die Löschung erfolgreich war
   */
  deleteCard(cardId) {
    const cards = this.getAllCards();
    const filteredCards = cards.filter(card => card.id !== cardId);
    localStorage.setItem('quiz-cards', JSON.stringify(filteredCards));
    this.updateCategoryCardCounts();
    return true;
  }

  /**
   * Lädt Mock-Daten neu (für Debugging)
   */
  reloadMockData() {
    console.log('DataManager: Lade Mock-Daten neu...');
    this.loadMockCategories();
    this.loadMockQuestions();
  }

  /**
   * Setzt alle Daten zurück
   */
  resetAllData() {
    localStorage.removeItem('quiz-categories');
    localStorage.removeItem('quiz-cards');
    this.initializeData();
  }

  /**
   * Exportiert alle Daten als JSON
   */
  exportData() {
    return {
      categories: this.getAllCategories(),
      cards: this.getAllCards(),
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Importiert Daten aus JSON
   */
  importData(data) {
    if (data.categories) {
      localStorage.setItem('quiz-categories', JSON.stringify(data.categories));
    }
    if (data.cards) {
      localStorage.setItem('quiz-cards', JSON.stringify(data.cards));
    }
    this.updateCategoryCardCounts();
  }

  /**
   * Gibt den Status einer Karte zurück
   * Mögliche Status: 'active', 'review', 'archived'
   *
   * @param {string} cardId - ID der Karte
   * @returns {string} Status der Karte (default: 'active')
   */
  getCardStatus(cardId) {
    const cardStatus = localStorage.getItem('quiz-card-status');
    const statusMap = cardStatus ? JSON.parse(cardStatus) : {};
    const cardInfo = statusMap[cardId];
    return cardInfo ? cardInfo.status : 'active';
  }

  /**
   * Setzt den Status einer Karte
   *
   * @param {string} cardId - ID der Karte
   * @param {string} status - Neuer Status ('active', 'review', 'archived')
   * @param {string} reason - Grund für die Statusänderung (optional)
   * @returns {boolean} true, wenn erfolgreich
   */
  setCardStatus(cardId, status, reason = '') {
    const cardStatus = localStorage.getItem('quiz-card-status');
    const statusMap = cardStatus ? JSON.parse(cardStatus) : {};

    statusMap[cardId] = {
      status: status,
      reason: reason,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('quiz-card-status', JSON.stringify(statusMap));
    return true;
  }

  /**
   * Gibt alle Karten mit einem bestimmten Status zurück
   *
   * @param {string} status - Gewünschter Status ('active', 'review', 'archived')
   * @returns {Array<Object>} Array mit Karten des angegebenen Status
   */
  getCardsByStatus(status) {
    const cards = this.getAllCards();
    const cardStatus = localStorage.getItem('quiz-card-status');
    const statusMap = cardStatus ? JSON.parse(cardStatus) : {};

    return cards.filter(card => {
      const cardStatusInfo = statusMap[card.id];
      const cardCurrentStatus = cardStatusInfo ? cardStatusInfo.status : 'active';
      return cardCurrentStatus === status;
    });
  }

  /**
   * Gibt vollständige Status-Informationen für eine Karte zurück
   *
   * @param {string} cardId - ID der Karte
   * @returns {Object|null} Status-Objekt mit status, reason, timestamp oder null
   */
  getCardStatusInfo(cardId) {
    const cardStatus = localStorage.getItem('quiz-card-status');
    const statusMap = cardStatus ? JSON.parse(cardStatus) : {};
    return statusMap[cardId] || null;
  }

  /**
   * Archiviert eine Karte (setzt Status auf 'archived')
   *
   * @param {string} cardId - ID der Karte
   * @param {string} reason - Grund für die Archivierung
   * @returns {boolean} true, wenn erfolgreich
   */
  archiveCard(cardId, reason = 'Archiviert durch Nutzer') {
    return this.setCardStatus(cardId, 'archived', reason);
  }

  /**
   * Markiert eine Karte zur Überprüfung (setzt Status auf 'review')
   *
   * @param {string} cardId - ID der Karte
   * @param {string} reason - Grund für die Überprüfung
   * @returns {boolean} true, wenn erfolgreich
   */
  markCardForReview(cardId, reason = 'Zur Überprüfung markiert') {
    return this.setCardStatus(cardId, 'review', reason);
  }

  /**
   * Reaktiviert eine Karte (setzt Status auf 'active')
   *
   * @param {string} cardId - ID der Karte
   * @returns {boolean} true, wenn erfolgreich
   */
  reactivateCard(cardId) {
    return this.setCardStatus(cardId, 'active', 'Reaktiviert');
  }

  /**
   * ===== ROLLENBASIERTE FUNKTIONEN (PB12.1) =====
   * Mockup-Implementierung für rollenbasierte Zugriffskontrolle
   * Vorbereitet für spätere Backend-Integration
   */

  /**
   * Gibt die aktuelle Benutzerrolle zurück (Mockup)
   * In Produktionsumgebung würde dies vom Backend kommen
   * 
   * Verfügbare Rollen:
   * - 'user': Standard-Nutzer (kann Fragen melden)
   * - 'tutor': Erweiterte Rechte (kann Karten bearbeiten und Status ändern)
   * - 'moderator': Vollzugriff (kann alles verwalten)
   *
   * @returns {string} Aktuelle Rolle des Nutzers
   */
  getCurrentUserRole() {
    const storedRole = localStorage.getItem('user-role');
    return storedRole || 'user'; // Default: Standard-Nutzer
  }

  /**
   * Setzt die Rolle des aktuellen Nutzers (nur für Mockup/Demo)
   * WICHTIG: In Produktion würde dies durch Backend-Authentifizierung erfolgen
   *
   * @param {string} role - Neue Rolle ('user', 'tutor', 'moderator')
   * @returns {boolean} true, wenn erfolgreich
   */
  setCurrentUserRole(role) {
    const validRoles = ['user', 'tutor', 'moderator'];
    if (!validRoles.includes(role)) {
      console.error('Ungültige Rolle:', role);
      return false;
    }
    localStorage.setItem('user-role', role);
    return true;
  }

  /**
   * Prüft, ob der aktuelle Nutzer eine bestimmte Berechtigung hat
   *
   * Berechtigungen:
   * - 'report': Fragen melden (alle Nutzer)
   * - 'moderate': Karten bearbeiten und Status ändern (Tutor, Moderator)
   * - 'delete': Karten löschen (nur Moderator)
   * - 'manage_categories': Kategorien verwalten (Tutor, Moderator)
   *
   * @param {string} permission - Zu prüfende Berechtigung
   * @returns {boolean} true, wenn Nutzer die Berechtigung hat
   */
  hasPermission(permission) {
    const role = this.getCurrentUserRole();
    
    const permissions = {
      'user': ['report'],
      'tutor': ['report', 'moderate', 'manage_categories'],
      'moderator': ['report', 'moderate', 'delete', 'manage_categories']
    };

    return permissions[role]?.includes(permission) || false;
  }

  /**
   * Gibt alle verfügbaren Rollen zurück (für UI-Auswahl)
   *
   * @returns {Array<Object>} Array mit Rollen-Objekten
   */
  getAvailableRoles() {
    return [
      { 
        value: 'user', 
        label: 'Standard-Nutzer',
        description: 'Kann Fragen melden',
        icon: 'fas fa-user'
      },
      { 
        value: 'tutor', 
        label: 'Tutor',
        description: 'Kann Karten bearbeiten und moderieren',
        icon: 'fas fa-user-graduate'
      },
      { 
        value: 'moderator', 
        label: 'Moderator',
        description: 'Vollzugriff auf alle Funktionen',
        icon: 'fas fa-user-shield'
      }
    ];
  }

  /**
   * Gibt die Rollenbeschreibung zurück
   *
   * @param {string} role - Rolle
   * @returns {Object} Rollen-Objekt mit Details
   */
  getRoleInfo(role) {
    const roles = this.getAvailableRoles();
    return roles.find(r => r.value === role) || roles[0];
  }

  /**
   * Prüft, ob der Nutzer Tutor oder Moderator ist
   *
   * @returns {boolean} true, wenn Nutzer erweiterte Rechte hat
   */
  isPrivilegedUser() {
    const role = this.getCurrentUserRole();
    return role === 'tutor' || role === 'moderator';
  }

  /**
   * Prüft, ob der Nutzer Moderator ist
   *
   * @returns {boolean} true, wenn Nutzer Moderator ist
   */
  isModerator() {
    return this.getCurrentUserRole() === 'moderator';
  }
}


const dataManager = new DataManager();
export default dataManager;