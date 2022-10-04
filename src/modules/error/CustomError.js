"use strict";
exports.__esModule = true;
var CustomError = /** @class */ (function () {
    function CustomError() {
    }
    CustomError.badRequest = function (message) {
        CustomError.code = 400;
        CustomError.message = message;
        return {
            code: CustomError.code,
            message: CustomError.message
        };
    };
    CustomError.unauthorized = function (message) {
        if (message === void 0) { message = 'No estas autorizado'; }
        CustomError.code = 401;
        CustomError.message = message;
        return {
            code: CustomError.code,
            message: CustomError.message
        };
    };
    CustomError.forbidden = function (message) {
        if (message === void 0) { message = 'No puedes realizar esta accion'; }
        CustomError.code = 403;
        CustomError.message = message;
        return {
            code: CustomError.code,
            message: CustomError.message
        };
    };
    CustomError.notFound = function (message) {
        if (message === void 0) { message = 'Recurso inexsistente'; }
        CustomError.code = 404;
        CustomError.message = message;
        return {
            code: CustomError.code,
            message: CustomError.message
        };
    };
    CustomError.internalError = function (message) {
        if (message === void 0) { message = 'Se produjo un error'; }
        CustomError.code = 500;
        CustomError.message = message;
        return {
            code: CustomError.code,
            message: CustomError.message
        };
    };
    CustomError.gatewayError = function (message) {
        if (message === void 0) { message = 'Se produjo un error al procesar solicitud'; }
        CustomError.code = 502;
        CustomError.message = message;
        return {
            code: CustomError.code,
            message: CustomError.message
        };
    };
    return CustomError;
}());
exports["default"] = CustomError;
