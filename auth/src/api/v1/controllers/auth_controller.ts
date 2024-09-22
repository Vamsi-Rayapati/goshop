import { Request, Response } from 'express';
import authClient from '../../../utils/AuthClient';
import gaurd from '../../../utils/gaurd';
import config from '../../../config';
import validate from '../../../utils/validate';
import { RegisterUser } from '../models/auth_models';

async function signup(req: Request, res: Response) {
  const user = await validate(RegisterUser, req.body);
  try {
    const regRes = await authClient.register('', {
      registration: {
        applicationId: config.FA_APP_ID,
      },
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
    res.status(201).json({
        token: regRes.response.token,
        refreshToken: regRes.response.refreshToken
    });
  } catch (error) {
    console.error(error);
    // throw
  }
}

async function login() {

}

export default {
  login: gaurd(login),
  signup: gaurd(signup),
};
