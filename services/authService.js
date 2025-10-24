const jwtService = require('./jwtService');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const PatientService = require('../services/PatientService');
const userService = require('../services/userService');
module.exports = {

    async login({ email, password }) {
        try {

        if (!email || !password) {
            throw new Error("password and email riquired");
        }

            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("there's no account with this email");
            }

            const isRight = await bcrypt.compare(password, user.password);
            if (!isRight) {
                throw new Error("wrong email or password, please try again");
            }

            let tokens = jwtService.create(user);
           
            return { user, tokens }

        } catch (err) {
            console.error(err); 
           throw err;
        }
    },

    
    async register({ name, email, password ,role}) {
        try {
        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }
        
         const user = await User.findOne({ email });
            if (user) {
                throw new Error("An account with this email already exists");
            }

            if (!role) {
                role = 'patient';
            }
         const newUser = await userService.hashAndSave({name,email,password,role});

            if(newUser.role==='patient'){
             await PatientService.create(newUser);
            }

            const tokens = jwtService.create(newUser);

            return { user: newUser, tokens };

        } catch (err) {
            console.error(err); 
           throw err;
        }
    }

}