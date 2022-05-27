import React from 'react';
import ThreadTile from './ThreadTile.jsx';
import { Stack } from 'react-bootstrap';

const ThreadList = (props) => {

  const handleClick = (index) => {
    props.changeThread(index);
  };

  return (
    <Stack gap={3}>
      {
        props.threads.map(( thread, index ) => {
          return (
            <div aria-label={ `thread-tile-${index}` } key={ index } onClick={ () => handleClick(index) }>
              <ThreadTile thread={ thread }/>
            </div>
          );
        })
      }
    </Stack>
  );
};

export default ThreadList;