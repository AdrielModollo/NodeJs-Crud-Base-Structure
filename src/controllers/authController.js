const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Usuário não encontrado'
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
                            message: 'Autenticação realizada com sucesso',
                            token: token
                        });
                    }
                    return res.status(401).json({
                        message: 'Falha na autenticação'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Falha na autenticação'
            });
        });
};

exports.register = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            return User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
        })
        .then(result => {
            console.log('Usuário criado');
            res.status(201).json({
                message: 'Usuário criado com sucesso!',
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Falha na criação do usuário'
            });
        });
};
