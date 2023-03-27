const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../../../infra/repositories/models/userModel');
const registerUserSchema = require('../../../interface/schema/registerUserSchema');
const loginAuthSchema = require('../../../interface/schema/loginAuthSchema');


dotenv.config();

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const { error } = loginAuthSchema.validate({ email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log(process.env.JWT_KEY)
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user.id.toString()
                            },
                            process.env.JWT_KEY,
                            { expiresIn: '1h' }
                        );
                        return res.status(200).json({
                            message: 'Authentication successful',
                            token: token
                        });
                    }
                    return res.status(401).json({
                        message: 'Authentication failed'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Authentication failed'
            });
        });
};

exports.register = (req, res, next) => {
    const { name, email, password } = req.body;

    const { error } = registerUserSchema.validate({ name, email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    User.findOne({ where: { email: email } })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({
                    message: 'Email already registered'
                });
            }

            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    return User.create({
                        name: name,
                        email: email,
                        password: hashedPassword
                    });
                })
                .then(result => {
                    res.status(201).json({
                        message: 'User created successfully!',
                        user: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Failed to create user'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Email validation failed'
            });
        });
};
