export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('ReadingLists', 'read', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('ReadingLists', 'read');
}
