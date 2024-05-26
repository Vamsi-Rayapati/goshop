import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    service:UserService

    constructor() {
        this.service = new UserService();
    }
    addUser(request: Request, response: Response) {
        this.service.addUser()
    }

    getUsers(request: Request, response: Response) {
        return response.send({user_id: 'abababab'})
    }

    getUser() {

    }
}

export default  UserController;