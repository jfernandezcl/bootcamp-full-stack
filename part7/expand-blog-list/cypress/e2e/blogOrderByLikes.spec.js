describe('Blog app', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:5173/api/testing/reset');


    const user = {
      username: 'Prueba1',
      name: 'Test Prueba 1',
      password: 'password123'
    };

    cy.request('POST', 'http://localhost:5173/api/users', user);
    cy.visit('http://localhost:5173');
  });

  describe('When logged in', function () {
    beforeEach(function () {

      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
    });

    it('Blogs are ordered by number of likes, with the most liked first', function () {

      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('Blog 1');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();

      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('Blog 2');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();


      cy.contains('Blog 1').should('be.visible');
      cy.contains('Blog 2').should('be.visible');


      cy.contains('Blog 1').parent().contains('like').click();
      cy.contains('Blog 1').parent().contains('1');


      cy.contains('Blog 2').parent().contains('like').click();
      cy.contains('Blog 2').parent().contains('1');


      cy.contains('Blog 2').parent().contains('like').click();
      cy.contains('Blog 2').parent().contains('2');


      cy.get('.blog')
        .eq(0)
        .should('contain', 'Blog 2')
        .and('contain', '2');

      cy.get('.blog')
        .eq(1)
        .should('contain', 'Blog 1')
        .and('contain', '1');
    });
  });
});
