describe('Start duel mode', () => {
    it('passes', () => {
        cy.visit('/')
        cy.get('.mt-3 > .btn')
            .should('contain.text','Demo-Anmeldedaten anzeigen')
        cy.get('#email').type('anna.schmidt@iu-study.org')
        cy.get('#password').type('QuizMaster123!')
        cy.get('form > .btn').click()
        cy.get('.btn-light').click()
        cy.get(':nth-child(3) > .card > .card-body > .btn').click()
        cy.get('.btn-warning').click()
        cy.get(':nth-child(3) > .card > .card-body > .card-footer > small').click()
        // Lobby wird angezeigt
        cy.contains('Kooperative Lobby').should('be.visible')
        // Warte auf automatischen Start (max 7 Sekunden)
        cy.contains('Frage 1 von 10', { timeout: 7000 }).should('be.visible')
    })
})