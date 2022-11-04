

const validationBody = (schema) => {
    return async (req, res, next) => {
        const validateResult = schema.validate(req.body);

        if (validateResult.error) {
            res.status(400);
            next(validateResult.error);
            return;
        }

        next();
    }
}

module.exports = {
    validationBody,
}