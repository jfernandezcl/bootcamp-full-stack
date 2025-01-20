import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import User from './user.js';
import Blog from './blog.js';

const ReadingList = sequelize.define('ReadingList', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  blog_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Blog, key: 'id' }
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'reading_list',
  timestamps: true
});

// Definir relaciones
User.hasMany(ReadingList, { foreignKey: 'user_id' });
ReadingList.belongsTo(User, { foreignKey: 'user_id' });

Blog.hasMany(ReadingList, { foreignKey: 'blog_id' });
ReadingList.belongsTo(Blog, { foreignKey: 'blog_id' });

export default ReadingList;
