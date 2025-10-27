/**
 * @description Datenschutzhinweise-Komponente mit DSGVO-Informationen
 */

/**
 * PrivacyPolicy - Datenschutzbestimmungen
 *
 * Diese Komponente zeigt die Datenschutzbestimmungen für das IU Community Quiz System an.
 * Sie enthält alle relevanten Informationen zur Datenerfassung, -verarbeitung und -nutzung.
 *
 * @author System
 * @version 1.0.0
 * @since 2025-07-15
 */

import React from 'react';

/**
 * PrivacyPolicy - Datenschutzbestimmungen in Modal-Ansicht
 *
 * Stellt die Datenschutzbestimmungen in einer benutzerfreundlichen,
 * scrollbaren Modal-Ansicht dar.
 *
 * @function PrivacyPolicy
 * @returns {React.ReactElement} Die gerenderte Datenschutzhinweise-Komponente
 */
function PrivacyPolicy() {
    return (
        <div className="privacy-policy">
            <div className="container">
                <h2 className="mb-4">Datenschutzhinweise</h2>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">1. Datenschutz auf einen Blick</h5>
                                <p className="card-text">
                                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                                    personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.
                                </p>

                                <h6 className="mt-4">Allgemeine Hinweise</h6>
                                <p>
                                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                                    Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
                                    werden können.
                                </p>

                                <h6 className="mt-4">Datenerfassung auf dieser Website</h6>
                                <p>
                                    <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
                                    Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                                </p>

                                <h5 className="card-title mt-5">2. Hosting und Content Delivery Networks (CDN)</h5>
                                <h6 className="mt-3">Externes Hosting</h6>
                                <p>
                                    Diese Website wird bei einem externen Dienstleister gehostet (Hoster).
                                    Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden
                                    auf den Servern des Hosters gespeichert.
                                </p>

                                <h5 className="card-title mt-5">3. Allgemeine Hinweise und Pflichtinformationen</h5>
                                <h6 className="mt-3">Datenschutz</h6>
                                <p>
                                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                                    Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
                                    gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                                </p>

                                <h6 className="mt-4">Hinweis zur verantwortlichen Stelle</h6>
                                <p>
                                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                                </p>
                                <p>
                                    IU Internationale Hochschule<br />
                                    Juri-Gagarin-Ring 152<br />
                                    99084 Erfurt
                                </p>

                                <h6 className="mt-4">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h6>
                                <p>
                                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
                                    möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
                                    Dazu reicht eine formlose Mitteilung per E-Mail an uns.
                                </p>

                                <h5 className="card-title mt-5">4. Datenerfassung auf dieser Website</h5>
                                <h6 className="mt-3">Cookies</h6>
                                <p>
                                    Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf
                                    Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu,
                                    unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                                </p>

                                <h6 className="mt-4">Server-Log-Dateien</h6>
                                <p>
                                    Der Provider der Seiten erhebt und speichert automatisch Informationen in
                                    so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                                </p>

                                <h6 className="mt-4">Kontaktformular</h6>
                                <p>
                                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
                                    aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
                                    zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                                </p>

                                <h5 className="card-title mt-5">5. Ihre Rechte</h5>
                                <p>
                                    Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger
                                    und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
                                    außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu
                                    verlangen.
                                </p>

                                <p className="mt-4">
                                    <small className="text-muted">
                                        Stand: 15. Juli 2025<br />
                                        Diese Datenschutzerklärung wurde mit Hilfe des
                                        <a href="https://www.e-recht24.de/impressum-generator.html"
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="text-decoration-none">
                                            Impressum-Generators der Kanzlei Wilde & Partner
                                        </a> erstellt.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;