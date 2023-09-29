const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const chatController=require('../controllers/chat-controller')
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users/:id', authMiddleware, userController.getUsers);
router.post("/addmsg/", chatController.addMessage);
router.post("/getmsg/", chatController.getAllMessage);

module.exports = router
