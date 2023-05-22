import { Sequelize } from 'sequelize';
import 'dotenv/config'
require('dotenv').config()

const sequelizeConnection = new Sequelize(
    process.env.DB_NAME || "defautl",
    process.env.DB_USER_NAME || "default",
    process.env.DB_PASSWORD || "default",
    {
        host: process.env.HOST || "localhost",
        port: Number((process.env.PORT || "3306")),
        logging: true,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

const checkConnection = () => {
    try {
        sequelizeConnection.authenticate()
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error(`Unable to connect to the database, err: ${err}`);
    }
}

checkConnection();

export { sequelizeConnection };
