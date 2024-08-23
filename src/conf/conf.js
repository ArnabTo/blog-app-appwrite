const conf = {
  appwriteUrl : String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteApiKey : String(process.env.APPWRITE_API_KEY),
  appwriteDatabaseId : String(process.env.APPWRITE_DATABASE_ID),
  appwriteCollectionId : String(process.env.APPWRITE_COLLECTION_ID),
  appwriteBucketId : String(process.env.APPWRITE_BUCKET_ID),
}

export default conf;