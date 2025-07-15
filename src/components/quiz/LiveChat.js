/**
 * LiveChat-Komponente
 *
 * Ein vollständiger Live-Chat für Multiplayer-Quiz-Modi mit persistenten Nachrichten
 * über alle Fragen hinweg.
 *
 * @author IU Quiz Community
 * @version 1.1.0
 * @since 2025-07-15
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * LiveChat-Komponente
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Array} props.messages - Alle Chat-Nachrichten
 * @param {Object} props.user - Aktueller Benutzer
 * @param {Function} props.onSendMessage - Callback für neue Nachrichten
 * @param {Array} props.players - Liste aller Spieler
 * @param {string} props.gameMode - Aktueller Spielmodus
 * @returns {JSX.Element} LiveChat-Komponente
 */
function LiveChat({ messages, user, onSendMessage, players, gameMode }) {
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    /**
     * Scrollt automatisch zum Ende des Chats
     */
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /**
     * Behandelt die Eingabe einer Chat-Nachricht
     * @param {Event} e - Event-Objekt
     */
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chatInput.trim() && onSendMessage) {
            const message = {
                id: Date.now(),
                playerId: user.id || 'human_player',
                playerName: user.name,
                message: chatInput.trim(),
                timestamp: new Date().toISOString(),
                isHuman: true,
                color: 'primary'
            };

            onSendMessage(message);
            setChatInput('');
            setIsTyping(false);
        }
    };

    /**
     * Behandelt Eingabe-Änderungen
     * @param {Event} e - Event-Objekt
     */
    const handleInputChange = (e) => {
        setChatInput(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    /**
     * Gibt die Farbe für einen Spieler zurück
     * @param {Object} message - Nachricht
     * @returns {string} CSS-Farben-Klasse
     */
    const getPlayerColor = (message) => {
        if (message.isHuman) return 'primary';
        const player = players.find(p => p.id === message.playerId);
        return player?.color || 'secondary';
    };

    /**
     * Gibt das Icon für einen Spieler zurück
     * @param {Object} message - Nachricht
     * @returns {string} Icon-Klasse
     */
    const getPlayerIcon = (message) => {
        if (message.isHuman) return 'fas fa-user';
        const player = players.find(p => p.id === message.playerId);
        return player?.avatar || 'fas fa-robot';
    };

    /**
     * Formatiert die Zeitstempel
     * @param {string} timestamp - ISO-Zeitstempel
     * @returns {string} Formatierte Zeit
     */
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="card h-100">
            <div className={`card-header ${gameMode === 'cooperative' ? 'bg-success' : 'bg-warning'} text-white`}>
                <h6 className="mb-0">
                    <i className="fas fa-comments me-2"></i>
                    Live-Chat ({messages.length})
                </h6>
            </div>

            <div className="card-body p-2" style={{ height: '400px', overflowY: 'auto' }}>
                {messages.length === 0 ? (
                    <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                        <div>
                            <i className="fas fa-comments fa-2x mb-2"></i>
                            <p>Noch keine Nachrichten...</p>
                            <small>Schreiben Sie die erste Nachricht!</small>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <div key={msg.id || index} className={`mb-2 ${msg.isHuman ? 'text-end' : 'text-start'}`}>
                                <div className={`d-inline-block p-2 rounded ${msg.isHuman ? 'bg-primary text-white' : 'bg-light'}`}
                                     style={{ maxWidth: '80%' }}>
                                    <div className="d-flex align-items-center mb-1">
                                        <i className={`${getPlayerIcon(msg)} me-1 text-${msg.isHuman ? 'white' : getPlayerColor(msg)}`}></i>
                                        <strong className="small">{msg.playerName}</strong>
                                        <small className={`ms-2 ${msg.isHuman ? 'text-white-50' : 'text-muted'}`}>
                                            {formatTime(msg.timestamp)}
                                        </small>
                                    </div>
                                    <div className="small">{msg.message}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </>
                )}
            </div>

            <div className="card-footer p-2">
                <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nachricht eingeben..."
                            value={chatInput}
                            onChange={handleInputChange}
                            maxLength={200}
                        />
                        <button
                            className={`btn ${gameMode === 'cooperative' ? 'btn-success' : 'btn-warning'}`}
                            type="submit"
                            disabled={!chatInput.trim()}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>

                {isTyping && (
                    <small className="text-muted">
                        <i className="fas fa-keyboard me-1"></i>
                        Eingabe...
                    </small>
                )}
            </div>
        </div>
    );
}

export default LiveChat;