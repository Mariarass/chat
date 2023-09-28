const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]

})

module.exports = model('User', UserSchema);
