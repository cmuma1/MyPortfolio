describe('Portfolio App E2E Test', () => {
  it('loads the home page successfully', () => {
    cy.visit('http://localhost:5173/')
    cy.get('body').should('exist')
  })

  it('loads the projects page successfully', () => {
    cy.visit('http://localhost:5173/projects')
    cy.get('body').should('exist')
  })
})
