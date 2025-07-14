/**
 * Mock-Daten für das Quiz-System
 *
 * Diese Datei enthält Beispieldaten für Fragen, Antworten und
 * andere Inhalte, die für den Prototyp verwendet werden.
 *
 * ERWEITERT: Weitere Fragen hinzugefügt
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
  },
  // Weitere Fragen hinzugefügt
  {
    id: 11,
    question: "Welche Aussage über Arrays ist korrekt?",
    answers: [
      "Arrays haben immer eine feste Größe",
      "Arrays können nur primitive Datentypen speichern",
      "Arrays bieten direkten Zugriff auf Elemente über einen Index",
      "Arrays sind immer sortiert"
    ],
    correctAnswer: 2,
    category: "Informatik",
    difficulty: "Leicht",
    explanation: "Arrays bieten direkten Zugriff (O(1)) auf Elemente über einen numerischen Index, was sie sehr effizient für den Zugriff macht."
  },
  {
    id: 12,
    question: "Was ist ein JOIN in SQL?",
    answers: [
      "Eine Methode zum Löschen von Daten",
      "Eine Methode zum Verbinden von Tabellen",
      "Eine Methode zum Erstellen neuer Tabellen",
      "Eine Methode zum Sortieren von Daten"
    ],
    correctAnswer: 1,
    category: "Datenbanken",
    difficulty: "Mittel",
    explanation: "Ein JOIN ist eine SQL-Operation, die verwendet wird, um Daten aus zwei oder mehr Tabellen basierend auf einer verwandten Spalte zu kombinieren."
  },
  {
    id: 13,
    question: "Welches Protokoll wird für E-Mail-Versand verwendet?",
    answers: [
      "HTTP",
      "FTP",
      "SMTP",
      "DNS"
    ],
    correctAnswer: 2,
    category: "Netzwerke",
    difficulty: "Leicht",
    explanation: "SMTP (Simple Mail Transfer Protocol) ist das Standardprotokoll für das Versenden von E-Mails über das Internet."
  },
  {
    id: 14,
    question: "Was ist Scrum?",
    answers: [
      "Eine Programmiersprache",
      "Ein agiles Framework für Projektmanagement",
      "Ein Datenbank-Management-System",
      "Ein Betriebssystem"
    ],
    correctAnswer: 1,
    category: "Projektmanagement",
    difficulty: "Leicht",
    explanation: "Scrum ist ein agiles Framework für das Management und die Steuerung von Produktentwicklung, besonders in der Softwareentwicklung."
  },
  {
    id: 15,
    question: "Was ist ein Virus in der IT-Sicherheit?",
    answers: [
      "Ein nützliches Programm",
      "Ein schädliches Programm, das sich selbst repliziert",
      "Ein Netzwerk-Protokoll",
      "Ein Datenbank-Backup"
    ],
    correctAnswer: 1,
    category: "Sicherheit",
    difficulty: "Leicht",
    explanation: "Ein Computervirus ist ein schädliches Programm, das sich selbst repliziert und dabei andere Programme oder Dateien infiziert."
  },
  {
    id: 16,
    question: "Welche Aussage über Rekursion ist korrekt?",
    answers: [
      "Rekursion ist immer effizienter als Iteration",
      "Rekursive Funktionen rufen sich selbst auf",
      "Rekursion kann nur in funktionalen Sprachen verwendet werden",
      "Rekursion benötigt keine Abbruchbedingung"
    ],
    correctAnswer: 1,
    category: "Informatik",
    difficulty: "Mittel",
    explanation: "Rekursion ist eine Programmiertechnik, bei der eine Funktion sich selbst aufruft, um ein Problem in kleinere Teilprobleme zu zerlegen."
  },
  {
    id: 17,
    question: "Was ist eine Normalisierung in Datenbanken?",
    answers: [
      "Das Löschen von Daten",
      "Die Strukturierung von Daten zur Vermeidung von Redundanz",
      "Die Verschlüsselung von Daten",
      "Das Backup von Daten"
    ],
    correctAnswer: 1,
    category: "Datenbanken",
    difficulty: "Mittel",
    explanation: "Normalisierung ist der Prozess der Strukturierung einer Datenbank, um Redundanz zu minimieren und die Datenintegrität zu verbessern."
  },
  {
    id: 18,
    question: "Welche Schicht des OSI-Modells ist für die Datenübertragung verantwortlich?",
    answers: [
      "Anwendungsschicht",
      "Transportschicht",
      "Netzwerkschicht",
      "Physikalische Schicht"
    ],
    correctAnswer: 3,
    category: "Netzwerke",
    difficulty: "Mittel",
    explanation: "Die physikalische Schicht (Layer 1) ist für die eigentliche Übertragung von Bits über das physikalische Medium verantwortlich."
  },
  {
    id: 19,
    question: "Was ist ein Sprint in Scrum?",
    answers: [
      "Ein Fehler im Code",
      "Ein Zeitrahmen für die Entwicklung",
      "Ein Meeting-Typ",
      "Ein Testverfahren"
    ],
    correctAnswer: 1,
    category: "Projektmanagement",
    difficulty: "Leicht",
    explanation: "Ein Sprint ist ein fester Zeitrahmen (meist 1-4 Wochen) in Scrum, in dem das Team ein funktionsfähiges Produktinkrement erstellt."
  },
  {
    id: 20,
    question: "Was ist eine Firewall?",
    answers: [
      "Ein Antivirenprogramm",
      "Ein Netzwerk-Sicherheitssystem",
      "Ein Backup-System",
      "Ein Betriebssystem"
    ],
    correctAnswer: 1,
    category: "Sicherheit",
    difficulty: "Leicht",
    explanation: "Eine Firewall ist ein Netzwerk-Sicherheitssystem, das den Datenverkehr zwischen vertrauenswürdigen und nicht vertrauenswürdigen Netzwerken überwacht und filtert."
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
  },
  {
    id: 'softwareentwicklung',
    name: 'Softwareentwicklung',
    description: 'Methoden und Prozesse der Softwareentwicklung',
    icon: 'code',
    color: 'purple'
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