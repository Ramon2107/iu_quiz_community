# IU Community Quiz - README
## 📋 Überblick

Das **IU Community Quiz ** ist eine moderne, responsive Webanwendung für kooperatives und kollaboratives Online-Lernen. Die Anwendung wurde speziell für Studierende des Fernstudiums der IUBH entwickelt und unterstützt sowohl kooperative als auch kompetitive Quiz-Modi zur Klausurvorbereitung.

## 🎯 Projektziel
Konzeption und prototypische Umsetzung eines Online-Quizsystems, das Studierende bei der Festigung der Lerninhalte zur Vorbereitung auf Klausuren unterstützt. Das System ermöglicht es Studierenden, kooperativ und kollaborativ Antworten zu fachlichen Fragen zu finden, wobei das gemeinsame Lernen und Erarbeiten im Fokus steht.

## ✨ Hauptfunktionalitäten
### 🤝 Kooperativer Modus
- Gemeinsames Bearbeiten von Fragen mit anderen Studierenden
- Diskussion von Lösungsansätzen
- Weniger Zeitdruck für tieferes Verständnis
- Kollaboratives Lernen im Fokus

### 🏆 Kompetitiver Modus
- Zeitbasierte Einzelspiele
- Direkter Wettkampf zwischen Studierenden
- Ranglisten und Leistungsvergleiche
- Schnelligkeit und Genauigkeit entscheiden

### 📝 Frageneditor
- Kollaborative Erstellung von Fragenkatalogen
- Verschiedene Schwierigkeitsgrade
- Kategorisierung nach Fachbereichen
- Erklärungen und Begründungen für Antworten

### 👤 Benutzerprofile
- Individuelle Lernstatistiken
- Fortschrittsanzeige nach Kategorien
- Errungenschaften und Achievements
- Lernzeiterfassung

## 🛠️ Technologie-Stack
### Frontend
- **React**: 19.1.0 - Moderne Komponentenarchitektur
- **React DOM**: 19.1.0 - DOM-Rendering
- **Bootstrap**: 5.3.0 - Responsive Design Framework
- **Font Awesome**: 6.0.0 - Icons und Symbole

### Build & Development
- **React Scripts**: 5.0.1 - Build-Tool und Entwicklungsserver
- **npm** - Paketmanager für Node.js

### Testing
- **@testing-library/react**: 16.3.0
- **@testing-library/dom**: 10.4.0
- **@testing-library/user-event**: 13.5.0
- **@testing-library/jest-dom**: 6.6.3

## 🚀 Installation und Setup
### Voraussetzungen
- Node.js (Version 16 oder höher)
- npm (Node Package Manager)
- Windows 10 oder höher (für die bereitgestellten Befehle)

### Installation
```bash
# Repository klonen oder Projektordner öffnen
cd iu_quiz_community

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start
```

Die Anwendung ist dann unter `http://localhost:3000` erreichbar.

## 📚 Verfügbare Skripte

### Development
```bash
# Entwicklungsserver mit Hot-Reload starten
npm start

# Tests im Watch-Modus ausführen
npm test

# Tests mit Coverage-Report ausführen
npm run test_ci
```

### Testing
```bash
# Cypress E2E Tests öffnen (interaktiv)
npm run cy:open-e2e

# Cypress E2E Tests ausführen
npm run cy:run-e2e

# E2E Tests mit laufendem Server
npm run cy:e2e
```

### Dokumentation
```bash
# JSDoc-Dokumentation generieren
npm run jsdoc
# oder
npm run docs
# Dokumentation generieren und im Browser öffnen
npm run docs:serve
```

Die generierte Dokumentation befindet sich im Ordner `docs/` und kann über `docs/index.html` aufgerufen werden.

### Code-Qualität
```bash
# ESLint ausführen
npm run lint

# Production Build erstellen
npm run build
```

## 🔐 Login-Daten (Demo)

Im Login-Formular unter "Demon-Anmeldedaten" zu finden. 

## 📖 JSDoc-Dokumentation

Die JSDoc-Dokumentation wird automatisch aus den Quelldateien generiert und bietet detaillierte Informationen zu allen Komponenten, Funktionen und Services.

### Dokumentation generieren
```bash
npm run jsdoc
```

### Dokumentation anzeigen
Die generierte HTML-Dokumentation befindet sich im `docs/`-Ordner. Öffnen Sie `docs/index.html` in einem Browser, oder verwenden Sie:

```bash
npm run docs:serve
```

Die Dokumentation umfasst:
- **Komponenten**: Alle React-Komponenten mit Props und Beschreibungen
- **Services**: SimulatedPlayersService für Multiplayer-Simulation
- **Data Manager**: Zentrale Datenverwaltung mit localStorage
- **Utils**: XSS-Schutz und weitere Hilfsfunktionen

## 🏗️ Projektstruktur

```
iu_quiz_community/
├── public/                  # Statische Dateien
│   ├── bootstrap/          # Bootstrap CSS und JS (lokal)
│   ├── fontawesome/        # Font Awesome Icons (lokal)
│   └── index.html          # HTML-Template
├── src/
│   ├── components/         # React-Komponenten
│   │   ├── admin/         # Admin-Komponenten (CardManager, QuestionEditor)
│   │   ├── auth/          # Authentifizierung (LoginForm)
│   │   ├── common/        # Gemeinsame Komponenten (Header, Footer)
│   │   ├── community/     # Community-Features
│   │   ├── home/          # Startseite
│   │   ├── quiz/          # Quiz-Komponenten (QuizMain, QuizQuestion, etc.)
│   │   └── user/          # Benutzer-Komponenten (UserProfile)
│   ├── data/              # Datenverwaltung
│   │   ├── dataManager.js # Zentrale Datenverwaltung
│   │   └── mockData.js    # Test- und Demo-Daten
│   ├── services/          # Business Logic Services
│   │   └── SimulatedPlayersService.js
│   ├── utils/             # Hilfsfunktionen
│   │   └── xssUtils.js    # XSS-Schutz
│   ├── App.js             # Hauptkomponente
│   └── index.js           # Entry Point
├── cypress/               # Cypress-Tests
│   ├── e2e/              # End-to-End Tests
│   └── component/        # Component Tests
├── docs/                  # JSDoc-Dokumentation
├── jsdoc.json            # JSDoc-Konfiguration
└── package.json          # Projekt-Konfiguration
```

## 🔒 Sicherheitsfeatures

- **XSS-Schutz**: Automatische Sanitization aller Benutzereingaben
- **Input-Validierung**: Validierung gegen SQL-Injection-Versuche
- **Session-Management**: Sichere localStorage-basierte Sessions
- **Content Security**: Bootstrap und Font Awesome werden lokal gehostet

## 🎨 Features

### Authentifizierung
- Login-System mit Sicherheitsvalidierung
- Session-Management über localStorage
- Verschiedene Benutzerrollen (Student, Admin)

### Quiz-Modi
- **Kooperativ**: Gemeinsames Lernen mit Live-Chat
- **Kompetitiv**: Wettbewerb mit Zeitdruck und Rangliste
- **Einzelspieler**: Individuelles Lernen ohne Zeitdruck

### Multiplayer-Simulation
- Realistische simulierte Mitspieler mit verschiedenen Fähigkeiten
- Live-Ranglisten mit Echtzeitaktualisierung
- Adaptive Antwortzeiten basierend auf Fragenschwierigkeit

### Administration
- Kartenverwaltung (CardManager)
- Frageneditor mit Kategorisierung
- Rollenbasierte Zugriffskontrolle

## 📝 Lizenz

Dieses Projekt wurde im Rahmen eines Studienprojekts an der IU Internationale Hochschule entwickelt.

## 👥 Autoren

Projektteam IU Community Quiz

## 🤝 Kontakt

Bei Fragen oder Anregungen wenden Sie sich bitte an das Projektteam.
