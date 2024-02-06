const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const internalServerError = require('../utils/internalServerError');

const register = async (req, res) => {
    try {
        const existingUser = await models.User.findOne({
            where: { email: req.body.email },
        });
        if (existingUser)
            return res.status(409).json({ message: 'User already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        };
        const createdUser = await models.User.create(user);
        if (!createdUser)
            return res.status(500).json({ message: 'Failed to create user' });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        return internalServerError(res, err);
    }
};

const login = async (req, res) => {
    try {
        const user = await models.User.findOne({
            where: { email: req.body.email },
        });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign(
            { email: req.body.email, userId: user.id },
            process.env.JWT_SECRET_KEY
        );
        return res
            .status(200)
            .json({ message: 'Authentication successful', token });
    } catch (error) {
        return internalServerError(res, err);
    }
};

module.exports = { register, login };
