describe('Validar o enpoint POST /list', () => {
  let list_id;

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `list/${list_id}`,
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      failOnStatusCode: false
    })
  })

  it('Validar criação de uma lista com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/list',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: { "name": "Teste da automação",
              "description": "",
              "language": "pt-br" }
    }).as('postCreateList')
    cy.get('@postCreateList').then(response => {
      list_id = response.body.list_id
      expect(response.status).to.be.eql(201)
      expect(response.body.status_code).to.be.eql(1)
      expect(response.body.status_message).to.be.eql('The item/record was created successfully.')
      expect(response.body.success).to.be.true
      expect(response.body.list_id).to.be.a('number')
    })
  });
})