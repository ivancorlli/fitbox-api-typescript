"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forgotPassword_1 = __importDefault(require("../controller/User/forgotPassword"));
const newUser_1 = __importDefault(require("../controller/User/newUser"));
const resetPassword_1 = __importDefault(require("../controller/User/resetPassword"));
const userChangeEmail_1 = __importDefault(require("../controller/User/userChangeEmail"));
const userChangePassword_1 = __importDefault(require("../controller/User/userChangePassword"));
const userLogin_1 = __importDefault(require("../controller/User/userLogin"));
const userLogout_1 = __importDefault(require("../controller/User/userLogout"));
const userVerification_1 = __importDefault(require("../controller/User/userVerification"));
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const User_validation_1 = __importDefault(require("./middleware/User.validation"));
const UserRouter = (0, express_1.Router)();
const Validation = new User_validation_1.default();
UserRouter.post('/login', Validation.userRegistration, userLogin_1.default);
UserRouter.post('/forgot-password', Validation.forgotPasswordValidation, forgotPassword_1.default);
UserRouter.patch('/verify/:token', userVerification_1.default);
UserRouter.patch('/reset/:token', resetPassword_1.default);
UserRouter.post('/', Validation.userQueryValidation, Validation.userRegistration, newUser_1.default);
UserRouter.use(requireUser_1.default);
UserRouter.post('/logout', userLogout_1.default);
UserRouter.patch('/change-password', Validation.changeOldPassValidation, userChangePassword_1.default);
UserRouter.patch('/change-email', Validation.changeEmailValidation, userChangeEmail_1.default);
exports.default = UserRouter;
