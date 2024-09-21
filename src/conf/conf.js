const conf = {
  appwriteUrl : String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteApiKey : String(process.env.APPWRITE_API_KEY),

  appwriteDatabaseId : String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteUserCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID),
  appwriteArticleCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_COLLECTION_ID),
  
  appwriteBucketId : String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
  appwriteCommentCollectionId : String(process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID),
}

export default conf;