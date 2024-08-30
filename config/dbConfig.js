const dbConfig = {
  db: process.env.DB,
  username: process.env.USERNAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: 3306,
  dialect: "mysql",
}
// const dbConfig = {
//   db: 'haha',
//   username: 'root',
//   host:'localhost',
//   password:'',
//   port: 3306,
//   dialect: "mysql",
// }

module.exports = dbConfig
