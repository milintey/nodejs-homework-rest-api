const validationBody = (schema) => {
    return async (req, res, next) => {
        const valid = schema.validate(req.body);

        if (valid.error) {
            valid.error.status = 400;
            next(valid.error);
        }

        next();
    }
}

module.exports = {
    validationBody,
}