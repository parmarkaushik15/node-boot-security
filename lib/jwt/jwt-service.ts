import * as jwt from 'jsonwebtoken';
import { getPropertiesData, readProperties } from 'node-boot-core';

export abstract class JwtService {

    /**
     * Synchronously sign the given payload into a JSON Web Token string
     * payload - Payload to sign, could be an literal, buffer or string
     * secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
     * [options] - Options for the signature
     * returns - The JSON Web Token string
     */
    sign(payload: string | Buffer | object, secretOrPrivateKey?: jwt.Secret, options?: jwt.SignOptions): string {
        const globalProperties: any = global;
        const properties = readProperties();
        const secret: string = getPropertiesData(properties, 'jwt.secret', "");
        if (globalProperties && globalProperties.securityStatus && properties) {
            if (!secretOrPrivateKey) {
                secretOrPrivateKey = secret;
            }
            return jwt.sign(payload, secretOrPrivateKey, options);
        } else {
            throw new Error("Please enable security in application level");
        }
    }

    /**
        * Synchronously verify given token using a secret or a public key to get a decoded token
        * token - JWT string to verify
        * secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.
        * [options] - Options for the verification
        * returns - The decoded token.
    */
    verify(token: string, secretOrPublicKey?: jwt.Secret, options?: jwt.VerifyOptions): jwt.JwtPayload | string{
        const globalProperties: any = global;
        const properties = readProperties();
        const secret: string = getPropertiesData(properties, 'jwt.secret', "");
        if (globalProperties && globalProperties.securityStatus && properties) {
            if (!secretOrPublicKey) {
                secretOrPublicKey = secret;
            }
            return jwt.verify(token, secretOrPublicKey, options);
        } else {
            throw new Error("Please enable security in application level");
        }
    }

    /**
        * Returns the decoded payload without verifying if the signature is valid.
        * token - JWT string to decode
        * [options] - Options for decoding
        * returns - The decoded Token
    */
    decode(token: string, options?: jwt.DecodeOptions): null | jwt.JwtPayload | string {
        const globalProperties: any = global;
        const properties = readProperties();
        if (globalProperties && globalProperties.securityStatus && properties) {
            return jwt.decode(token, options);
        } else {
            throw new Error("Please enable security in application level");
        }
    }

}