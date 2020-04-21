const Sequelize = require('sequelize');

const options = {
    database: 'log',
    username: 'root',
    password: 'mysql'
}

const sequelize = new Sequelize(options.database, options.username, options.password, {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = {
    sequelize
}