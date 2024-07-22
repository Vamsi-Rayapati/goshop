import { Request, Response } from "express";
import UserService from "../services/UserService";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

class UserController {
    service:UserService

    constructor() {
        this.service = new UserService();
        this.addUser = this.addUser.bind(this)

    }

    async addUser(request: Request, response: Response) {

        // const user = plainToClass(User,request.body);
        // validate(request.body)
        // console.log('Service', this);
        // this.service.addUser()
        // response.send({
        //     message:'User added'
        // })
    }

    getUsers(request: Request, response: Response) {
        return response.send({user_id: 'abababab'})
    }

    getUser() {

    }
}

export default  UserController;