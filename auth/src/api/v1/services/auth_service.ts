import config from '../../../config';
import authClient from '../../../utils/AuthClient';
import { RegisterUser } from '../models/auth_models';
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
      },
    });
  
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

export async function login(user:RegisterUser) {
  try {
    const regUser = await authClient.login({
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
