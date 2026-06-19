import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  

 if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
        <Container>
          <h1 className='text-2xl font-bold mb-4'>No posts found</h1>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Container>
        {posts.map((post) => (
          <div key={post.$id} className="mb-4 h-auto w-auto">
            <PostCard
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
            />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home
