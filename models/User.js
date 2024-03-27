const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_uuid: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbl_user'
});

module.exports = User;
