import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
      isInt: true
    }
  }
}, {
  tableName: 'blogs',
  timestamps: true
});

export default Blog;
