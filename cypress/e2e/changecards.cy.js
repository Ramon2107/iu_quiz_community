describe('Start Login and open card inventory', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('.mt-3 > .btn')
    .should('contain.text','Demo-Anmeldedaten anzeigen')
    cy.get('#email').type('anna.schmidt@iu-study.org')
    cy.get('#password').type('QuizMaster123!')
    cy.get('form > .btn').click()
    cy.get(':nth-child(2) > .card > .card-footer > .btn').click()
    cy.get(':nth-child(1) > .card > .card-body > .d-flex > .badge')
    .should('contain.text','15 Karten')
  })
})