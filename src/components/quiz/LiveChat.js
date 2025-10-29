/**
 * @description Live-Chat für Multiplayer-Quiz-Modi mit Nachrichtenverlauf
 */

/**
 * LiveChat - Echtzeit-Chat für Multiplayer-Modi
 *
 * Ein vollständiger Live-Chat für Multiplayer-Quiz-Modi mit persistenten Nachrichten
 * über alle Fragen hinweg.
 * @namespace quiz_Livechat
 * @author Projektteam IU Community Quiz
 * @version 1.1.0
 * @since 2025-07-15
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * LiveChat - Chat mit Nachrichtenverlauf und Player-Identifikation
 *
 * Ermöglicht Echtzeit-Kommunikation zwischen Spielern mit
 * farbcodierten Nachrichten und Spieler-Icons.
 *
 * @function LiveChat
 * @memberOf quiz_Livechat
 * @param {Object} props - Component properties
 * @param {Array} props.messages - Alle Chat-Nachrichten
 * @param {Object} props.user - Aktueller Benutzer
 * @param {Function} props.onSendMessage - Callback für neue Nachrichten
 * @param {Array} props.players - Liste aller Spieler
 * @param {string} props.gameMode - Aktueller Spielmodus
 * @returns {React.ReactElement} LiveChat-Komponente
 */
function LiveChat({ messages, user, onSendMessage, players, gameMode }) {
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    /**
     * Scrollt automatisch zum Ende des Chats
     * @memberOf quiz_Livechat
     */
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /**
     * Behandelt die Eingabe einer Chat-Nachricht
     * @memberOf quiz_Livechat
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
     * @memberOf quiz_Livechat
     * @param {Event} e - Event-Objekt
     */
    const handleInputChange = (e) => {
        setChatInput(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    /**
     * Gibt die Farbe für einen Spieler zurück
     * @memberOf quiz_Livechat
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
     * @memberOf quiz_Livechat
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
     * @memberOf quiz_Livechat
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

            <div className="card-body p-3" style={{ height: '400px', overflowY: 'auto' }}>
                {messages.length === 0 ? (
                    <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                        <div>
                            <i className="fas fa-comments fa-3x mb-3"></i>
                            <p className="fs-5">Noch keine Nachrichten...</p>
                            <p className="fs-6">Schreiben Sie die erste Nachricht!</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <div key={msg.id || index} className={`mb-3 ${msg.isHuman ? 'text-end' : 'text-start'}`}>
                                <div className={`d-inline-block p-3 rounded ${msg.isHuman ? 'bg-primary text-white' : 'bg-light'}`}
                                     style={{ maxWidth: '95%' }}>
                                    <div className="d-flex align-items-center mb-2">
                                        <i className={`${getPlayerIcon(msg)} me-2 text-${msg.isHuman ? 'white' : getPlayerColor(msg)}`}></i>
                                        <strong className="fs-6">{msg.playerName}</strong>
                                        <small className={`ms-2 ${msg.isHuman ? 'text-white-50' : 'text-muted'}`}>
                                            {formatTime(msg.timestamp)}
                                        </small>
                                    </div>
                                    <div className="fs-6">{msg.message}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </>
                )}
            </div>

            <div className="card-footer p-3">
                <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control fs-6"
                            placeholder="Nachricht eingeben..."
                            value={chatInput}
                            onChange={handleInputChange}
                            maxLength={200}
                        />
                        <button
                            className={`btn ${gameMode === 'cooperative' ? 'btn-success' : 'btn-warning'} btn-lg`}
                            type="submit"
                            disabled={!chatInput.trim()}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>

                {isTyping && (
                    <div className="text-muted mt-2 fs-6">
                        <i className="fas fa-keyboard me-2"></i>
                        Eingabe...
                    </div>
                )}
            </div>
        </div>
    );
}

export default LiveChat;