import React, { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import Imprint from './Imprint';

/**
 * Footer-Komponente - Kompakt und funktional mit Card-basierter Struktur
 *
 * Diese Komponente stellt den Footer der Anwendung dar und bietet:
 * - Card-basierte einheitliche Struktur für bessere mobile Darstellung
 * - Kompakte Darstellung der wichtigsten Informationen
 * - Vollständige Navigation zu allen rechtlichen Seiten
 * - Responsive Design für alle Endgeräte
 * - Einheitliche Schriftgrößen und Icon-Größen
 * - Alle Texte in heller Schrift für bessere Lesbarkeit
 * - Vollständige Inhalte für Hilfe, Datenschutz, Impressum und Nutzungsbedingungen
 * - Social Media Links und Kontaktinformationen
 *
 * @author IU Quiz Community
 * @version 1.1.0
 * @since 2025-07-15
 *
 * @returns {JSX.Element} Die gerenderte Footer-Komponente
 */
function Footer() {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showImprintModal, setShowImprintModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    /**
     * Öffnet das Datenschutz-Modal
     */
    const handleShowPrivacy = () => setShowPrivacyModal(true);

    /**
     * Schließt das Datenschutz-Modal
     */
    const handleClosePrivacy = () => setShowPrivacyModal(false);

    /**
     * Öffnet das Impressum-Modal
     */
    const handleShowImprint = () => setShowImprintModal(true);

    /**
     * Schließt das Impressum-Modal
     */
    const handleCloseImprint = () => setShowImprintModal(false);

    /**
     * Öffnet das Hilfe-Modal
     */
    const handleShowHelp = () => setShowHelpModal(true);

    /**
     * Schließt das Hilfe-Modal
     */
    const handleCloseHelp = () => setShowHelpModal(false);

    /**
     * Öffnet das Nutzungsbedingungen-Modal
     */
    const handleShowTerms = () => setShowTermsModal(true);

    /**
     * Schließt das Nutzungsbedingungen-Modal
     */
    const handleCloseTerms = () => setShowTermsModal(false);

    return (
        <>
            <footer className="bg-dark text-light mt-5">
                <div className="container py-4">
                    {/* Haupt-Card für strukturierte Darstellung */}
                    <div className="card bg-dark border-secondary">
                        <div className="card-body">
                            {/* Header-Bereich */}
                            <div className="row mb-3">
                                <div className="col-md-8">
                                    <div className="card bg-dark border-0">
                                        <div className="card-body p-0">
                                            <h5 className="card-title text-light mb-1">
                                                <i className="fas fa-graduation-cap me-2"></i>
                                                IU Community Quiz
                                            </h5>
                                            <p className="card-text text-light small mb-0">
                                                Kooperatives Lernen für IU Studierende
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card bg-dark border-0">
                                        <div className="card-body p-0">
                                            <div className="d-flex justify-content-md-end justify-content-start flex-wrap">
                                                <span className="badge bg-primary me-2 mb-1">
                                                    <i className="fas fa-star me-1"></i>
                                                    Kostenlos
                                                </span>
                                                <span className="badge bg-success me-2 mb-1">
                                                    <i className="fas fa-mobile-alt me-1"></i>
                                                    Responsive
                                                </span>
                                                <span className="badge bg-info mb-1">
                                                    <i className="fas fa-heart me-1"></i>
                                                    Open Source
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation und Kontakt Cards */}
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-dark border-secondary">
                                        <div className="card-header bg-dark border-secondary">
                                            <h6 className="card-title text-light mb-0">
                                                <i className="fas fa-link me-2"></i>
                                                Navigation
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex flex-wrap gap-2">
                                                <button
                                                    className="btn btn-outline-light btn-sm"
                                                    onClick={handleShowHelp}
                                                >
                                                    <i className="fas fa-question-circle me-1"></i>
                                                    Hilfe
                                                </button>
                                                <button
                                                    className="btn btn-outline-light btn-sm"
                                                    onClick={handleShowPrivacy}
                                                >
                                                    <i className="fas fa-shield-alt me-1"></i>
                                                    Datenschutz
                                                </button>
                                                <button
                                                    className="btn btn-outline-light btn-sm"
                                                    onClick={handleShowTerms}
                                                >
                                                    <i className="fas fa-file-contract me-1"></i>
                                                    Nutzungsbedingungen
                                                </button>
                                                <button
                                                    className="btn btn-outline-light btn-sm"
                                                    onClick={handleShowImprint}
                                                >
                                                    <i className="fas fa-info-circle me-1"></i>
                                                    Impressum
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-dark border-secondary">
                                        <div className="card-header bg-dark border-secondary">
                                            <h6 className="card-title text-light mb-0">
                                                <i className="fas fa-envelope me-2"></i>
                                                Kontakt & Social
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex flex-column gap-2">
                                                <span className="text-light small">
                                                    <i className="fas fa-envelope me-2"></i>
                                                    support@iubh-quiz.de
                                                </span>
                                                <div className="social-links">
                                                    <a href="#" className="text-light me-3" aria-label="Facebook">
                                                        <i className="fab fa-facebook fa-lg"></i>
                                                    </a>
                                                    <a href="#" className="text-light me-3" aria-label="Twitter">
                                                        <i className="fab fa-twitter fa-lg"></i>
                                                    </a>
                                                    <a href="#" className="text-light me-3" aria-label="LinkedIn">
                                                        <i className="fab fa-linkedin fa-lg"></i>
                                                    </a>
                                                    <a href="#" className="text-light" aria-label="Instagram">
                                                        <i className="fab fa-instagram fa-lg"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Copyright und Entwicklungsinfo Cards */}
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <div className="card bg-dark border-secondary">
                                        <div className="card-body py-2">
                                            <div className="text-light small">
                                                <div className="d-flex align-items-center mb-1">
                                                    <i className="fas fa-copyright me-2"></i>
                                                    <span>2025 IU Quiz Community. Alle Rechte vorbehalten.</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-building me-2"></i>
                                                    <span>IU Internationale Hochschule - Juri-Gagarin-Ring 152, 99084 Erfurt</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card bg-dark border-secondary">
                                        <div className="card-body py-2">
                                            <div className="text-light small text-md-end">
                                                <div className="d-flex align-items-center justify-content-md-end mb-1">
                                                    <i className="fas fa-code me-2"></i>
                                                    <span>Entwickelt mit</span>
                                                    <i className="fas fa-heart text-danger mx-2"></i>
                                                    <span>für Studierende</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-md-end">
                                                    <i className="fas fa-cog me-2"></i>
                                                    <span>Version 1.0.0 - React & Bootstrap</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Hilfe & Support Modal */}
            <div
                className={`modal fade ${showHelpModal ? 'show' : ''}`}
                style={{ display: showHelpModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="helpModalLabel"
                aria-hidden={!showHelpModal}
            >
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="helpModalLabel">
                                <i className="fas fa-question-circle me-2"></i>
                                Hilfe & Support
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseHelp}
                                aria-label="Schließen"
                            ></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <div className="container-fluid">
                                <h6>Über das IU Community Quiz</h6>
                                <p>
                                    Das IU Community Quiz ist eine kooperative und kollaborative Online-Lernplattform,
                                    die speziell für Studierende der IU Internationale Hochschule entwickelt wurde.
                                    Unser Ziel ist es, das Fernstudium durch interaktive Quizzes und gemeinschaftliches
                                    Lernen zu unterstützen.
                                </p>

                                <h6>Häufig gestellte Fragen (FAQ)</h6>

                                <div className="accordion" id="faqAccordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="faq1">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                                                <i className="fas fa-play me-2"></i>
                                                Wie funktioniert das Quiz-System?
                                            </button>
                                        </h2>
                                        <div id="collapse1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p>Das IU Community Quiz bietet drei verschiedene Spielmodi:</p>
                                                <ul>
                                                    <li><strong>Single Player:</strong> Spielen Sie alleine in Ihrem eigenen Tempo ohne Zeitlimit</li>
                                                    <li><strong>Cooperative:</strong> Arbeiten Sie mit anderen Studierenden zusammen, 60 Sekunden pro Frage, mit integriertem Chat</li>
                                                    <li><strong>Competitive:</strong> Treten Sie gegen andere Studierende an, 30 Sekunden pro Frage, mit Live-Rangliste</li>
                                                </ul>
                                                <p>Wählen Sie einfach eine Kategorie aus, stellen Sie die Anzahl der Fragen ein und starten Sie!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="faq2">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                                                <i className="fas fa-users me-2"></i>
                                                Was ist der Unterschied zwischen den Modi?
                                            </button>
                                        </h2>
                                        <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="card h-100">
                                                            <div className="card-header bg-primary text-white">
                                                                <i className="fas fa-user me-2"></i>
                                                                Single Player
                                                            </div>
                                                            <div className="card-body">
                                                                <ul className="list-unstyled">
                                                                    <li><i className="fas fa-check text-success me-2"></i>Kein Zeitlimit</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Eigenes Tempo</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Detaillierte Erklärungen</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Ideal zum Lernen</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card h-100">
                                                            <div className="card-header bg-success text-white">
                                                                <i className="fas fa-users me-2"></i>
                                                                Cooperative
                                                            </div>
                                                            <div className="card-body">
                                                                <ul className="list-unstyled">
                                                                    <li><i className="fas fa-check text-success me-2"></i>60 Sekunden pro Frage</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Live-Chat mit Mitspielern</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Gemeinsame Diskussion</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Kollaboratives Lernen</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card h-100">
                                                            <div className="card-header bg-warning text-dark">
                                                                <i className="fas fa-trophy me-2"></i>
                                                                Competitive
                                                            </div>
                                                            <div className="card-body">
                                                                <ul className="list-unstyled">
                                                                    <li><i className="fas fa-check text-success me-2"></i>30 Sekunden pro Frage</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Live-Rangliste</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Geschwindigkeitsbonus</li>
                                                                    <li><i className="fas fa-check text-success me-2"></i>Wettkampf-Atmosphäre</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="faq3">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                                                <i className="fas fa-star me-2"></i>
                                                Wie werden die Punkte berechnet?
                                            </button>
                                        </h2>
                                        <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <div className="alert alert-info">
                                                    <i className="fas fa-info-circle me-2"></i>
                                                    <strong>Grundpunkte:</strong> Jede richtige Antwort gibt 100 Punkte
                                                </div>
                                                <div className="alert alert-warning">
                                                    <i className="fas fa-clock me-2"></i>
                                                    <strong>Geschwindigkeitsbonus (nur Competitive Mode):</strong><br/>
                                                    Je schneller Sie antworten, desto mehr Bonuspunkte erhalten Sie:
                                                    <ul className="mt-2 mb-0">
                                                        <li>Antwort in 1-10 Sekunden: +30 Bonuspunkte</li>
                                                        <li>Antwort in 11-20 Sekunden: +20 Bonuspunkte</li>
                                                        <li>Antwort in 21-30 Sekunden: +10 Bonuspunkte</li>
                                                    </ul>
                                                </div>
                                                <div className="alert alert-danger">
                                                    <i className="fas fa-times me-2"></i>
                                                    <strong>Falsche Antworten:</strong> Keine Punkte, aber auch kein Punktabzug
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="faq4">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                                                <i className="fas fa-shield-alt me-2"></i>
                                                Werden meine Daten gespeichert?
                                            </button>
                                        </h2>
                                        <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <div className="alert alert-success">
                                                    <i className="fas fa-check-circle me-2"></i>
                                                    <strong>Datenschutz garantiert:</strong> Alle Daten werden nur lokal in Ihrem Browser gespeichert
                                                </div>
                                                <p>Folgende Daten werden <u>nicht</u> auf unseren Servern gespeichert:</p>
                                                <ul>
                                                    <li>Persönliche Daten oder Anmeldeinformationen</li>
                                                    <li>Quiz-Ergebnisse oder Punktestände</li>
                                                    <li>Chat-Nachrichten aus Multiplayer-Modi</li>
                                                    <li>Nutzungsstatistiken oder Verlaufsdaten</li>
                                                </ul>
                                                <p>
                                                    <strong>Lokale Speicherung:</strong> Nur Ihr Benutzername und die aktuellen Quiz-Einstellungen
                                                    werden temporär im Browser-LocalStorage gespeichert und können jederzeit gelöscht werden.
                                                </p>
                                                <p>
                                                    Weitere Informationen finden Sie in unseren detaillierten
                                                    <button className="btn btn-link p-0" onClick={handleShowPrivacy}>Datenschutzhinweisen</button>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="faq5">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5">
                                                <i className="fas fa-laptop me-2"></i>
                                                Welche technischen Anforderungen gibt es?
                                            </button>
                                        </h2>
                                        <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h6><i className="fas fa-desktop me-2"></i>Browser-Anforderungen</h6>
                                                        <ul>
                                                            <li>Chrome 90+ (empfohlen)</li>
                                                            <li>Firefox 88+</li>
                                                            <li>Safari 14+</li>
                                                            <li>Edge 90+</li>
                                                        </ul>

                                                        <h6 className="mt-3"><i className="fas fa-cogs me-2"></i>Technische Voraussetzungen</h6>
                                                        <ul>
                                                            <li>JavaScript aktiviert</li>
                                                            <li>Cookies aktiviert</li>
                                                            <li>LocalStorage verfügbar</li>
                                                            <li>Mindestens 512 MB RAM</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h6><i className="fas fa-wifi me-2"></i>Internetverbindung</h6>
                                                        <ul>
                                                            <li>Stabile Internetverbindung</li>
                                                            <li>Mindestens 1 Mbit/s Download</li>
                                                            <li>Für Multiplayer: Stabile Verbindung</li>
                                                        </ul>

                                                        <h6 className="mt-3"><i className="fas fa-mobile-alt me-2"></i>Mobile Geräte</h6>
                                                        <ul>
                                                            <li>iOS 14+ (Safari)</li>
                                                            <li>Android 8+ (Chrome)</li>
                                                            <li>Responsive Design</li>
                                                            <li>Touch-optimiert</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h6 className="mt-4"><i className="fas fa-envelope me-2"></i>Kontakt & Support</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    <i className="fas fa-headset me-2"></i>
                                                    Support-Team
                                                </h6>
                                                <p className="card-text">
                                                    <i className="fas fa-envelope me-2"></i>
                                                    E-Mail: <a href="mailto:support@iubh-quiz.de">support@iubh-quiz.de</a><br/>
                                                    <i className="fas fa-phone me-2"></i>
                                                    Telefon: <a href="tel:+4921518220">+49 (0) 2151 822-0</a><br/>
                                                    <i className="fas fa-clock me-2"></i>
                                                    Öffnungszeiten: Mo-Fr 9:00-17:00 Uhr
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    <i className="fas fa-bug me-2"></i>
                                                    Probleme melden
                                                </h6>
                                                <p className="card-text">
                                                    Bei technischen Problemen oder Fehlern kontaktieren Sie uns bitte mit:
                                                </p>
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-check me-2"></i>Beschreibung des Problems</li>
                                                    <li><i className="fas fa-check me-2"></i>Browser und Version</li>
                                                    <li><i className="fas fa-check me-2"></i>Betriebssystem</li>
                                                    <li><i className="fas fa-check me-2"></i>Screenshot (falls möglich)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseHelp}
                            >
                                <i className="fas fa-times me-2"></i>
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nutzungsbedingungen Modal */}
            <div
                className={`modal fade ${showTermsModal ? 'show' : ''}`}
                style={{ display: showTermsModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="termsModalLabel"
                aria-hidden={!showTermsModal}
            >
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="termsModalLabel">
                                <i className="fas fa-file-contract me-2"></i>
                                Nutzungsbedingungen
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseTerms}
                                aria-label="Schließen"
                            ></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <div className="container-fluid">
                                <div className="alert alert-info">
                                    <i className="fas fa-info-circle me-2"></i>
                                    <strong>Letzte Aktualisierung:</strong> 15. Juli 2025
                                </div>

                                <h6><i className="fas fa-gavel me-2"></i>1. Geltungsbereich</h6>
                                <p>
                                    Diese Nutzungsbedingungen regeln die Verwendung des IU Community Quiz Systems
                                    ("die Plattform"), bereitgestellt von der IU Internationale Hochschule
                                    ("wir", "uns", "unser"). Durch die Nutzung der Plattform stimmen Sie
                                    diesen Bedingungen zu.
                                </p>

                                <h6><i className="fas fa-user-check me-2"></i>2. Nutzungsberechtigung</h6>
                                <p>
                                    Die Plattform steht allen Studierenden der IU Internationale Hochschule
                                    sowie interessierten Personen kostenlos zur Verfügung. Sie müssen:
                                </p>
                                <ul>
                                    <li>Mindestens 16 Jahre alt sein</li>
                                    <li>Wahrheitsgemäße Angaben machen</li>
                                    <li>Die Nutzung erfolgt auf eigene Verantwortung</li>
                                    <li>Deutschen Gesetzen unterliegen</li>
                                </ul>

                                <h6><i className="fas fa-tasks me-2"></i>3. Nutzungsrechte und -pflichten</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card border-success">
                                            <div className="card-header bg-success text-white">
                                                <i className="fas fa-check-circle me-2"></i>
                                                Erlaubte Nutzung
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-check text-success me-2"></i>Lernen und Üben mit dem Quiz-System</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Teilnahme an allen verfügbaren Spielmodi</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Nutzung der Multiplayer-Funktionen</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Speicherung von Ergebnissen im Browser</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Austausch im kooperativen Modus</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card border-danger">
                                            <div className="card-header bg-danger text-white">
                                                <i className="fas fa-ban me-2"></i>
                                                Verbotene Nutzung
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-times text-danger me-2"></i>Manipulation oder Umgehung der Systeme</li>
                                                    <li><i className="fas fa-times text-danger me-2"></i>Verwendung automatisierter Tools oder Bots</li>
                                                    <li><i className="fas fa-times text-danger me-2"></i>Störung anderer Nutzer in Multiplayer-Modi</li>
                                                    <li><i className="fas fa-times text-danger me-2"></i>Verbreitung schädlicher Inhalte</li>
                                                    <li><i className="fas fa-times text-danger me-2"></i>Kommerzielle Nutzung ohne Erlaubnis</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h6><i className="fas fa-server me-2"></i>4. Verfügbarkeit und Wartung</h6>
                                <p>
                                    Wir bemühen uns um eine hohe Verfügbarkeit der Plattform, können aber keine
                                    100%ige Verfügbarkeit garantieren. Geplante Wartungsarbeiten werden nach
                                    Möglichkeit im Voraus angekündigt.
                                </p>
                                <div className="alert alert-warning">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    <strong>Wichtig:</strong> Die Plattform kann jederzeit temporär nicht verfügbar sein.
                                </div>

                                <h6><i className="fas fa-shield-alt me-2"></i>5. Haftungsausschluss</h6>
                                <p>
                                    Die Nutzung der Plattform erfolgt auf eigene Gefahr. Wir übernehmen keine
                                    Haftung für direkte oder indirekte Schäden, die durch die Nutzung entstehen können:
                                </p>
                                <ul>
                                    <li>Datenverlust oder Systemausfälle</li>
                                    <li>Verlust von Fortschritten oder Ergebnissen</li>
                                    <li>Technische Probleme mit Ihrem Gerät</li>
                                    <li>Inkompatibilität mit anderen Software</li>
                                </ul>

                                <h6><i className="fas fa-edit me-2"></i>6. Änderungen der Nutzungsbedingungen</h6>
                                <p>
                                    Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern.
                                    Wesentliche Änderungen werden über die Plattform kommuniziert und gelten ab
                                    dem Zeitpunkt der Veröffentlichung.
                                </p>

                                <h6><i className="fas fa-door-open me-2"></i>7. Beendigung der Nutzung</h6>
                                <p>
                                    Die Nutzung kann jederzeit durch Sie oder durch uns beendet werden.
                                    Bei Verstößen gegen diese Nutzungsbedingungen behalten wir uns das Recht vor,
                                    den Zugang temporär oder dauerhaft zu sperren.
                                </p>

                                <h6><i className="fas fa-balance-scale me-2"></i>8. Anwendbares Recht</h6>
                                <p>
                                    Für diese Nutzungsbedingungen und alle Streitigkeiten gilt ausschließlich
                                    deutsches Recht. Gerichtsstand ist Erfurt, soweit rechtlich zulässig.
                                </p>

                                <h6><i className="fas fa-legal me-2"></i>9. Salvatorische Klausel</h6>
                                <p>
                                    Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam oder
                                    undurchführbar sein, berührt dies nicht die Wirksamkeit der übrigen Bestimmungen.
                                </p>

                                <div className="alert alert-info mt-4">
                                    <i className="fas fa-envelope me-2"></i>
                                    <strong>Fragen zu den Nutzungsbedingungen?</strong><br/>
                                    Bei Fragen wenden Sie sich bitte an:
                                    <a href="mailto:support@iubh-quiz.de" className="ms-2">support@iubh-quiz.de</a>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseTerms}
                            >
                                <i className="fas fa-times me-2"></i>
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Datenschutz Modal */}
            <div
                className={`modal fade ${showPrivacyModal ? 'show' : ''}`}
                style={{ display: showPrivacyModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="privacyModalLabel"
                aria-hidden={!showPrivacyModal}
            >
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="privacyModalLabel">
                                <i className="fas fa-shield-alt me-2"></i>
                                Datenschutzhinweise
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClosePrivacy}
                                aria-label="Schließen"
                            ></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <PrivacyPolicy />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClosePrivacy}
                            >
                                <i className="fas fa-times me-2"></i>
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impressum Modal */}
            <div
                className={`modal fade ${showImprintModal ? 'show' : ''}`}
                style={{ display: showImprintModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="imprintModalLabel"
                aria-hidden={!showImprintModal}
            >
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imprintModalLabel">
                                <i className="fas fa-info-circle me-2"></i>
                                Impressum
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseImprint}
                                aria-label="Schließen"
                            ></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <Imprint />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseImprint}
                            >
                                <i className="fas fa-times me-2"></i>
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;