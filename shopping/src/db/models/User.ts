import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '..';
import { IUser } from '../../api/v1/types/users_types';

type UserCreationAttributes = Optional<IUser, 'id'>;

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id: number;

  public firstName: string;

  public lastName: string;

  public email: string;

  public role: 'operator' | 'admin' | 'user';
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['operator', 'admin', 'user'],
    },
  },
  {
    sequelize,
    tableName: 'users',
  },
);

export default User;
