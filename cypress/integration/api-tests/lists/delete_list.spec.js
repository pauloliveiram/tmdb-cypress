describe('Validar o enpoint DELETE /list/{list_id}', () => {
  let list_id;

  before(() => {
    cy.request({
      method: 'POST',
      url: '/list',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: { "name": "Teste da automação",
              "description": "Lista criada para que os testes automatizados sejam executados.",
              "language": "pt-br" }
    }).then(response => {list_id = response.body.list_id})  
  })

  it('Validar exclusão de uma lista com sucesso', () => {
    cy.request({
      method: 'DELETE',
      url: `list/${list_id}`,
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      failOnStatusCode: false
    }).as('postDeleteList')
    cy.get('@postDeleteList').then(response => { 
      expect(response.status).to.be.eql(200)
      expect(response.body.status_code).to.be.eql(13)
      expect(response.body.status_message).to.be.eql('The item/record was deleted successfully.')
      expect(response.body.success).to.be.true
    })
  });
})