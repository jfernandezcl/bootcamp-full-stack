describe('Blog app', function () {
  beforeEach(function () {
    // Resetea la base de datos antes de cada prueba
    cy.request('POST', 'http://localhost:5173/api/testing/reset');

    // Crea un usuario para pruebas
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
      // Inicia sesión con un usuario
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
    });

    it('A user can like a blog', function () {
      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('New Blog Title');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();

      // Verifica que el contador de "likes" es 0 inicialmente
      cy.contains('New Blog Title').parent().contains('0');

      // Hace click en el botón "like"
      cy.contains('New Blog Title').parent().contains('like').click();

      // Verifica que el contador de "likes" se incrementa a 1
      cy.contains('New Blog Title').parent().contains('1');
    });

    it('A user can delete a blog they created', function () {
      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('New Blog Title');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();

      cy.contains('New Blog Title').should('be.visible');
      cy.contains('New Blog Title').parent().find('button').contains('Delete').click();
      cy.contains('New Blog Title').should('not.exist');
    });

    it('Only the creator can see the delete button', function () {
      // Crear un blog
      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('Blog to be deleted');
      cy.get('input[name="author"]').type('Blog Author');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('button[type="submit"]').click();

      cy.contains('Blog to be deleted').should('be.visible');

      // Verificar que el creador puede ver el botón "Delete"
      cy.contains('Blog to be deleted').parent().find('button').contains('Delete').should('be.visible');

      // Iniciar sesión como otro usuario
      cy.get('input[name="username"]').type('anotheruser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      // Verificar que el otro usuario no ve el botón "Delete"
      cy.contains('Blog to be deleted').parent().find('button').contains('Delete').should('not.exist');
    });
  });
});
