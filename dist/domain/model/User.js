"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, email, password, status) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.verified = false;
        this.status = status;
    }
    get userId() {
        return this.id;
    }
    get userEmail() {
        return this.email;
    }
    set userEmail(email) {
        this.email = email;
    }
    set userVerified(verified) {
        this.verified = verified;
    }
    get userVerified() {
        return this.verified;
    }
}
exports.default = User;
