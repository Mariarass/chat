const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');;
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {

        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`User with email address ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({email, password: hashPassword})

        const userDto ={ email: user.email,id: user._id}
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw new Error('User with this email was not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Incorrect password')
        }
        const userDto = { email: user.email,id: user._id}
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            return new Error('User is not authorized')

        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            return new ApiError(401, 'User is not authorized')
        }
        const user = await UserModel.findById(userData.id);
        const userDto = { email: user.email,id: user._id}
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();
