/**
 * Zentrale Quiz-Steuerung mit verschiedenen Spielmodi und Multiplayer-Unterstützung.
 * @namespace quiz_Main
 * @author Projektteam IU Community Quiz
 * @version 1.8.1
 */

import React, { useState, useEffect, useCallback } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import QuizCategorySelector from './QuizCategorySelector';
import dataManager from '../../data/dataManager';
import simulatedPlayersService from '../../services/SimulatedPlayersService';

/**
 * QuizMain - Zentrale Quiz-Steuerung mit Multiplayer-Unterstützung
 *
 * Diese Komponente verwaltet den gesamten Quiz-Ablauf und stellt verschiedene
 * Spielmodi mit umfangreichen Konfigurationsmöglichkeiten bereit.
 *
 * Hauptfunktionen:
 * - Drei Spielmodi: Kooperativ, Kompetitiv und Einzelspieler
 * - Konfigurierbare Fragenanzahl (1-20 Fragen)
 * - Dynamische Kategorienauswahl aus verfügbaren Lernkarten
 * - Integration mit dem zentralen DataManager für konsistente Datenverwaltung
 * - Simulation von Mitspielern mit realistischem Verhalten
 * - Live-Chat für kooperativen Modus mit persistenten Nachrichten
 * - Punktesystem für alle Spieler mit Echtzeitaktualisierung
 * - Timer-basierte Fragenanzeige mit korrekter Initialisierung
 * - Responsive Benutzeroberfläche für alle Endgeräte
 *
 * Spielmodi:
 * - cooperative: Kooperatives Lernen mit anderen Studierenden und Live-Chat
 * - competitive: Wettbewerbsmodus mit Zeitdruck ohne Chat
 * - single-player: Individuelles Lernen ohne Zeitdruck
 *
 * @function QuizMain
 * @memberOf quiz_Main
 * @param {Object} props - Component properties
 * @param {Object} props.user - Benutzerdaten
 * @returns {React.ReactElement} Die gerenderte QuizMain-Komponente
 * @example
 * <QuizMain user={currentUser} />
 */
function QuizMain({ user }) {
    const [currentStep, setCurrentStep] = useState('mode');
    const [gameMode, setGameMode] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questionCount, setQuestionCount] = useState(10);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [multiplayerData, setMultiplayerData] = useState({
        players: [],
        currentPlayerAnswers: [],
        isMultiplayer: false
    });
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const categories = dataManager.getAllCategories();
        const cards = dataManager.getAllCards();
        if (categories.length === 0 || cards.length === 0) {
            dataManager.reloadMockData();
        }
        setAvailableCategories(dataManager.getCategoriesForQuiz());
    }, []);

    const calculateEstimatedTime = () => {
        let timePerQuestion = 1;
        switch (gameMode) {
            case 'single-player': timePerQuestion = 2; break;
            case 'cooperative': timePerQuestion = 1; break;
            case 'competitive': timePerQuestion = 0.5; break;
            default: timePerQuestion = 1; break;
        }
        return Math.round(questionCount * timePerQuestion);
    };

    const startModeSelection = (mode) => {
        setGameMode(mode);
        setMultiplayerData({
            ...multiplayerData,
            isMultiplayer: mode !== 'single-player'
        });
        setCurrentStep('question-count');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const allQuestions = dataManager.getQuestionsForQuiz().filter(q => q.category === category.name);
        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, questionCount);
        setQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowResults(false);
        if (multiplayerData.isMultiplayer) {
            const players = simulatedPlayersService.initializePlayers(gameMode, category.name, 3);
            setMultiplayerData({
                ...multiplayerData,
                players: players
            });
            if (gameMode === 'cooperative') {
                generateWelcomeMessages(players);
            }
        }
        setCurrentStep('quiz');
    };

    const generateWelcomeMessages = (players) => {
        const welcomeMessages = [{ id: Date.now(), playerId: 'system', playerName: 'System', message: 'Willkommen im kooperativen Quiz!', timestamp: new Date().toISOString(), isHuman: false, color: 'info' }];
        players.forEach((player, index) => {
            setTimeout(() => {
                const greetings = ['Hallo zusammen!', 'Hey! Freue mich aufs Lernen.', 'Hi! Lasst uns unser Bestes geben!'];
                const greeting = greetings[Math.floor(Math.random() * greetings.length)];
                setChatMessages(prev => [...prev, { id: Date.now() + index, playerId: player.id, playerName: player.name, message: greeting, timestamp: new Date().toISOString(), isHuman: false, color: player.color }]);
            }, (index + 1) * 1000);
        });
        setChatMessages(welcomeMessages);
    };

    const handleSendChatMessage = (message) => {
        if (gameMode !== 'cooperative') return;
        setChatMessages(prev => [...prev, message]);
        if (Math.random() < 0.3 && multiplayerData.players.length > 0) {
            setTimeout(() => {
                const randomPlayer = multiplayerData.players[Math.floor(Math.random() * multiplayerData.players.length)];
                const responses = ['Gute Frage!', 'Stimme zu!', 'Interessant...', 'Guter Punkt!'];
                const response = responses[Math.floor(Math.random() * responses.length)];
                setChatMessages(prev => [...prev, { id: Date.now() + Math.random(), playerId: randomPlayer.id, playerName: randomPlayer.name, message: response, timestamp: new Date().toISOString(), isHuman: false, color: randomPlayer.color }]);
            }, 1000 + Math.random() * 2000);
        }
    };

    const resetQuizState = () => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowResults(false);
        setIsLoading(false);
        setChatMessages([]);
    };

    const handleBackToModeSelection = () => {
        setCurrentStep('mode');
        setGameMode(null);
        setSelectedCategory(null);
        setQuestionCount(10);
        resetQuizState();
        simulatedPlayersService.reset();
        setMultiplayerData({ players: [], currentPlayerAnswers: [], isMultiplayer: false });
    };

    const handleBackToCategorySelection = () => {
        setCurrentStep('category');
        setSelectedCategory(null);
        resetQuizState();
    };

    const handleAnswer = useCallback(async (answerData) => {
        setAnswers(prev => [...prev, answerData]);
        if (multiplayerData.isMultiplayer) {
            const playerAnswers = await simulatedPlayersService.simulatePlayerAnswers(questions[currentQuestionIndex], currentQuestionIndex);
            setMultiplayerData(prev => ({
                ...prev,
                currentPlayerAnswers: playerAnswers
            }));
        }
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setShowResults(true);
            }
        }, 3000);
    }, [questions, currentQuestionIndex, multiplayerData.isMultiplayer]);

    const getGameModeClass = () => {
        switch (gameMode) {
            case 'cooperative': return 'bg-success';
            case 'competitive': return 'bg-warning';
            default: return 'bg-primary';
        }
    };

    const getGameModeIcon = () => {
        switch (gameMode) {
            case 'cooperative': return 'fas fa-users';
            case 'competitive': return 'fas fa-trophy';
            default: return 'fas fa-user';
        }
    };

    const handleRestart = () => handleBackToModeSelection();
    const handleRestartSameCategory = () => {
        if (selectedCategory) handleCategorySelect(selectedCategory);
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Laden...</span>
                </div>
            </div>
        );
    }

    // Results State
    if (showResults) {
        return (
            <QuizResults
                questions={questions}
                answers={answers}
                gameMode={gameMode}
                category={selectedCategory}
                user={user}
                onRestart={handleRestart}
                onRestartSameCategory={handleRestartSameCategory}
                onBackToCategorySelection={handleBackToCategorySelection}
                multiplayerData={multiplayerData}
            />
        );
    }

    // Quiz State
    if (currentStep === 'quiz' && questions.length > 0) {
        return (
            <QuizQuestion
                question={questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                gameMode={gameMode}
                onAnswer={handleAnswer}
                onBackToCategorySelection={handleBackToCategorySelection}
                user={user}
                multiplayerData={multiplayerData}
                chatMessages={chatMessages}
                onSendChatMessage={handleSendChatMessage}
                allAnswers={answers}
            />
        );
    }

    // Category Selection State
    if (currentStep === 'category') {
        return (
            <QuizCategorySelector
                categories={availableCategories}
                onCategorySelect={handleCategorySelect}
                onBack={() => setCurrentStep('question-count')}
                gameMode={gameMode}
                questionCount={questionCount}
                user={user}
            />
        );
    }

    // Question Count Selection State
    if (currentStep === 'question-count') {
        return (
            <div className="container mt-4 mb-4">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="card shadow-lg">
                            <div className={`card-header ${getGameModeClass()} text-white py-2`}>
                                <h5 className="mb-0 text-center">
                                    <i className={`${getGameModeIcon()} me-2`}></i>
                                    Fragenanzahl auswählen
                                </h5>
                            </div>
                            <div className="card-body p-3 p-lg-4">
                                <div className="text-center mb-4">
                                    <h3 className="mb-2">
                                        <i className={`${getGameModeIcon()} me-2`}></i>
                                        {gameMode === 'cooperative' ? 'Kooperativ' : gameMode === 'competitive' ? 'Kompetitiv' : 'Single Player'} Modus
                                    </h3>
                                    <p className="lead mb-0">Wählen Sie die Anzahl der Fragen für Ihr Quiz.</p>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-8 mx-auto">
                                        <div className="mb-4">
                                            <label htmlFor="questionCountRange" className="form-label fw-bold">Anzahl der Fragen: {questionCount}</label>
                                            <input type="range" className="form-range" id="questionCountRange" min="1" max="20" value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value))} style={{ height: '1rem' }}/>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted">1</span>
                                                <span className="text-muted">20</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="fw-bold mb-3">Schnellauswahl:</p>
                                            <div className="btn-group w-100" role="group">
                                                <button type="button" className={`btn ${questionCount === 5 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setQuestionCount(5)}>5</button>
                                                <button type="button" className={`btn ${questionCount === 10 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setQuestionCount(10)}>10</button>
                                                <button type="button" className={`btn ${questionCount === 15 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setQuestionCount(15)}>15</button>
                                                <button type="button" className={`btn ${questionCount === 20 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setQuestionCount(20)}>20</button>
                                            </div>
                                        </div>

                                        <div className="alert alert-info">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-clock fa-2x me-3"></i>
                                                <div>Geschätzte Dauer: <strong>{calculateEstimatedTime()} Minuten</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-light p-3">
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-secondary" onClick={handleBackToModeSelection}>
                                        <i className="fas fa-arrow-left me-2"></i>Zurück
                                    </button>
                                    <button className={`btn ${getGameModeClass().replace('bg-', 'btn-')}`} onClick={() => setCurrentStep('category')}>
                                        Kategorie wählen<i className="fas fa-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default: Mode Selection State
    return (
        <div className="container mt-4 mb-4">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card shadow-lg" style={{ minHeight: '500px' }}>
                        <div className="card-header bg-primary text-white py-2">
                            <h5 className="mb-0 text-center">
                                <i className="fas fa-play-circle me-2"></i>
                                Spielmodus auswählen
                            </h5>
                        </div>
                        <div className="card-body p-3 p-lg-4 d-flex flex-column" style={{ minHeight: '450px' }}>
                            <div className="row g-3 flex-grow-1">
                                <div className="col-md-4 d-flex">
                                    <div className="card border-primary w-100 d-flex flex-column">
                                        <div className="card-body text-center p-3 d-flex flex-column flex-grow-1">
                                            <div className="mb-3">
                                                <i className="fas fa-user fa-3x text-primary"></i>
                                            </div>
                                            <h4 className="card-title">Single Player</h4>
                                            <div className="flex-grow-1 d-flex align-items-center">
                                                <p className="card-text small text-center w-100 mb-0">
                                                    Lernen Sie in Ihrem eigenen Tempo ohne Zeitdruck.
                                                </p>
                                            </div>
                                            <div className="my-3">
                                                <span className="badge bg-primary me-2">Kein Zeitlimit</span>
                                                <span className="badge bg-success">Erklärungen</span>
                                            </div>
                                            <button className="btn btn-primary w-100" onClick={() => startModeSelection('single-player')}>
                                                <i className="fas fa-play me-2"></i>Starten
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="card border-success w-100 d-flex flex-column">
                                        <div className="card-body text-center p-3 d-flex flex-column flex-grow-1">
                                            <div className="mb-3">
                                                <i className="fas fa-users fa-3x text-success"></i>
                                            </div>
                                            <h4 className="card-title">Kooperativ</h4>
                                            <div className="flex-grow-1 d-flex align-items-center">
                                                <p className="card-text small text-center w-100 mb-0">
                                                    Lernen Sie gemeinsam mit anderen Studierenden.
                                                </p>
                                            </div>
                                            <div className="my-3">
                                                <span className="badge bg-success me-2">60s pro Frage</span>
                                                <span className="badge bg-info">Live-Chat</span>
                                            </div>
                                            <button className="btn btn-success w-100" onClick={() => startModeSelection('cooperative')}>
                                                <i className="fas fa-play me-2"></i>Starten
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="card border-warning w-100 d-flex flex-column">
                                        <div className="card-body text-center p-3 d-flex flex-column flex-grow-1">
                                            <div className="mb-3">
                                                <i className="fas fa-trophy fa-3x text-warning"></i>
                                            </div>
                                            <h4 className="card-title">Kompetitiv</h4>
                                            <div className="flex-grow-1 d-flex align-items-center">
                                                <p className="card-text small text-center w-100 mb-0">
                                                    Treten Sie gegen andere an. Schnelligkeit zählt.
                                                </p>
                                            </div>
                                            <div className="my-3">
                                                <span className="badge bg-warning text-dark me-2">30s pro Frage</span>
                                                <span className="badge bg-danger">Rangliste</span>
                                            </div>
                                            <button className="btn btn-warning w-100" onClick={() => startModeSelection('competitive')}>
                                                <i className="fas fa-play me-2"></i>Starten
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizMain;