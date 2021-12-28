import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './singlePost.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'react-html-parser';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const PF = 'http://localhost:5000/images/';
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username }
      });
      window.location.replace('/');
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo && (
          <img src={PF + post.photo} alt='' className='singlePostImg' />
        )}
        {updateMode ? (
          <input
            type='text'
            value={title}
            className='singlePostTitleInput'
            autoFocus
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlePostTitle'>
            {title}
            {post.username === user?.username && (
              <div className='singlePostEdit'>
                <i
                  className='singlePostIcon far fa-edit'
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className='singlePostIcon far fa-trash-alt'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            Author:
            <Link to={`/?user=${post.username}`} className='link'>
              <b> {post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <ReactQuill
            style={{
              width: '900px',
              height: '200px'
            }}
            placeholder='Write as you want!'
            theme='snow'
            value={desc}
            onChange={setDesc} maxLength="140"
          />
        ) : (
          <p className='singlePostDesc'>{ReactHtmlParser(desc)}</p>
        )}
       
          {updateMode && (
            <button className='singlePostButton' onClick={handleUpdate}>
              Update
            </button>
          )}
       
      </div>
    </div>
  );
}
