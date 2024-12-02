describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');

    const user = {
      username: 'Prueba1',
      name: 'Test Prueba 1',
      password: 'password123'
    }

    cy.request('POST', 'http://localhost:5173/api/users', user);
    cy.visit('http://localhost:5173');
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
    });

    it('A blog can be created', function () {
      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('New Blog Title');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();
      cy.contains('New Blog Title').should('be.visible');
      cy.contains('Blog Author').should('be.visible');
    })

    it('A user can like a blog', function () {

      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('New Blog Title');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();


      cy.contains('New Blog Title').parent().contains('0');


      cy.contains('New Blog Title').parent().contains('like').click();


      cy.contains('New Blog Title').parent().contains('1');
    });
  })

})