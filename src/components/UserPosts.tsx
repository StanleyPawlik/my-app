import { error } from "console";
import { useState, useEffect, FC } from "react";

interface IPost {
    userId: number
    id: number
    title: string
    body: string
}

const urlPosts = "https://jsonplaceholder.typicode.com/posts"

// const getPosts = async (): Promise<IPost[]> => {
//     const response = await fetch(urlPosts);
//     return response.json();
//   };

  const UserPosts: FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [error, setError] = useState();
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
            const response = await fetch(urlPosts);
            const posts = (await response.json()) as IPost[];
            setPosts(posts);
        }
        catch(error: any){
            setError(error);
        }
        
      };
  
      fetchPosts();
    }, []);

    if (error){
        return <div>Error! Try again!</div>
    }
  
    return (
      <div>
        <h2>User Posts</h2>
        <ul>
          {posts.map((post) => {
            return <li key={post.id}> {post.title} </li>
  })}
        </ul>
      </div>
    );
  };
  
  export default UserPosts;