import { Client, Account } from 'appwrite';
export const client = new Client();



client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66c8c194002f13139a67');
    
export const account = new Account(client);
export { ID } from 'appwrite';