import { Model, Sequelize, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../database'
import { Reservation } from "./reservation"

class Review extends Model {
    public id!: string;
    public reservationId!: string;
    public rating!: number;
    public comment!: string;
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
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
    modelName: 'User',
    timestamps: false
});
Review.belongsTo(Reservation, { foreignKey: "reservationId" })

export { Review };
