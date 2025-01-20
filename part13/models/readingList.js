import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const ReadingList = sequelize.define('ReadingList', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  blog_id: {
    type: DataTypes.UUID,
    allowNull: false
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

export default ReadingList;
