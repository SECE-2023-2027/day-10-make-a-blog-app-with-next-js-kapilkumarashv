'use client';

import { useState } from 'react';

export default function BlogPage() {
  const [posts, setposts] = useState([]);
  const [editing, setediting] = useState(null);
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [nextid, setnextid] = useState(1); 
  function handlesubmit(e) {
    e.preventDefault();

    if (editing) {
      const updatedposts = posts.map((post) =>
        post.id === editing.id ? { id: post.id, title, content } : post
      );
      setposts(updatedposts);
      setediting(null);
    } else {
      setposts([...posts, { id: nextid, title, content }]);
      setnextid(nextid + 1);
    }

    settitle('');
    setcontent('');
  }

  function handledelete(id) {
    const newList = posts.filter((post) => post.id !== id);
    setposts(newList);

    if (editing && editing.id === id) {
      setediting(null);
      settitle('');
      setcontent('');
    }
  }

  function handleedit(post) {
    setediting(post);
    settitle(post.title);
    setcontent(post.content);
  }

  function canceledit() {
    setediting(null);
    settitle('');
    setcontent('');
  }

  return (
    <main>
      <h1>Blog App</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Post title"
          required
        />
        <input
          value={content}
          onChange={(e) => setcontent(e.target.value)}
          placeholder="Post content"
          rows={5}
          required
        />
        <button type="submit">
          {editing ? 'Update Post' : 'Add Post'}
        </button>
        {editing && (
          <button type="button" className="cancel-btn" onClick={canceledit}>
            Cancel Edit
          </button>
        )}
      </form>

      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleedit(post)}>Edit</button>
            <button onClick={() => handledelete(post.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))
      )}
    </main>
  );
}
