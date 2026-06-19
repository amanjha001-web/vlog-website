import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData && post ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {isAuthor && (
            <div className="flex space-x-2">
              <Button onClick={deletePost} variant="danger">
                Delete
              </Button>
            </div>
          )}
        </div>
        <p className="text-gray-600 mb-4">By {post.userId}</p>
        <div className="mb-4">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
