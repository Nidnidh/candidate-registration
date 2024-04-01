const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Candidate = db.define("candidate", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    
  },
  mobile: {
    type: DataTypes.INTEGER,

  },
  resume_file_id: {
    type: DataTypes.STRING(255),
  
  },
  relevant_experience: {
    type: DataTypes.TEXT,
 
  },
  linkedin_url: {
    type: DataTypes.STRING(255),
  
  },
  address: {
    type: DataTypes.TEXT,
  
  },
});

module.exports = Candidate;
