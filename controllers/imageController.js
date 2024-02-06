const internalServerError = require('../utils/internalServerError');

const upload = (req, res) => {
    if (req.file.filename) {
        return res.status(201).json({
            message: 'Image uploaded successfully',
            url: req.file.filename,
        });
    } else {
        return internalServerError(res, 'Internal Server Error');
    }
};

module.exports = { upload };
