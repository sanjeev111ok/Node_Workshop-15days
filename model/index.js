const { Sequelize, DataTypes } = require("sequelize")
const dbConfig = require("../config/dbConfig")
const makeBlogTable = require("./blogModel")
const makeUserTable = require("./userModel")

const sequelize = new Sequelize(
  dbConfig.db,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  }
)
// const sequelize = new Sequelize("haha", "root", "", {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
//   operatorsAliases: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 3000,
//     idle: 10000,
//   },
// })

sequelize
  .authenticate()
  .then(() => {
    console.log("milyo hoii tw guyz")
  })
  .catch((err) => {
    console.log("error aayo hoii tw", err)
  })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.blogs = makeBlogTable(sequelize, DataTypes)
db.users = makeUserTable(sequelize, DataTypes)

db.sequelize.sync({ force: false}).then(() => {
  console.log("Successfully synced!!")
})

module.exports = db
