import { PublicAxios } from './axiosHandler'
class SignInUpService {
    static endpoint='login'
    static endpoint1='signup'
    static signIn(body) {
        return PublicAxios.post(`${SignInUpService.endpoint}`,body)
    }
    static signUp(body) {
        return PublicAxios.post(`${SignInUpService.endpoint1}`,body)
    }
}

export default SignInUpService