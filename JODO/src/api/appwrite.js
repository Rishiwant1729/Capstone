import { Client, Account, Databases, Storage, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://syd.cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("687fb6b2001dc0af4af5"); // Replace with your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;


// Sign Up
export const signup = async (email, password, name) => {
    try {
      await account.create("unique()", email, password, name);
      return await login(email, password); // Auto login after signup
    } catch (error) {
      console.error("Signup Error:", error.message);
      throw error;
    }
  };
  
  // Login
  export const login = async (email, password) => {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };
  
  // Get Current User
  export const getCurrentUser = async () => {
    try {
      return await account.get();
    } catch {
      return null;
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };
  


  // Fetch all posts
export const getPosts = async () => {
    try {
      return await databases.listDocuments(
        "687fb7e9001aa53e0e28",    // Database ID
        "687fb7f8002b2e0613bf"          // Collection ID
      );
    } catch (error) {
      console.error("Get Posts Error:", error.message);
      return { documents: [] };
    }
  };
  
  // Create a new post
  export const createPost = async (title, description, imageUrl, userId, userName, slug) => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        throw new Error("You must be logged in to create a post.");
      }
  
      const response = await databases.createDocument(
        "687fb7e9001aa53e0e28", // Database ID
        "687fb7f8002b2e0613bf", // Collection ID
        "unique()", // Document ID
        {
          title,
          description,
          imageUrl,
          userId: user.$id,
          userName: user.name,
          slug,
          likes: 0,
        }
      );
      return response;
    } catch (error) {
      console.error("Create Post Error:", error.message);
      throw error;
    }
  };
  
  
  // Like a post (increment likes)
  export const likePost = async (postId, currentLikes) => {
    try {
      return await databases.updateDocument(
        "687fb7e9001aa53e0e28",
        "687fb7f8002b2e0613bf",
        postId,
        { likes: currentLikes + 1 }
      );
    } catch (error) {
      console.error("Like Post Error:", error.message);
    }
  };

  // Upload image to storage
  export const uploadImage = async (file) => {
    try {
      const uploadedFile = await storage.createFile(
        "687fb9ce002f64f749f1",
        "unique()",
        file
      );
  
      const url = `https://syd.cloud.appwrite.io/v1/storage/buckets/687fb9ce002f64f749f1/files/${uploadedFile.$id}/view?project=687fb6b2001dc0af4af5`;
      console.log("Generated Image URL:", url);
      return url;
    } catch (error) {
      console.error("Image Upload Error:", error.message);
      throw error;
    }
  };
  
  





export const applyForJob = async (jobTitle, company, userId) => {
  try {
    // Check if this job already exists for this user
    const existing = await databases.listDocuments(
      "687fb7e9001aa53e0e28", // Database ID
      "687fb93d001fd189f191", // appliedJobs Collection ID
      [
        Query.equal("userId", userId),
        Query.equal("jobTitle", jobTitle)
      ]
    );

    if (existing.documents.length > 0) {
      return { alreadyApplied: true };
    }

    // Add new application
    await databases.createDocument(
      "687fb7e9001aa53e0e28",
      "687fb93d001fd189f191",
      "unique()",
      { jobTitle, company, userId }
    );

    return { alreadyApplied: false };
  } catch (error) {
    console.error("Apply Job Error:", error.message);
    throw error;
  }
};

  



  export const getAppliedJobs = async (userId) => {
    try {
      return await databases.listDocuments(
        "687fb7e9001aa53e0e28", // Database ID
        "687fb93d001fd189f191", // Collection ID
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Get Applied Jobs Error:", error.message);
      throw error;
    }
  };
  