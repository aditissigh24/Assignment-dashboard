
import UserAcitivities from './UserAcitivities'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface FormattedPost extends Post {
    likes: number;
    comments: number;
    shares: number;
}

export default function UserAcitivityGrid() {
    const [posts, setPosts] = useState<FormattedPost[]>([]); // State to store posts
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const { userId } = useParams<{ userId: string }>();
    useEffect(() => {
        console.log("User ID passed to UserAcitivityGrid:", userId);
    }, [userId]);
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`); // Example API
            if (!response.ok) {
              throw new Error('Failed to fetch posts');
            }
            const data: Post[] = await response.json();
            const filteredPosts = data
              .filter((post) => post.userId === parseInt(userId || '0'))
              .map((post) => ({
                ...post,
                likes: Math.floor(Math.random() * 100),
                comments: Math.floor(Math.random() * 50),
                shares: Math.floor(Math.random() * 20),
              }));
            setPosts(filteredPosts);
          }  catch (err: unknown) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unexpected error occurred');
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, [userId]);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;    
  return (
    
    <div>
        {!loading && !error && posts.length === 0 && <div>No posts found.</div>}
      {posts.map(post=><div key={post.id}>
        <UserAcitivities
            title={post.title}
            body={post.body}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            />
           </div>
    )}
    </div>
  )
}
