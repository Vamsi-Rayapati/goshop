import User from "../../../db/models/User";
import { IUser } from "../types/users_types";


async function postUser(user: IUser) {
    const data= await User.create(user);
    console.log(data);
    return data;
}

async function getUsers(): Promise<IUser[]> {
    const users= await User.findAll({raw:true});
    // console.log(users)
    return users;
}


export default {
    postUser,
    getUsers
}