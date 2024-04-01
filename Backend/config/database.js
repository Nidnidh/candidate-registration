const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('react_project_db', 'root', 'Nidhi123@', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307, 
});

module.exports = sequelize;
