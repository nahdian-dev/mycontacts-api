const constants = require('../constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.json({
                title: "BAD_REQUEST",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT_FOUND",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.METHOD_NOT_ALLOWED:
            res.json({
                title: "METHOD_NOT_ALLOWED",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "INTERNAL_SERVER_ERROR",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.SERVICE_UNAVAILABLE:
            res.json({
                title: "SERVICE_UNAVAILABLE",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.GATEWAY_TIMEOUT:
            res.json({
                title: "GATEWAY_TIMEOUT",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        default:
            res.json({
                title: "HTTP ERROR!",
                message: err.message,
                stackTrace: err.stack
            })
            break;
    }

}

module.exports = errorHandler