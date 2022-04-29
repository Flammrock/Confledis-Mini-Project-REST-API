import { Dialect, Sequelize } from "sequelize";

/*
const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})
*/

// this project is just a simple demonstration of a rust api
const sequelizeConnection = new Sequelize("sqlite::memory:");

export default sequelizeConnection;
