import { Request, Response } from "express";
import { User } from "../models/user_models";
import users_service from "../services/users_service";
import gaurd from "../../../utils/gaurd";
import validate from "../../../utils/validate";


async function postUser(request: Request, response: Response) {
   const user = await validate(User,request.body)
    const savedUser = await users_service.postUser(user);
    // console.log('saved...............')
    response.json(savedUser);
}

async function getUsers(request: Request, response: Response) {
    const users = await users_service.getUsers();

    response.json({
        users: users
    });
}

async function getUser(request: Request, response: Response) {

}

async function patchUser(request: Request, response: Response) {

}

async function deleteUser(request: Request, response: Response) {

}


export default {
    getUsers: gaurd(getUsers),
    getUser: gaurd(getUser),
    postUser: gaurd(postUser),
    patchUser: gaurd(patchUser),
    deleteUser: gaurd(deleteUser)
};