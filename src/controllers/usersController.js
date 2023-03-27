const User = require('../models/userModel');
const updateUserSchema = require('../interface/schema/updateUserSchema');
const getByIDUserSchema = require('../interface/schema/getByIDUserSchema');
const deleteByIDUserSchema = require('../interface/schema/deleteByIDUserSchema');


// CRUD Controllers

//get all users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

//get user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;

    const { error: validationError } = getByIDUserSchema.validate({ params: { userId } });
    if (validationError) {
        return res.status(400).json({ message: validationError.details[0].message });
    }

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}


//update user
exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const { name: updatedName, email: updatedEmail, password: updatedPassword } = req.body;

    const { error: validationError } = updateUserSchema.validate({ params: { userId }, body: { name: updatedName, email: updatedEmail, password: updatedPassword } });
    if (validationError) {
        return res.status(400).json({ message: validationError.details[0].message });
    }

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            user.name = updatedName;
            user.email = updatedEmail;
            user.password = updatedPassword;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'User updated!', user: result });
        })
        .catch(err => console.log(err));
}

//delete user
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    const { error: validationError } = deleteByIDUserSchema.validate({ params: { userId } });
    if (validationError) {
        return res.status(400).json({ message: validationError.details[0].message });
    }

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            return User.destroy({
                where: {
                    id: userId
                }
            });
        })
        .then(result => {
            res.status(200).json({ message: 'User deleted!' });
        })
        .catch(err => console.log(err));
}