import { appWriteClient } from "./auth";
import { Storage, ID } from "appwrite";
import conf from "@/conf/conf";
const storage = new Storage(appWriteClient);

type FileUpload = {
    file: File,
}
type GetFile = {
    fileId: string,
    bucketId: string
}
export class StorageServices {

    async uploadFile({file}: FileUpload) {
        try {
            console.log(file);
            const uploadFIle = await storage.createFile(conf.appwriteBucketId, ID.unique(), file);
            return uploadFIle;
        } catch (error) {
            console.log('Error uploading file', error);
            throw error;
        }
    }

    async getFileUrl({bucketId, fileId}:GetFile) {
     try {
        const file = await storage.getFileView(bucketId, fileId);
        if(file) {
            return file;
        }
     } catch (error) {
      console.log(error, 'error getting file');
      throw error  
     }
    }
};

const storageServices = new StorageServices();
export default storageServices;