'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like_User.belongsTo(models.User);
    }
  };
  Like_User.init({
    userID: DataTypes.INTEGER,
    contentID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like_User',
  });
  return Like_User;
};