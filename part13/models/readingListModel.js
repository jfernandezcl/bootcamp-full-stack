import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';
import Blog from './blogModel.js';

const ReadingList = sequelize.define('ReadingList', {
  read: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Definir relaciones
User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });

ReadingList.belongsTo(User);
ReadingList.belongsTo(Blog);

export default ReadingList;
