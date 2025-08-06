/**
 * PointsInfo-Komponente - Zeigt Informationen zur Punkteberechnung
 *
 * Diese Komponente erklärt dem Benutzer, wie Punkte im Quiz berechnet werden.
 * Sie ist in die QuizQuestion-Komponente integriert.
 *
 * @param {Object} props - Komponenteneigenschaften
 * @param {string} props.gameMode - Spielmodus
 * @returns {JSX.Element} Die gerenderte PointsInfo-Komponente
 *
 * @author Projektteam IU Community Quiz
 * @version 1.0.0
 * @since 2025-07-15
 */
import React from 'react';

function PointsInfo({ gameMode }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title">
          <i className="fas fa-info-circle me-2"></i>
          Punkteberechnung
        </h6>
        <small className="text-muted">
          {gameMode === 'competitive' ? (
            <>
              <i className="fas fa-trophy text-warning me-1"></i>
              <strong>Duell-Modus:</strong> 100 Punkte + Geschwindigkeitsbonus (max. 30 Punkte)
            </>
          ) : gameMode === 'cooperative' ? (
            <>
              <i className="fas fa-users text-success me-1"></i>
              <strong>Kooperativ-Modus:</strong> 100 Punkte pro richtiger Antwort + Geschwindigkeitsbonus
            </>
          ) : (
            <>
              <i className="fas fa-user text-primary me-1"></i>
              <strong>Einzelspieler:</strong> 100 Punkte pro richtiger Antwort
            </>
          )}
        </small>
      </div>
    </div>
  );
}

export default PointsInfo;
