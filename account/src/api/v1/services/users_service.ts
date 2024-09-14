import User from "../../../db/models/User";
import { NotFoundError } from "../models/error_models";
import { IUser } from "../types/users_types";


async function postUser(user: IUser): Promise<User> {
    const newUser = await User.create(user);
    return newUser;
}

async function getUsers(): Promise<User[]> {
    const users = await User.findAll({raw:true});
    return users;
}

async function getUser(userId: string): Promise<User> {
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

async function deleteUser(userId: string): Promise<number>{
    const user = await User.destroy({
        where: {
            id: userId
        }
    });

    return user;
}

async function patchUser(userId: string, updatedUser: IUser): Promise<[affectedCount: number]> {
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