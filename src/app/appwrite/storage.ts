import { appWriteClient } from "./auth";
import { Storage, ID, ImageGravity, ImageFormat } from "appwrite";
import conf from "@/conf/conf";
const storage = new Storage(appWriteClient);

// type FileUpload = {
//     file: File,
// }
type GetFile = {
    fileId: string,
    bucketId: string
}
export class StorageServices {

    async uploadFile(file: any) {
        try {
            console.log(file);
            const uploadFIle = await storage.createFile("66c8cc460030b3492d9b", ID.unique(), file);
            return uploadFIle;
        } catch (error) {
            console.log('Error uploading file', error);
            throw error;
        }
    }



    async getFileUrl({ bucketId, fileId }: GetFile) {
        try {
            const file = await storage.getFileView(bucketId, fileId);
            if (file) {
                return file;
            }
        } catch (error) {
            console.log(error, 'error getting file');
            throw error
        }
    }

    // delete file

    async deleteFile({ bucketId, fileId }: GetFile) {
        try {
            console.log(bucketId, fileId);
            await storage.deleteFile(bucketId, fileId);
            return {bucketId, fileId}
        } catch (error) {
            console.log(error, 'error deleting file');
            throw error
        }
    }
    // async getFileView({ bucketId, fileId }: GetFile) {
    //     try {
    //         const file = await storage.getFilePreview(bucketId, fileId,
    //             3000, // width (optional)
    //             3000, // height (optional)
    //             ImageGravity.Center, // gravity (optional)
    //             100, // quality (optional)
    //             10, // borderWidth (optional)
    //             'CDCA30', // borderColor (optional)
    //             50, // borderRadius (optional)
    //             1, // opacity (optional)
    //             -360, // rotation (optional)
    //             'FFFFFF', // background (optional)
    //             ImageFormat.Jpg // output (optional)
    //         );
    //         if (file) {
    //             return file;
    //         }
    //     } catch (error) {
    //         console.log(error, 'error getting file');
    //         throw error
    //     }
    // }
};

const storageServices = new StorageServices();
export default storageServices;