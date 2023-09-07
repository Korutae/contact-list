import { useState, useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([]);
  const [hash, setHash] = useState(window.location.hash.slice(1)*1);

  useEffect(() => {
    const fetchData = async()=>{
      const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
      const json = await response.json();
      setPosts(json);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', ()=> {
      setHash(window.location.hash.slice(1)*1);
    })
  }, []);

  const post = posts.find( post => hash === post.id);
  
  return (
    <>
      <h1>User List</h1>
      <ul>
        {
          posts.map( post => {
            return (
              <li key={ post.id } className={ post.id === hash ? 'selected': ''}>
                <a href={`#${post.id === hash ? '': post.id}`}>
                { post.name}
                </a>
              </li>
            );
          })
        }
      </ul>
        {
          post ? (<p>{post.email}
          </p>) : null
        }
        {
          post ? (<p>{post.phone}
          </p>) : null
        }
    </>
  )
}

export default App
