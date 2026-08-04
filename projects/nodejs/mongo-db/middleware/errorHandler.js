const errorHandler = (error, req, res, next) => {
    console.error(error);

    if (error.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }

    if (error.name === 'ValidationError') {
        const errors = Object.fromEntries(
            Object.entries(error.errors).map(([field, fieldError]) => [
                field,
                fieldError.message
            ])
        );

        return res.status(400).json({
            message: 'Validation Error',
            errors
        });
    }

    res.status(500).json({ message: 'Internal server error' });

};

module.exports = errorHandler;