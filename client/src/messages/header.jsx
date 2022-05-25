import React from 'react';

const Header = (props) => {

  return (
    <p>Header: {props.thread.theirUsername}, {props.thread.itemName}</p>
  );
};

export default Header;