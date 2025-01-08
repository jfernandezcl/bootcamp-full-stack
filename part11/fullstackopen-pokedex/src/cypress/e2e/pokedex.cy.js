/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
describe('Pokedex', function () {
  // Primera prueba: Verificar que la página principal se carga
  // eslint-disable-next-line no-undef
  it('front page can be opened', function () {
    cy.visit('http://localhost:5000')  // Visitar la página principal
    cy.contains('ivysaur')  // Verificar que el nombre 'ivysaur' está en la página
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')  // Verificar el texto de derechos de autor
  })

  // Segunda prueba: Verificar la navegación a la página de un Pokémon específico
  it('navigate to a Pokémon page', function () {
    cy.visit('http://localhost:5000')  // Visitar la página principal
    cy.contains('ivysaur').click()  // Hacer clic en el enlace de 'ivysaur'
    cy.contains('chlorophyll')  // Verificar que el texto 'chlorophyll' (habilidad de Ivysaur) está presente en la página
  })
})
