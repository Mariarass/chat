const {Schema, model} = require('mongoose');


const ChatSchema = new Schema({
    message: {
        text: { type: String, required: true },
    },
    users: Array,
        sender: {
    type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
},
},
{
    timestamps: true,

});

module.exports = model('Chat', ChatSchema);