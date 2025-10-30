/**
 * @description Lobby-Komponente für kooperativen Multiplayer-Modus
 */

/**
 * CooperativeLobby - Simulierte Lobby für kooperativen Modus
 *
 * Diese Komponente zeigt eine Lobby, in der sich Spieler sammeln.
 * Für Demozwecke, zeigt nur simulierte Spieler.
 * @namespace quiz_CoopLobby
 * @author Projektteam IU Community Quiz
 * @version 1.0.0
 * @since 2025-07-15
 */
import React, { useState, useEffect } from 'react';

/**
 * CooperativeLobby - Wartezimmer für Multiplayer-Spiele
 *
 * Zeigt eine Lobby mit Spielern und Countdown bis zum Spielstart.
 *
 * @function CooperativeLobby
 * @memberOf quiz_CoopLobby
 * @param {Object} props - Component properties
 * @param {Array} props.players - Spieler-Liste
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onStartGame - Callback zum Spielstart
 * @param {Function} props.onBack - Callback für Zurück zur Kategorieauswahl
 * @returns {React.ReactElement} Die gerenderte CooperativeLobby-Komponente
 */
function CooperativeLobby({ players, user, onStartGame, onBack }) {
  const [countdown, setCountdown] = useState(5);
  const [isReady, setIsReady] = useState(false);

  /**
   * Countdown-Timer für automatischen Spielstart
   * @memberOf quiz_CoopLobby
   */
  useEffect(() => {
    if (players.length >= 2) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsReady(true);
            setTimeout(() => onStartGame(), 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [players.length, onStartGame]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-success text-white">
              <div className="d-flex align-items-center">
                {onBack && (
                  <button 
                    className="btn btn-sm btn-light me-3"
                    onClick={onBack}
                    disabled={isReady}
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                )}
                <h3 className="mb-0 flex-grow-1">
                  <i className="fas fa-users me-2"></i>
                  Kooperative Lobby
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <h5>Warten auf Mitspieler...</h5>
                <p className="text-muted">
                  Spieler werden der Lobby beitreten und das Spiel startet automatisch.
                </p>
              </div>

              {/* Spieler-Liste */}
              <div className="row">
                {/* Aktueller Benutzer */}
                <div className="col-md-6 mb-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-user-check fa-2x mb-2"></i>
                      <h6>{user.name}</h6>
                      <small>Sie (Bereit)</small>
                    </div>
                  </div>
                </div>

                {/* Simulierte Spieler */}
                {players.map((player, _) => (
                  <div key={player.id} className="col-md-6 mb-3">
                    <div className={`card bg-${player.color} text-white`}>
                      <div className="card-body text-center">
                        <i className={`${player.avatar} fa-2x mb-2`}></i>
                        <h6>{player.name}</h6>
                        <small>{player.studyProgram}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Countdown */}
              {players.length >= 2 && !isReady && (
                <div className="text-center mt-4">
                  <div className="alert alert-info">
                    <i className="fas fa-clock me-2"></i>
                    Spiel startet in {countdown} Sekunden...
                  </div>
                </div>
              )}

              {isReady && (
                <div className="text-center mt-4">
                  <div className="alert alert-success">
                    <i className="fas fa-play me-2"></i>
                    Spiel wird gestartet...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

                {/* Footer mit Zurück-Button */}
                {onBack && !isReady && (
                  <div className="card-footer bg-light">
                    <button 
                      className="btn btn-secondary w-100"
                      onClick={onBack}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Zurück zur Kategorieauswahl
                    </button>
                  </div>
                )}
      </div>
    </div>
  );
}

export default CooperativeLobby;
