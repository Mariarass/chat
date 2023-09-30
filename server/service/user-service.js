const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password,username) {

        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`User with email address ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({email, password: hashPassword,username})

        const userDto ={email:user.email,_id:user._id};
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('User with this email was not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }
        const userDto = {email:user.email,_id:user._id};
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData._id);
        const userDto ={email:user.email,_id:user._id};
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers(id) {

        const users = await UserModel.find({ _id: { $ne: id } }).select([
            "email",
            "username",
            "_id",
        ]);


        return users;
    }
}

module.exports = new UserService();
