import { Databases, ID, Query } from "appwrite";
import { appWriteClient } from "./auth";
import conf from "@/conf/conf";

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
    bucketId: string;
    fileId: string;
    createdAt: string;
    category: string;
    authorAvatar: string;
    author: string;
    readTime: string;
}

type updatedBlogData = {
    title: string;
    content: string;
    thumbnail: string;
    category: string;
}

type CommentData = {
    blogId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    comment: string;
    createdAt: string;
}
const database = new Databases(appWriteClient);

export class DataBaseServices {
    async insertData({ name, email, avatarId, avatarBucketId }: InputData) {
        try {
            const cratedDatabase = await database.createDocument(
                conf.appwriteDatabaseId,  // databaseid
                conf.appwriteUserCollectionId, // userdata collectin id
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
            const readData = await database.listDocuments(
                conf.appwriteDatabaseId, // databaseid
                conf.appwriteUserCollectionId // userdata collectin id
            );
            if (readData) {
                return readData
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    // create blog
    async saveBlog({ title, content, authorEmail, thumbnail, createdAt, category, authorAvatar, author, readTime, bucketId, fileId }: BlogData) {
        try {
            const cratedDatabase = await database.createDocument(
                conf.appwriteDatabaseId,  // database Id
                conf.appwriteArticleCollectionId,  // article collection Id
                ID.unique(),
                {
                    title: title,
                    authorEmail: authorEmail,
                    content: content,
                    thumbnail: thumbnail,
                    bucketId: bucketId,
                    fileId: fileId,
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
                conf.appwriteDatabaseId, // database Id
                conf.appwriteArticleCollectionId ,// article collection Id
                [
                    Query.equal('status', 'Published')
                ]
            )
            if (getBlogs) {
                return getBlogs;
            }
        } catch (error) {
            console.log(error, 'Error fetching blogs');
            throw error
        }
    }

    //get single user blog
    async getUserBlogs(email: string) {
        try {
            const getBlogs = await database.listDocuments(
                conf.appwriteDatabaseId, // database Id
                conf.appwriteArticleCollectionId, // article collection Id
                [
                    Query.equal('authorEmail', email)
                ]
            )
            return getBlogs;
        } catch (error) {
            console.log('Error fetching user blogs', error)
            throw error
        }
    }
    // query blogs
    async queryBlogs(query: string) {
        try {
            const getBlogs = await database.listDocuments(
                conf.appwriteDatabaseId, // database Id
                conf.appwriteArticleCollectionId, // article collection Id
                [
                    Query.equal("$id", query)
                ]
            )
            if (getBlogs) {
                return getBlogs
            }
        } catch (error) {
            console.log(error, 'Error fetching blogs');
            throw error
        }
    }

    // fetch latest blogs
    async fetchLatestBlogs() {
        try {
            const getBlogs = await database.listDocuments(
                conf.appwriteDatabaseId, // database Id
                conf.appwriteArticleCollectionId, // article collection Id
                [Query.orderDesc('$createdAt')],  // sort by created date
            )
            return getBlogs
        } catch (error) {
            console.log(error, "Error fetching latest blogs")
            throw error
        }
    }

    // update blogs
    async updateBlog(id: string, { title, content, thumbnail, category }: updatedBlogData) {
        try {
            const updatedData = await database.updateDocument(
                conf.appwriteDatabaseId,  // database Id
                conf.appwriteArticleCollectionId,  // article collection Id
                id,
                {
                    title,
                    content,
                    thumbnail,
                    category,
                })
            if (updatedData) {
                return updatedData
            }
        } catch (error) {
            console.log('Error updating database', error)
            throw error
        }
    };

    //update supports
    async updateSupport(id: string, updatedSupports: number) {
        try {
            const response = await database.updateDocument(
                conf.appwriteDatabaseId,  // database Id
                conf.appwriteArticleCollectionId,  // article collection Id
                id,
                {
                    supports: updatedSupports
                }
            );
            return response; // This will return the updated document
        } catch (error) {
            console.log(error, 'Error updating supports');
            throw error;
        }
    }
    // delete blogs
    async deleteBlog(targetBlogId: string) {
        try {
            const removeBlogfromDatabase = await database.deleteDocument(
                conf.appwriteDatabaseId,  // database Id
                conf.appwriteArticleCollectionId,  // article collection Id
                targetBlogId
            )
        } catch (error) {

        }
    }

    // add comments 
    async addComment({ blogId, comment, userId, userName, userAvatar, createdAt }: CommentData) {
        try {
            const createComment = await database.createDocument(
                conf.appwriteDatabaseId,  // database Id
                conf.appwriteCommentCollectionId,  // comment collection Id
                ID.unique(),
                {
                    blogId,
                    userId,
                    userName,
                    userAvatar,
                    comment,
                    createdAt
                }
            )
            if (createComment) {
                return createComment
            }
        } catch (error) {
            console.log(error, 'Error creating comment');
            throw error;
        }
    }
    async queryComments(blogId: string) {
        console.log(blogId)
        try {
            const getComments = await database.listDocuments(
                conf.appwriteDatabaseId, // database Id
                conf.appwriteCommentCollectionId, // comment collection Id
                [Query.equal('blogId', blogId)]
            );
            if (getComments) {
                return getComments;
            }
        } catch (error) {
            console.log(error, 'Error fetching comments');
            throw error;
        }
    }

};

const dataBaseServices = new DataBaseServices();
export default dataBaseServices;