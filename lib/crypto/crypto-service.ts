import CryptoJS = require("crypto-js");
import { getPropertiesData, readProperties } from "node-boot-core";
export abstract class CryptoService {
    private algorithm = ['AES', 'DES', 'TripleDES', 'RC4', 'RC4Drop', 'Rabbit', 'RabbitLegacy'];
    
    private getAlgorithm = (algo: any) => {
        let cryto: any = null;
        if (algo === 'DES') {
            cryto = CryptoJS.DES;
        } else if (algo === 'TripleDES') {
            cryto = CryptoJS.TripleDES;
        } else if (algo === 'RC4') {
            cryto = CryptoJS.RC4;
        } else if (algo === 'RC4Drop') {
            cryto = CryptoJS.RC4Drop;
        } else if (algo === 'Rabbit') {
            cryto = CryptoJS.Rabbit;
        } else if (algo === 'RabbitLegacy') {
            cryto = CryptoJS.RabbitLegacy;
        } else {
            cryto = CryptoJS.AES;
        }
        return cryto;
    }

    /**
       * Synchronously encrypt the message.
       * message - string to encrypt
       * key - Enter the secret.
       * [algo] - Options for the verification
       * returns - The encoded string.
   */
    public encrypt = (message: any, key: any, algo?: any) => {
        const globalProperties: any = global;
        const properties = readProperties();
        const secret: string = getPropertiesData(properties, 'crypto.algo', "AES");
        if (globalProperties && globalProperties.securityStatus && properties) {
            if (!algo) {
                algo = secret;
            }
            let cryto: any = this.getAlgorithm(algo);
            if (this.algorithm.indexOf(algo) != -1) {
                message = message instanceof String ? message : JSON.stringify(message);
                const encrypted = cryto.encrypt(message, key).toString();
                return encrypted;
            } else {
                throw new Error(`Only ${this.algorithm.join(",")} are allowed`);
            }
        } else {
            throw new Error("Please enable security in application level");
        }
    };

    /**
        * Synchronously decrypt the message.
        * message - encoded string to decrypt
        * key - Enter the secret.
        * [algo] - Options for the verification
        * returns - The decrypt string.
    */
    public decrypt = (message: any, key: any, algo?: any) => {
        const globalProperties: any = global;
        const properties = readProperties();
        const secret: string = getPropertiesData(properties, 'crypto.algo', "AES");
        if (globalProperties && globalProperties.securityStatus && properties) {
            if (!algo) {
                algo = secret;
            }
            let cryto: any = this.getAlgorithm(algo);
            if (this.algorithm.indexOf(algo) != -1) {
                return cryto.decrypt(message, key).toString(CryptoJS.enc.Utf8);
            } else {
                throw new Error(`Only ${this.algorithm.join(",")} are allowed`);
            }
        } else {
            throw new Error("Please enable security in application level");
        }
    };
}