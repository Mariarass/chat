const {Schema, model} = require('mongoose');


const MessageSchema = new Schema({
    message: {
        text: { type: String, required: true },
    },
    isGeneralChat: {
        type: Boolean,
        default: false,
        required:false
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

module.exports = model('Message', MessageSchema);
