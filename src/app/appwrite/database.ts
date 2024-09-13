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
    async insertData({ name, email, avatarId, avatarBucketId }: InputData) {
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
            if (cratedDatabase) {
                return cratedDatabase
            }
        } catch (error) {
            console.log('Error creating database', error)
            throw error
        }
    }
    async getData() {
        try {
            const readData = await database.listDocuments('66c8c9a6000f305a13fe', '66d1fb2700069104cb81');
            if (readData) {
                return readData
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    // create blog
    async saveBlog({ title, content, authorEmail, thumbnail, createdAt, category, authorAvatar, author, readTime }: BlogData) {
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
            if (cratedDatabase) {
                return cratedDatabase
            }
        } catch (error) {
            console.log('Error creating database', error)
            throw error
        }
    };

    //get blogs
    async getBlogsData() {
        try {
            const getBlogs = await database.listDocuments(
                '66c8c9a6000f305a13fe', // database Id
                '66c8ca010010a285f838' // article collection Id
            )
            if (getBlogs) {
                return getBlogs;
            }
        } catch (error) {
            console.log(error, 'Error fetching blogs');
            throw error
        }
    }

    // update blogs

    // delete blogs
    async deleteBlog(targetBlogId: string){
        try {
            const removeBlogfromDatabase = await database.deleteDocument(
                '66c8c9a6000f305a13fe',  // database Id
                '66c8ca010010a285f838',  // article collection Id
                targetBlogId
            )
        } catch (error) {
            
        }
    }


};

const dataBaseServices = new DataBaseServices();
export default dataBaseServices;