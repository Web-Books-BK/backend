import { Model, Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from "uuid";
import { sequelizeConnection } from '../database'

class User extends Model {
  public id!: string;
  public userName!: string;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public address!: string;
  public role!: number;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

User.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.INTEGER,
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
  modelName: 'User',
  timestamps: false
});

export { User };
