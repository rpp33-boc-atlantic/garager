import React from 'react';
import ThreadTile from './ThreadTile.jsx';

const ThreadList = (props) => {

  const handleClick = (index) => {
    props.changeThread(index);
  };

  return (
    <React.Fragment>
      {
        props.threads.map(( thread, index ) => {
          return (
            <div aria-label={ `thread-tile-${index}` } key={ index } onClick={ () => handleClick(index) }>
              <ThreadTile thread={ thread }/>
            </div>
          );
        })
      }
    </React.Fragment>
  );
};

export default ThreadList;