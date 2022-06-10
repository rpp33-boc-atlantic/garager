import React from 'react';
import ThreadTile from './ThreadTile.jsx';
import { ListGroup } from 'react-bootstrap';

const ThreadList = ( props ) => {

  const handleClick = ( index ) => {
    props.changeThread( index );
  };

  return (
    <div id='thread-list'>
      <ListGroup>
        {
          props.threads.map(( thread, index ) => {

            if ( index === props.activeThread ) {
              return (
                <ListGroup.Item
                  active aria-label={ `thread-tile-${ index }` }
                  key={ index }
                  action
                  onClick={ () => handleClick( index ) }>

                  <ThreadTile
                    userData={ props.userData }
                    thread={ thread }/>

                </ListGroup.Item>
              );

            } else {
              return (
                <ListGroup.Item
                  aria-label={ `thread-tile-${ index }` }
                  key={ index }
                  action onClick={ () => handleClick( index ) }>

                  <ThreadTile
                    userData={ props.userData }
                    thread={ thread }/>

                </ListGroup.Item>
              );
            }
          })
        }
      </ListGroup>
    </div>
  );
};

export default ThreadList;