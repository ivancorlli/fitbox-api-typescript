"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newUser_1 = __importDefault(require("../controller/User/newUser"));
const UserRouter = (0, express_1.Router)();
UserRouter.post('/', newUser_1.default);
exports.default = UserRouter;
