const conf = {
  appwriteUrl : String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteApiKey : String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),

  appwriteBucketId : String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
  
  appwriteDatabaseId : String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteUserCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID),
  appwriteArticleCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_COLLECTION_ID),
}

export default conf;