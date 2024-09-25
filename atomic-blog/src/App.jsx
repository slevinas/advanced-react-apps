import { faker } from "@faker-js/faker"
import React, { createContext, useContext, useEffect, useState } from "react"

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// 1) We create a context to store the posts. This way we can access the posts from any component without having to pass them down as props. This is useful when we have deeply nested components that need to access the posts.
const PostContext = createContext()

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

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

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    // 2) We wrap the entire app in the context provider. This way, all the components that are descendants of this provider can access the posts.
    <PostContext.Provider value={
      {
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}>
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header

      />
        <Main />
        <Archive />

      <Footer />
    </section>
    </PostContext.Provider>
  );
}

function Header() {
  // 3) Consuming the We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.
  const { onClearPosts } = useContext(PostContext);
  return (
    <header>
      <h1>
        <span role="img" aria-label="emoji">⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts

        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  // 5) We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.
  // We only need the `searchQuery` and `setSearchQuery` from the context, so we only destructure those.
  const { searchQuery, setSearchQuery } = useContext(PostContext);

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  // 4) We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.
  const { posts } = useContext(PostContext)
  return <p><span role="img" aria-label="emoji">🚀</span> {posts.length} atomic posts found</p>
}

function Main() {
  // 6) We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.

  const { posts, onAddPost } = useContext(PostContext);
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  // 9) We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.
  const { onAddPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  // 8) We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.
  const { posts } = useContext(PostContext);
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  // 7) We use the `useContext` hook to access the posts from the context. This way we don't need to pass the posts down as props.
  const { onAddPost } = useContext(PostContext);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog <span role="img" aria-label="emoji">✌️</span></footer>
}

export default App;
