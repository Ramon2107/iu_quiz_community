/**
 * Mock-Daten für das Quiz-System
 *
 * Diese Datei enthält Beispieldaten für die Entwicklung und Tests.
 * Sie bietet eine umfangreiche Sammlung von Kategorien und Fragen.
 *
 * ERWEITERT: Deutlich mehr Karten pro Kategorie (10-20 Karten)
 * ERWEITERT: Realistische Fragen für verschiedene Studienbereiche
 * ERWEITERT: Bessere Verteilung der Schwierigkeitsgrade
 *
 * Struktur:
 * - categories: Array mit Kategorien und deren Eigenschaften
 * - questions: Array mit Fragen und deren Antworten
 *
 * @author Projektteam IU Community Quiz
 * @version 1.3.0
 * * @since 2025-07-15
 *
 */

export const mockCategories = [
  {
    id: 'cat1',
    name: 'Programmierung',
    description: 'Grundlagen der Programmierung, Algorithmen und Datenstrukturen',
    icon: 'fas fa-code',
    color: 'primary',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    isPublic: true,
    created: '2024-01-15',
    cardCount: 15
  },
  {
    id: 'cat2',
    name: 'Mathematik',
    description: 'Mathematische Grundlagen für Informatik und Wirtschaft',
    icon: 'fas fa-calculator',
    color: 'success',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    isPublic: true,
    created: '2024-01-20',
    cardCount: 18
  },
  {
    id: 'cat3',
    name: 'Datenbanken',
    description: 'Relationale Datenbanken, SQL und Datenbankdesign',
    icon: 'fas fa-database',
    color: 'warning',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    isPublic: true,
    created: '2024-01-25',
    cardCount: 12
  },
  {
    id: 'cat4',
    name: 'Projektmanagement',
    description: 'Agile Methoden, Scrum und klassisches Projektmanagement',
    icon: 'fas fa-tasks',
    color: 'info',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    isPublic: true,
    created: '2024-02-01',
    cardCount: 14
  },
  {
    id: 'cat5',
    name: 'Wirtschaftsinformatik',
    description: 'Betriebswirtschaftliche Grundlagen und IT-Management',
    icon: 'fas fa-chart-line',
    color: 'danger',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    isPublic: true,
    created: '2024-02-05',
    cardCount: 16
  },
  {
    id: 'cat6',
    name: 'Netzwerke',
    description: 'Computernetzwerke, Protokolle und Netzwerksicherheit',
    icon: 'fas fa-network-wired',
    color: 'secondary',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    isPublic: true,
    created: '2024-02-10',
    cardCount: 11
  }
];

export const mockQuestions = [
  // Programmierung (15 Fragen)
  {
    id: 'q1',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist ein Algorithmus?',
    answers: [
      'Eine Programmiersprache',
      'Eine schrittweise Anleitung zur Lösung eines Problems',
      'Ein Computerprogramm',
      'Eine Datenstruktur'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Ein Algorithmus ist eine eindeutige, schrittweise Anleitung zur Lösung eines Problems oder zur Durchführung einer Aufgabe.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Grundlagen', 'Theorie'],
    created: '2024-01-15'
  },
  {
    id: 'q2',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Welche Zeitkomplexität hat die Bubble-Sort-Algorithmus im schlechtesten Fall?',
    answers: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
    correctAnswer: 2,
    difficulty: 'Mittel',
    explanation: 'Bubble Sort hat im schlechtesten Fall eine quadratische Zeitkomplexität O(n²), da jedes Element mit jedem anderen verglichen werden muss.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Algorithmen', 'Komplexität'],
    created: '2024-01-16'
  },
  {
    id: 'q3',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist Rekursion?',
    answers: [
      'Eine Schleife',
      'Eine Funktion, die sich selbst aufruft',
      'Ein Datentyp',
      'Ein Sortieralgorithmus'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Rekursion ist ein Programmiertechnik, bei der eine Funktion sich selbst aufruft, um ein Problem in kleinere Teilprobleme zu zerlegen.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Rekursion', 'Funktionen'],
    created: '2024-01-17'
  },
  {
    id: 'q4',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Welche Datenstruktur arbeitet nach dem LIFO-Prinzip?',
    answers: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Ein Stack arbeitet nach dem LIFO-Prinzip (Last In, First Out), das bedeutet, das zuletzt hinzugefügte Element wird als erstes entfernt.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Datenstrukturen', 'Stack'],
    created: '2024-01-18'
  },
  {
    id: 'q5',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist der Unterschied zwischen Compilation und Interpretation?',
    answers: [
      'Compilation ist schneller',
      'Interpretation erzeugt Maschinencode',
      'Compilation übersetzt den gesamten Code vor der Ausführung',
      'Kein Unterschied'
    ],
    correctAnswer: 2,
    difficulty: 'Mittel',
    explanation: 'Compilation übersetzt den gesamten Quellcode vor der Ausführung in Maschinencode, während Interpretation den Code zur Laufzeit Zeile für Zeile übersetzt.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Compiler', 'Interpreter'],
    created: '2024-01-19'
  },
  {
    id: 'q6',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Welcher Sortieralgorithmus ist am effizientesten für große Datenmengen?',
    answers: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'],
    correctAnswer: 2,
    difficulty: 'Mittel',
    explanation: 'Quick Sort hat im Durchschnitt eine Zeitkomplexität von O(n log n) und ist daher sehr effizient für große Datenmengen.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Sortieren', 'Algorithmen'],
    created: '2024-01-20'
  },
  {
    id: 'q7',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist ein Binary Search Tree (BST)?',
    answers: [
      'Ein linearer Suchbaum',
      'Ein Baum mit genau zwei Knoten',
      'Ein Baum, bei dem der linke Teilbaum kleinere und der rechte größere Werte enthält',
      'Ein Baum mit binären Werten'
    ],
    correctAnswer: 2,
    difficulty: 'Mittel',
    explanation: 'Ein BST ist ein Binärbaum, bei dem alle Werte im linken Teilbaum kleiner und alle Werte im rechten Teilbaum größer als der Knotenwert sind.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Bäume', 'Datenstrukturen'],
    created: '2024-01-21'
  },
  {
    id: 'q8',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist Big O Notation?',
    answers: [
      'Eine Programmiersprache',
      'Ein Maß für die Zeitkomplexität von Algorithmen',
      'Ein Debugger',
      'Eine Datenstruktur'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Big O Notation beschreibt die Zeitkomplexität von Algorithmen und gibt an, wie sich die Laufzeit mit der Eingabegröße verhält.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Komplexität', 'Algorithmen'],
    created: '2024-01-22'
  },
  {
    id: 'q9',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist ein Hash Table?',
    answers: [
      'Eine sortierte Liste',
      'Eine Datenstruktur für schnelle Suche mit Key-Value-Paaren',
      'Ein Binärbaum',
      'Ein Stack'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Eine Hash Table ist eine Datenstruktur, die Key-Value-Paare speichert und sehr schnelle Suche, Einfügung und Löschung ermöglicht.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Hashing', 'Datenstrukturen'],
    created: '2024-01-23'
  },
  {
    id: 'q10',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist der Unterschied zwischen einer Queue und einem Stack?',
    answers: [
      'Kein Unterschied',
      'Queue ist FIFO, Stack ist LIFO',
      'Queue ist LIFO, Stack ist FIFO',
      'Queue ist schneller'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine Queue arbeitet nach dem FIFO-Prinzip (First In, First Out), während ein Stack nach dem LIFO-Prinzip (Last In, First Out) arbeitet.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Queue', 'Stack'],
    created: '2024-01-24'
  },
  {
    id: 'q11',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist Dynamic Programming?',
    answers: [
      'Eine Programmiersprache',
      'Ein Designprinzip für Benutzeroberflächen',
      'Eine Methode zur Lösung von Optimierungsproblemen',
      'Ein Datentyp'
    ],
    correctAnswer: 2,
    difficulty: 'Schwer',
    explanation: 'Dynamic Programming ist eine Methode zur Lösung von Optimierungsproblemen, bei der Teilprobleme gespeichert werden, um Redundanz zu vermeiden.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Optimierung', 'Algorithmen'],
    created: '2024-01-25'
  },
  {
    id: 'q12',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist ein Linked List?',
    answers: [
      'Ein Array mit fester Größe',
      'Eine Datenstruktur mit Knoten, die durch Zeiger verbunden sind',
      'Ein Sortieralgorithmus',
      'Ein Datentyp'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine Linked List ist eine Datenstruktur, bei der Elemente (Knoten) durch Zeiger miteinander verbunden sind.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Linked List', 'Datenstrukturen'],
    created: '2024-01-26'
  },
  {
    id: 'q13',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist der Unterschied zwischen einem Array und einer Linked List?',
    answers: [
      'Arrays haben feste Größe, Linked Lists können dynamisch wachsen',
      'Kein Unterschied',
      'Linked Lists sind immer schneller',
      'Arrays können nur Zahlen speichern'
    ],
    correctAnswer: 0,
    difficulty: 'Mittel',
    explanation: 'Arrays haben typischerweise eine feste Größe und bieten direkten Zugriff, während Linked Lists dynamisch wachsen können, aber sequenziellen Zugriff erfordern.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Arrays', 'Linked Lists'],
    created: '2024-01-27'
  },
  {
    id: 'q14',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist ein Graph in der Informatik?',
    answers: [
      'Eine grafische Darstellung von Daten',
      'Eine Datenstruktur mit Knoten und Kanten',
      'Ein Diagramm',
      'Ein Algorithmus'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Graph ist eine Datenstruktur bestehend aus Knoten (Vertices) und Kanten (Edges), die Beziehungen zwischen den Knoten darstellen.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Graphen', 'Datenstrukturen'],
    created: '2024-01-28'
  },
  {
    id: 'q15',
    categoryId: 'cat1',
    category: 'Programmierung',
    question: 'Was ist der Greedy-Algorithmus?',
    answers: [
      'Ein Algorithmus, der immer die aktuell beste Lösung wählt',
      'Ein Sortieralgorithmus',
      'Ein Suchalgorithmus',
      'Ein Komprimierungsalgorithmus'
    ],
    correctAnswer: 0,
    difficulty: 'Schwer',
    explanation: 'Ein Greedy-Algorithmus trifft in jedem Schritt die lokal beste Entscheidung, ohne zukünftige Auswirkungen zu berücksichtigen.',
    author: 'Prof. Dr. Schmidt',
    authorEmail: 'schmidt@iu-study.org',
    tags: ['Greedy', 'Algorithmen'],
    created: '2024-01-29'
  },

  // Mathematik (18 Fragen)
  {
    id: 'q16',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist die Ableitung von f(x) = x²?',
    answers: ['x', '2x', 'x²', '2x²'],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Die Ableitung von x² ist 2x nach der Potenzregel der Differentiation.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Ableitung', 'Differential'],
    created: '2024-01-20'
  },
  {
    id: 'q17',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist das Integral von f(x) = 2x?',
    answers: ['x²', 'x² + C', '2x²', '2x² + C'],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Das Integral von 2x ist x² + C, wobei C die Integrationskonstante ist.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Integral', 'Analysis'],
    created: '2024-01-21'
  },
  {
    id: 'q18',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist eine Matrix?',
    answers: [
      'Eine Zahl',
      'Ein rechteckiges Schema von Zahlen',
      'Ein Gleichungssystem',
      'Ein Vektor'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine Matrix ist ein rechteckiges Schema von Zahlen, Symbolen oder Ausdrücken, die in Zeilen und Spalten angeordnet sind.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Matrix', 'Lineare Algebra'],
    created: '2024-01-22'
  },
  {
    id: 'q19',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist die Determinante einer 2x2-Matrix [[a,b],[c,d]]?',
    answers: ['a+d-b-c', 'ad-bc', 'ac-bd', 'ab-cd'],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Die Determinante einer 2x2-Matrix ist ad-bc.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Determinante', 'Matrix'],
    created: '2024-01-23'
  },
  {
    id: 'q20',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist ein Vektor?',
    answers: [
      'Eine Zahl',
      'Eine Größe mit Betrag und Richtung',
      'Eine Matrix',
      'Eine Funktion'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Ein Vektor ist eine mathematische Größe, die sowohl einen Betrag als auch eine Richtung hat.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Vektor', 'Lineare Algebra'],
    created: '2024-01-24'
  },
  {
    id: 'q21',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist das Skalarprodukt von (1,2) und (3,4)?',
    answers: ['7', '11', '14', '8'],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Das Skalarprodukt ist (1×3) + (2×4) = 3 + 8 = 11.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Skalarprodukt', 'Vektoren'],
    created: '2024-01-25'
  },
  {
    id: 'q22',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist die Eulersche Zahl e approximativ?',
    answers: ['2.718', '3.141', '1.618', '2.236'],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Die Eulersche Zahl e ist approximativ 2.718.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Euler', 'Konstanten'],
    created: '2024-01-26'
  },
  {
    id: 'q23',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist log₁₀(100)?',
    answers: ['1', '2', '10', '100'],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'log₁₀(100) = 2, weil 10² = 100.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Logarithmus', 'Exponential'],
    created: '2024-01-27'
  },
  {
    id: 'q24',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist eine Primzahl?',
    answers: [
      'Eine Zahl größer als 1',
      'Eine Zahl, die nur durch 1 und sich selbst teilbar ist',
      'Eine ungerade Zahl',
      'Eine Zahl ohne Nachkommastellen'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine Primzahl ist eine natürliche Zahl größer als 1, die nur durch 1 und sich selbst ohne Rest teilbar ist.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Primzahl', 'Zahlentheorie'],
    created: '2024-01-28'
  },
  {
    id: 'q25',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist der Satz des Pythagoras?',
    answers: [
      'a + b = c',
      'a² + b² = c²',
      'a × b = c',
      'a² × b² = c²'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Der Satz des Pythagoras besagt, dass in einem rechtwinkligen Dreieck a² + b² = c² gilt.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Pythagoras', 'Geometrie'],
    created: '2024-01-29'
  },
  {
    id: 'q26',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist die Quadratwurzel von 64?',
    answers: ['6', '7', '8', '9'],
    correctAnswer: 2,
    difficulty: 'Leicht',
    explanation: 'Die Quadratwurzel von 64 ist 8, weil 8² = 64.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Quadratwurzel', 'Grundlagen'],
    created: '2024-01-30'
  },
  {
    id: 'q27',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist eine Funktion?',
    answers: [
      'Eine Gleichung',
      'Eine Zuordnung, die jedem Element eindeutig ein Element zuordnet',
      'Eine Variable',
      'Eine Konstante'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine Funktion ist eine Zuordnung, die jedem Element der Definitionsmenge eindeutig ein Element der Zielmenge zuordnet.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Funktion', 'Analysis'],
    created: '2024-01-31'
  },
  {
    id: 'q28',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist ein Grenzwert?',
    answers: [
      'Der maximale Wert einer Funktion',
      'Der Wert, dem sich eine Funktion annähert',
      'Der Startwert einer Funktion',
      'Der Durchschnittswert einer Funktion'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Grenzwert ist der Wert, dem sich eine Funktion annähert, wenn die Variable gegen einen bestimmten Wert strebt.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Grenzwert', 'Analysis'],
    created: '2024-02-01'
  },
  {
    id: 'q29',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist die Kettenregel?',
    answers: [
      'Eine Regel für das Multiplizieren',
      'Eine Regel für die Ableitung zusammengesetzter Funktionen',
      'Eine Regel für Grenzwerte',
      'Eine Regel für Integrale'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Die Kettenregel ist eine Regel zur Ableitung zusammengesetzter Funktionen: (f∘g)\'(x) = f\'(g(x)) · g\'(x).',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Kettenregel', 'Ableitung'],
    created: '2024-02-02'
  },
  {
    id: 'q30',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist eine Permutation?',
    answers: [
      'Eine Anordnung von Elementen',
      'Eine Kombination von Elementen',
      'Eine Multiplikation',
      'Eine Addition'
    ],
    correctAnswer: 0,
    difficulty: 'Mittel',
    explanation: 'Eine Permutation ist eine Anordnung von Elementen einer Menge in einer bestimmten Reihenfolge.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Permutation', 'Kombinatorik'],
    created: '2024-02-03'
  },
  {
    id: 'q31',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist eine Kombinierung?',
    answers: [
      'Eine Anordnung mit Beachtung der Reihenfolge',
      'Eine Auswahl ohne Beachtung der Reihenfolge',
      'Eine Multiplikation',
      'Eine Division'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Eine Kombination ist eine Auswahl von Elementen aus einer Menge, ohne dass die Reihenfolge berücksichtigt wird.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Kombination', 'Kombinatorik'],
    created: '2024-02-04'
  },
  {
    id: 'q32',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist die Binomialformel?',
    answers: [
      '(a+b)² = a² + 2ab + b²',
      '(a+b)² = a² + b²',
      '(a+b)² = 2ab',
      '(a+b)² = a² - b²'
    ],
    correctAnswer: 0,
    difficulty: 'Mittel',
    explanation: 'Die Binomialformel für (a+b)² lautet: (a+b)² = a² + 2ab + b².',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Binomial', 'Algebra'],
    created: '2024-02-05'
  },
  {
    id: 'q33',
    categoryId: 'cat2',
    category: 'Mathematik',
    question: 'Was ist eine Wahrscheinlichkeit?',
    answers: [
      'Ein Wert zwischen 0 und 1',
      'Ein Wert zwischen 0 und 100',
      'Ein negativer Wert',
      'Ein beliebiger Wert'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Eine Wahrscheinlichkeit ist ein Wert zwischen 0 und 1, wobei 0 unmöglich und 1 sicher bedeutet.',
    author: 'Dr. Müller',
    authorEmail: 'mueller@iu-study.org',
    tags: ['Wahrscheinlichkeit', 'Stochastik'],
    created: '2024-02-06'
  },

  // Datenbanken (12 Fragen)
  {
    id: 'q34',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was bedeutet SQL?',
    answers: [
      'Structured Query Language',
      'Standard Query Language',
      'Simple Query Language',
      'System Query Language'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'SQL steht für Structured Query Language und ist eine Sprache zur Abfrage und Manipulation von Datenbanken.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['SQL', 'Grundlagen'],
    created: '2024-01-25'
  },
  {
    id: 'q35',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist ein Primary Key?',
    answers: [
      'Ein Schlüssel zum Öffnen der Datenbank',
      'Ein eindeutiger Identifikator für eine Tabellenzeile',
      'Ein Passwort',
      'Ein Index'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Ein Primary Key ist ein eindeutiger Identifikator für jede Zeile in einer Datenbanktabelle.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Primary Key', 'Schlüssel'],
    created: '2024-01-26'
  },
  {
    id: 'q36',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist ein Foreign Key?',
    answers: [
      'Ein Schlüssel aus einem anderen Land',
      'Ein Verweis auf den Primary Key einer anderen Tabelle',
      'Ein verschlüsselter Schlüssel',
      'Ein Backup-Schlüssel'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Foreign Key ist ein Feld in einer Tabelle, das auf den Primary Key einer anderen Tabelle verweist.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Foreign Key', 'Beziehungen'],
    created: '2024-01-27'
  },
  {
    id: 'q37',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist Normalisierung?',
    answers: [
      'Das Löschen von Daten',
      'Das Organisieren von Daten zur Reduktion von Redundanz',
      'Das Sichern von Daten',
      'Das Verschlüsseln von Daten'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Normalisierung ist der Prozess der Organisation von Daten in einer Datenbank zur Reduktion von Redundanz und Inkonsistenz.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Normalisierung', 'Design'],
    created: '2024-01-28'
  },
  {
    id: 'q38',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist ein Index?',
    answers: [
      'Eine Nummer',
      'Eine Datenstruktur zur Beschleunigung von Abfragen',
      'Ein Inhaltsverzeichnis',
      'Eine Tabelle'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Index ist eine Datenstruktur, die erstellt wird, um die Geschwindigkeit von Abfragen zu verbessern.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Index', 'Performance'],
    created: '2024-01-29'
  },
  {
    id: 'q39',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist eine Transaktion?',
    answers: [
      'Ein Geldtransfer',
      'Eine Folge von Datenbankoperationen als Einheit',
      'Eine Abfrage',
      'Eine Tabelle'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Eine Transaktion ist eine Folge von Datenbankoperationen, die als eine unteilbare Einheit behandelt werden.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Transaktion', 'ACID'],
    created: '2024-01-30'
  },
  {
    id: 'q40',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was bedeutet ACID?',
    answers: [
      'Automatic Consistent Isolated Durable',
      'Atomicity Consistency Isolation Durability',
      'Advanced Computer Information Database',
      'Automatic Creation Index Database'
    ],
    correctAnswer: 1,
    difficulty: 'Schwer',
    explanation: 'ACID steht für Atomicity, Consistency, Isolation und Durability - die vier Grundeigenschaften von Datenbanktransaktionen.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['ACID', 'Transaktionen'],
    created: '2024-01-31'
  },
  {
    id: 'q41',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist ein Join?',
    answers: [
      'Das Verbinden von Tabellen',
      'Das Löschen von Daten',
      'Das Sortieren von Daten',
      'Das Sichern von Daten'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Ein Join ist eine Operation, die Daten aus mehreren Tabellen basierend auf verwandten Spalten verbindet.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Join', 'Abfragen'],
    created: '2024-02-01'
  },
  {
    id: 'q42',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist der Unterschied zwischen INNER JOIN und LEFT JOIN?',
    answers: [
      'Kein Unterschied',
      'INNER JOIN gibt nur übereinstimmende Datensätze zurück',
      'LEFT JOIN ist schneller',
      'INNER JOIN ist für große Tabellen'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'INNER JOIN gibt nur Datensätze zurück, die in beiden Tabellen übereinstimmen, während LEFT JOIN alle Datensätze der linken Tabelle zurückgibt.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Inner Join', 'Left Join'],
    created: '2024-02-02'
  },
  {
    id: 'q43',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist eine View?',
    answers: [
      'Eine Ansicht der Datenbank',
      'Eine virtuelle Tabelle basierend auf einer Abfrage',
      'Ein Bildschirm',
      'Ein Benutzer'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Eine View ist eine virtuelle Tabelle, die auf einer oder mehreren Tabellen basiert und das Ergebnis einer gespeicherten Abfrage darstellt.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['View', 'Virtuell'],
    created: '2024-02-03'
  },
  {
    id: 'q44',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist ein Trigger?',
    answers: [
      'Ein Auslöser für Ereignisse',
      'Ein automatisch ausgeführter Code bei Datenänderungen',
      'Ein Benutzer',
      'Eine Tabelle'
    ],
    correctAnswer: 1,
    difficulty: 'Schwer',
    explanation: 'Ein Trigger ist ein automatisch ausgeführter Code, der bei bestimmten Ereignissen in der Datenbank ausgelöst wird.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Trigger', 'Automatisierung'],
    created: '2024-02-04'
  },
  {
    id: 'q45',
    categoryId: 'cat3',
    category: 'Datenbanken',
    question: 'Was ist eine Stored Procedure?',
    answers: [
      'Eine gespeicherte Prozedur',
      'Eine vorkompilierte Sammlung von SQL-Anweisungen',
      'Eine Funktion',
      'Eine Tabelle'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Eine Stored Procedure ist eine vorkompilierte Sammlung von SQL-Anweisungen, die als Einheit ausgeführt werden kann.',
    author: 'Prof. Dr. Weber',
    authorEmail: 'weber@iu-study.org',
    tags: ['Stored Procedure', 'SQL'],
    created: '2024-02-05'
  },

  // Projektmanagement (14 Fragen)
  {
    id: 'q46',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist Scrum?',
    answers: [
      'Eine Programmiersprache',
      'Ein agiles Framework für Projektmanagement',
      'Ein Datenbank-System',
      'Ein Betriebssystem'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Scrum ist ein agiles Framework für das Management und die Entwicklung von Produkten, insbesondere in der Softwareentwicklung.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Scrum', 'Agil'],
    created: '2024-02-01'
  },
  {
    id: 'q47',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Sprint?',
    answers: [
      'Ein Lauf',
      'Eine Zeitspanne für die Entwicklung in Scrum',
      'Ein Meeting',
      'Ein Dokument'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Ein Sprint ist eine festgelegte Zeitspanne (meist 2-4 Wochen) in Scrum, in der ein funktionsfähiges Produktinkrement erstellt wird.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Sprint', 'Scrum'],
    created: '2024-02-02'
  },
  {
    id: 'q48',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Product Owner?',
    answers: [
      'Der Besitzer des Produkts',
      'Die Person, die das Product Backlog verwaltet',
      'Der Entwickler',
      'Der Tester'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Der Product Owner ist verantwortlich für das Product Backlog und definiert die Anforderungen und Prioritäten.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Product Owner', 'Scrum'],
    created: '2024-02-03'
  },
  {
    id: 'q49',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Scrum Master?',
    answers: [
      'Der Chef des Teams',
      'Der Facilitator und Coach des Scrum-Teams',
      'Der beste Entwickler',
      'Der Projektmanager'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Der Scrum Master ist ein Facilitator und Coach, der das Team bei der Anwendung von Scrum unterstützt.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Scrum Master', 'Scrum'],
    created: '2024-02-04'
  },
  {
    id: 'q50',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Daily Standup?',
    answers: [
      'Ein täglicher Workout',
      'Ein kurzes tägliches Meeting zur Synchronisation',
      'Ein langer Workshop',
      'Ein monatliches Meeting'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Das Daily Standup ist ein kurzes tägliches Meeting (max. 15 Minuten) zur Synchronisation des Teams.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Daily Standup', 'Scrum'],
    created: '2024-02-05'
  },
  {
    id: 'q51',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist eine User Story?',
    answers: [
      'Eine Geschichte über einen Benutzer',
      'Eine Anforderung aus Benutzersicht',
      'Ein Märchen',
      'Eine Dokumentation'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine User Story ist eine Anforderung, die aus der Perspektive des Endbenutzers formuliert wird.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['User Story', 'Agil'],
    created: '2024-02-06'
  },
  {
    id: 'q52',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Product Backlog?',
    answers: [
      'Eine Liste von Fehlern',
      'Eine priorisierte Liste von Anforderungen',
      'Ein Archiv',
      'Ein Kalender'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Das Product Backlog ist eine priorisierte Liste aller Anforderungen, Features und Verbesserungen für das Produkt.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Product Backlog', 'Scrum'],
    created: '2024-02-07'
  },
  {
    id: 'q53',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Sprint Review?',
    answers: [
      'Eine Bewertung des Sprints',
      'Ein Meeting zur Präsentation des Produktinkrements',
      'Ein Test',
      'Ein Planungsmeeting'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Das Sprint Review ist ein Meeting am Ende des Sprints, in dem das Team das Produktinkrement präsentiert.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Sprint Review', 'Scrum'],
    created: '2024-02-08'
  },
  {
    id: 'q54',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist eine Sprint Retrospective?',
    answers: [
      'Ein Rückblick auf den Sprint',
      'Ein Meeting zur Prozessverbesserung',
      'Ein Planungsmeeting',
      'Ein Review-Meeting'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Die Sprint Retrospective ist ein Meeting zur Reflexion über den Prozess und zur Identifikation von Verbesserungsmöglichkeiten.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Sprint Retrospective', 'Scrum'],
    created: '2024-02-09'
  },
  {
    id: 'q55',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist Kanban?',
    answers: [
      'Eine japanische Kampfkunst',
      'Ein System zur Visualisierung von Arbeitsabläufen',
      'Ein Programm',
      'Ein Dokument'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Kanban ist ein System zur Visualisierung von Arbeitsabläufen und zur Begrenzung von parallelen Aufgaben.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Kanban', 'Agil'],
    created: '2024-02-10'
  },
  {
    id: 'q56',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist das Wasserfall-Modell?',
    answers: [
      'Ein Modell für Wasserfälle',
      'Ein sequenzielles Vorgehensmodell',
      'Ein agiles Modell',
      'Ein Testmodell'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Das Wasserfall-Modell ist ein sequenzielles Vorgehensmodell, bei dem Phasen nacheinander abgearbeitet werden.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Wasserfall', 'Klassisch'],
    created: '2024-02-11'
  },
  {
    id: 'q57',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist eine Definition of Done?',
    answers: [
      'Eine Aufgabenbeschreibung',
      'Kriterien für die Fertigstellung einer Aufgabe',
      'Ein Zeitplan',
      'Ein Vertrag'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Die Definition of Done ist eine gemeinsame Vereinbarung über die Kriterien, die erfüllt sein müssen, damit eine Aufgabe als fertig gilt.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Definition of Done', 'Scrum'],
    created: '2024-02-12'
  },
  {
    id: 'q58',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist ein Burndown Chart?',
    answers: [
      'Ein Diagramm über Brände',
      'Ein Diagramm zur Visualisierung des Arbeitsfortschritts',
      'Ein Kalendar',
      'Ein Organigramm'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Burndown Chart ist ein Diagramm, das den Fortschritt der Arbeit über die Zeit visualisiert.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Burndown Chart', 'Scrum'],
    created: '2024-02-13'
  },
  {
    id: 'q59',
    categoryId: 'cat4',
    category: 'Projektmanagement',
    question: 'Was ist eine Velocity?',
    answers: [
      'Die Geschwindigkeit',
      'Die Menge der Arbeit, die ein Team pro Sprint erledigt',
      'Ein Maß für Qualität',
      'Ein Zeitmaß'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Velocity ist ein Maß für die Menge der Arbeit, die ein Team durchschnittlich pro Sprint erledigen kann.',
    author: 'Sarah Johnson',
    authorEmail: 'johnson@iu-study.org',
    tags: ['Velocity', 'Scrum'],
    created: '2024-02-14'
  },

  // Wirtschaftsinformatik (16 Fragen)
  {
    id: 'q60',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist ein ERP-System?',
    answers: [
      'Ein E-Mail-System',
      'Ein System zur Planung von Unternehmensressourcen',
      'Ein Programm',
      'Eine Datenbank'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'ERP steht für Enterprise Resource Planning und ist ein System zur Planung und Verwaltung von Unternehmensressourcen.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['ERP', 'Unternehmen'],
    created: '2024-02-05'
  },
  {
    id: 'q61',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist CRM?',
    answers: [
      'Customer Relationship Management',
      'Computer Resource Management',
      'Company Risk Management',
      'Customer Revenue Management'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'CRM steht für Customer Relationship Management und umfasst Strategien zur Verwaltung der Kundenbeziehungen.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['CRM', 'Kunden'],
    created: '2024-02-06'
  },
  {
    id: 'q62',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist Supply Chain Management?',
    answers: [
      'Die Verwaltung von Lieferketten',
      'Die Verwaltung von Mitarbeitern',
      'Die Verwaltung von Finanzen',
      'Die Verwaltung von Produkten'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Supply Chain Management umfasst die Planung und Steuerung aller Aktivitäten entlang der Lieferkette.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['SCM', 'Lieferkette'],
    created: '2024-02-07'
  },
  {
    id: 'q63',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist Business Intelligence?',
    answers: [
      'Künstliche Intelligenz für Unternehmen',
      'Systeme zur Analyse von Geschäftsdaten',
      'Ein Beratungsservice',
      'Ein Managementansatz'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Business Intelligence umfasst Technologien und Verfahren zur Analyse von Geschäftsdaten für bessere Entscheidungen.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['BI', 'Analyse'],
    created: '2024-02-08'
  },
  {
    id: 'q64',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist E-Commerce?',
    answers: [
      'Elektronischer Handel',
      'E-Mail-Kommunikation',
      'Elektronische Werbung',
      'Elektronische Buchhaltung'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'E-Commerce bezeichnet den elektronischen Handel, also den Kauf und Verkauf von Waren und Dienstleistungen über das Internet.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['E-Commerce', 'Online'],
    created: '2024-02-09'
  },
  {
    id: 'q65',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist ein Data Warehouse?',
    answers: [
      'Ein Lagerhaus für Daten',
      'Ein zentrales Repository für Unternehmensdaten',
      'Ein Backup-System',
      'Ein Sicherheitssystem'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Data Warehouse ist ein zentrales Repository, das Daten aus verschiedenen Quellen sammelt und für Analysen aufbereitet.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['Data Warehouse', 'Daten'],
    created: '2024-02-10'
  },
  {
    id: 'q66',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist digitale Transformation?',
    answers: [
      'Die Umstellung auf digitale Technologien',
      'Die Digitalisierung von Dokumenten',
      'Die Entwicklung von Software',
      'Die Nutzung von Computern'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Digitale Transformation beschreibt den Wandel von Unternehmen durch die Integration digitaler Technologien.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['Digital', 'Transformation'],
    created: '2024-02-11'
  },
  {
    id: 'q67',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist ein Geschäftsprozess?',
    answers: [
      'Ein Arbeitsablauf zur Erreichung eines Geschäftsziels',
      'Ein Verkaufsprozess',
      'Ein Herstellungsprozess',
      'Ein Kommunikationsprozess'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Ein Geschäftsprozess ist eine Folge von Aktivitäten zur Erreichung eines spezifischen Geschäftsziels.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['Geschäftsprozess', 'Workflow'],
    created: '2024-02-12'
  },
  {
    id: 'q68',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist Business Process Management (BPM)?',
    answers: [
      'Die Verwaltung von Geschäftsprozessen',
      'Die Optimierung und Automatisierung von Geschäftsprozessen',
      'Die Dokumentation von Prozessen',
      'Die Analyse von Prozessen'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'BPM umfasst die Analyse, Modellierung, Optimierung und Automatisierung von Geschäftsprozessen.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['BPM', 'Prozesse'],
    created: '2024-02-13'
  },
  {
    id: 'q69',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist eine Balanced Scorecard?',
    answers: [
      'Ein ausgewogenes Bewertungssystem',
      'Ein Instrument zur strategischen Unternehmenssteuerung',
      'Ein Finanzbericht',
      'Ein Projektplan'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Die Balanced Scorecard ist ein Instrument zur strategischen Unternehmenssteuerung mit verschiedenen Perspektiven.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['BSC', 'Strategie'],
    created: '2024-02-14'
  },
  {
    id: 'q70',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist ein KPI?',
    answers: [
      'Key Performance Indicator',
      'Key Process Indicator',
      'Key Product Indicator',
      'Key Person Indicator'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'KPI steht für Key Performance Indicator und ist eine Kennzahl zur Messung der Leistung.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['KPI', 'Kennzahlen'],
    created: '2024-02-15'
  },
  {
    id: 'q71',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist Cloud Computing?',
    answers: [
      'Rechnen in den Wolken',
      'Die Bereitstellung von IT-Services über das Internet',
      'Ein Wettervorhersagesystem',
      'Ein Backup-System'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Cloud Computing ist die Bereitstellung von IT-Services wie Rechenleistung, Speicher und Software über das Internet.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['Cloud', 'IT-Services'],
    created: '2024-02-16'
  },
  {
    id: 'q72',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist SaaS?',
    answers: [
      'Software as a Service',
      'System as a Service',
      'Security as a Service',
      'Storage as a Service'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'SaaS steht für Software as a Service und beschreibt die Bereitstellung von Software über das Internet.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['SaaS', 'Cloud'],
    created: '2024-02-17'
  },
  {
    id: 'q73',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist Big Data?',
    answers: [
      'Große Datenmengen',
      'Datenmengen, die zu groß für herkömmliche Verarbeitung sind',
      'Wichtige Daten',
      'Teure Daten'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Big Data beschreibt Datenmengen, die zu groß, komplex oder schnelllebig für herkömmliche Datenverarbeitungstools sind.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['Big Data', 'Daten'],
    created: '2024-02-18'
  },
  {
    id: 'q74',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist Data Mining?',
    answers: [
      'Das Graben nach Daten',
      'Das Extrahieren von Wissen aus Daten',
      'Das Löschen von Daten',
      'Das Speichern von Daten'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Data Mining ist der Prozess des Extrahierens von Wissen und Mustern aus großen Datenmengen.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['Data Mining', 'Analyse'],
    created: '2024-02-19'
  },
  {
    id: 'q75',
    categoryId: 'cat5',
    category: 'Wirtschaftsinformatik',
    question: 'Was ist IT-Governance?',
    answers: [
      'Die Regierung der IT',
      'Die Führung und Kontrolle der IT im Unternehmen',
      'Die Verwaltung von IT-Systemen',
      'Die Sicherheit der IT'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'IT-Governance umfasst die Führung, Organisationsstrukturen und Prozesse zur Steuerung der IT im Unternehmen.',
    author: 'Prof. Dr. Klein',
    authorEmail: 'klein@iu-study.org',
    tags: ['IT-Governance', 'Management'],
    created: '2024-02-20'
  },

  // Netzwerke (11 Fragen)
  {
    id: 'q76',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist das OSI-Modell?',
    answers: [
      'Ein Netzwerkprotokoll',
      'Ein Referenzmodell für Netzwerkkommunikation',
      'Ein Betriebssystem',
      'Ein Sicherheitsstandard'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Das OSI-Modell ist ein Referenzmodell für Netzwerkkommunikation mit 7 Schichten.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['OSI', 'Modell'],
    created: '2024-02-10'
  },
  {
    id: 'q77',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Wie viele Schichten hat das OSI-Modell?',
    answers: ['5', '6', '7', '8'],
    correctAnswer: 2,
    difficulty: 'Leicht',
    explanation: 'Das OSI-Modell hat 7 Schichten: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['OSI', 'Schichten'],
    created: '2024-02-11'
  },
  {
    id: 'q78',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist TCP/IP?',
    answers: [
      'Ein Protokoll',
      'Eine Protokollfamilie für Internetkommunikation',
      'Ein Netzwerkgerät',
      'Ein Betriebssystem'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'TCP/IP ist eine Protokollfamilie für die Internetkommunikation, bestehend aus TCP (Transport) und IP (Internet Protocol).',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['TCP/IP', 'Protokoll'],
    created: '2024-02-12'
  },
  {
    id: 'q79',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist eine IP-Adresse?',
    answers: [
      'Eine Postadresse',
      'Eine eindeutige Identifikation für Netzwerkgeräte',
      'Eine Telefonnummer',
      'Ein Passwort'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine IP-Adresse ist eine eindeutige numerische Identifikation für Geräte in einem Netzwerk.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['IP-Adresse', 'Netzwerk'],
    created: '2024-02-13'
  },
  {
    id: 'q80',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist DHCP?',
    answers: [
      'Dynamic Host Configuration Protocol',
      'Direct Host Communication Protocol',
      'Distributed Host Control Protocol',
      'Digital Host Configuration Protocol'
    ],
    correctAnswer: 0,
    difficulty: 'Mittel',
    explanation: 'DHCP steht für Dynamic Host Configuration Protocol und verteilt automatisch IP-Adressen an Netzwerkgeräte.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['DHCP', 'Konfiguration'],
    created: '2024-02-14'
  },
  {
    id: 'q81',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist DNS?',
    answers: [
      'Domain Name System',
      'Dynamic Network Service',
      'Direct Network System',
      'Distributed Name Service'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'DNS steht für Domain Name System und übersetzt Domainnamen in IP-Adressen.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['DNS', 'Namen'],
    created: '2024-02-15'
  },
  {
    id: 'q82',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist ein Router?',
    answers: [
      'Ein Gerät zum Weiterleiten von Datenpaketen',
      'Ein Kabel',
      'Ein Protokoll',
      'Ein Programm'
    ],
    correctAnswer: 0,
    difficulty: 'Leicht',
    explanation: 'Ein Router ist ein Netzwerkgerät, das Datenpakete zwischen verschiedenen Netzwerken weiterleitet.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['Router', 'Weiterleitung'],
    created: '2024-02-16'
  },
  {
    id: 'q83',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist ein Switch?',
    answers: [
      'Ein Schalter',
      'Ein Gerät zur Verbindung von Geräten in einem LAN',
      'Ein Protokoll',
      'Ein Kabel'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Ein Switch ist ein Netzwerkgerät, das Geräte in einem lokalen Netzwerk (LAN) miteinander verbindet.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['Switch', 'LAN'],
    created: '2024-02-17'
  },
  {
    id: 'q84',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist eine Firewall?',
    answers: [
      'Eine Mauer aus Feuer',
      'Ein Sicherheitssystem für Netzwerke',
      'Ein Protokoll',
      'Ein Kabel'
    ],
    correctAnswer: 1,
    difficulty: 'Leicht',
    explanation: 'Eine Firewall ist ein Sicherheitssystem, das den Datenverkehr zwischen Netzwerken kontrolliert und filtert.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['Firewall', 'Sicherheit'],
    created: '2024-02-18'
  },
  {
    id: 'q85',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist ein VLAN?',
    answers: [
      'Virtual Local Area Network',
      'Very Large Area Network',
      'Variable Length Area Network',
      'Verified Local Area Network'
    ],
    correctAnswer: 0,
    difficulty: 'Mittel',
    explanation: 'VLAN steht für Virtual Local Area Network und ermöglicht die logische Trennung von Netzwerken.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['VLAN', 'Virtuell'],
    created: '2024-02-19'
  },
  {
    id: 'q86',
    categoryId: 'cat6',
    category: 'Netzwerke',
    question: 'Was ist ein Subnet?',
    answers: [
      'Ein Unternetzwerk',
      'Ein Teilnetzwerk eines größeren Netzwerks',
      'Ein Sicherheitsnetz',
      'Ein Backup-Netzwerk'
    ],
    correctAnswer: 1,
    difficulty: 'Mittel',
    explanation: 'Ein Subnet ist ein Teilnetzwerk eines größeren Netzwerks, das zur besseren Organisation und Sicherheit dient.',
    author: 'Dr. Fischer',
    authorEmail: 'fischer@iu-study.org',
    tags: ['Subnet', 'Teilnetzwerk'],
    created: '2024-02-20'
  }
];

// Hilfsfunktionen
export const getCategoriesWithCardCount = () => {
  return mockCategories.map(category => ({
    ...category,
    cardCount: mockQuestions.filter(q => q.categoryId === category.id).length
  }));
};

export const getQuestionsByCategory = (categoryId) => {
  return mockQuestions.filter(q => q.categoryId === categoryId);
};

export const getQuestionById = (questionId) => {
  return mockQuestions.find(q => q.id === questionId);
};

export const getCategoryById = (categoryId) => {
  return mockCategories.find(c => c.id === categoryId);
};