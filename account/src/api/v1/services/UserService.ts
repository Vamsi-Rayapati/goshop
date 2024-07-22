import User from "../../../db/models/User";

class UserService {
    addUser() {
        User.create({
            name:'Vamsi',
            email:'vamsi.rayapati@gmail.com',
            role:'user'
        })
        
    }
}

export default UserService;