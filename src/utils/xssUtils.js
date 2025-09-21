    /**
 * XSS-Schutz-Utilities - Funktionen zum Schutz vor Cross-Site-Scripting-Angriffen
 *
 * Diese Utility-Funktionen bieten Schutz vor XSS-Angriffen durch Bereinigung
 * von Benutzereingaben, ohne das Verhalten der Anwendung zu verändern.
 *
 * @author Projektteam IU Community Quiz
 * @version 1.0.0
 * @since 2025-08-07
 */

/**
 * Bereinigt Benutzereingaben von potenziell gefährlichen Zeichen und Code
 * 
 * Diese Funktion entfernt HTML-Tags und wandelt spezielle Zeichen in ihre
 * HTML-Entitäten um, um XSS-Angriffe zu verhindern. Die Funktion behält
 * dabei die ursprüngliche Bedeutung des Textes bei.
 *
 * @param {string} input - Die zu bereinigende Eingabe
 * @returns {string} Die bereinigte Eingabe ohne gefährliche Zeichen
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  // HTML-Tags und gefährliche Zeichen in Entitäten umwandeln
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Bereinigt HTML-Attribute, um XSS in Attributen zu verhindern
 * 
 * Diese spezialisierte Funktion ist für die Bereinigung von Werten gedacht,
 * die in HTML-Attributen verwendet werden, wie z.B. in data-Attributen.
 *
 * @param {string} input - Der zu bereinigende Attributwert
 * @returns {string} Der bereinigte Attributwert
 */
export const sanitizeAttribute = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  // Entfernt Zeichen, die in Attributen problematisch sein können
  return input
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Bereinigt URL-Parameter, um XSS in URLs zu verhindern
 * 
 * Diese Funktion ist speziell für die Bereinigung von Werten konzipiert,
 * die in URLs oder als URL-Parameter verwendet werden.
 *
 * @param {string} input - Der zu bereinigende URL-Parameter
 * @returns {string} Der bereinigte URL-Parameter
 */
export const sanitizeUrlParam = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  // Entfernt potenziell gefährliche Zeichen aus URL-Parametern
  return encodeURIComponent(input);
};

/**
 * Bereinigt HTML-Content für die sichere Anzeige
 * 
 * Diese Funktion ist für die Bereinigung von HTML-Inhalten gedacht,
 * die direkt in die DOM eingefügt werden, z.B. mit innerHTML.
 *
 * @param {string} html - Der zu bereinigende HTML-Inhalt
 * @returns {string} Der bereinigte HTML-Inhalt
 */
export const sanitizeHtml = (html) => {
  if (!html || typeof html !== 'string') return '';
  
  // Entfernt alle HTML-Tags außer den erlaubten
  const allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br'];
  
  // Temporäres Element erstellen
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  
  // Rekursive Funktion zum Bereinigen von Elementen
  const cleanNode = (node) => {
    if (node.nodeType === 3) return; // Text-Knoten überspringen
    
    // Alle Attribute entfernen
    while (node.attributes.length > 0) {
      node.removeAttribute(node.attributes[0].name);
    }
    
    // Kinder bereinigen
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === 1) { // Element-Knoten
        if (!allowedTags.includes(child.tagName.toLowerCase())) {
          // Nicht erlaubtes Tag durch seinen Textinhalt ersetzen
          const text = document.createTextNode(child.textContent);
          node.replaceChild(text, child);
        } else {
          cleanNode(child);
        }
      }
    });
  };
  
  cleanNode(tempElement);
  return tempElement.innerHTML;
};