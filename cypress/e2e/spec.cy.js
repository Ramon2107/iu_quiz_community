describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('.mt-3 > .btn')
    //.children()
    .should('contain.text','Demo-Anmeldedaten anzeigen')
  })
})