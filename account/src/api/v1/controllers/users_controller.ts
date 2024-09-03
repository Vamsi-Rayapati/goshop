import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { User } from "../models/user_models";
import users_service from "../services/users_service";


async function postUser(request: Request, response: Response) {

    const user = plainToClass(User,request.body)
    await validate(user)
    const savedUser = users_service.postUser(user);
    response.sendStatus(200);
}

async function getUsers(request: Request, response: Response) {
    const users = await users_service.getUsers();

    // response.sendStatus(200)  
    // response.setHeader('Content-Type', 'application/json');
    // response.send(JSON.stringify({
    //     users: []
    // }))

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
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
};