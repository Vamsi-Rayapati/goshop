import { Request, Response } from "express";
import { User } from "../models/user_models";
import users_service from "../services/users_service";
import gaurd from "../../../utils/gaurd";
import validate from "../../../utils/validate";


async function postUser(request: Request, response: Response): Promise<void> {
    const user = await validate(User,request.body)
    const savedUser = await users_service.postUser(user);
    response.json(savedUser);
}

async function getUsers(request: Request, response: Response): Promise<void> {
    const users = await users_service.getUsers();
    response.json({
        users: users
    });
}

async function getUser(request: Request, response: Response): Promise<void> {
    const user = await users_service.getUser(request.params.userId);
    response.json(user);
}

async function patchUser(request: Request, response: Response): Promise<void> {
    const user = await users_service.patchUser(request.params.userId,request.body);
    response.json(user);
}

async function deleteUser(request: Request, response: Response): Promise<void> {
    const user = await users_service.deleteUser(request.params.userId);
    response.json(user);
}


export default {
    getUsers: gaurd(getUsers),
    getUser: gaurd(getUser),
    postUser: gaurd(postUser),
    patchUser: gaurd(patchUser),
    deleteUser: gaurd(deleteUser)
};