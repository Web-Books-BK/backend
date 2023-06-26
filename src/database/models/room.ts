import { Model, Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from "uuid";
import { sequelizeConnection } from '../database'
import { User } from './users';

class Room extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public available!: string;
    public category!: string;
    public livingRoom!: number;
    public bedroom!: number;
    public toilet!: number;
    public wifi!: boolean;
    public swimmingPool!: boolean;
    public images!: Array<string>;
    public price!: number;
    public address!: string;
    public phone!: string;
    public owner!: string;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}


Room.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    livingRoom: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    bedroom: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    toilet: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    wifi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    swimmingPool: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.UUID,
        allowNull: false,
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
    modelName: 'Room',
    timestamps: false
});

Room.belongsTo(User, {foreignKey:"owner"})
Room.sync();

export { Room };
