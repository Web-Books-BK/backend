import { Model, Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from "uuid";
import { sequelizeConnection } from '../database'

class Room extends Model {
    public id!: string;
    public name!: string;
    public desciption!: string;
    public available!: string;
    public livingRoom!: number;
    public bedroom!: number;
    public toilet!: number;
    public wifi!: boolean;
    public swimmingPool!: boolean;
    public images!: Array<string>;
    public price!: number;
    public address!: string;
    public phone!: string;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}


Room.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desciption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
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
        type: DataTypes.ARRAY,
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

Room.sync();

export { Room };
