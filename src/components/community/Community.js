/**
 * Community-Komponente (Demo-Prototyp)
 *
 * Diese Komponente stellt eine einfache Community-Seite für Austausch
 * und Kollaboration zwischen Studierenden dar. 
 * 
 * WICHTIG: Dies ist eine Demo-Implementation mit Mock-Daten.
 * In einer produktiven Umgebung würden hier echte API-Aufrufe erfolgen.
 *
 * @author System
 * @version 1.0.0
 * @since 2025-07-15
 */

import React, { useState } from 'react';

/**
 * Community-Komponente
 *
 * Zeigt eine einfache Community-Übersicht mit Demo-Themen
 * und simulierten Diskussionen für Demozwecke.
 *
 * @param {Object} props - Komponenten-Properties
 * @param {Object} props.user - Aktueller Benutzer
 * @returns {JSX.Element} Die gerenderte Community-Komponente
 */
function Community({ user }) {
    // Demo-Themen (in echter App aus API)
    const [topics] = useState([
        {
            id: 1,
            title: 'Hilfe bei Java-Programmierung',
            category: 'Informatik',
            author: 'Max Mustermann',
            posts: 15,
            lastActivity: '2025-07-15T10:30:00Z'
        },
        {
            id: 2,
            title: 'Mathe-Nachhilfe Lineare Algebra',
            category: 'Mathematik',
            author: 'Lisa Schmidt',
            posts: 8,
            lastActivity: '2025-07-15T09:15:00Z'
        },
        {
            id: 3,
            title: 'Projektmanagement-Erfahrungen',
            category: 'Wirtschaft',
            author: 'Tom Weber',
            posts: 23,
            lastActivity: '2025-07-14T16:45:00Z'
        },
        {
            id: 4,
            title: 'Lerngruppe Psychologie',
            category: 'Psychologie',
            author: 'Sarah Johnson',
            posts: 12,
            lastActivity: '2025-07-14T14:20:00Z'
        }
    ]);

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [newPost, setNewPost] = useState('');

    /**
     * Formatiert das Datum für die Anzeige
     * @param {string} dateString - ISO-Datum-String
     * @returns {string} Formatiertes Datum
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /**
     * Behandelt das Öffnen eines Themas
     * @param {Object} topic - Ausgewähltes Thema
     */
    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    /**
     * Behandelt das Hinzufügen eines neuen Posts (Demo)
     */
    const handleAddPost = () => {
        if (newPost.trim()) {
            alert(`Demo: Post "${newPost}" wurde hinzugefügt!`);
            setNewPost('');
        }
    };

    /**
     * Schließt die Themen-Detailansicht
     */
    const handleBackToOverview = () => {
        setSelectedTopic(null);
        setNewPost('');
    };

    // Detail-Ansicht für ein Thema
    if (selectedTopic) {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <button 
                                        className="btn btn-link p-0 text-decoration-none"
                                        onClick={handleBackToOverview}
                                    >
                                        <i className="fas fa-users me-1"></i>
                                        Community
                                    </button>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {selectedTopic.title}
                                </li>
                            </ol>
                        </nav>

                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0">{selectedTopic.title}</h3>
                                    <span className="badge bg-primary">{selectedTopic.category}</span>
                                </div>
                                <small className="text-muted">
                                    von {selectedTopic.author} • {selectedTopic.posts} Beiträge
                                </small>
                            </div>
                            <div className="card-body">
                                {/* Demo-Posts */}
                                <div className="mb-4">
                                    <div className="border rounded p-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <strong>{selectedTopic.author}</strong>
                                            <small className="text-muted">{formatDate(selectedTopic.lastActivity)}</small>
                                        </div>
                                        <p className="mb-0">
                                            Willkommen in diesem Thema! Hier können wir uns über {selectedTopic.title} austauschen. 
                                            Dies ist eine Demo-Nachricht um zu zeigen, wie die Community funktioniert.
                                        </p>
                                    </div>

                                    <div className="border rounded p-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <strong>{user.name}</strong>
                                            <small className="text-muted">Jetzt</small>
                                        </div>
                                        <p className="mb-0">
                                            <em>Hier würden Ihre Beiträge erscheinen...</em>
                                        </p>
                                    </div>
                                </div>

                                {/* Neuer Post */}
                                <div className="card bg-light">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            <i className="fas fa-plus me-2"></i>
                                            Neuen Beitrag hinzufügen
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Schreiben Sie Ihren Beitrag hier..."
                                                value={newPost}
                                                onChange={(e) => setNewPost(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={handleBackToOverview}
                                            >
                                                <i className="fas fa-arrow-left me-2"></i>
                                                Zurück zur Übersicht
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleAddPost}
                                                disabled={!newPost.trim()}
                                            >
                                                <i className="fas fa-paper-plane me-2"></i>
                                                Beitrag senden (Demo)
                                            </button>
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

    // Haupt-Übersicht
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="display-6">
                            <i className="fas fa-users me-3"></i>
                            Community
                        </h1>
                        <span className="badge bg-info">Demo-Modus</span>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                <strong>Demo-Prototyp:</strong> Diese Community-Seite zeigt die grundlegende Funktionalität 
                                für Austausch und Kollaboration zwischen Studierenden. In der finalen Version würden hier 
                                echte Diskussionen, Benachrichtigungen und erweiterte Funktionen verfügbar sein.
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-comments me-2"></i>
                                        Aktuelle Diskussionen
                                    </h5>
                                </div>
                                <div className="card-body">
                                    {topics.map(topic => (
                                        <div 
                                            key={topic.id} 
                                            className="border rounded p-3 mb-3 hover-shadow"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleTopicClick(topic)}
                                        >
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">{topic.title}</h6>
                                                    <p className="text-muted mb-2">
                                                        von {topic.author} • {topic.posts} Beiträge
                                                    </p>
                                                    <small className="text-muted">
                                                        Letzte Aktivität: {formatDate(topic.lastActivity)}
                                                    </small>
                                                </div>
                                                <div className="ms-3">
                                                    <span className="badge bg-secondary">{topic.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-chart-bar me-2"></i>
                                        Community-Statistiken
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col-6">
                                            <div className="border-end">
                                                <h4 className="text-primary mb-1">
                                                    {topics.length}
                                                </h4>
                                                <small className="text-muted">Themen</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="text-success mb-1">
                                                {topics.reduce((sum, topic) => sum + topic.posts, 0)}
                                            </h4>
                                            <small className="text-muted">Beiträge</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-lightbulb me-2"></i>
                                        Geplante Features
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <i className="fas fa-check text-success me-2"></i>
                                            Themen-Übersicht
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-clock text-warning me-2"></i>
                                            Echte Diskussionen
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-clock text-warning me-2"></i>
                                            Benachrichtigungen
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-clock text-warning me-2"></i>
                                            Dateien teilen
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-clock text-warning me-2"></i>
                                            Bewertungssystem
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Community;
