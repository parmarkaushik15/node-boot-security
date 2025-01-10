export declare abstract class CryptoService {
    private algorithm;
    private getAlgorithm;
    encrypt: (message: any, key: any, algo?: any) => any;
    decrypt: (message: any, key: any, algo?: any) => any;
}
