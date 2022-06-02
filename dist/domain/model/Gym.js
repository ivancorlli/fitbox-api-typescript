"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class Gym extends User_1.default {
    constructor(id, email, password, status, role) {
        super(id, email, password, status);
        this.role = role;
    }
}
exports.default = Gym;
