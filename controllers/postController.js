const Validator = require('fastest-validator');
const models = require('../models');
const internalServerError = require('../utils/internalServerError');

const save = async (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId,
    };
    const schema = {
        title: { type: 'string', optional: false, max: '100' },
        content: { type: 'string', optional: false, max: '500' },
        categoryId: { type: 'number', optional: false },
    };
    const v = new Validator();
    const validationRepsonse = v.validate(post, schema);
    if (validationRepsonse !== true)
        return res
            .status(400)
            .json({ message: 'Validation failed', errors: validationRepsonse });
    try {
        const categoryIdExists = await models.Category.findByPk(
            req.body.category_id
        );
        if (!categoryIdExists) {
            return res.status(400).json({ message: 'Invalid category id' });
        }
    } catch (err) {
        return internalServerError(res, err);
    }
    models.Post.create(post)
        .then((result) => {
            return res
                .status(201)
                .json({ message: 'Post created successfully', post: result });
        })
        .catch((err) => internalServerError(res, err));
};

const getOne = (req, res) => {
    const id = req.params.id;
    models.Post.findByPk(id)
        .then((result) => {
            if (result) return res.status(200).json({ result });
            else return res.status(404).json({ message: 'Post not found' });
        })
        .catch((err) => internalServerError(res, err));
};

const getAll = (req, res) => {
    models.Post.findAll()
        .then((result) => res.status(200).json({ result }))
        .catch((err) => internalServerError(res, err));
};

const update = async (req, res) => {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    };
    const userId = req.userData.userId;
    const schema = {
        title: { type: 'string', optional: false, max: '100' },
        content: { type: 'string', optional: false, max: '500' },
        categoryId: { type: 'number', optional: false },
    };
    const v = new Validator();
    const validationRepsonse = v.validate(updatedPost, schema);
    if (validationRepsonse !== true)
        return res
            .status(400)
            .json({ message: 'Validation failed', errors: validationRepsonse });
    try {
        const categoryIdExists = await models.Category.findByPk(
            req.body.category_id
        );
        if (!categoryIdExists) {
            return res.status(400).json({ message: 'Invalid category id' });
        }
    } catch (err) {
        return internalServerError(res, err);
    }
    models.Post.update(updatedPost, { where: { id, userId } })
        .then((result) =>
            res.status(200).json({
                message: 'Post updated successfully',
                post: updatedPost,
            })
        )
        .catch((err) => internalServerError(res, err));
};

const destroy = (req, res) => {
    const id = req.params.id;
    const userId = req.userData.userId;
    models.Post.destroy({ where: { id, userId } })
        .then((result) =>
            res.status(200).json({ message: 'Post deleted successfully' })
        )
        .catch((err) => internalServerError(res, err));
};

module.exports = { save, getOne, getAll, update, destroy };
