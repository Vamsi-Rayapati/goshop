import User from "../../../db/models/User";
import { NotFoundError } from "../models/error_models";
import { IUser } from "../types/users_types";


async function postUser(user: IUser) {
    const newUser = await User.create(user);
    return newUser;
}

async function getUsers(): Promise<IUser[]> {
    const users = await User.findAll({raw:true});
    return users;
}

async function getUser(userId: string): Promise<IUser> {
    const user = await User.findOne({raw:true,
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new NotFoundError('User Not Found');
    }
    return user;
}

async function deleteUser(userId: string) {
    const user = await User.destroy({
        where: {
            id: userId
        }
    });

    return user;
}

async function patchUser(userId: string, updatedUser: IUser) {
    const user = await User.update(updatedUser,{
        where: {
            id: userId
        }
    });

    return user;
}


export default {
    postUser,
    getUsers,
    getUser,
    deleteUser,
    patchUser
}