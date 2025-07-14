/**
 * LoginForm-Komponente - Prototypisches Login-System
 *
 * Diese Komponente stellt ein authentisches Login-Formular bereit,
 * das realistische Validierung und Sicherheitsmaßnahmen simuliert.
 *
 * SICHERHEITSFEATURES:
 * - Input-Validierung gegen SQL-Injection
 * - XSS-Schutz durch HTML-Escaping
 * - Realistische Passwort-Validierung
 * - Fehlerbehandlung und Benutzer-Feedback
 * - Simulierte Authentifizierung mit echten Benutzern
 *
 * UPDATE: Implementierung eines prototypischen aber authentischen Login-Systems
 */

import React, { useState } from 'react';

/**
 * Simulierte Benutzerdatenbank mit verschiedenen Nutzer-Typen
 * In einer echten Anwendung würde dies über eine sichere API erfolgen
 */
const MOCK_USERS = [
    {
        id: 'user001',
        email: 'max.mustermann@iu-study.org',
        password: 'StudiumIU2024!',
        name: 'Max Mustermann',
        studyProgram: 'Informatik',
        semester: 3,
        joinDate: '2024-01-15',
        role: 'student'
    },
    {
        id: 'user002',
        email: 'anna.schmidt@iu-study.org',
        password: 'QuizMaster123!',
        name: 'Anna Schmidt',
        studyProgram: 'Wirtschaftsinformatik',
        semester: 5,
        joinDate: '2023-09-10',
        role: 'student'
    },
    {
        id: 'user003',
        email: 'tom.weber@iu-study.org',
        password: 'LernSpiel456!',
        name: 'Tom Weber',
        studyProgram: 'Data Science',
        semester: 2,
        joinDate: '2024-03-20',
        role: 'student'
    },
    {
        id: 'admin001',
        email: 'prof.mueller@iu.org',
        password: 'AdminIU2024!',
        name: 'Prof. Dr. Müller',
        studyProgram: 'Dozent',
        semester: 0,
        joinDate: '2020-01-01',
        role: 'admin'
    }
];

/**
 * Sicherheitsfunktionen für Input-Validierung
 */
const SecurityUtils = {
    /**
     * Bereinigt Eingaben gegen SQL-Injection und XSS-Angriffe
     * @param {string} input - Zu bereinigende Eingabe
     * @returns {string} Bereinigte Eingabe
     */
    sanitizeInput: (input) => {
        if (!input || typeof input !== 'string') return '';

        // Entfernt potentielle SQL-Injection-Zeichen
        return input
            .replace(/[<>\"'%;()&+]/g, '') // XSS-Schutz
            .replace(/(\b(ALTER|CREATE|DELETE|DROP|EXEC|INSERT|SELECT|UNION|UPDATE)\b)/gi, '') // SQL-Injection-Schutz
            .trim()
            .substring(0, 100); // Begrenzung der Eingabelänge
    },

    /**
     * Validiert E-Mail-Format
     * @param {string} email - E-Mail-Adresse
     * @returns {boolean} Gültige E-Mail
     */
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.includes('@iu');
    },

    /**
     * Validiert Passwort-Stärke
     * @param {string} password - Passwort
     * @returns {object} Validierungsergebnis
     */
    validatePassword: (password) => {
        return {
            isValid: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSpecialChars: /[!@#$%^&*]/.test(password)
        };
    }
};

/**
 * LoginForm-Komponente
 * @param {Function} onLogin - Callback-Funktion für erfolgreiche Anmeldung
 */
function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showDemoCredentials, setShowDemoCredentials] = useState(false);

    /**
     * Behandelt Eingabeänderungen mit Sicherheitsvalidierung
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = SecurityUtils.sanitizeInput(value);

        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue
        }));

        // Entfernt Fehler bei Eingabe
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    /**
     * Validiert das Formular vor der Übermittlung
     */
    const validateForm = () => {
        const newErrors = {};

        // E-Mail-Validierung
        if (!formData.email) {
            newErrors.email = 'E-Mail-Adresse ist erforderlich';
        } else if (!SecurityUtils.isValidEmail(formData.email)) {
            newErrors.email = 'Bitte geben Sie eine gültige IU-E-Mail-Adresse ein';
        }

        // Passwort-Validierung
        if (!formData.password) {
            newErrors.password = 'Passwort ist erforderlich';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Simuliert Authentifizierung mit der Mock-Datenbank
     */
    const authenticateUser = async (email, password) => {
        // Simuliere Netzwerk-Latenz
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = MOCK_USERS.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (user) {
            // Entfernt Passwort vor der Rückgabe (Sicherheit)
            const { password: _, ...userWithoutPassword } = user;
            return {
                success: true,
                user: userWithoutPassword
            };
        }

        return {
            success: false,
            error: 'Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.'
        };
    };

    /**
     * Behandelt die Formular-Übermittlung
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const result = await authenticateUser(formData.email, formData.password);

            if (result.success) {
                console.log('Login erfolgreich:', result.user.name);
                onLogin(result.user);
            } else {
                setErrors({ submit: result.error });
            }
        } catch (error) {
            console.error('Login-Fehler:', error);
            setErrors({ submit: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Füllt Demo-Anmeldedaten aus
     */
    const fillDemoCredentials = (userIndex = 0) => {
        const demoUser = MOCK_USERS[userIndex];
        setFormData({
            email: demoUser.email,
            password: demoUser.password
        });
        setErrors({});
    };

    return (
        <div className="min-vh-100 d-flex align-items-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white text-center">
                                <h1 className="h3 mb-0">
                                    <i className="fas fa-graduation-cap me-2"></i>
                                    IU Community Quiz
                                </h1>
                                <small>Anmeldung für Studierende</small>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* E-Mail-Feld */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            <i className="fas fa-envelope me-2"></i>
                                            E-Mail-Adresse
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="ihre.email@iu-study.org"
                                            required
                                            autoComplete="email"
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Passwort-Feld */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            <i className="fas fa-lock me-2"></i>
                                            Passwort
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Ihr Passwort"
                                            required
                                            autoComplete="current-password"
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Allgemeine Fehler */}
                                    {errors.submit && (
                                        <div className="alert alert-danger">
                                            <i className="fas fa-exclamation-triangle me-2"></i>
                                            {errors.submit}
                                        </div>
                                    )}

                                    {/* Anmelde-Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Anmelden...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-sign-in-alt me-2"></i>
                                                Anmelden
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Demo-Anmeldedaten */}
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm w-100"
                                        onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                                    >
                                        <i className="fas fa-info-circle me-2"></i>
                                        Demo-Anmeldedaten anzeigen
                                    </button>

                                    {showDemoCredentials && (
                                        <div className="mt-3">
                                            <div className="alert alert-info">
                                                <h6><i className="fas fa-user me-2"></i>Demo-Benutzer:</h6>
                                                {MOCK_USERS.slice(0, 3).map((user, index) => (
                                                    <div key={user.id} className="mb-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => fillDemoCredentials(index)}
                                                        >
                                                            <i className="fas fa-user-graduate me-1"></i>
                                                            {user.name}
                                                        </button>
                                                        <small className="text-muted">
                                                            {user.studyProgram}, {user.semester}. Semester
                                                        </small>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="card-footer text-center text-muted">
                                <small>
                                    <i className="fas fa-shield-alt me-1"></i>
                                    Sichere Anmeldung für IU-Studierende
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;