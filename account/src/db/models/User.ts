import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '..';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  role: 'operator'|'admin'|'user';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public role!: 'operator' | 'admin' | 'user';
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM,
      values: ['operator','admin','user']
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
