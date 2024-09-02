import { Databases, ID } from "appwrite";
import { appWriteClient } from "./auth";

type InputData = {
    name: string;
    email: string;
}

const database = new Databases(appWriteClient);

export class DataBaseServices {
    async insertData({name, email}: InputData) {
        try {
            const cratedDatabase = await database.createDocument(
                '66c8c9a6000f305a13fe', 
                '66d1fb2700069104cb81', 
                ID.unique(), {
                name: name, 
                email: email,
                avatarId: ID.unique()
            })
            if(cratedDatabase) {
                return cratedDatabase
            }
        } catch (error) {
            console.log('Error creating database', error)
            throw error
        }
    }
};

const dataBaseServices = new DataBaseServices();
export default dataBaseServices;