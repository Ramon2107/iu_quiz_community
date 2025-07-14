/**
 * UserProfile-Komponente
 * 
 * Diese Komponente zeigt das Benutzerprofil mit Statistiken,
 * Lernfortschritt und Einstellungen an.
 * 
 * Features:
 * - Benutzerinformationen
 * - Lernstatistiken
 * - Fortschrittsanzeige
 * - Errungenschaften
 * - Einstellungen
 */

import React, { useState } from 'react';

/**
 * UserProfile-Komponente
 * 
 * @param {Object} props - Komponenteneigenschaften
 * @param {Object} props.user - Benutzerdaten
 */
function UserProfile({ user }) {
  // Mock-Daten für Statistiken
  const [stats] = useState({
    totalQuizzes: 24,
    correctAnswers: 186,
    totalQuestions: 240,
    averageScore: 78,
    streak: 5,
    timeSpent: 1440, // Minuten
    achievements: [
      { id: 1, name: 'Erster Versuch', description: 'Erstes Quiz abgeschlossen', icon: 'star', earned: true },
      { id: 2, name: 'Perfektionist', description: '100% in einem Quiz erreicht', icon: 'trophy', earned: true },
      { id: 3, name: 'Ausdauer', description: '10 Quizzes in Folge', icon: 'fire', earned: true },
      { id: 4, name: 'Wissensdurst', description: '100 Fragen beantwortet', icon: 'brain', earned: true },
      { id: 5, name: 'Teamplayer', description: '5 kooperative Quizzes', icon: 'users', earned: false },
      { id: 6, name: 'Meister', description: '50 Quizzes abgeschlossen', icon: 'crown', earned: false }
    ]
  });

  const [categoryProgress] = useState([
    { name: 'Informatik', completed: 12, total: 20, percentage: 60 },
    { name: 'Mathematik', completed: 8, total: 15, percentage: 53 },
    { name: 'Betriebswirtschaft', completed: 6, total: 12, percentage: 50 },
    { name: 'Projektmanagement', completed: 4, total: 8, percentage: 50 }
  ]);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Benutzerinformationen */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-user me-2"></i>
                Profil
              </h5>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="fas fa-user-circle fa-5x text-primary"></i>
              </div>
              <h5 className="card-title">{user.name}</h5>
              <p className="text-muted">{user.email}</p>
              <hr />
              <div className="row text-center">
                <div className="col-6">
                  <small className="text-muted">Studiengang</small>
                  <div className="fw-bold">{user.studiengang}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Semester</small>
                  <div className="fw-bold">{user.semester}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Errungenschaften */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-trophy me-2"></i>
                Errungenschaften
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {stats.achievements.map((achievement) => (
                  <div key={achievement.id} className="col-4 mb-3 text-center">
                    <div className={`achievement ${achievement.earned ? 'earned' : 'locked'}`}>
                      <i className={`fas fa-${achievement.icon} fa-2x ${
                        achievement.earned ? 'text-warning' : 'text-muted'
                      }`}></i>
                      <div className="small mt-1">{achievement.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiken */}
        <div className="col-md-8">
          {/* Übersicht */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2"></i>
                Lernstatistiken
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                      <div className="display-6">{stats.totalQuizzes}</div>
                      <small>Quizzes gespielt</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <div className="display-6">{stats.averageScore}%</div>
                      <small>Durchschnitt</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-warning text-white">
                    <div className="card-body text-center">
                      <div className="display-6">{stats.streak}</div>
                      <small>Tage Streak</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center">
                      <div className="display-6">{Math.round(stats.timeSpent / 60)}h</div>
                      <small>Lernzeit</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fortschritt nach Kategorien */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                Fortschritt nach Kategorien
              </h5>
            </div>
            <div className="card-body">
              {categoryProgress.map((category) => (
                <div key={category.name} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">{category.name}</span>
                    <span className="text-muted">
                      {category.completed} von {category.total} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aktivitätsverlauf */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-history me-2"></i>
                Letzte Aktivitäten
              </h5>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker bg-success"></div>
                  <div className="timeline-content">
                    <h6 className="mb-1">Quiz abgeschlossen</h6>
                    <p className="text-muted mb-1">Informatik - Datenstrukturen</p>
                    <small className="text-muted">Vor 2 Stunden</small>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-primary"></div>
                  <div className="timeline-content">
                    <h6 className="mb-1">Neue Frage erstellt</h6>
                    <p className="text-muted mb-1">Kategorie: Mathematik</p>
                    <small className="text-muted">Vor 5 Stunden</small>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-warning"></div>
                  <div className="timeline-content">
                    <h6 className="mb-1">Errungenschaft erhalten</h6>
                    <p className="text-muted mb-1">Ausdauer - 10 Quizzes in Folge</p>
                    <small className="text-muted">Vor 1 Tag</small>
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

export default UserProfile;
