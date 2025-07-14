/**
 * Mock-Daten für das Quiz-System
 * 
 * Diese Datei enthält Beispieldaten für Fragen, Antworten und
 * andere Inhalte, die für den Prototyp verwendet werden.
 * 
 * In einer produktiven Anwendung würden diese Daten von einer
 * API oder Datenbank stammen.
 */

/**
 * Beispiel-Fragen für verschiedene Kategorien
 */
export const getMockQuestions = () => [
  {
    id: 1,
    question: "Was ist das Hauptziel der objektorientierten Programmierung?",
    answers: [
      "Code-Wiederverwendbarkeit und Modularität",
      "Schnellere Ausführung von Programmen",
      "Reduzierung des Speicherverbrauchs",
      "Vereinfachung der Syntax"
    ],
    correctAnswer: 0,
    category: "Informatik",
    difficulty: "Mittel",
    explanation: "Die objektorientierte Programmierung zielt darauf ab, Code wiederverwendbar und modular zu gestalten durch Konzepte wie Vererbung, Polymorphie und Kapselung."
  },
  {
    id: 2,
    question: "Welches ist KEIN Prinzip des agilen Projektmanagements?",
    answers: [
      "Individuen und Interaktionen mehr als Prozesse und Werkzeuge",
      "Funktionierende Software mehr als umfassende Dokumentation",
      "Vertragsverhandlung mehr als Zusammenarbeit mit dem Kunden",
      "Reagieren auf Veränderung mehr als Befolgen eines Plans"
    ],
    correctAnswer: 2,
    category: "Projektmanagement",
    difficulty: "Leicht",
    explanation: "Das agile Manifest betont 'Zusammenarbeit mit dem Kunden mehr als Vertragsverhandlung', nicht umgekehrt."
  },
  {
    id: 3,
    question: "Was ist der Unterschied zwischen einer Klasse und einem Objekt?",
    answers: [
      "Es gibt keinen Unterschied",
      "Eine Klasse ist ein Bauplan, ein Objekt ist eine Instanz",
      "Ein Objekt ist ein Bauplan, eine Klasse ist eine Instanz",
      "Klassen sind für Funktionen, Objekte für Variablen"
    ],
    correctAnswer: 1,
    category: "Informatik",
    difficulty: "Leicht",
    explanation: "Eine Klasse ist wie ein Bauplan oder eine Vorlage, die definiert, welche Eigenschaften und Methoden ein Objekt haben soll. Ein Objekt ist eine konkrete Instanz dieser Klasse."
  },
  {
    id: 4,
    question: "Welche Datenstruktur folgt dem LIFO-Prinzip?",
    answers: [
      "Queue (Warteschlange)",
      "Stack (Stapel)",
      "Linked List (Verknüpfte Liste)",
      "Hash Table (Hash-Tabelle)"
    ],
    correctAnswer: 1,
    category: "Informatik",
    difficulty: "Mittel",
    explanation: "Ein Stack (Stapel) folgt dem LIFO-Prinzip (Last In, First Out), das bedeutet, das zuletzt hinzugefügte Element wird zuerst wieder entfernt."
  },
  {
    id: 5,
    question: "Was beschreibt die Zeitkomplexität O(n)?",
    answers: [
      "Konstante Zeit",
      "Lineare Zeit",
      "Quadratische Zeit",
      "Logarithmische Zeit"
    ],
    correctAnswer: 1,
    category: "Informatik",
    difficulty: "Mittel",
    explanation: "O(n) beschreibt eine lineare Zeitkomplexität, bei der die Ausführungszeit proportional zur Eingabegröße n wächst."
  },
  {
    id: 6,
    question: "Welches SQL-Kommando wird verwendet, um Daten aus einer Tabelle zu lesen?",
    answers: [
      "INSERT",
      "UPDATE",
      "SELECT",
      "DELETE"
    ],
    correctAnswer: 2,
    category: "Datenbanken",
    difficulty: "Leicht",
    explanation: "SELECT ist das SQL-Kommando zum Lesen bzw. Abfragen von Daten aus einer oder mehreren Tabellen."
  },
  {
    id: 7,
    question: "Was ist ein Primärschlüssel in einer Datenbank?",
    answers: [
      "Ein verschlüsseltes Feld",
      "Ein eindeutiger Identifikator für jeden Datensatz",
      "Das erste Feld einer Tabelle",
      "Ein Feld mit dem höchsten Wert"
    ],
    correctAnswer: 1,
    category: "Datenbanken",
    difficulty: "Leicht",
    explanation: "Ein Primärschlüssel ist ein Feld oder eine Kombination von Feldern, die jeden Datensatz in einer Tabelle eindeutig identifiziert."
  },
  {
    id: 8,
    question: "Welche Netzwerk-Topologie bietet die höchste Ausfallsicherheit?",
    answers: [
      "Bus-Topologie",
      "Stern-Topologie",
      "Ring-Topologie",
      "Mesh-Topologie"
    ],
    correctAnswer: 3,
    category: "Netzwerke",
    difficulty: "Mittel",
    explanation: "Die Mesh-Topologie bietet die höchste Ausfallsicherheit, da jeder Knoten mit mehreren anderen Knoten verbunden ist und somit alternative Pfade bei Ausfällen existieren."
  },
  {
    id: 9,
    question: "Was ist HTTPS?",
    answers: [
      "Eine neue Version von HTML",
      "HTTP mit SSL/TLS-Verschlüsselung",
      "Ein Datenbank-Protokoll",
      "Eine Programmiersprache"
    ],
    correctAnswer: 1,
    category: "Sicherheit",
    difficulty: "Leicht",
    explanation: "HTTPS ist HTTP mit SSL/TLS-Verschlüsselung, das eine sichere Übertragung von Daten zwischen Client und Server ermöglicht."
  },
  {
    id: 10,
    question: "Welches Softwareentwicklungsmodell betont iterative Entwicklung?",
    answers: [
      "Wasserfallmodell",
      "V-Modell",
      "Spiralmodell",
      "Alle oben genannten"
    ],
    correctAnswer: 2,
    category: "Softwareentwicklung",
    difficulty: "Mittel",
    explanation: "Das Spiralmodell betont iterative Entwicklung durch wiederholte Zyklen von Planung, Risikoanalyse, Entwicklung und Bewertung."
  }
];

/**
 * Beispiel-Kategorien mit Beschreibungen
 */
export const getCategories = () => [
  {
    id: 'informatik',
    name: 'Informatik',
    description: 'Grundlagen der Informatik, Algorithmen und Datenstrukturen',
    icon: 'laptop-code',
    color: 'primary'
  },
  {
    id: 'mathematik',
    name: 'Mathematik',
    description: 'Mathematische Grundlagen für die Informatik',
    icon: 'calculator',
    color: 'success'
  },
  {
    id: 'projektmanagement',
    name: 'Projektmanagement',
    description: 'Agile und klassische Projektmanagement-Methoden',
    icon: 'tasks',
    color: 'warning'
  },
  {
    id: 'datenbanken',
    name: 'Datenbanken',
    description: 'Relationale Datenbanken und SQL',
    icon: 'database',
    color: 'info'
  },
  {
    id: 'netzwerke',
    name: 'Netzwerke',
    description: 'Grundlagen der Netzwerktechnik',
    icon: 'network-wired',
    color: 'secondary'
  },
  {
    id: 'sicherheit',
    name: 'Sicherheit',
    description: 'IT-Sicherheit und Kryptographie',
    icon: 'shield-alt',
    color: 'danger'
  }
];

/**
 * Beispiel-Benutzerstatistiken
 */
export const getMockUserStats = () => ({
  totalQuizzes: 24,
  correctAnswers: 186,
  totalQuestions: 240,
  averageScore: 78,
  streak: 5,
  timeSpent: 1440, // Minuten
  categoryStats: {
    'informatik': { played: 12, correct: 89, total: 120 },
    'mathematik': { played: 8, correct: 45, total: 60 },
    'projektmanagement': { played: 4, correct: 32, total: 40 }
  }
});
