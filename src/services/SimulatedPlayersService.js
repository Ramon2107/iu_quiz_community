/**
 * SimulatedPlayers-Service - Simulation von Mitspielern
 *
 * Dieser Service simuliert realistische Mitstudierende für kooperative
 * und kompetitive Quiz-Modi mit verschiedenen Schwierigkeitsgraden.
 *
 * FEATURES:
 * - Realistische Spieler-Profile mit verschiedenen Fähigkeiten
 * - Adaptive Antwortzeiten basierend auf Fragenschwierigkeit
 * - Verschiedene Spielertypen (Schnell, Genau, Durchschnitt)
 * - Kooperative und kompetitive Modi-Unterstützung
 * - Statistische Auswertung und Ranglisten
 *
 * UPDATE: Neue Implementierung für Multiplayer-Simulation
 * UPDATE: Komplette Methoden für generateCompetitiveUpdates und reset
 *
 * @author IU Quiz Community
 * @version 1.2.0
 * @since 2025-07-15
 */

/**
 * Simulierte Spieler-Profile mit verschiedenen Charakteristiken
 * @type {Array<Object>}
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
 * SimulatedPlayers-Service-Klasse
 *
 * Verwaltet die Simulation von Mitspielern in verschiedenen Quiz-Modi
 * und stellt realistische Spieler-Interaktionen bereit.
 */
class SimulatedPlayersService {
    /**
     * Konstruktor - Initialisiert den Service
     */
    constructor() {
        this.activePlayers = [];
        this.gameMode = null;
        this.currentCategory = null;
    }

    /**
     * Initialisiert Spieler für eine Quiz-Runde
     *
     * @param {string} gameMode - 'cooperative' oder 'competitive'
     * @param {string} category - Kategorie für Spezialisierung
     * @param {number} playerCount - Anzahl der Mitspieler (2-4)
     * @returns {Array<Object>} Array von Spielern
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
     * Simuliert Antworten der KI-Spieler
     *
     * @param {Object} question - Aktuelle Frage
     * @param {number} questionIndex - Index der Frage
     * @returns {Promise<Array<Object>>} Array mit Spieler-Antworten
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
     * @param {Object} player - Spieler-Objekt
     * @param {Object} question - Frage-Objekt
     * @param {number} questionIndex - Frage-Index
     * @returns {Promise<Object>} Antwort-Objekt
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
     * @param {number} correctAnswer - Index der richtigen Antwort
     * @param {number} totalAnswers - Gesamtanzahl der Antworten
     * @returns {number} Index der falschen Antwort
     */
    getRandomWrongAnswer(correctAnswer, totalAnswers) {
        let wrongAnswer;
        do {
            wrongAnswer = Math.floor(Math.random() * totalAnswers);
        } while (wrongAnswer === correctAnswer);
        return wrongAnswer;
    }

    /**
     * Berechnet finale Rangliste
     *
     * @param {Object} humanPlayer - Menschlicher Spieler
     * @returns {Array<Object>} Sortierte Rangliste
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
     * Generiert Spieler-Nachrichten für kooperativen Modus
     *
     * @param {Object} question - Aktuelle Frage
     * @param {Array<Object>} playerAnswers - Antworten der Spieler
     * @returns {Array<Object>} Nachrichten-Array
     */
    generateCooperativeMessages(question, playerAnswers) {
        const messages = [];
        const cooperativePlayers = this.activePlayers.filter(p => p.personality === 'cooperative');

        cooperativePlayers.forEach(player => {
            const playerAnswer = playerAnswers.find(a => a.playerId === player.id);

            if (playerAnswer && Math.random() < 0.3) { // 30% Chance für Nachricht
                const messageTemplates = playerAnswer.isCorrect ? [
                    `Ich denke, die Antwort ist ${question.answers[playerAnswer.selectedAnswer]}`,
                    `Meiner Meinung nach ist es ${question.answers[playerAnswer.selectedAnswer]}`,
                    `Ich bin mir ziemlich sicher: ${question.answers[playerAnswer.selectedAnswer]}`
                ] : [
                    `Ich bin mir nicht sicher... vielleicht ${question.answers[playerAnswer.selectedAnswer]}?`,
                    `Hmm, schwierige Frage. Ich tippe auf ${question.answers[playerAnswer.selectedAnswer]}`,
                    `Könnte ${question.answers[playerAnswer.selectedAnswer]} sein, aber ich bin nicht sicher`
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
     * Generiert kompetitive Updates für Ranglisten-Anzeige
     *
     * @param {Array<Object>} playerAnswers - Antworten der Spieler
     * @returns {Array<Object>} Update-Array mit Live-Ranglisten-Daten
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
     * Berechnet Performance-Rating eines Spielers
     *
     * @param {Object} player - Spieler-Objekt
     * @returns {string} Performance-Rating ('excellent', 'good', 'average', 'needs_improvement')
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
     * Generiert Live-Kommentare für kompetitive Modi
     *
     * @param {Array<Object>} playerAnswers - Aktuelle Spieler-Antworten
     * @returns {Array<Object>} Live-Kommentare
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
     * Bereinigt alle Spieler-Daten und Zustandsvariablen
     */
    reset() {
        this.activePlayers = [];
        this.gameMode = null;
        this.currentCategory = null;
        console.log('SimulatedPlayersService wurde vollständig zurückgesetzt');
    }

    /**
     * Gibt aktuelle Spieler-Statistiken zurück
     *
     * @returns {Array<Object>} Array mit Spieler-Statistiken
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
     * Gibt Spieler-Informationen zurück
     *
     * @returns {Array<Object>} Array mit Basis-Spieler-Informationen
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