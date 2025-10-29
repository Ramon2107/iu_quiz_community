/**
 * Simulierte Spieler-Profile mit verschiedenen Charakteristiken
 *
 * Diese Konstante enthält vordefinierte Spieler-Profile mit individuellen
 * Eigenschaften wie Fähigkeitslevel, Geschwindigkeit und Persönlichkeit.
 * Jeder Spieler hat Stärken und Schwächen in verschiedenen Kategorien.
 *
 * @const {Array<Object>} SIMULATED_PLAYERS
 * @memberof SimulatedPlayersService
 */
const SIMULATED_PLAYERS = [
    {
        id: 'sim_player_001',
        name: 'Lisa Hoffmann',
        studyProgram: 'Wirtschaftsinformatik',
        semester: 4,
        avatar: 'fas fa-user-graduate',
        color: 'success',
        skillLevel: 0.85, // 85% Genauigkeit
        speedFactor: 1.2, // 20% schneller als normal
        personality: 'competitive', // kompetitiv, hilfsbereit
        specialties: ['Programmierung', 'Mathematik'], // Stärken
        weaknesses: ['Geschichte', 'Sprachen'] // Schwächen
    },
    {
        id: 'sim_player_002',
        name: 'David Schneider',
        studyProgram: 'Data Science',
        semester: 2,
        avatar: 'fas fa-user-tie',
        color: 'primary',
        skillLevel: 0.72,
        speedFactor: 0.8, // 20% langsamer, aber genauer
        personality: 'cooperative',
        specialties: ['Statistik', 'Mathematik'],
        weaknesses: ['Programmierung', 'Wirtschaft']
    },
    {
        id: 'sim_player_003',
        name: 'Sarah Mueller',
        studyProgram: 'Informatik',
        semester: 6,
        avatar: 'fas fa-user-ninja',
        color: 'warning',
        skillLevel: 0.90,
        speedFactor: 1.5, // Sehr schnell
        personality: 'competitive',
        specialties: ['Programmierung', 'Algorithmen'],
        weaknesses: ['Wirtschaft', 'Recht']
    },
    {
        id: 'sim_player_004',
        name: 'Michael Franz',
        studyProgram: 'Wirtschaftsinformatik',
        semester: 3,
        avatar: 'fas fa-user-friends',
        color: 'info',
        skillLevel: 0.68,
        speedFactor: 0.9,
        personality: 'cooperative',
        specialties: ['Wirtschaft', 'Management'],
        weaknesses: ['Programmierung', 'Mathematik']
    },
    {
        id: 'sim_player_005',
        name: 'Nina Weber',
        studyProgram: 'Psychologie',
        semester: 5,
        avatar: 'fas fa-user-md',
        color: 'secondary',
        skillLevel: 0.78,
        speedFactor: 1.1,
        personality: 'balanced',
        specialties: ['Psychologie', 'Statistik'],
        weaknesses: ['Informatik', 'Mathematik']
    }
];

/**
 * SimulatedPlayersService - Simulation realistischer Mitspieler
 *
 * Dieser Service simuliert realistische Mitstudierende für kooperative
 * und kompetitive Quiz-Modi mit verschiedenen Fähigkeiten und Verhaltensweisen.
 *
 * Hauptfunktionen:
 * - Realistische Spieler-Profile mit individuellen Fähigkeiten und Persönlichkeiten
 * - Adaptive Antwortzeiten basierend auf Fragenschwierigkeit und Spielerfähigkeit
 * - Verschiedene Spielertypen (Schnell, Genau, Durchschnittlich, Langsam)
 * - Unterstützung für kooperative und kompetitive Modi
 * - Statistische Auswertung und dynamische Ranglisten
 * - Spezialgebiete und Schwächen für realistische Fehlerquoten
 * - Zufällige Auswahl von Spielern für jede Session
 *
 * @class SimulatedPlayersService
 * @author Projektteam IU Community Quiz
 * @version 1.2.0
 */
class SimulatedPlayersService {
    /**
     * Konstruktor - Initialisiert den Service
     *
     * Erstellt eine neue Instanz des SimulatedPlayersService und
     * initialisiert die internen Zustandsvariablen.
     *
     * @constructor
     */
    constructor() {
        this.activePlayers = [];
        this.gameMode = null;
        this.currentCategory = null;
    }

    /**
     * Initialisiert Spieler für eine Quiz-Runde
     *
     * Wählt zufällig die angegebene Anzahl von Spielern aus dem Pool aus
     * und initialisiert ihre Statistiken (Score, Antworten, Zeit). Die Spieler
     * werden für den angegebenen Spielmodus und die Kategorie vorbereitet.
     *
     * @method initializePlayers
     * @memberof SimulatedPlayersService
     * @param {string} gameMode - Spielmodus: 'cooperative' oder 'competitive'
     * @param {string} category - Kategorie für Spezialisierung (beeinflusst Erfolgswahrscheinlichkeit)
     * @param {number} [playerCount=3] - Anzahl der zu initialisierenden Mitspieler (2-4)
     * @returns {Array<Object>} Array mit initialisierten Spieler-Objekten
     * @example
     * const players = service.initializePlayers('competitive', 'Programmierung', 3);
     * console.log(players.length); // 3
     */
    initializePlayers(gameMode, category, playerCount = 3) {
        this.gameMode = gameMode;
        this.currentCategory = category;

        // Wähle zufällige Spieler aus
        const shuffled = [...SIMULATED_PLAYERS].sort(() => Math.random() - 0.5);
        this.activePlayers = shuffled.slice(0, playerCount).map(player => ({
            ...player,
            score: 0,
            answeredQuestions: 0,
            correctAnswers: 0,
            totalTime: 0,
            averageTime: 0,
            isActive: true
        }));

        console.log(`Spieler initialisiert für ${gameMode}-Modus:`, this.activePlayers.map(p => p.name));
        return this.activePlayers;
    }

    /**
     * Simuliert Antworten aller aktiven KI-Spieler
     *
     * Iteriert über alle aktiven Spieler und simuliert für jeden eine Antwort
     * auf die aktuelle Frage. Die Methode arbeitet asynchron, um realistische
     * Antwortzeiten zu simulieren.
     *
     * @method simulatePlayerAnswers
     * @memberof SimulatedPlayersService
     * @param {Object} question - Aktuelles Frage-Objekt mit question, answers, correctAnswer, etc.
     * @param {number} questionIndex - Index der aktuellen Frage im Quiz
     * @returns {Promise<Array<Object>>} Promise mit Array von Antwort-Objekten aller Spieler
     * @example
     * const answers = await service.simulatePlayerAnswers(question, 0);
     * console.log(answers[0].isCorrect); // true oder false
     */
    async simulatePlayerAnswers(question, questionIndex) {
        const playerAnswers = [];

        for (const player of this.activePlayers) {
            const answer = await this.simulatePlayerAnswer(player, question, questionIndex);
            playerAnswers.push(answer);
        }

        return playerAnswers;
    }

    /**
     * Simuliert eine individuelle Spieler-Antwort
     *
     * Diese Methode berechnet eine realistische Antwort für einen einzelnen Spieler
     * basierend auf dessen Fähigkeiten, Geschwindigkeit, Spezialisierungen und der
     * Fragenschwierigkeit. Die Erfolgswahrscheinlichkeit wird dynamisch angepasst.
     * Spieler-Statistiken werden automatisch aktualisiert.
     *
     * @method simulatePlayerAnswer
     * @memberof SimulatedPlayersService
     * @param {Object} player - Spieler-Objekt mit skillLevel, speedFactor, specialties, etc.
     * @param {Object} question - Frage-Objekt mit question, answers, correctAnswer, difficulty, category
     * @param {number} questionIndex - Index der aktuellen Frage
     * @returns {Promise<Object>} Promise mit Antwort-Objekt (playerId, isCorrect, timeTaken, etc.)
     * @example
     * const answer = await service.simulatePlayerAnswer(player, question, 0);
     * console.log(`${answer.playerName}: ${answer.isCorrect ? 'Richtig' : 'Falsch'} in ${answer.timeTaken}s`);
     */
    async simulatePlayerAnswer(player, question, questionIndex) {
        // Berechne Antwortzeit basierend auf Spieler-Geschwindigkeit
        const baseTime = this.gameMode === 'competitive' ?
            Math.random() * 15 + 5 : // 5-20 Sekunden bei kompetitiv
            Math.random() * 25 + 10; // 10-35 Sekunden bei kooperativ

        const answerTime = Math.round(baseTime / player.speedFactor);

        // Simuliere Antwortzeit-Verzögerung
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

        // Berechne Erfolgswahrscheinlichkeit
        let successProbability = player.skillLevel;

        // Anpassung basierend auf Spezialisierung
        if (question.category && player.specialties.includes(question.category)) {
            successProbability += 0.15; // +15% für Spezialisierung
        }
        if (question.category && player.weaknesses.includes(question.category)) {
            successProbability -= 0.10; // -10% für Schwächen
        }

        // Schwierigkeitsgrad berücksichtigen
        if (question.difficulty === 'hard') {
            successProbability -= 0.20;
        } else if (question.difficulty === 'easy') {
            successProbability += 0.10;
        }

        // Begrenze Wahrscheinlichkeit
        successProbability = Math.max(0.1, Math.min(0.95, successProbability));

        // Bestimme Antwort
        const isCorrect = Math.random() < successProbability;
        const selectedAnswer = isCorrect ?
            question.correctAnswer :
            this.getRandomWrongAnswer(question.correctAnswer, question.answers.length);

        // Aktualisiere Spieler-Statistiken
        player.answeredQuestions++;
        player.totalTime += answerTime;
        player.averageTime = Math.round(player.totalTime / player.answeredQuestions);

        if (isCorrect) {
            player.correctAnswers++;
            // Punktesystem: Schnelligkeit + Genauigkeit
            const speedBonus = Math.max(0, 30 - answerTime); // Bonus für schnelle Antworten
            player.score += 100 + speedBonus;
        }

        return {
            playerId: player.id,
            playerName: player.name,
            selectedAnswer,
            isCorrect,
            timeTaken: answerTime,
            questionIndex,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Generiert eine zufällige falsche Antwort
     *
     * Wählt zufällig einen Antwortindex aus, der nicht dem korrekten entspricht.
     * Wird verwendet, wenn ein Spieler eine falsche Antwort geben soll.
     *
     * @method getRandomWrongAnswer
     * @memberof SimulatedPlayersService
     * @param {number} correctAnswer - Index der richtigen Antwort (wird ausgeschlossen)
     * @param {number} totalAnswers - Gesamtanzahl der verfügbaren Antworten
     * @returns {number} Index einer zufälligen falschen Antwort
     * @example
     * const wrongIndex = service.getRandomWrongAnswer(2, 4);
     * console.log(wrongIndex); // 0, 1 oder 3 (aber nie 2)
     */
    getRandomWrongAnswer(correctAnswer, totalAnswers) {
        let wrongAnswer;
        do {
            wrongAnswer = Math.floor(Math.random() * totalAnswers);
        } while (wrongAnswer === correctAnswer);
        return wrongAnswer;
    }

    /**
     * Berechnet die finale Rangliste aller Spieler
     *
     * Kombiniert den menschlichen Spieler mit allen KI-Spielern und erstellt
     * eine sortierte Rangliste basierend auf Punktzahl (primär) und durchschnittlicher
     * Antwortzeit (sekundär bei Gleichstand).
     *
     * @method calculateFinalRanking
     * @memberof SimulatedPlayersService
     * @param {Object} humanPlayer - Objekt mit Daten des menschlichen Spielers (name, score, correctAnswers, averageTime)
     * @returns {Array<Object>} Sortiertes Array aller Spieler (höchste Punktzahl zuerst)
     * @example
     * const ranking = service.calculateFinalRanking({name: 'Max', score: 500, correctAnswers: 8, averageTime: 15});
     * console.log(ranking[0].name); // Name des Gewinners
     */
    calculateFinalRanking(humanPlayer) {
        const allPlayers = [
            {
                id: 'human_player',
                name: humanPlayer.name,
                score: humanPlayer.score || 0,
                correctAnswers: humanPlayer.correctAnswers || 0,
                averageTime: humanPlayer.averageTime || 0,
                isHuman: true,
                color: 'primary'
            },
            ...this.activePlayers.map(player => ({
                ...player,
                isHuman: false
            }))
        ];

        // Sortiere nach Punktzahl, dann nach Antwortzeit
        return allPlayers.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score; // Höhere Punkte zuerst
            }
            return a.averageTime - b.averageTime; // Schnellere Zeit bei Gleichstand
        });
    }

    /**
     * Generiert hilfreiche Nachrichten für den kooperativen Modus
     *
     * Spieler mit kooperativer Persönlichkeit teilen mit einer gewissen Wahrscheinlichkeit
     * ihre Gedanken zur Frage mit. Die Nachrichten sind realistisch formuliert und
     * helfen dem menschlichen Spieler bei der Entscheidungsfindung.
     *
     * @method generateCooperativeMessages
     * @memberof SimulatedPlayersService
     * @param {Object} question - Aktuelles Frage-Objekt mit answers-Array
     * @param {Array<Object>} playerAnswers - Array mit Antworten aller Spieler
     * @returns {Array<Object>} Array mit Nachrichten-Objekten (playerId, playerName, message, timestamp, isHelpful)
     * @example
     * const messages = service.generateCooperativeMessages(question, playerAnswers);
     * messages.forEach(msg => console.log(`${msg.playerName}: ${msg.message}`));
     */
    generateCooperativeMessages(question, playerAnswers) {
        const messages = [];
        const cooperativePlayers = this.activePlayers.filter(p => p.personality === 'cooperative');

        cooperativePlayers.forEach(player => {
            const playerAnswer = playerAnswers.find(a => a.playerId === player.id);

            if (playerAnswer && Math.random() < 0.3) { // 30% Chance für Nachricht
                // Prüfe, ob question und question.answers definiert sind, um Fehler zu vermeiden
                // Wenn nicht definiert, verwende einen Platzhaltertext
                const answerText = question && question.answers && question.answers[playerAnswer.selectedAnswer] 
                    ? question.answers[playerAnswer.selectedAnswer] 
                    : "eine der Antwortmöglichkeiten";
                
                const messageTemplates = playerAnswer.isCorrect ? [
                    `Ich denke, die Antwort ist ${answerText}`,
                    `Meiner Meinung nach ist es ${answerText}`,
                    `Ich bin mir ziemlich sicher: ${answerText}`
                ] : [
                    `Ich bin mir nicht sicher... vielleicht ${answerText}?`,
                    `Hmm, schwierige Frage. Ich tippe auf ${answerText}`,
                    `Könnte ${answerText} sein, aber ich bin nicht sicher`
                ];

                messages.push({
                    playerId: player.id,
                    playerName: player.name,
                    message: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
                    timestamp: new Date().toISOString(),
                    isHelpful: playerAnswer.isCorrect
                });
            }
        });

        return messages;
    }

    /**
     * Generiert Live-Updates für die kompetitive Ranglisten-Anzeige
     *
     * Erstellt detaillierte Status-Updates für jeden Spieler inklusive aktueller
     * Punktzahl, Genauigkeit, durchschnittlicher Zeit und Performance-Rating.
     * Die Updates sind nach Punktzahl sortiert für eine Live-Rangliste.
     *
     * @method generateCompetitiveUpdates
     * @memberof SimulatedPlayersService
     * @param {Array<Object>} playerAnswers - Array mit Antworten aller Spieler der aktuellen Runde
     * @returns {Array<Object>} Sortiertes Array mit detaillierten Spieler-Updates
     * @example
     * const updates = service.generateCompetitiveUpdates(playerAnswers);
     * console.log(updates[0].playerName, updates[0].currentScore); // Führender Spieler
     */
    generateCompetitiveUpdates(playerAnswers) {
        const updates = [];

        playerAnswers.forEach(answer => {
            const player = this.activePlayers.find(p => p.id === answer.playerId);
            if (player) {
                updates.push({
                    playerId: answer.playerId,
                    playerName: answer.playerName,
                    isCorrect: answer.isCorrect,
                    timeTaken: answer.timeTaken,
                    currentScore: player.score,
                    averageTime: player.averageTime,
                    correctAnswers: player.correctAnswers,
                    totalAnswers: player.answeredQuestions,
                    accuracy: Math.round((player.correctAnswers / player.answeredQuestions) * 100),
                    statusMessage: answer.isCorrect ?
                        `Richtig! (${answer.timeTaken}s)` :
                        `Falsch (${answer.timeTaken}s)`,
                    performance: this.calculatePerformanceRating(player)
                });
            }
        });

        // Sortiere nach aktueller Punktzahl
        return updates.sort((a, b) => b.currentScore - a.currentScore);
    }

    /**
     * Berechnet das Performance-Rating eines Spielers
     *
     * Kombiniert Genauigkeit (correctAnswers/answeredQuestions) und Geschwindigkeit
     * (averageTime) zu einem Gesamt-Rating. Das Rating wird in vier Stufen klassifiziert.
     *
     * @method calculatePerformanceRating
     * @memberof SimulatedPlayersService
     * @param {Object} player - Spieler-Objekt mit correctAnswers, answeredQuestions, averageTime
     * @returns {string} Performance-Rating: 'excellent', 'good', 'average' oder 'needs_improvement'
     * @example
     * const rating = service.calculatePerformanceRating(player);
     * console.log(`Performance: ${rating}`); // z.B. 'excellent'
     */
    calculatePerformanceRating(player) {
        const accuracy = player.correctAnswers / player.answeredQuestions;
        const speedRating = player.averageTime <= 15 ? 1 : (player.averageTime <= 25 ? 0.5 : 0);
        const overallRating = (accuracy + speedRating) / 2;

        if (overallRating >= 0.8) return 'excellent';
        if (overallRating >= 0.6) return 'good';
        if (overallRating >= 0.4) return 'average';
        return 'needs_improvement';
    }

    /**
     * Generiert spontane Live-Kommentare für den kompetitiven Modus
     *
     * Kompetitive Spieler äußern sich gelegentlich zu ihren Antworten.
     * Die Kommentare variieren je nach Erfolg und Geschwindigkeit der Antwort
     * und sorgen für eine lebendige Atmosphäre im Quiz.
     *
     * @method generateLiveComments
     * @memberof SimulatedPlayersService
     * @param {Array<Object>} playerAnswers - Array mit Antworten aller Spieler der aktuellen Runde
     * @returns {Array<Object>} Array mit Kommentar-Objekten (playerId, playerName, comment, timestamp, type)
     * @example
     * const comments = service.generateLiveComments(playerAnswers);
     * comments.forEach(c => console.log(`${c.playerName}: ${c.comment}`));
     */
    generateLiveComments(playerAnswers) {
        const comments = [];
        const competitivePlayers = this.activePlayers.filter(p => p.personality === 'competitive');

        competitivePlayers.forEach(player => {
            const playerAnswer = playerAnswers.find(a => a.playerId === player.id);

            if (playerAnswer && Math.random() < 0.25) { // 25% Chance für Kommentar
                const commentTemplates = {
                    correct_fast: [
                        "Ja! Das war einfach!",
                        "Geschafft in Rekordzeit!",
                        "Zu leicht für mich!"
                    ],
                    correct_slow: [
                        "Endlich... das war knapp!",
                        "Puh, gerade noch richtig!",
                        "Das war schwerer als gedacht..."
                    ],
                    incorrect: [
                        "Ach nein... das war ein Fehler!",
                        "Verdammt, falscher Klick!",
                        "Das nächste Mal klappt's besser!"
                    ]
                };

                let templateType;
                if (playerAnswer.isCorrect && playerAnswer.timeTaken <= 10) {
                    templateType = 'correct_fast';
                } else if (playerAnswer.isCorrect) {
                    templateType = 'correct_slow';
                } else {
                    templateType = 'incorrect';
                }

                const templates = commentTemplates[templateType];
                const comment = templates[Math.floor(Math.random() * templates.length)];

                comments.push({
                    playerId: player.id,
                    playerName: player.name,
                    comment,
                    timestamp: new Date().toISOString(),
                    type: templateType
                });
            }
        });

        return comments;
    }

    /**
     * Setzt den Service vollständig zurück
     *
     * Bereinigt alle Spieler-Daten und Zustandsvariablen. Wird typischerweise
     * am Ende eines Quiz oder beim Start eines neuen Quiz aufgerufen.
     *
     * @method reset
     * @memberof SimulatedPlayersService
     * @returns {void}
     * @example
     * service.reset();
     * console.log('Service wurde zurückgesetzt');
     */
    reset() {
        this.activePlayers = [];
        this.gameMode = null;
        this.currentCategory = null;
        console.log('SimulatedPlayersService wurde vollständig zurückgesetzt');
    }

    /**
     * Gibt detaillierte Statistiken aller aktiven Spieler zurück
     *
     * Erstellt für jeden aktiven Spieler ein Statistik-Objekt mit Score,
     * Genauigkeit, durchschnittlicher Antwortzeit und Performance-Rating.
     *
     * @method getPlayerStatistics
     * @memberof SimulatedPlayersService
     * @returns {Array<Object>} Array mit Statistik-Objekten für jeden Spieler
     * @example
     * const stats = service.getPlayerStatistics();
     * stats.forEach(s => console.log(`${s.name}: ${s.accuracy}% korrekt`));
     */
    getPlayerStatistics() {
        return this.activePlayers.map(player => ({
            id: player.id,
            name: player.name,
            score: player.score,
            correctAnswers: player.correctAnswers,
            totalAnswers: player.answeredQuestions,
            accuracy: player.answeredQuestions > 0 ?
                Math.round((player.correctAnswers / player.answeredQuestions) * 100) : 0,
            averageTime: player.averageTime,
            performance: this.calculatePerformanceRating(player)
        }));
    }

    /**
     * Gibt Basis-Informationen aller aktiven Spieler zurück
     *
     * Liefert grundlegende Informationen wie Name, Studiengang, Semester und Avatar
     * für alle aktiven Spieler. Nützlich für die Anzeige von Spieler-Karten.
     *
     * @method getActivePlayers
     * @memberof SimulatedPlayersService
     * @returns {Array<Object>} Array mit Basis-Informationen der aktiven Spieler
     * @example
     * const players = service.getActivePlayers();
     * players.forEach(p => console.log(`${p.name} - ${p.studyProgram}`));
     */
    getActivePlayers() {
        return this.activePlayers.map(player => ({
            id: player.id,
            name: player.name,
            studyProgram: player.studyProgram,
            semester: player.semester,
            avatar: player.avatar,
            color: player.color,
            isActive: player.isActive
        }));
    }
}

// Exportiere eine Singleton-Instanz
const simulatedPlayersService = new SimulatedPlayersService();
export default simulatedPlayersService;