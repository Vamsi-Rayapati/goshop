import FusionAuthClient from '@fusionauth/typescript-client';
import config from '../config';

const authClient = new FusionAuthClient(config.FA_API_KEY, config.FA_URL);
// client.regi

export default authClient;
