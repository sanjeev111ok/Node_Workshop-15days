const makeUserTable = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Age: {
      type: DataTypes.STRING,
    },
  })
  return User
}

module.exports = makeUserTable
