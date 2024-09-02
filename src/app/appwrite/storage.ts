import { appWriteClient } from "./auth";
import { Storage, ID } from "appwrite";

const storage = new Storage(appWriteClient);

type FileUpload = {
    file: File,
    buckedId: string
}
export class StorageServices {

    async uploadFile({file, buckedId}: FileUpload) {
        try {
            const uploadFIle = await storage.createFile(ID.unique(), buckedId, file);
            return uploadFIle;
        } catch (error) {
            console.log('Error uploading file', error);
            throw error;
        }
    }
};

const storageServices = new StorageServices();
export default storageServices;