const models = require('../models');

const test = async (req, res) => {
    // 1:1
    // user and address
    // 1:many
    // user and many posts
    // many:many
    // post and many categories

    // 1:1
    const user = await models.User.findByPk(2);
    return res.status(200).json({
        data: user,
    });
};

module.exports = { test };
