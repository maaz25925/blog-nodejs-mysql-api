const internalServerError = (res, err) => {
    return res
        .status(500)
        .json({ message: 'Something went wrong', error: err });
};

module.exports = internalServerError;
