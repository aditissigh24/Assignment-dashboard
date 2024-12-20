import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfile from './UserProfile'
import UserAcitivities from "./UserAcitivities";
import "./loader.css";
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
    company: {
      name: string;
      catchPhrase: string;
    };
  }
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
function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<FormattedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_BASE_URL = `https://jsonplaceholder.typicode.com/users/${userId}`;

   useEffect(() => {
    setUser(null);
       fetchUserDetails();
     }, [userId]);
   
     const fetchUserDetails = async () => {
       try {
         setLoading(true);
         setError(null);
         const response = await fetch(`${API_BASE_URL}`);
         if (!response.ok) {
          alert("User details not found")
           throw new Error(`HTTP error! status: ${response.status}`);
         }
   
         const data: User = await response.json();
         setUser(data);
       } catch (err: unknown) {
        alert("Something is wrong on our side, let us check")
         if (err instanceof Error) {
           setError(err.message);
         } else {
           setError('An unexpected error occurred');
         }
       } finally {
         setLoading(false);
       }
     };
   
 useEffect(() => {
     const fetchPosts = async () => {
          try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`); // Example API
                if (!response.ok) {
                  alert("Somethings wrong with post response, let us see")
                  throw new Error('Failed to fetch posts');
                }
                const data: Post[] = await response.json();
                const formattedPosts = data.map((post) => ({
                    ...post,
                    likes: Math.floor(Math.random() * 100),
                    comments: Math.floor(Math.random() * 50),
                    shares: Math.floor(Math.random() * 20),
                }));
                setPosts(formattedPosts);
              }  catch (err: unknown) {
                alert("Error fetching posts");
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

    return (
        <div>
             {user ? (
                <div key={user.id}>
                    <UserProfile
                        name={user.name}
                        username={user.username}
                        website={user.website}
                        email={user.email}
                        phone={user.phone}
                        company={user.company}
                        address={user.address}
                    />
                </div>
            ) : (
              <div className="flex justify-center">
              <div className="spinner"></div>
              </div>
            )}

    <div className="flex justify-start md:ml-32 lg:ml-96">
        <h1 className="text-2xl p-2 font-semibold">Posts</h1>
    </div>
            <ul>
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
            </ul>
        </div>
    );
}

export default UserDetails;
