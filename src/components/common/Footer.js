/**
 * Footer-Komponente
 *
 * Diese Komponente stellt den Footer der Anwendung dar und enthält Links zu wichtigen
 * Seiten wie Datenschutz und Impressum sowie Kontaktinformationen.
 *
 * @author System
 * @version 1.2.0
 * @since 2025-07-15
 */

import React, { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import Imprint from './Imprint';

/**
 * Footer-Komponente
 *
 * Zeigt den Footer mit Navigation, Kontaktinformationen und rechtlichen Hinweisen.
 * Enthält Modal-Dialoge für Datenschutz und Impressum.
 *
 * @returns {JSX.Element} Die gerenderte Footer-Komponente
 */
function Footer() {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showImprintModal, setShowImprintModal] = useState(false);

    /**
     * Öffnet das Datenschutz-Modal
     *
     * @function handleShowPrivacy
     */
    const handleShowPrivacy = () => {
        setShowPrivacyModal(true);
    };

    /**
     * Schließt das Datenschutz-Modal
     *
     * @function handleClosePrivacy
     */
    const handleClosePrivacy = () => {
        setShowPrivacyModal(false);
    };

    /**
     * Öffnet das Impressum-Modal
     *
     * @function handleShowImprint
     */
    const handleShowImprint = () => {
        setShowImprintModal(true);
    };

    /**
     * Schließt das Impressum-Modal
     *
     * @function handleCloseImprint
     */
    const handleCloseImprint = () => {
        setShowImprintModal(false);
    };

    return (
        <>
            <footer className="bg-dark text-light mt-5">
                <div className="container py-5">
                    <div className="row g-4">
                        {/* Über das System - Erweitert */}
                        <div className="col-lg-5 col-md-6 mb-4">
                            <h4 className="mb-3">
                                <i className="fas fa-graduation-cap me-2"></i>
                                IU Community Quiz
                            </h4>
                            <p className="text-light mb-3" style={{ lineHeight: '1.6' }}>
                                Ein kooperatives und kollaboratives Online-Quizsystem
                                zur Unterstützung des Fernstudiums an der IU Internationale Hochschule.
                            </p>
                            <p className="text-muted mb-3">
                                <i className="fas fa-users me-2"></i>
                                Gemeinsam lernen, gemeinsam wachsen - für eine bessere Bildung.
                            </p>
                            <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-2">
                    <i className="fas fa-star me-1"></i>
                    Kostenlos
                  </span>
                                <span className="badge bg-success me-2">
                    <i className="fas fa-mobile-alt me-1"></i>
                    Responsive
                  </span>
                                <span className="badge bg-info">
                    <i className="fas fa-heart me-1"></i>
                    Open Source
                  </span>
                            </div>
                        </div>

                        {/* Navigation & Links */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="mb-3">Navigation</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-light text-decoration-none d-flex align-items-center">
                                        <i className="fas fa-question-circle me-2"></i>
                                        Hilfe & Support
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <button
                                        className="btn btn-link text-light p-0 text-decoration-none text-start d-flex align-items-center"
                                        onClick={handleShowPrivacy}
                                        style={{ border: 'none' }}
                                    >
                                        <i className="fas fa-shield-alt me-2"></i>
                                        Datenschutz
                                    </button>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-light text-decoration-none d-flex align-items-center">
                                        <i className="fas fa-file-contract me-2"></i>
                                        Nutzungsbedingungen
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <button
                                        className="btn btn-link text-light p-0 text-decoration-none text-start d-flex align-items-center"
                                        onClick={handleShowImprint}
                                        style={{ border: 'none' }}
                                    >
                                        <i className="fas fa-info-circle me-2"></i>
                                        Impressum
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Kontakt & Social */}
                        <div className="col-lg-4 col-md-12 mb-4">
                            <h5 className="mb-3">Kontakt & Community</h5>
                            <div className="mb-3">
                                <p className="text-light mb-2">
                                    <i className="fas fa-envelope me-2"></i>
                                    <a href="mailto:support@iubh-quiz.de" className="text-light text-decoration-none">
                                        support@iubh-quiz.de
                                    </a>
                                </p>
                                <p className="text-light mb-2">
                                    <i className="fas fa-phone me-2"></i>
                                    <a href="tel:+4921518220" className="text-light text-decoration-none">
                                        +49 (0) 2151 822-0
                                    </a>
                                </p>
                                <p className="text-muted mb-3">
                                    <i className="fas fa-clock me-2"></i>
                                    Mo-Fr: 9:00 - 17:00 Uhr
                                </p>
                            </div>

                            <div className="mb-3">
                                <h6 className="text-light mb-2">Folgen Sie uns</h6>
                                <div className="social-links">
                                    <a href="#" className="text-light me-3 d-inline-block" aria-label="Facebook">
                                        <i className="fab fa-facebook fa-2x"></i>
                                    </a>
                                    <a href="#" className="text-light me-3 d-inline-block" aria-label="Twitter">
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </a>
                                    <a href="#" className="text-light me-3 d-inline-block" aria-label="LinkedIn">
                                        <i className="fab fa-linkedin fa-2x"></i>
                                    </a>
                                    <a href="#" className="text-light d-inline-block" aria-label="Instagram">
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4 border-secondary" />

                    {/* Copyright & Bottom Info */}
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-6 mb-2 mb-md-0">
                            <p className="text-muted mb-0">
                                <i className="fas fa-copyright me-1"></i>
                                2025 IU Quiz Community. Alle Rechte vorbehalten.
                            </p>
                            <small className="text-muted">
                                IU Internationale Hochschule - Juri-Gagarin-Ring 152, 99084 Erfurt
                            </small>
                        </div>
                        <div className="col-lg-4 col-md-6 text-md-end">
                            <p className="text-light mb-0">
                                <i className="fas fa-code me-1"></i>
                                Entwickelt mit <i className="fas fa-heart text-danger mx-1"></i>
                                für Studierende
                            </p>
                            <small className="text-muted">
                                Version 1.0.0 - React & Bootstrap
                            </small>
                        </div>
                    </div>
                </div>
            </footer>

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

            {/* Modal Backdrop */}
            {(showPrivacyModal || showImprintModal) && (
                <div
                    className="modal-backdrop fade show"
                    onClick={showPrivacyModal ? handleClosePrivacy : handleCloseImprint}
                ></div>
            )}
        </>
    );
}

export default Foote