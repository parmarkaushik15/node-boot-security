"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
var jwt = require("jsonwebtoken");
var node_boot_core_1 = require("node-boot-core");
var JwtService = (function () {
    function JwtService() {
    }
    JwtService.prototype.sign = function (payload, secretOrPrivateKey, options) {
        var globalProperties = global;
        var properties = (0, node_boot_core_1.readProperties)();
        var secret = (0, node_boot_core_1.getPropertiesData)(properties, 'jwt.secret', "");
        if (globalProperties && globalProperties.securityStatus && properties) {
            if (!secretOrPrivateKey) {
                secretOrPrivateKey = secret;
            }
            return jwt.sign(payload, secretOrPrivateKey, options);
        }
        else {
            throw new Error("Please enable security in application level");
        }
    };
    JwtService.prototype.verify = function (token, secretOrPublicKey, options) {
        var globalProperties = global;
        var properties = (0, node_boot_core_1.readProperties)();
        var secret = (0, node_boot_core_1.getPropertiesData)(properties, 'jwt.secret', "");
        if (globalProperties && globalProperties.securityStatus && properties) {
            if (!secretOrPublicKey) {
                secretOrPublicKey = secret;
            }
            return jwt.verify(token, secretOrPublicKey, options);
        }
        else {
            throw new Error("Please enable security in application level");
        }
    };
    JwtService.prototype.decode = function (token, options) {
        var globalProperties = global;
        var properties = (0, node_boot_core_1.readProperties)();
        if (globalProperties && globalProperties.securityStatus && properties) {
            return jwt.decode(token, options);
        }
        else {
            throw new Error("Please enable security in application level");
        }
    };
    return JwtService;
}());
exports.JwtService = JwtService;
//# sourceMappingURL=jwt-service.js.map