const controller = require('../controllers/usersController');
const router = require('express').Router();
const authenticateJWT = require('../middlewares/auth');

// CRUD Routes /users
router.get('/', authenticateJWT, controller.getUsers); // /users
router.get('/:userId', authenticateJWT, controller.getUser); // /users/:userId
router.put('/:userId', authenticateJWT, controller.updateUser); // /users/:userId
router.delete('/:userId', authenticateJWT, controller.deleteUser); // /users/:userId

module.exports = router;
