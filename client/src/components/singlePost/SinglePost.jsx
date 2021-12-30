import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './singlePost.css';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'react-html-parser';

import * as Emoji from 'quill-emoji';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';

// #1 import quill-image-uploader
import ImageUploader from 'quill-image-uploader';

// #2 register module
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/emoji', Emoji);

const modules = {
  // #3 Add "image" to the toolbar
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['image', 'link', 'emoji']
    ]
  },
  // # 4 Add module and upload function
  imageUploader: {
    upload: async file => {
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      const response = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload?key=7ed082d28d78cdc5e6c8b3c130015fc4',
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.data.url;
    }
  },
  'emoji-toolbar': true,
  'emoji-textarea': false,
  'emoji-shortname': true,
  imageResize: {
   // parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const PF = 'http://localhost:5000/upload/';
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
           style={{ width: '900px', height: '350px', border: '5px' }}
           placeholder='Write as you want!'
           theme='snow'
           value={desc}
           onChange={setDesc}
           modules={modules}
           // formats={formats}
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
