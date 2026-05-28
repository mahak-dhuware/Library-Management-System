const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_EROR :
            res.json ({
                title: "Validation Error",
                messsage: err.message
            });
            case constants.UNAUTHORIZED :
            res.json ({
                title: "Unauthorized",
                messsage: err.message
            });
            case constants.FORBIDDEN :
            res.json ({
                title: "Forbidden",
                messsage: err.message
            });
            case constants.NOT_FOUND :
            res.json ({
                title: "Not Found",
                messsage: err.message
            });
            case constants.SERVER_EROR :
            res.json ({
                title: "Server Error",
                messsage: err.message
            });
            default:
                console.log("No Error, All good !!");
                break;
    }
}

module.exports = errorHandler;