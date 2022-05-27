import React from 'react';

const Header = (props) => {

  return (
    <p>Messages { props.thread.username }, { props.thread.itemName }</p>
  );
};

export default Header;