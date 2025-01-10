"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableSecurity = void 0;
var node_boot_core_1 = require("node-boot-core");
var EnableSecurity = function (target) {
    var properties = (0, node_boot_core_1.readProperties)();
    if (properties) {
        Object.assign(global, { securityStatus: true });
        return target;
    }
    else {
        throw new Error("application.properties file is required");
    }
};
exports.EnableSecurity = EnableSecurity;
//# sourceMappingURL=enable-security.js.map