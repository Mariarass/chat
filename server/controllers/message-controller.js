
const MessageModel = require('../models/message-model');
class MessageController {
    async addMessage (req, res, next) {
        try {
            const { from, to, message,isGeneralChat } = req.body;
            let users = [from];
            if (to) {
                users.push(to);
            }
            const data = await MessageModel.create({
                message: { text: message },
                users,
                sender: from,
                isGeneralChat
            });

            if (data) return res.json({ msg: "Message added successfully." });
            else return res.json({ msg: "Failed to add message to the database" });
                }
        catch (ex) {
            next(ex);
        }}
    async getAllMessage(req, res, next){
        try {
            const { from, to } = req.body;

            const messages = await MessageModel.find({
                users: {
                    $all: [from, to],
                },
            }).sort({ updatedAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    time:msg.createdAt
                };
            });
            res.json(projectedMessages);
        } catch (ex) {
            next(ex);
        }
}

    async getAllGeneralChatMessage(req, res, next){
        try {

            const messages = await MessageModel.find({ isGeneralChat: true })

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === req.body.from,
                    message: msg.message.text,
                    time:msg.createdAt,
                    sender:msg.sender
                };
            });
            res.json(projectedMessages);

        } catch (ex) {
            next(ex);
        }
    }

}


module.exports = new MessageController();
