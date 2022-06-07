"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newUser_1 = __importDefault(require("../controller/User/newUser"));
const userChangeOldPassword_1 = __importDefault(require("../controller/User/userChangeOldPassword"));
const userLogin_1 = __importDefault(require("../controller/User/userLogin"));
const User_validation_1 = __importDefault(require("./middleware/User.validation"));
const UserRouter = (0, express_1.Router)();
const Validation = new User_validation_1.default();
UserRouter.post('/', Validation.userQueryValidation, Validation.userRegistration, newUser_1.default);
UserRouter.post('/login', Validation.userRegistration, userLogin_1.default);
UserRouter.post('/change-old-password', userChangeOldPassword_1.default);
exports.default = UserRouter;
