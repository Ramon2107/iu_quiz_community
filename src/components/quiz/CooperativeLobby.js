/**
 * CooperativeLobby-Komponente - Simulierte Lobby für kooperativen Modus
 *
 * Diese Komponente zeigt eine Lobby, in der Spieler sich sammeln.
 * Sie ist nur für Demozwecke und zeigt simulierte Spieler.
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {Array} props.players - Spieler-Liste
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onStartGame - Callback zum Spielstart
 * @returns {JSX.Element} Die gerenderte CooperativeLobby-Komponente
 */
import React, { useState, useEffect } from 'react';

function CooperativeLobby({ players, user, onStartGame }) {
  const [countdown, setCountdown] = useState(5);
  const [isReady, setIsReady] = useState(false);

  /**
   * Countdown-Timer für automatischen Spielstart
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
              <h3 className="mb-0">
                <i className="fas fa-users me-2"></i>
                Kooperative Lobby
              </h3>
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
                {players.map((player, index) => (
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
      </div>
    </div>
  );
}

export default CooperativeLobby;
