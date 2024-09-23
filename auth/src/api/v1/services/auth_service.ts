import config from "../../../config";
import authClient from "../../../utils/AuthClient";
import { RegisterUser } from "../models/auth_models";

export async function signup(user:RegisterUser) {
    const regUser = await authClient.register('', {
        registration: {
          applicationId: config.FA_APP_ID,
        },
        user: {
          email: user.email,
          password: user.password,
        },
    })

    console.log(regUser);

    return regUser.response;
    
}


export default {
    signup
}