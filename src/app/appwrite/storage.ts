import { appWriteClient } from "./auth";
import { Storage, ID } from "appwrite";

const storage = new Storage(appWriteClient);

type FileUpload = {
    file: File,
}
export class StorageServices {

    async uploadFile(file: FileUpload) {
        try {
            console.log(file);
            const uploadFIle = await storage.createFile("66c8cc460030b3492d9b", ID.unique(), file);
            return uploadFIle;
        } catch (error) {
            console.log('Error uploading file', error);
            throw error;
        }
    }
};

const storageServices = new StorageServices();
export default storageServices;