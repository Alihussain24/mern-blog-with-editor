import './post.css';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { ReadMoreToggler } from 'read-more-read-less-toggler';

export default function Post({ post }) {
  const PF = 'http://localhost:5000/upload/';
  return (
    <>
    
      <div className='post'>
        {post?.photo && (
          <img className='postImg' src={PF + post.photo} alt='' />
        )}
        <div className='postInfo'>
          <div className='postCats'>
            {post?.categories.map(c => (
              <span className='postCat'>{c.name}</span>
            ))}
          </div>
          <Link to={`/post/${post._id}`} className='link'>
            <span className='postTitle'>{post.title}</span>
          </Link>
          <hr />
          <span className='postDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        <Link to={`/post/${post._id}`}>
          <div className='readmore'>
            <ReadMoreToggler>{ReactHtmlParser(post.desc)}</ReadMoreToggler>
          </div>
        </Link>
      </div>


      
    </>
  );
}
