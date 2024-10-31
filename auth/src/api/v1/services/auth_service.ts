import axios from 'axios';
import config from '../../../config';
import authClient from '../../../utils/AuthClient';
import { LoginUser, RegisterUser } from '../models/auth_models';
import { ValidationError } from '../models/error_models';

export async function signup(user:RegisterUser) {
  try {
    const regUser = await authClient.register('', {
      registration: {
        applicationId: config.FA_APP_ID,
      },
      user: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
      },
    });

    await axios.request({
      url: `${config.ACCOUNT_SERVICE_URL}/account/api/v1/internal/users`,
      method: 'POST',
      data: {
        id: regUser.response.user?.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: 'user'
      },
    })
  
    return regUser.response;
    
  } catch (error:any) {
    if(error.statusCode===400) {
      const fieldErrors = error.exception?.fieldErrors ?? {};
      const firstError:any = Object.values(fieldErrors)[0];
      if(firstError?.[0]) throw new ValidationError(firstError[0].message)
    }
    throw error;
  }
  
}

export async function login(user:LoginUser) {
  try {
    const regUser = await authClient.login({
      applicationId: config.FA_APP_ID,
      loginId: user.email,
      password: user.password
    });
  
    return regUser.response;
    
    
  } catch (error:any) {
    throw error;
  }
}

export default {
  signup,
  login  
};
