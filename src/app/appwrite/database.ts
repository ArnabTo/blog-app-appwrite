import { Databases, ID } from "appwrite";
import { appWriteClient } from "./auth";
import conf from "@/conf/conf";

type InputData = {
    name: string;
    email: string;
    avatarId: string;
    avatarBucketId: string;
}

const database = new Databases(appWriteClient);

export class DataBaseServices {
    async insertData({name, email, avatarId, avatarBucketId}: InputData) {
        try {
            const cratedDatabase = await database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                ID.unique(), 
                {
                name: name, 
                email: email,
                avatarId: avatarId,
                avatarBucketId: avatarBucketId
            })
            if(cratedDatabase) {
                return cratedDatabase
            }
        } catch (error) {
            console.log('Error creating database', error)
            throw error
        }
    }

    async getData(){
        try {
            const readData = await database.listDocuments(conf.appwriteDatabaseId, conf.appwriteUserCollectionId);
            if(readData) {
                return readData
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
};

const dataBaseServices = new DataBaseServices();
export default dataBaseServices;