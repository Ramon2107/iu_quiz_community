/**
 * UserProfile-Komponente - Benutzerprofil und Einstellungen
 *
 * Diese Komponente zeigt das Benutzerprofil mit Statistiken,
 * Einstellungen und Verlauf der Quiz-Aktivitäten an.
 *
 * UPDATE: Logout-Funktion integriert
 */

import React, { useState, useEffect } from 'react';
import dataManager from '../../data/dataManager';

/**
 * UserProfile-Komponente
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.user - Benutzerdaten
 * @param {Function} props.onLogout - UPDATE: Logout-Funktion
 */
function UserProfile({ user, onLogout }) {
  const [stats, setStats] = useState({
    totalQuizzesPlayed: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    averageScore: 0,
    createdQuestions: 0,
    favoriteCategory: 'Noch keine Daten'
  });

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});

  useEffect(() => {
    loadUserStats();
  }, [user]);

  /**
   * Lädt Benutzerstatistiken
   */
  const loadUserStats = () => {
    // Simuliere Statistiken basierend auf Benutzerdaten
    const userCards = dataManager.getAllCards().filter(card => card.author === user.name);

    setStats({
      totalQuizzesPlayed: Math.floor(Math.random() * 50) + 10,
      totalQuestionsAnswered: Math.floor(Math.random() * 500) + 100,
      correctAnswers: Math.floor(Math.random() * 300) + 80,
      averageScore: Math.floor(Math.random() * 30) + 70,
      createdQuestions: userCards.length,
      favoriteCategory: userCards.length > 0 ? userCards[0].category : 'Noch keine Daten'
    });
  };

  /**
   * Behandelt Profil-Änderungen
   */
  const handleProfileUpdate = () => {
    // In echter App würde dies über API erfolgen
    console.log('Profil aktualisiert:', editedUser);
    setEditMode(false);
  };

  /**
   * UPDATE: Behandelt Logout mit Bestätigung
   */
  const handleLogout = () => {
    if (window.confirm('Möchten Sie sich wirklich abmelden?')) {
      onLogout();
    }
  };

  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {/* Profil-Informationen */}
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">
                  <i className="fas fa-user-circle me-2"></i>
                  Mein Profil
                </h2>
              </div>
              <div className="card-body">
                {!editMode ? (
                    <div className="row">
                      <div className="col-md-8">
                        <div className="mb-3">
                          <strong>Name:</strong> {user.name}
                        </div>
                        <div className="mb-3">
                          <strong>E-Mail:</strong> {user.email}
                        </div>
                        <div className="mb-3">
                          <strong>Studiengang:</strong> {user.studyProgram}
                        </div>
                        <div className="mb-3">
                          <strong>Semester:</strong> {user.semester}
                        </div>
                        <div className="mb-3">
                          <strong>Mitglied seit:</strong> {new Date(user.joinDate).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <button
                            className="btn btn-primary mb-2"
                            onClick={() => setEditMode(true)}
                        >
                          <i className="fas fa-edit me-2"></i>
                          Bearbeiten
                        </button>
                        <br />
                        {/* UPDATE: Logout-Button */}
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Abmelden
                        </button>
                      </div>
                    </div>
                ) : (
                    <div>
                      <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={editedUser.name}
                            onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Studiengang:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={editedUser.studyProgram}
                            onChange={(e) => setEditedUser({...editedUser, studyProgram: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Semester:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={editedUser.semester}
                            onChange={(e) => setEditedUser({...editedUser, semester: parseInt(e.target.value)})}
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <button
                            className="btn btn-success"
                            onClick={handleProfileUpdate}
                        >
                          <i className="fas fa-save me-2"></i>
                          Speichern
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setEditMode(false);
                              setEditedUser({...user});
                            }}
                        >
                          <i className="fas fa-times me-2"></i>
                          Abbrechen
                        </button>
                      </div>
                    </div>
                )}
              </div>
            </div>

            {/* Statistiken */}
            <div className="card">
              <div className="card-header bg-info text-white">
                <h3 className="mb-0">
                  <i className="fas fa-chart-bar me-2"></i>
                  Meine Statistiken
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-gamepad fa-2x text-primary mb-2"></i>
                        <h4>{stats.totalQuizzesPlayed}</h4>
                        <p className="mb-0">Quiz gespielt</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-question-circle fa-2x text-success mb-2"></i>
                        <h4>{stats.totalQuestionsAnswered}</h4>
                        <p className="mb-0">Fragen beantwortet</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-check-circle fa-2x text-warning mb-2"></i>
                        <h4>{stats.correctAnswers}</h4>
                        <p className="mb-0">Richtige Antworten</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="fas fa-trophy fa-2x text-danger mb-2"></i>
                        <h4>{stats.averageScore}%</h4>
                        <p className="mb-0">Durchschnittliche Punktzahl</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* Aktivitäten */}
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="fas fa-activity me-2"></i>
                  Aktivitäten
                </h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Beiträge:</strong> {stats.createdQuestions} Fragen erstellt
                </div>
                <div className="mb-3">
                  <strong>Lieblingskategorie:</strong> {stats.favoriteCategory}
                </div>
                <div className="mb-3">
                  <strong>Genauigkeit:</strong> {Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100)}%
                </div>
              </div>
            </div>

            {/* Sicherheit */}
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="fas fa-shield-alt me-2"></i>
                  Sicherheit
                </h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Letzte Anmeldung:</strong><br />
                  <small className="text-muted">Heute um {new Date().toLocaleTimeString('de-DE')}</small>
                </div>
                <div className="mb-3">
                  <strong>Konto-Status:</strong><br />
                  <span className="badge bg-success">Aktiv</span>
                </div>
                <div className="d-grid">
                  <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Abmelden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UserProfile;