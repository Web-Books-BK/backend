import { Model, Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from "uuid";
import { sequelizeConnection } from '../database';
import { User } from './users';
import { Room } from './room';

class Reservation extends Model {
    public id!: number;
    public userId!: string;
    public roomId!: string;
    public startDate!: number;
    public endDate!: number;
    public price!: number;
    public total!: number;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    roomId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    startDate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endDate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize: sequelizeConnection,
    modelName: 'Reservation',
    timestamps: false
});

Reservation.belongsTo(User, { foreignKey: 'userId' })
Reservation.belongsTo(Room, { foreignKey: 'roomId' })

Reservation.sync();

export { Reservation };
