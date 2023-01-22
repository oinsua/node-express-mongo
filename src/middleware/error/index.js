
const castError = (err, request, response, next) => {

    if (err.name === 'CastError') {
        response.status(400).send({
            error: 'id used is malformed'
        })
    } else {
        response.status(500).end()
    }
};

const finalError = (request, response) => {
    response.status(404).json({
        error: 'Not Found'
    })
};

module.exports = {
    castError,
    finalError
};