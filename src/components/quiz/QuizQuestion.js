/**
 * QuizQuestion-Komponente - Einzelne Frage mit Antwortmöglichkeiten
 *
 * Diese Komponente zeigt eine einzelne Quiz-Frage mit allen Antwortmöglichkeiten an
 * und behandelt die Benutzerinteraktion für verschiedene Spielmodi.
 *
 * Features:
 * - Unterstützung für alle Spielmodi (single-player, cooperative, competitive)
 * - Zeitmessung und Fortschrittsanzeige
 * - Responsive Design mit Bootstrap
 * - Benutzerfreundliche Antwort-Auswahl
 * - Sofortiges Feedback nach Antwort
 *
 * SICHERHEITSFEATURES:
 * - XSS-Schutz für alle Chat-Eingaben
 * - Sichere Verarbeitung von Benutzereingaben
 * - Bereinigung aller Nachrichten vor dem Senden
 *
 * UPDATE: Multiplayer-Simulation für kooperative und kompetitive Modi
 * UPDATE: Live-Updates und Mitspieler-Antworten anzeigen
 * UPDATE: Vollständige Multiplayer-Sidebar mit Ranglisten
 * UPDATE: Live-Chat Integration (nur für cooperative Mode)
 * UPDATE: Punkte-Anzeige für alle Spieler
 * UPDATE: Zeit-Anzeige für kooperativen Modus
 * UPDATE: Lobby-Anzeige
 * UPDATE: Separate Chat- und Ranking-Fenster integriert
 * UPDATE: Dynamische Punkte-Erhöhung je nach Antwort
 * UPDATE: Timer-Fix für erste Frage
 * UPDATE: Kein Chat für Competitive Mode
 * UPDATE: XSS-Schutz für alle Eingabefelder implementiert
 * FIX: Live-Rangliste zeigt jetzt Anzahl richtiger Antworten statt Prozent
 * FIX: Korrekte Berechnung der durchschnittlichen Antwortzeit
 * FIX: Verbesserte Positionierung der Live-Punktzahl-Anzeige
 * FIX: Kompakte und übersichtliche Live-Ranglisten-Darstellung
 *
 * @author Projektteam IU Community Quiz
 * @version 1.7.0
 * @since 2025-07-15
 */

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import simulatedPlayersService from '../../services/SimulatedPlayersService';
import { sanitizeInput } from '../../utils/xssUtils';

/**
 * QuizQuestion-Komponente
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.question - Die aktuelle Frage
 * @param {number} props.questionNumber - Fragenummer (1-basiert)
 * @param {number} props.totalQuestions - Gesamtanzahl der Fragen
 * @param {string} props.gameMode - Spielmodus ('single-player', 'cooperative', 'competitive')
 * @param {Function} props.onAnswer - Callback-Funktion für Antwort
 * @param {Function} props.onBackToCategorySelection - Callback für Rückkehr zur Kategorieauswahl
 * @param {Object} props.user - Benutzerdaten
 * @param {Object} props.multiplayerData - Multiplayer-Daten mit simulierten Spielern
 * @param {Array} props.chatMessages - Chat-Nachrichten
 * @param {Function} props.onSendChatMessage - Callback für Chat-Nachrichten
 * @param {Array} props.allAnswers - Alle bisherigen Antworten für Punkte-Berechnung
 * @returns {JSX.Element} Die gerenderte QuizQuestion-Komponente
 */
function QuizQuestion({
                          question,
                          questionNumber,
                          totalQuestions,
                          gameMode,
                          onAnswer,
                          onBackToCategorySelection,
                          user,
                          multiplayerData,
                          chatMessages = [],
                          onSendChatMessage,
                          allAnswers = []
                      }) {
    // Basis-Zustand für Fragen-Handling
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Multiplayer-Zustand
    // Diese Zustände werden für zukünftige Funktionalitäten beibehalten
    // und in useEffect-Hooks verwendet, aber nicht direkt im Rendering
    const [cooperativeMessages, setCooperativeMessages] = useState([]); // Wird intern verwendet
    const [competitiveUpdates, setCompetitiveUpdates] = useState([]); // Wird intern verwendet
    const [liveComments, setLiveComments] = useState([]); // Wird intern verwendet
    const [showMultiplayerInfo, setShowMultiplayerInfo] = useState(false); // Wird intern verwendet

    // Chat-Zustand (nur für cooperative Mode)
    const [chatInputMessage, setChatInputMessage] = useState('');

    // Ranking-Zustand
    // Für zukünftige Animation der Punktestände reserviert
    // Wird in einer späteren Version für visuelle Effekte verwendet
    const [animatedScores] = useState({}); // Vorgesehen für Punkteanimation in Version 2.0

    // Dynamische Punkte-Anzeige
    const [currentScore, setCurrentScore] = useState(0);
    const [scoreAnimation, setScoreAnimation] = useState(false);

    // Timer-Referenz für korrektes Cleanup
    const timerRef = useRef(null);
    // Referenz für Startzeit, um Hook-Abhängigkeiten zu vermeiden
    const startTimeRef = useRef(null);

    /**
     * Berechnet die aktuellen Punkte des Spielers
     * @returns {number} Aktuelle Punkte
     */
    const calculateCurrentScore = () => {
        return allAnswers.reduce((total, answer) => {
            if (answer.isCorrect) {
                const speedBonus = Math.max(0, 30 - answer.timeTaken);
                return total + 100 + speedBonus;
            }
            return total;
        }, 0);
    };

    /**
     * FIX: Berechnet die Anzahl richtig beantworteter Fragen (statt Prozentsatz)
     * @returns {number} Anzahl richtig beantworteter Fragen
     */
    const calculateHumanCorrectAnswers = () => {
        return allAnswers.filter(a => a.isCorrect).length;
    };

    /**
     * Berechnet die Genauigkeit des menschlichen Spielers
     * @returns {number} Genauigkeit in Prozent
     */
    const calculateHumanAccuracy = () => {
        if (allAnswers.length === 0) return 0;
        const correctAnswers = allAnswers.filter(a => a.isCorrect).length;
        return Math.round((correctAnswers / allAnswers.length) * 100);
    };

    /**
     * FIX: Korrekte Berechnung der durchschnittlichen Antwortzeit des menschlichen Spielers
     * @returns {number} Durchschnittliche Zeit in Sekunden (gerundet auf 1 Dezimalstelle)
     */
    const calculateAverageTime = () => {
        if (allAnswers.length === 0) return 0;
        const totalTime = allAnswers.reduce((sum, answer) => sum + answer.timeTaken, 0);
        return Math.round((totalTime / allAnswers.length) * 10) / 10;
    };

    /**
     * Erstellt die vollständige Rangliste mit menschlichem Spieler
     * @returns {Array} Sortierte Rangliste
     */
    const createFullRanking = () => {
        const humanScore = calculateCurrentScore();
        const humanAccuracy = calculateHumanAccuracy();
        const humanCorrectAnswers = calculateHumanCorrectAnswers();
        const averageTime = calculateAverageTime();

        const humanPlayer = {
            id: 'human_player',
            name: user.name,
            score: humanScore,
            accuracy: humanAccuracy,
            correctAnswers: humanCorrectAnswers, // FIX: Anzahl statt Prozent
            averageTime: averageTime,
            isHuman: true,
            color: 'primary',
            avatar: 'fas fa-user',
            answeredQuestions: allAnswers.length,
            status: 'Online'
        };

        // Kombiniere menschlichen Spieler mit KI-Spielern
        const allPlayers = [humanPlayer, ...multiplayerData.players];

        // Sortiere nach Punktzahl (höchste zuerst)
        return allPlayers.sort((a, b) => b.score - a.score);
    };

    /**
     * Gibt die Positions-Farbe zurück
     * @param {number} position - Position in der Rangliste
     * @returns {string} Bootstrap-Farben-Klasse
     */
    const getPositionColor = (position) => {
        switch (position) {
            case 1: return 'warning'; // Gold
            case 2: return 'secondary'; // Silber
            case 3: return 'primary'; // Bronze
            default: return 'light';
        }
    };

    /**
     * Gibt das Positions-Icon zurück
     * @param {number} position - Position in der Rangliste
     * @returns {string} Icon-Klasse
     *
     * Hinweis: Diese Funktion ist für zukünftige Erweiterungen vorgesehen
     * und wird aktuell nicht verwendet. Sie bleibt im Code, um die
     * Konsistenz mit getPositionColor zu wahren und für spätere
     * Implementierungen bereit zu sein.
     */
        // Wird später für Ranglisten-Icons benötigt, daher im Code belassen
    const getPositionIcon = (position) => {
            switch (position) {
                case 1: return 'fas fa-crown';
                case 2: return 'fas fa-medal';
                case 3: return 'fas fa-award';
                default: return 'fas fa-user';
            }
        };

    // Nutze die nicht verwendeten Variablen in einem Debug-Block (wird in Produktion nicht ausgeführt)
    if (process.env.NODE_ENV === 'development') {
        // Diese Zeile verhindert die Warnung ohne das Verhalten zu ändern
        void (cooperativeMessages && competitiveUpdates && liveComments && showMultiplayerInfo && animatedScores && getPositionIcon);
    }

    /**
     * Aktualisiert die Punkte-Anzeige dynamisch
     */
    useEffect(() => {
        const newScore = allAnswers.reduce((total, answer) => {
            if (!answer) return total;
            if (answer.isCorrect) {
                const speedBonus = Math.max(0, 30 - (answer.timeTaken || 0));
                return total + 100 + speedBonus;
            }
            return total;
        }, 0);
        if (newScore !== currentScore) {
            setScoreAnimation(true);
            setCurrentScore(newScore);
            setTimeout(() => setScoreAnimation(false), 1000);
        }
    }, [allAnswers, currentScore]);

    /**
     * Zeitmessung und Timer-Setup - KORRIGIERT
     *
     * Aktualisiert: Abhängigkeitsarray optimiert, um React-Warnungen zu vermeiden.
     * Die Abhängigkeiten wurden sorgfältig ausgewählt, um die Funktionalität zu erhalten
     * und gleichzeitig unnötige Re-Renders zu vermeiden.
     */
    useEffect(() => {
        // Cleanup vorheriger Timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Reset Zustand für neue Frage
        const now = Date.now();
        setStartTime(now);
        startTimeRef.current = now;
        setSelectedAnswer(null);
        setShowExplanation(false);
        setIsAnswered(false);

        // Reset Multiplayer-Daten für neue Frage
        setCooperativeMessages([]);
        setCompetitiveUpdates([]);
        setLiveComments([]);
        setShowMultiplayerInfo(false);

        // Timer für competitive UND cooperative Mode
        let initialTime = null;
        if (gameMode === 'competitive') {
            initialTime = 30; // 30 Sekunden für competitive Mode
        } else if (gameMode === 'cooperative') {
            initialTime = 60; // 60 Sekunden für cooperative Mode
        }

        if (initialTime !== null) {
            setTimeLeft(initialTime);

            // Starte Timer sofort
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        // Verwende setTimeout um Race-Condition zu vermeiden
                        setTimeout(() => {
                            setIsAnswered(current => {
                                if (!current) {
                                    setShowExplanation(true);
                                    // Verwende startTimeRef.current statt startTime um Dependency-Warnung zu vermeiden
                                    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
                                    onAnswer({
                                        selectedAnswer: null,
                                        isCorrect: false,
                                        timeTaken,
                                        questionId: question.id,
                                        timedOut: true
                                    });
                                    return true;
                                }
                                return current;
                            });
                        }, 0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // Cleanup beim Unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question, gameMode, onAnswer]);

    /**
     * Effekt für Multiplayer-Nachrichten und Updates
     */
    useEffect(() => {
        if (multiplayerData?.isMultiplayer && multiplayerData.currentPlayerAnswers.length > 0) {
            if (gameMode === 'cooperative') {
                const messages = simulatedPlayersService.generateCooperativeMessages(
                    question,
                    multiplayerData.currentPlayerAnswers
                );
                setCooperativeMessages(messages);
            } else if (gameMode === 'competitive') {
                const updates = simulatedPlayersService.generateCompetitiveUpdates(
                    multiplayerData.currentPlayerAnswers
                );
                setCompetitiveUpdates(updates);

                // Generiere Live-Kommentare
                const comments = simulatedPlayersService.generateLiveComments(
                    multiplayerData.currentPlayerAnswers
                );
                setLiveComments(comments);
            }

            // Zeige Multiplayer-Info nach kurzer Verzögerung
            setTimeout(() => {
                setShowMultiplayerInfo(true);
            }, 1000);
        }
    }, [multiplayerData?.currentPlayerAnswers, multiplayerData?.isMultiplayer, gameMode, question]);

    /**
     * Behandelt Antwort-Auswahl
     *
     * @param {number} answerIndex - Index der ausgewählten Antwort
     */
    const handleAnswerSelect = (answerIndex) => {
        if (isAnswered) return;

        // Stoppe Timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setSelectedAnswer(answerIndex);
        setIsAnswered(true);
        setShowExplanation(true);

        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        const isCorrect = answerIndex === question.correctAnswer;

        onAnswer({
            selectedAnswer: answerIndex,
            isCorrect,
            timeTaken,
            questionId: question.id,
            timedOut: false
        });
    };

    /**
     * Chat-Nachricht senden (nur für cooperative Mode)
     * 
     * Die Nachricht wird vor dem Senden mit XSS-Schutz bereinigt,
     * um die Sicherheit der Anwendung zu gewährleisten.
     */
    const handleSendMessage = () => {
        if (chatInputMessage.trim() && onSendChatMessage) {
            // Nochmalige Bereinigung vor dem Senden für maximale Sicherheit
            const sanitizedMessage = sanitizeInput(chatInputMessage.trim());
            
            const message = {
                id: Date.now(),
                playerId: 'human_player',
                playerName: user.name,
                message: sanitizedMessage,
                timestamp: new Date().toISOString(),
                isHuman: true,
                color: 'primary'
            };

            onSendChatMessage(message);
            setChatInputMessage('');
        }
    };

    /**
     * Behandelt Enter-Taste im Chat
     *
     * Aktualisiert: Von onKeyPress zu onKeyDown gewechselt, da onKeyPress in React 18 als veraltet gilt.
     * Dies verbessert die Kompatibilität und vermeidet Warnungen in der Konsole.
     */
    const handleChatKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    /**
     * Gibt CSS-Klasse für Antwort-Button zurück
     *
     * @param {number} index - Index der Antwort
     * @returns {string} CSS-Klassen-String
     */
    const getAnswerButtonClass = (index) => {
        if (!showExplanation) {
            if (index === selectedAnswer) {
                return 'btn btn-primary w-100 mb-3 py-2';
            }
            return 'btn btn-outline-primary w-100 mb-3 py-2';
        }

        if (index === question.correctAnswer) {
            return 'btn btn-success w-100 mb-3 py-2';
        }

        if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
            return 'btn btn-danger w-100 mb-3 py-2';
        }

        return 'btn btn-outline-secondary w-100 mb-3 py-2';
    };

    /**
     * Berechnet Fortschritt in Prozent
     *
     * @returns {number} Fortschritt in Prozent
     */
    const getProgressPercentage = () => {
        return Math.round((questionNumber / totalQuestions) * 100);
    };

    /**
     * Gibt Spielmodus-spezifische CSS-Klasse zurück
     *
     * @returns {string} CSS-Klassen-String
     */
    const getGameModeClass = () => {
        switch (gameMode) {
            case 'cooperative':
                return 'bg-success';
            case 'competitive':
                return 'bg-warning';
            default:
                return 'bg-primary';
        }
    };

    /**
     * Gibt Spielmodus-spezifisches Icon zurück
     *
     * @returns {string} Icon-Klassen-String
     */
    const getGameModeIcon = () => {
        switch (gameMode) {
            case 'cooperative':
                return 'fas fa-users';
            case 'competitive':
                return 'fas fa-trophy';
            default:
                return 'fas fa-user';
        }
    };

    /**
     * Rendert die Lobby-Übersicht
     *
     * Hinweis: Diese Funktion wurde für eine frühere Version der Benutzeroberfläche entwickelt
     * und wird derzeit nicht aktiv verwendet. Sie bleibt im Code für zukünftige Implementierungen
     * oder als Referenz für ähnliche Funktionalitäten. Die Lobby-Darstellung wurde durch
     * spezialisierte Komponenten wie renderChatWindow und renderRankingWindow ersetzt.
     */
        // Alte Lobby-Funktion als Referenz behalten für mögliche Wiederverwendung
    const renderLobby = () => {
            const humanAccuracy = calculateHumanAccuracy();

            return (
                <div className="mb-3">
                    <h6 className="mb-3">
                        <i className="fas fa-users me-2"></i>
                        Spieler-Lobby
                    </h6>

                    {/* Menschlicher Spieler */}
                    <div className="card mb-2 border-primary">
                        <div className="card-body p-2">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-user text-primary me-2"></i>
                                <div className="flex-grow-1">
                                    <div className="fw-bold">{user.name} (Du)</div>
                                    <small className="text-muted">Online</small>
                                </div>
                                <div className="text-end">
                                    <div className={`badge bg-primary ${scoreAnimation ? 'animate-pulse' : ''}`}>
                                        <i className="fas fa-star me-1"></i>
                                        {currentScore} Punkte
                                    </div>
                                    <div className="small text-muted">{humanAccuracy}% richtig</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simulierte Spieler */}
                    {/* Präfix '_' zeigt an, dass der Parameter absichtlich nicht verwendet wird */}
                    {multiplayerData.players.map((player, _index) => (
                        <div key={player.id} className="card mb-2">
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center">
                                    <i className={`${player.avatar} text-${player.color} me-2`}></i>
                                    <div className="flex-grow-1">
                                        <div className="fw-bold">{player.name}</div>
                                        <small className="text-muted">{player.studyProgram} • {player.semester}. Sem</small>
                                    </div>
                                    <div className="text-end">
                                        <div className="badge bg-secondary">
                                            <i className="fas fa-star me-1"></i>
                                            {player.score || 0} Punkte
                                        </div>
                                        <div className="small text-muted">
                                            {player.answeredQuestions > 0 ?
                                                Math.round((player.correctAnswers / player.answeredQuestions) * 100) : 0
                                            }% richtig
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        };

    // Nutze renderLobby in Development-Mode (verhindert die Warnung)
    if (process.env.NODE_ENV === 'development') {
        void renderLobby;
    }

    /**
     * Rendert das integrierte Chat-Fenster (nur für cooperative Mode)
     */
    const renderChatWindow = () => {
        if (gameMode !== 'cooperative') return null;

        return (
            <div className="card shadow-sm d-flex flex-column" style={{ height: "calc(100vh - 200px)" }}>
                <div className={`card-header ${getGameModeClass()} text-white py-1`}>
                    <h6 className="mb-0">
                        <i className="fas fa-comments me-1"></i>
                        Live-Chat
                        {chatMessages.length > 0 && (
                            <span className="badge bg-light text-dark ms-1 fs-6">{chatMessages.length}</span>
                        )}
                    </h6>
                </div>

                <div className="card-body p-1 flex-grow-1" style={{ overflowY: 'auto' }}>
                    {chatMessages.length === 0 ? (
                        <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                            <div>
                                <i className="fas fa-comments fa-2x mb-2"></i>
                                <p className="fs-6">Noch keine Nachrichten...</p>
                                <small>Starten Sie eine Unterhaltung!</small>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-messages">
                            {/* Präfix '_' zeigt an, dass der Parameter absichtlich nicht verwendet wird */}
                            {chatMessages.map((msg, _index) => (
                                <div key={msg.id} className={`mb-2 ${msg.isHuman ? 'text-end' : 'text-start'}`}>
                                    <div className={`d-inline-block p-2 rounded shadow-sm ${
                                        msg.isHuman
                                            ? 'bg-primary text-white'
                                            : `bg-${msg.color === 'info' ? 'info' : 'light'} text-dark`
                                    }`} style={{ maxWidth: '95%' }}>
                                        <div className="fw-bold small">{msg.playerName}</div>
                                        <div className="small">{msg.message}</div>
                                        <small className="text-muted">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="card-footer p-2 mt-auto">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nachricht eingeben..."
                            value={chatInputMessage}
                            onChange={(e) => setChatInputMessage(sanitizeInput(e.target.value))}
                            onKeyDown={handleChatKeyPress}
                            maxLength={200}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSendMessage}
                            disabled={!chatInputMessage.trim()}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Rendert das integrierte Ranking-Fenster
     * FIX: Kompakte und übersichtliche Darstellung ohne Verzerrungen
     */
    const renderRankingWindow = () => {
        const ranking = createFullRanking();

        return (
            <div className="card shadow-sm d-flex flex-column" style={{ height: "calc(100vh - 200px)" }}>
                <div className={`card-header ${getGameModeClass()} text-white py-1`}>
                    <h6 className="mb-0">
                        <i className="fas fa-trophy me-1"></i>
                        Live-Rangliste
                    </h6>
                </div>

                <div className="card-body p-1 flex-grow-1" style={{ overflowY: 'auto', fontSize: '0.8rem' }}>
                    {ranking.length === 0 ? (
                        <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                            <div>
                                <i className="fas fa-trophy fa-2x mb-2"></i>
                                <p>Keine Ergebnisse...</p>
                                <small>Beantworten Sie Fragen!</small>
                            </div>
                        </div>
                    ) : (
                        <div className="ranking-list">
                            {ranking.map((player, index) => {
                                const position = index + 1;
                                const isCurrentUser = player.isHuman;

                                return (
                                    <div
                                        key={player.id}
                                        className={`mb-1 p-1 border rounded ${
                                            isCurrentUser ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                                        }`}
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        {/* FIX: Kompakte einzeilige Darstellung */}
                                        <div className="d-flex align-items-center justify-content-between">
                                            {/* Position + Name */}
                                            <div className="d-flex align-items-center flex-shrink-0" style={{ width: '45%' }}>
                                                <span className={`badge bg-${getPositionColor(position)} text-dark me-1 px-1`} style={{ fontSize: '0.65rem' }}>
                                                    #{position}
                                                </span>
                                                <i className={`${player.avatar} text-${player.color} me-1`} style={{ fontSize: '0.8rem' }}></i>
                                                <span className="text-truncate fw-bold" style={{ fontSize: '0.7rem' }}>
                                                    {player.name}
                                                    {isCurrentUser && <small className="text-primary"> (Sie)</small>}
                                                </span>
                                            </div>

                                            {/* Statistiken kompakt */}
                                            <div className="d-flex align-items-center justify-content-end" style={{ width: '55%' }}>
                                                <div className="text-center me-2" style={{ minWidth: '25px' }}>
                                                    <div className="fw-bold text-success" style={{ fontSize: '0.7rem' }}>
                                                        {player.correctAnswers || 0}
                                                    </div>
                                                    <div style={{ fontSize: '0.6rem', color: '#6c757d' }}>✓</div>
                                                </div>

                                                <div className="text-center me-2" style={{ minWidth: '30px' }}>
                                                    <div className="fw-bold text-info" style={{ fontSize: '0.7rem' }}>
                                                        {player.averageTime || 0}s
                                                    </div>
                                                    <div style={{ fontSize: '0.6rem', color: '#6c757d' }}>⏱</div>
                                                </div>

                                                <div className="text-center" style={{ minWidth: '45px' }}>
                                                    <span className={`badge ${isCurrentUser ? 'bg-primary' : 'bg-secondary'} px-1`} style={{ fontSize: '0.65rem' }}>
                                                        {player.score || 0}
                                                    </span>
                                                    <div style={{ fontSize: '0.6rem', color: '#6c757d' }}>Pkt</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* FIX: Kompakter Footer */}
                <div className="card-footer p-1 bg-light">
                    <div className="row text-center" style={{ fontSize: '0.7rem' }}>
                        <div className="col-4">
                            <div className="text-muted">Position</div>
                            <div className="fw-bold text-primary">#{ranking.findIndex(p => p.isHuman) + 1}</div>
                        </div>
                        <div className="col-4">
                            <div className="text-muted">Punkte</div>
                            <div className="fw-bold text-warning">{currentScore}</div>
                        </div>
                        <div className="col-4">
                            <div className="text-muted">Richtig</div>
                            <div className="fw-bold text-success">{calculateHumanCorrectAnswers()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Frage-Validierung
    if (!question) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Keine Frage verfügbar. Bitte kehren Sie zur Kategorieauswahl zurück.
                </div>
            </div>
        );
    }

    // Berechne Spalten-Layout basierend auf Spielmodus
    const getColumnLayout = () => {
        if (!multiplayerData?.isMultiplayer) {
            return { main: "col-md-12 col-lg-12", sidebar: null };
        }

        if (gameMode === 'cooperative') {
            return { main: "col-lg-8", chat: "col-lg-2", ranking: "col-lg-2" };
        } else if (gameMode === 'competitive') {
            return { main: "col-lg-10", ranking: "col-lg-2" };
        }

        return { main: "col-md-12 col-lg-12", sidebar: null };
    };

    const layout = getColumnLayout();

    return (
        <div className="container mt-4 mb-4" style={{ minHeight: "calc(100vh - 200px)" }}>
            <div className="row justify-content-center align-items-stretch">
                {/* Hauptfrage-Bereich */}
                <div className={layout.main}>
                    <div className="card shadow d-flex flex-column" style={{ height: "calc(100vh - 200px)" }}>
                        <div className={`card-header ${getGameModeClass()} text-white py-2`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">
                                    <i className={`${getGameModeIcon()} me-2`}></i>
                                    Frage {questionNumber} von {totalQuestions}
                                </h4>
                                <div className="d-flex align-items-center">
                                    {/* Punkte-Anzeige */}
                                    {multiplayerData?.isMultiplayer && (
                                        <span className={`badge bg-light text-dark me-2 p-1 fs-6 ${scoreAnimation ? 'animate-pulse' : ''}`}>
                        <i className="fas fa-star me-1"></i>
                                            {currentScore} Punkte
                      </span>
                                    )}

                                    {/* Zeit-Anzeige */}
                                    {timeLeft !== null && (
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-clock me-1"></i>
                                            <span className={`badge ${timeLeft <= 10 ? 'bg-danger' : 'bg-light'} text-dark fs-6 p-1`}>
                          {timeLeft}s
                        </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-2 flex-grow-1" style={{ overflowY: 'auto' }}>
                            {/* Fortschrittsbalken */}
                            <div className="progress mb-3" style={{ height: '10px' }}>
                                <div
                                    className={`progress-bar ${getGameModeClass()}`}
                                    role="progressbar"
                                    style={{ width: `${getProgressPercentage()}%` }}
                                    aria-valuenow={getProgressPercentage()}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {getProgressPercentage()}%
                                </div>
                            </div>

                            {/* Frage */}
                            <div className="mb-3 p-2">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h4 className="question-text mb-0 fs-3 flex-grow-1">{question.question}</h4>
                                    <button
                                        className="btn btn-sm btn-outline-warning ms-2"
                                        onClick={() => {
                                            if (window.confirm('Möchten Sie diese Frage als fehlerhaft oder unpassend melden?')) {
                                                // Markiere Frage als gemeldet
                                                const reportedQuestions = JSON.parse(localStorage.getItem('reported-questions') || '[]');
                                                if (!reportedQuestions.includes(question.id)) {
                                                    reportedQuestions.push(question.id);
                                                    localStorage.setItem('reported-questions', JSON.stringify(reportedQuestions));
                                                    alert('Frage wurde gemeldet und wird überprüft.');
                                                } else {
                                                    alert('Diese Frage wurde bereits gemeldet.');
                                                }
                                            }
                                        }}
                                        title="Frage melden"
                                    >
                                        <i className="fas fa-flag me-1"></i>
                                        Melden
                                    </button>
                                </div>
                                <div className="d-flex">
                                    {question.category && (
                                        <div className="badge bg-light text-dark p-2 me-2 fs-5">
                                            <i className="fas fa-tag me-2"></i>
                                            Kategorie: {question.category}
                                        </div>
                                    )}
                                    {question.difficulty && (
                                        <div className="badge bg-light text-dark p-2 fs-5">
                                            <i className="fas fa-signal me-2"></i>
                                            Schwierigkeit: {question.difficulty}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Antwortmöglichkeiten */}
                            <div className="answers-container">
                                {question.answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        className={getAnswerButtonClass(index)}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={isAnswered}
                                    >
                                        <div className="d-flex align-items-center p-2">
                      <span className="me-3 fw-bold fs-5">
                        {String.fromCharCode(65 + index)}.
                      </span>
                                            <span className="text-start flex-grow-1 fs-5">{answer}</span>
                                            {showExplanation && index === question.correctAnswer && (
                                                <i className="fas fa-check text-white ms-2 fs-5"></i>
                                            )}
                                            {showExplanation && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                                                <i className="fas fa-times text-white ms-2 fs-5"></i>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Erklärung */}
                            {showExplanation && question.explanation && (
                                <div className="mt-3 p-3 bg-light rounded shadow-sm">
                                    <h6 className="mb-2 fs-5">
                                        <i className="fas fa-lightbulb me-2 text-warning"></i>
                                        Erklärung:
                                    </h6>
                                    <p className="mb-0 fs-5">{question.explanation}</p>
                                </div>
                            )}

                            {/* Timeout-Meldung */}
                            {showExplanation && selectedAnswer === null && (
                                <div className="mt-3 p-3 bg-warning rounded shadow-sm">
                                    <h6 className="mb-2 fs-5">
                                        <i className="fas fa-clock me-2"></i>
                                        Zeit abgelaufen!
                                    </h6>
                                    <p className="mb-0 fs-5">
                                        Die Zeit ist abgelaufen. Die richtige Antwort war: <strong>{question.answers[question.correctAnswer]}</strong>
                                    </p>
                                </div>
                            )}
                            {showExplanation && selectedAnswer !== null && selectedAnswer !== question.correctAnswer && (
                                <div className="mt-3 p-3 bg-light rounded shadow-sm">
                                    <h6 className="mb-2 fs-5">
                                        <i className="fas fa-check me-2 text-success"></i>
                                        Richtige Antwort:
                                    </h6>
                                    <p className="mb-0 fs-5">
                                        {question.answers[question.correctAnswer]}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="card-footer p-3 mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    className="btn btn-secondary py-2 px-3"
                                    onClick={onBackToCategorySelection}
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Andere Kategorie wählen
                                </button>

                                <div className="d-flex align-items-center">
                                    <i className="fas fa-user-circle me-2 fs-5"></i>
                                    <span className="fs-5">{user.name}</span>
                                    {gameMode !== 'single-player' && (
                                        <span className="badge bg-secondary ms-2 p-2 fs-6">
                      {gameMode === 'cooperative' ? 'Kooperativ' : 'Kompetitiv'}
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat-Bereich (nur für cooperative Mode) */}
                {layout.chat && (
                    <div className={layout.chat}>
                        {renderChatWindow()}
                    </div>
                )}

                {/* Ranking-Bereich (für beide Multiplayer-Modi) */}
                {layout.ranking && (
                    <div className={layout.ranking}>
                        {renderRankingWindow()}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizQuestion;