export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('reading_list', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('UUID()'),
      primaryKey: true
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    blog_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'blogs',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('reading_list');
}
