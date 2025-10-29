/**
 * Imprint - Impressum mit rechtlichen Informationen
 *
 * Diese Komponente zeigt das Impressum für das IU Community Quiz System an.
 * Sie enthält alle rechtlich erforderlichen Angaben gemäß TMG und anderen relevanten Gesetzen.
 * @namespace common_Imprint
 * @author System
 * @version 1.0.0
 * @since 2025-07-15
 */

import React from 'react';

/**
 * Imprint - Strukturierte Darstellung des Impressums
 *
 * Stellt das Impressum in einer benutzerfreundlichen, strukturierten Ansicht dar.
 * Enthält alle rechtlich erforderlichen Angaben für die Website.
 *
 * @function Imprint
 * @memberOf common_Imprint
 * @returns {React.ReactElement} Die gerenderte Impressum-Komponente
 */
function Imprint() {
    return (
        <div className="imprint">
            <div className="container">
                <h2 className="mb-4">Impressum</h2>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Angaben gemäß § 5 TMG</h5>

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <h6>Betreiber</h6>
                                        <p>
                                            IU Internationale Hochschule<br />
                                            Juri-Gagarin-Ring 152<br />
                                            99084 Erfurt<br />
                                            Deutschland
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <h6>Kontakt</h6>
                                        <p>
                                            <i className="fas fa-phone me-2"></i>
                                            Telefon: +49 (0) 2151 822-0<br />
                                            <i className="fas fa-fax me-2"></i>
                                            Telefax: +49 (0) 2151 822-100<br />
                                            <i className="fas fa-envelope me-2"></i>
                                            E-Mail: info@iu.org
                                        </p>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Vertreten durch</h6>
                                        <p>
                                            Die IU Internationale Hochschule wird vertreten durch:<br />
                                            Prof. Dr. Holger Sommerfeldt (Rektor)<br />
                                            Carmen Thoma (Kanzlerin)
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <h6>Registereintrag</h6>
                                        <p>
                                            Eintragung im Vereinsregister.<br />
                                            Registergericht: Amtsgericht Düsseldorf<br />
                                            Registernummer: VR 13709
                                        </p>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <h6>Aufsichtsbehörde</h6>
                                <p>
                                    Thüringer Ministerium für Bildung, Jugend und Sport<br />
                                    Werner-Seelenbinder-Straße 7<br />
                                    99096 Erfurt
                                </p>

                                <h6 className="mt-4">Umsatzsteuer-ID</h6>
                                <p>
                                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                                    DE 814 261 460
                                </p>

                                <hr className="my-4" />

                                <h5 className="card-title">Haftung für Inhalte</h5>
                                <p>
                                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
                                    diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
                                    sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte
                                    oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                                    forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                                </p>

                                <h5 className="card-title mt-4">Haftung für Links</h5>
                                <p>
                                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
                                    wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
                                    keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
                                    jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                                </p>

                                <h5 className="card-title mt-4">Urheberrecht</h5>
                                <p>
                                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                                </p>

                                <h5 className="card-title mt-4">Streitschlichtung</h5>
                                <p>
                                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                                    bereit:
                                    <a href="https://ec.europa.eu/consumers/odr/"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-decoration-none ms-1">
                                        https://ec.europa.eu/consumers/odr/
                                    </a>
                                </p>
                                <p>
                                    Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
                                    verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                                    teilzunehmen.
                                </p>

                                <p className="mt-4">
                                    <small className="text-muted">
                                        Stand: 15. Juli 2025<br />
                                        Quelle:
                                        <a href="https://www.e-recht24.de/impressum-generator.html"
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="text-decoration-none">
                                            e-recht24.de
                                        </a>
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

export default Imprint;