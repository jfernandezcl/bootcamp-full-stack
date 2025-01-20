export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('blogs', 'year', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: new Date().getFullYear(),
    validate: {
      min: 1991,
      max: new Date().getFullYear()
    }
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('blogs', 'year');
}
