import { Databases, ID, Query } from "appwrite";
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
    $id: string;
    blogId: string;
    userId: string;
    content: string;
    parentCommentId: string | null;
    createdAt: string;
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
    async saveBlog({ title, content, authorEmail, thumbnail, createdAt, category, authorAvatar, author, readTime, bucketId, fileId }: BlogData) {
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

    // query blogs
    async queryBlogs(query: string) {
        try {
            const getBlogs = await database.listDocuments(
                '66c8c9a6000f305a13fe', // database Id
                '66c8ca010010a285f838', // article collection Id
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

    // update blogs
    async updateBlog(id: string, { title, content, thumbnail, category }: updatedBlogData) {
        try {
            const updatedData = await database.updateDocument(
                '66c8c9a6000f305a13fe',  // database Id
                '66c8ca010010a285f838',  // article collection Id
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
                '66c8c9a6000f305a13fe',  // database Id
                '66c8ca010010a285f838',  // article collection Id
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
                '66c8c9a6000f305a13fe',  // database Id
                '66c8ca010010a285f838',  // article collection Id
                targetBlogId
            )
        } catch (error) {

        }
    }

    // add comment
    async addComment({ blogId, userId, content, createdAt, parentCommentId }: CommentData) {
        try {
            const createdComment = await database.createDocument(
                '66c8c9a6000f305a13fe',  // database Id
                '66e9c45f000c957a84b9',  // comment collection Id
                ID.unique(),
                {
                    blogId,
                    userId,
                    content,
                    createdAt,
                    parentCommentId, // Corrected the spelling here
                }
            );
            if (createdComment) {
                return createdComment;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getComments(blogId: string) {
        try {
          const getComments = await database.listDocuments(
            '66c8c9a6000f305a13fe', // database Id
            '66e9c45f000c957a84b9', // comment collection Id
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