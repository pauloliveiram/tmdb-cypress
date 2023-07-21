describe('Validar o endpoint POST /list/add_movie', () => {

  afterEach(() => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/remove_item',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: {'media_id': 26}
    })
  })

  it('Validar adição de filme na lista com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/add_item',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: {'media_id': 26}
    }).as('postAddMovie')
    cy.get('@postAddMovie').then(response => {
      expect(response.status).to.be.eql(201)
      expect(response.body.success).to.be.true
      expect(response.body.status_code).to.be.eql(12)
      expect(response.body.status_message).to.be.eql('The item/record was updated successfully.')
    }) 
  });

  it('Validar erro ao tentar adicionar o mesmo filme mais de uma vez', () => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/add_item',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: {'media_id': 26}
    })
    cy.request({
      method: 'POST',
      url: '/list/8260674/add_item',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: {'media_id': 26},
      failOnStatusCode: false
    }).as('postAddMovie')
    cy.get('@postAddMovie').then(response => {
      expect(response.status).to.be.eql(403)
      expect(response.body.success).to.be.false
      expect(response.body.status_code).to.be.eql(8)
      expect(response.body.status_message).to.be.eql('Duplicate entry: The data you tried to submit already exists.')
    })
  });

  it('Validar erro ao adicionar o filme sem estar autorizado', () => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/add_item',
      body: {'media_id': 26},
      failOnStatusCode: false
    }).as('postAddMovie')
    cy.get('@postAddMovie').then(response => {
      expect(response.status).to.be.eql(401)
      expect(response.body.success).to.be.false
      expect(response.body.status_code).to.be.eql(7)
      expect(response.body.status_message).to.be.eql('Invalid API key: You must be granted a valid key.')
    })
  });

  it('Validar erro ao adicionar filme inválido', () => {
    cy.request({
      method: 'POST',
      url: '/list/8260674/add_item',
      headers: {'Authorization': 'Bearer ' + Cypress.env('AUTH_TOKEN')},
      body: {'media_id': "inv"},
      failOnStatusCode: false
    }).as('postAddMovie')
    cy.get('@postAddMovie').then(response => {
      expect(response.status).to.be.eql(404)
      expect(response.body.success).to.be.false
      expect(response.body.status_code).to.be.eql(34)
      expect(response.body.status_message).to.be.eql('The resource you requested could not be found.')
    })
  });
})