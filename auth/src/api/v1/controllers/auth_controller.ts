import { Request, Response } from 'express';
import authClient from '../../../utils/AuthClient';
import gaurd from '../../../utils/gaurd';
import config from '../../../config';
import validate from '../../../utils/validate';
import { LoginUser, RegisterUser } from '../models/auth_models';
import auth_service from '../services/auth_service';

async function signup(req: Request, res: Response) {
  const user = await validate(RegisterUser, req.body);
  const response = await auth_service.signup(user);
  console.log('VRRR Res', response)
  res.status(201).json({ 
    token: response.token,
    refreshToken: response.refreshToken,
  });
}

async function login(req: Request, res: Response) {
  const app = await authClient.retrieveApplication(config.FA_APP_ID)
  console.log('App', app.response.application?.loginConfiguration);
  const user = await validate(LoginUser, req.body);
  const response = await auth_service.login(user);
  // console.log('VRRR Res', response)
  res.status(201).json({
    token: response.token,
    refreshToken: response.refreshToken,
  });

} 

export default {
  login: gaurd(login),
  signup: gaurd(signup),
};
