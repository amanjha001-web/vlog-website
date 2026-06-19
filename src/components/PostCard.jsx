import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const imagePreview = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-80 bg-gray-300 rounded-lg overflow-hidden cursor-pointer">
        <div className="w-full h-full flex items-center justify-center p-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt={title}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div>No Image</div>
          )}
        </div>

        <h2 className="text-xl font-bold text-center mt-4">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
