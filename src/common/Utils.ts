import * as bcrypt from 'bcrypt';
export class Utils {
    private static SALT = "dkfh495585849ffkdjfj";
    public static async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Utils.SALT);
    }
    /**
     * passwordA === passwordB?
     * @param passwordA password from request
     * @param passwordB password from DB
     * @returns Promise<boolean>
     */
    public static async equals(passwordA: string, passwordB: string): Promise<boolean> {
        return await bcrypt.compare(passwordA, passwordB);
    }
}