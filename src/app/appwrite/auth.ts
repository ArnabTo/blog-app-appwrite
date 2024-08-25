import { Client, Account, ID } from "appwrite"
import conf from '../../conf/conf';

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
    // avatar: string
}

type LoginUserAccount = {
    email: string,
    password: string
}

const appWriteClient = new Client();

appWriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appWriteClient);

export class AuthServices {

    async register({ email, password, name }: CreateUserAccount) {
        try {
            const createAccount = await account.create(ID.unique(), email, password, name);
            if (createAccount) {
                return this.loginUser({ email, password })
            } else {
                return createAccount
            }
        } catch (error) {
            console.log('Register Error', error)
            throw error
        }
    }

    async loginUser({ email, password }: LoginUserAccount) {
        try {
            const loginUser = await account.createEmailPasswordSession(email, password);
            if (loginUser) {
                return loginUser
            }
        } catch (error) {
            console.log('Login Error', error)
            throw error
        }
    }

    async userStatus(): Promise<boolean> {
             try {
                const status = await this.getUser();
                return Boolean(status);
             } catch (error) {
                
             }
        return false;
    }

    async getUser() {
        try {
            const user = await account.get();
            if (user) {
                return user
            }
        } catch (error) {
            console.log('Getting User Error', error)
            throw error
        }
    }

    async logOut() {
        try {
            const logout = await account.deleteSession("current");
        } catch (error) {
            console.log('Logout Error', error)
            throw error
        }
    }

}

const authServices = new AuthServices();
export default authServices;


