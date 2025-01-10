/// <reference types="node" />
import * as jwt from 'jsonwebtoken';
export declare abstract class JwtService {
    sign(payload: string | Buffer | object, secretOrPrivateKey?: jwt.Secret, options?: jwt.SignOptions): string;
    verify(token: string, secretOrPublicKey?: jwt.Secret, options?: jwt.VerifyOptions): jwt.JwtPayload | string;
    decode(token: string, options?: jwt.DecodeOptions): null | jwt.JwtPayload | string;
}
