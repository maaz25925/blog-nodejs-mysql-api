const Validator = require('fastest-validator');
const models = require('../models');
const internalServerError = require('../utils/internalServerError');

const save = (req, res) => {
    const comment = {
        content: req.body.content,
        postId: req.body.post_id,
        userId: 1,
    };
    const schema = {
        content: {
            type: 'string',
            optional: false,
            max: '500',
        },
        postId: {
            type: 'number',
            optional: false,
        },
    };
    const v = new Validator();
    const validationResponse = v.validate(comment, schema);
    if (!validationResponse) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validationResponse,
        });
    }
    models.Post.findByPk(req.body.post_id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            } else {
                models.Comment.create(comment)
                    .then((result) => {
                        return res.status(201).json({
                            message: 'Comment created successfully',
                            comment: result,
                        });
                    })
                    .catch((err) => internalServerError(res, err));
            }
        })
        .catch((err) => internalServerError(res, err));
};

const show = (req, res) => {
    const id = req.params.id;
    models.Comment.findByPk(id)
        .then((result) => {
            if (result) {
                return res.status(200).json({ result });
            } else {
                return res.status(404).json({ message: 'Comment not found' });
            }
        })
        .catch((err) => internalServerError(res, err));
};

const getAll = async (req, res) => {
    try {
        const result = await models.Comment.findAll();
        return res.status(200).json({ result });
    } catch (err) {
        return internalServerError(res, err);
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedComment = { content: req.body.content };
        const userId = 1;
        const schema = {
            content: { type: 'string', optional: false, max: '500' },
        };
        const v = new Validator();
        const validationRepsonse = v.validate(updatedComment, schema);
        if (!validationRepsonse) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationRepsonse,
            });
        }
        const result = await models.Comment.update(updatedComment, {
            where: { id, userId },
        });
        return res
            .status(200)
            .json({ message: 'Comment updated successfully', updatedComment });
    } catch (err) {
        return internalServerError(res, err);
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = 1;
        const result = await models.Comment.destroy({ where: { id, userId } });
        return res
            .status(200)
            .json({ message: 'Comment deleted successfully' });
    } catch (err) {
        return internalServerError(res, err);
    }
};

module.exports = {
    save,
    show,
    getAll,
    update,
    destroy,
};
