import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite"

export class AuthService{
    client = new Client();
    account;

    // constructor to create client and account details specifically for appwrite
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // createAccount method as name suggests creates account or is the "Sign-up" method,
    // if the account is successfully created we are directly loggin in the user into the account, 
    // else we return whatever value the userAccount holds and that will be handeled by the frontend.
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method for login
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // this is the login or the "Sign-in" method that ofc logs you in if you already have an account
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // to check whether the user is logged in or not
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service: :: getCurrentUser :: error", error);
        }
        return null; // if no account is there return null
    }

    // as the name suggets this is the logout method, but in this method we're using the
    // ".deleteSessions()" which deletes all the sessions of the user, there is
    //  a ".deleteSession('input')" method also which allows for deletion of a particular session, like 'current' session etc.
    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service: :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService