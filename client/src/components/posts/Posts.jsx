import Post from '../post/Post';
import './posts.css';
import { useState } from 'react';
import Paginate from 'react-paginate'

export default function Posts({ posts }) {
  const [filter, setFilter] = useState('');

  const searchHandle = e => {
    setFilter(e.target.value);
  };

  let dataSearch = posts.filter(item => {
    return Object.keys(item).some(key =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
  return (
    <>
      <div>
        <div className='searchDiv'>
          <input
            className='Searchbox'
            type='text'
            placeholder='Search Here'
            value={filter}
            onChange={searchHandle.bind(this)}
          />
        </div>
        <div className='posts'>
          {dataSearch?.map((p, ind) => (
            <Post post={p} key={ind} />
          ))}

        </div>

     <Paginate
     PreviousPage
     NextPage
     
     />
      </div>
    </>
  );
}
