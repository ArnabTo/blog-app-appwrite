import { Databases, ID } from "appwrite";
import { appWriteClient } from "./auth";

type InputData = {
    name: string;
    email: string;
    avatarId: string;
    avatarBucketId: string;
}
type BlogData = {
    title: string;
    content: string;
    authorEmail: string;
    thumbnail: string;
    createdAt: string;
    category: string;
    authorAvatar: string;
    author: string;
    readTime: string;
}

const database = new Databases(appWriteClient);

export class DataBaseServices {
    async insertData({name, email, avatarId, avatarBucketId}: InputData) {
        try {
            const cratedDatabase = await database.createDocument(
                '66c8c9a6000f305a13fe',  // databaseid
                '66d1fb2700069104cb81', // userdata collectin id
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
    async saveBlog({title, content, authorEmail, thumbnail, createdAt, category, authorAvatar, author, readTime}: BlogData) {
        try {
            const cratedDatabase = await database.createDocument(
                '66c8c9a6000f305a13fe',  // database Id
                '66c8ca010010a285f838',  // article collection Id
                ID.unique(), 
                {
                title: title,
                authorEmail: authorEmail,
                content: content,
                thumbnail: thumbnail,
                author: author,
                createdAt: createdAt,
                category: category,
                authorAvatar: authorAvatar,
                readTime: readTime
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
            const readData = await database.listDocuments('66c8c9a6000f305a13fe', '66d1fb2700069104cb81');
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