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
    postDate: string;
    category: string;
    customTags: string;
    authorAvatar: string;
    author: string;
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
    async saveBlog({title, content, authorEmail, thumbnail, postDate, category, customTags, authorAvatar, author}: BlogData) {
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
                postDate: postDate,
                category: category,
                customTags: customTags,
                authorAvatar: authorAvatar
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