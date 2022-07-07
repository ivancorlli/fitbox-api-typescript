"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_routes_1 = __importDefault(require("./customer.routes"));
const day_routes_1 = __importDefault(require("./day.routes"));
const gym_routes_1 = __importDefault(require("./gym.routes"));
const plan_routes_1 = __importDefault(require("./plan.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const AllRoutes = (0, express_1.Router)();
AllRoutes.use('/user', user_routes_1.default);
AllRoutes.use('/gym', gym_routes_1.default);
AllRoutes.use('/plan', plan_routes_1.default);
AllRoutes.use('/day', day_routes_1.default);
AllRoutes.use('customer', customer_routes_1.default);
exports.default = AllRoutes;
