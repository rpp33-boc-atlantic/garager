import React from 'react';

const Header = (props) => {

  return (
    <p>Header: { props.thread.username }, { props.thread.itemName }</p>
  );
};

export default Header;