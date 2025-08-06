/**
 * QuizCategorySelector-Komponente - Kategorieauswahl für Quiz
 *
 * Diese Komponente ermöglicht es Benutzern, eine Kategorie für ihr Quiz auszuwählen.
 * Sie zeigt verfügbare Kategorien mit Anzahl der Fragen und Beschreibungen an.
 *
 * Features:
 * - Anzeige aller verfügbaren Kategorien
 * - Fragenanzahl pro Kategorie
 * - Responsive Karten-Design
 * - Suchfunktion für Kategorien
 * - Rückkehr zur Modus-Auswahl
 * - Unterstützung für alle Spielmodi
 *
 * UPDATE: Erweiterte Anzeige mit Fragenanzahl
 * UPDATE: Suchfunktion für Kategorien
 * UPDATE: Spielmodus-spezifische Anzeige
 *
 * @author Projektteam IU Community Quiz
 * @version 1.3.0
 * @since 2025-07-15
 */

import React, { useState, useMemo } from 'react';
import dataManager from '../../data/dataManager';

/**
 * QuizCategorySelector-Komponente
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Array} props.categories - Verfügbare Kategorien
 * @param {Function} props.onCategorySelect - Callback für Kategorieauswahl
 * @param {Function} props.onBack - Callback für Rückkehr
 * @param {string} props.gameMode - Aktueller Spielmodus
 * @param {number} props.questionCount - Gewünschte Fragenanzahl
 * @param {Object} props.user - Benutzerdaten
 * @returns {JSX.Element} Die gerenderte QuizCategorySelector-Komponente
 */
function QuizCategorySelector({
                                  categories,
                                  onCategorySelect,
                                  onBack,
                                  gameMode,
                                  questionCount,
                                  user
                              }) {
    const [searchTerm, setSearchTerm] = useState('');

    const categoriesWithQuestionCount = useMemo(() => {
        const allQuestions = dataManager.getQuestionsForQuiz();
        return categories.map(category => {
            const questionsInCategory = allQuestions.filter(q => q.category === category.name);
            return {
                ...category,
                questionCount: questionsInCategory.length,
                hasEnoughQuestions: questionsInCategory.length >= questionCount
            };
        });
    }, [categories, questionCount]);

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categoriesWithQuestionCount;
        return categoriesWithQuestionCount.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [categoriesWithQuestionCount, searchTerm]);

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

    const getGameModeName = () => {
        switch (gameMode) {
            case 'cooperative': return 'Kooperativ';
            case 'competitive': return 'Kompetitiv';
            default: return 'Single Player';
        }
    };

    const handleCategorySelect = (category) => {
        if (category.hasEnoughQuestions) {
            onCategorySelect(category);
        }
    };

    function getEstimatedTime() {
        let timePerQuestion = 1;
        switch (gameMode) {
            case 'single-player': timePerQuestion = 2; break;
            case 'cooperative': timePerQuestion = 1; break;
            case 'competitive': timePerQuestion = 0.5; break;
        }
        const totalMinutes = Math.round(questionCount * timePerQuestion);
        return `${totalMinutes} Min`;
    }

    return (
        <div className="container mt-4 mb-4">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card shadow-lg">
                        <div className={`card-header ${getGameModeClass()} text-white py-2`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className={`${getGameModeIcon()} me-2`}></i>
                                    Kategorie auswählen
                                </h5>
                                <span className="badge bg-light text-dark p-2">
                                    {getGameModeName()} • {questionCount} Fragen
                                </span>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <div className="row mb-3">
                                <div className="col-md-8 mx-auto">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Kategorie suchen..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {filteredCategories.length === 0 ? (
                                <div className="text-center text-muted p-4">
                                    <i className="fas fa-search fa-3x mb-3"></i>
                                    <h5>Keine Kategorien gefunden</h5>
                                    <p>Versuchen Sie einen anderen Suchbegriff.</p>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {filteredCategories.map((category) => (
                                        <div key={category.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                                            <div
                                                className={`card w-100 category-card ${category.hasEnoughQuestions ? 'border-primary' : 'border-light'}`}
                                                style={{ cursor: category.hasEnoughQuestions ? 'pointer' : 'not-allowed', opacity: category.hasEnoughQuestions ? 1 : 0.7 }}
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                <div className="card-body p-2 text-center d-flex flex-column">
                                                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                                        <i className={`fas fa-${category.icon} fa-2x mb-2 text-${category.color}`}></i>
                                                        <h6 className="card-title small mb-1">{category.name}</h6>
                                                        <p className="card-text small text-muted" style={{fontSize: '0.8em'}}>{category.description}</p>
                                                    </div>
                                                    <div className={`card-footer p-1 mt-auto ${category.hasEnoughQuestions ? 'bg-primary text-white' : ''}`}>
                                                        <small>{category.hasEnoughQuestions ? 'Auswählen' : `${category.questionCount} / ${questionCount} Fragen`}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="card-footer bg-light p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-secondary" onClick={onBack}>
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Zurück
                                </button>
                                <div className="text-muted">
                                    <small>{filteredCategories.filter(c => c.hasEnoughQuestions).length} von {categories.length} Kategorien wählbar</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .category-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                    transition: all 0.2s ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default QuizCategorySelector;