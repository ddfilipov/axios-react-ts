import axios from "axios";
import React from "react";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts" 
});

export default function App() {
  const [post, setPost] = React.useState<any>(null);
  React.useEffect(() => {
    async function getPost(){
      const response = await client.get("/1");
      setPost(response.data);
    }
    getPost();
  }, []);

  async function createPost() {
    const response = await client.post("/",{
      title: "Hello World!",
      body: "This is a new post."
    });
    setPost(response.data);
  }

  async function updatePost() {
    const response = await client.put("/1",{
      title: "Hello World!",
      body: "This is an updated post."
    });
    setPost(response.data);
  }

  async function deletePost() {
    await client.delete("/1");
      alert("Post deleted!");
      setPost(null)
  }

  if (!post) return <p>There are no more posts</p>

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}