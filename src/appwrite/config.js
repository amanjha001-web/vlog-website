import conf from '../conf/conf';
import { Client, Databases, Storage, Query, ID } from 'appwrite';

export class AppwriteService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log(error)
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    }
    catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      )
      return true;
    }
    catch (error) {
      console.log(error)
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      )
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        query,
      )
    }
    catch (error) {
      console.log(error);
    }
    
  }

  //file upload services


  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file,
      )
     }
    catch (error) {
      console.log(error);
      return false;
    }
  }


  async deleteFile(fileId) {
    try { 
      await this.bucket.deleteFile(
        conf.appwriteBucketID,
        fileId,
      )
      return true;
    }
    catch (error) {
      console.log("appWrite error :: deleting file", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    if (!fileId) return null;
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketID,
        fileId,
      )
    }
    catch (error) {
      console.log("appWrite error :: getting file preview", error);
      return null;
    }
  }
}
 
const service = new AppwriteService();
export default service;