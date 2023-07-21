describe('Validar o endpoint POST /list/{list_id}/clear', () => {

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/add_item',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: {'media_id': 12}
    })
  })

  it('Validar limpar a lista com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/clear?confirm=true',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      failOnStatusCode: false
    }).as('postClearList')
    cy.get('@postClearList').then(response => {
      expect(response.status).to.be.eql(201)
      expect(response.body.success).to.be.true
      expect(response.body.status_code).to.be.eql(12)
      expect(response.body.status_message).to.be.eql('The item/record was updated successfully.')
    })
  });
})