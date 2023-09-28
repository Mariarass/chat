const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');


class UserService {
    async registration(email, password,username) {

        const candidate = await UserModel.findOne({email})
        if (candidate) {
            return new Error('ser with email address ${email} already exists')
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({email, password: hashPassword,username})

        const userDto = {_id:user.id,email:user.email};
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            return new Error('User with this email was not found')

        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return new Error('Incorrect password')

        }
        const userDto = {_id:user.id,email:user.email};
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
            return new Error('Ошибка при валидации')
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            return new Error('Ошибка')
        }
        const user = await UserModel.findById(userData.id);
        const userDto = {_id:user.id,email:user.email};
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
