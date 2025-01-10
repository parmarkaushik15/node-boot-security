"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
var CryptoJS = require("crypto-js");
var node_boot_core_1 = require("node-boot-core");
var CryptoService = (function () {
    function CryptoService() {
        var _this = this;
        this.algorithm = ['AES', 'DES', 'TripleDES', 'RC4', 'RC4Drop', 'Rabbit', 'RabbitLegacy'];
        this.getAlgorithm = function (algo) {
            var cryto = null;
            if (algo === 'DES') {
                cryto = CryptoJS.DES;
            }
            else if (algo === 'TripleDES') {
                cryto = CryptoJS.TripleDES;
            }
            else if (algo === 'RC4') {
                cryto = CryptoJS.RC4;
            }
            else if (algo === 'RC4Drop') {
                cryto = CryptoJS.RC4Drop;
            }
            else if (algo === 'Rabbit') {
                cryto = CryptoJS.Rabbit;
            }
            else if (algo === 'RabbitLegacy') {
                cryto = CryptoJS.RabbitLegacy;
            }
            else {
                cryto = CryptoJS.AES;
            }
            return cryto;
        };
        this.encrypt = function (message, key, algo) {
            var globalProperties = global;
            var properties = (0, node_boot_core_1.readProperties)();
            var secret = (0, node_boot_core_1.getPropertiesData)(properties, 'crypto.algo', "AES");
            if (globalProperties && globalProperties.securityStatus && properties) {
                if (!algo) {
                    algo = secret;
                }
                var cryto = _this.getAlgorithm(algo);
                if (_this.algorithm.indexOf(algo) != -1) {
                    message = message instanceof String ? message : JSON.stringify(message);
                    var encrypted = cryto.encrypt(message, key).toString();
                    return encrypted;
                }
                else {
                    throw new Error("Only ".concat(_this.algorithm.join(","), " are allowed"));
                }
            }
            else {
                throw new Error("Please enable security in application level");
            }
        };
        this.decrypt = function (message, key, algo) {
            var globalProperties = global;
            var properties = (0, node_boot_core_1.readProperties)();
            var secret = (0, node_boot_core_1.getPropertiesData)(properties, 'crypto.algo', "AES");
            if (globalProperties && globalProperties.securityStatus && properties) {
                if (!algo) {
                    algo = secret;
                }
                var cryto = _this.getAlgorithm(algo);
                if (_this.algorithm.indexOf(algo) != -1) {
                    return cryto.decrypt(message, key).toString(CryptoJS.enc.Utf8);
                }
                else {
                    throw new Error("Only ".concat(_this.algorithm.join(","), " are allowed"));
                }
            }
            else {
                throw new Error("Please enable security in application level");
            }
        };
    }
    return CryptoService;
}());
exports.CryptoService = CryptoService;
//# sourceMappingURL=crypto-service.js.map