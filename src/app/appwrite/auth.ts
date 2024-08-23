import conf from "../../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async register(email: string, password: string, name: string) {
        try {
            const createAccount = await this.account.create(ID.unique(), email, password, name);

            if (createAccount) {
                return this.login(email, password);
            } else {
                return createAccount
            }
        } catch (error) {
            console.log('Register Error', error)
            throw error
        }
    }
    async login(email: string, password: string) {
        try {
            const loginAccount = await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log('Login Error', error)
            throw error
        }
    }

    async currentUser() {
        try {
            const currentUser = await this.account.get();
            if(currentUser) {
                return currentUser
            }else {
                return null
            }
        } catch (error) {
            console.log('Getting user', error)
            throw error
        }
    }
    async logout() {
        try {
            const logoutAccount = await this.account.deleteSession("current");
        } catch (error) {
            console.log('Logout Error', error)
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;