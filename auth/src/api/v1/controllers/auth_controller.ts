import { Request, Response } from 'express';
import authClient from '../../../utils/AuthClient';
import gaurd from '../../../utils/gaurd';
import config from '../../../config';
import validate from '../../../utils/validate';
import { RegisterUser } from '../models/auth_models';
import auth_service from '../services/auth_service';

async function signup(req: Request, res: Response) {
  const user = await validate(RegisterUser, req.body);
  const response =  await auth_service.signup(user);
  res.status(201).json({
      token: response.token,
      refreshToken: response.refreshToken
  });
}

async function login() {

}

export default {
  login: gaurd(login),
  signup: gaurd(signup),
};
