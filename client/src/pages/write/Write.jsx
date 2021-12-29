import { useContext, useState } from 'react';
import './write.css';
import axios from 'axios';
import { Context } from '../../context/Context';
import ReactQuill, { Quill } from 'react-quill';
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

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'emoji',
  'imageBlot' // #5 Optinal if using custom formats
];

export default function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async e => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.post('/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {}
  };

  return (
    <>
      <div className='write'>
        {file && (
          <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
        )}
        <form className='writeForm' onSubmit={handleSubmit}>
          <div className='writeFormGroup'>
            <label htmlFor='fileInput'>
              <i className='writeIcon fas fa-plus'></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={e => setFile(e.target.files[0])}
            />
            <input
              type='text'
              placeholder='Title'
              className='writeInput'
              autoFocus={true}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className='writeFormGroup'>
            <ReactQuill
             
              placeholder='Write as you want!'
              theme='snow'
              value={desc}
              onChange={setDesc}
              modules={modules}
              // formats={formats}
            />
          </div>
          <button className='writeSubmit custom-btn btn-15' type='submit'>
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
