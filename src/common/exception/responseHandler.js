// responseHandler.js
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503,
};

module.exports = {
    handleResponse: (res, statusCode, data = null, message = null) => {
        let defaultMessage;

        switch (statusCode) {
            case HTTP_STATUS.OK:
                defaultMessage = "Operation successful";
                break;
            case HTTP_STATUS.CREATED:
                defaultMessage = "Resource created successfully";
                break;
            case HTTP_STATUS.ACCEPTED:
                defaultMessage = "Request accepted for processing";
                break;
            case HTTP_STATUS.NO_CONTENT:
                defaultMessage = "No content available";
                data = null;
                break;
            case HTTP_STATUS.BAD_REQUEST:
                defaultMessage = "Bad Request";
                break;
            case HTTP_STATUS.UNAUTHORIZED:
                defaultMessage = "Unauthorized access";
                break;
            case HTTP_STATUS.FORBIDDEN:
                defaultMessage = "Access forbidden";
                break;
            case HTTP_STATUS.NOT_FOUND:
                defaultMessage = "Resource not found";
                break;
            case HTTP_STATUS.METHOD_NOT_ALLOWED:
                defaultMessage = "Method not allowed";
                break;
            case HTTP_STATUS.CONFLICT:
                defaultMessage = "Conflict occurred";
                break;
            case HTTP_STATUS.UNPROCESSABLE_ENTITY:
                defaultMessage = "Unprocessable entity";
                break;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                defaultMessage = "Internal server error";
                break;
            case HTTP_STATUS.NOT_IMPLEMENTED:
                defaultMessage = "Not implemented";
                break;
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                defaultMessage = "Service unavailable";
                break;
            default:
                defaultMessage = "Unknown status code";
        }

        res.status(statusCode).json({
            status: statusCode < 400 ? "success" : "error",
            message: message || defaultMessage,
            data: statusCode < 400 ? data : null,
        });
    },
};