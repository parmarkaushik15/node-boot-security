import { readProperties } from "node-boot-core";

export const EnableSecurity = (target: any) => {
    const properties: any = readProperties();
    if (properties) {
        Object.assign(global, { securityStatus: true });
        return target;
    } else {
        throw new Error("application.properties file is required");
    }
}
