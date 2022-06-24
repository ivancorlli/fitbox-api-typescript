"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gym_routes_1 = __importDefault(require("./gym.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const AllRoutes = (0, express_1.Router)();
AllRoutes.use('/user', user_routes_1.default);
AllRoutes.use('/gym', gym_routes_1.default);
exports.default = AllRoutes;
