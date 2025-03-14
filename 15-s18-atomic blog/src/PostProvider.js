import { createContext, useContext, useState } from "react";
import { createRandomPost } from "./DataProvider";


// 1: CREATE THE CONTEXT
const PostContext = createContext();

 function PostProvider({children}){
  const [posts, setPosts] = useState(() =>
      Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");
  
    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
      searchQuery.length > 0
        ? posts.filter((post) =>
            `${post.title} ${post.body}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : posts;
  
    function handleAddPost(post) {
      setPosts((posts) => [post, ...posts]);
    }
  
    function handleClearPosts() {
      setPosts([]);
    }
  
    return <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
 }

 // PACE A CORRESPONDING HOOK TO MANAGE THE CONTEXT
 function usePosts(){
    const context = useContext(PostContext);
    if(context === undefined) throw new Error('PostsContext was used outside of the PostProvider');
    return context;
  }

export { PostProvider, usePosts };

